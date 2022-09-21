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
				}
			}
		],
		default: []
	}
})

const Fridge = models.Fridge || model('Fridge', fridgeSchema)

export default Fridge