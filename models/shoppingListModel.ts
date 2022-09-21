import mongoose, { Schema, model, models} from "mongoose";

const shoppingListSchema = new Schema({
	user_id: {
		type: mongoose.SchemaTypes.ObjectId,
		unique: true,
		required: true
	},
	list: {
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
				created_at: {
					type: Date,
					immutable: true,
					required: true
				},
				amount: {
					type: Number,
					required: true,
					min: 0
				},
				unit: {
					type: String,
				},
				memo: {
					type: String
				}
			}
		],
		default: []
	}
})

const ShoppingList = models.ShoppingList || model('ShoppingList', shoppingListSchema)

export default ShoppingList