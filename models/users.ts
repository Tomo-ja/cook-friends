import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		min: 3,
		max: 20,
		unique: true,
	},
	email: {
		type: String,
		max: 50,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 50,
	},
	favoriterecipe: {
		type: Array,
		required: true,
		default: [],
	},
	historyrecipe: {
		type: Array,
		required: true,
		default: [],
	},
});
const User = models.User || model("User", UserSchema);
export default User
