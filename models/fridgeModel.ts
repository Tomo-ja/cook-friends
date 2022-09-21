import mongoose, { Schema, model, models} from "mongoose";

const fridgeSchema = new Schema({
	user_id: {
		type: mongoose.SchemaTypes.ObjectId,
		unique: true,
		required: true
	},
	stock: {
		type: [
			{
				ingredient_api_id: {
					type: String,
					immutable: true,
					required: true
				},
				name: {
					type: String,
					immutable: true,
					required: true
				},
				category: {
					type: [String],
				},
				stored_at: {
					type: Date,
					immutable: true,
					required: true
				},
				amount: {
					type: Number,
					min: 0,
					required: true
				},
				unit: {
					type: String,
				}
			}
		],
		default: []
	}
})

fridgeSchema.virtual('summary').get(function(){
	let summary: 
		{ [id: string] : {
				name: string, 
				category: string[], 
				stored_at: Date, 
				amount: number, 
				unit: string
			}
		} 
		= {}

		this.stock.forEach(food => {
			if(summary[food.ingredient_api_id]) {
				summary[food.ingredient_api_id].amount += food.amount
			} else {
				summary[food.ingredient_api_id] = {
					name: food.name,
					category: food.category,
					stored_at: food.stored_at,
					amount: food.amount,
					unit: food.unit ? food.unit : ""
				}
			}
		})
		return summary
})

fridgeSchema.post('save', function(doc, next) {
	doc.stock.sort(function (x, y) {
		return x.stored_at > y.stored_at ? 1 : -1
	})
	next()
})


const Fridge = models.Fridge || model('Fridge', fridgeSchema)

export default Fridge
