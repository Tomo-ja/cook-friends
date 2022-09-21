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
		required: true,
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
		default: [],
	},
	historyrecipe: {
		type: Array,
		default: [],
	},
});
const User = models.User || model("User", UserSchema);
export default User;