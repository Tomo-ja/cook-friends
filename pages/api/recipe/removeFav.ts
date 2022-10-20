import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/user";
import mongoose from "mongoose";

/*
	expecting body{
		user_id: 632a4e972852e67132cc00dd,
		recipe_id: string
	}
*/

export default async function login(req: NextApiRequest, res: NextApiResponse<any>) {
	try {
		await connectMongo();
		const user = await User.findOne({ _id: new mongoose.Types.ObjectId(req.body.user_id) })
		user.favoriterecipe = user.favoriterecipe.filter((id: string) => id !== req.body.recipe_id);
		await user.save()
		res.json({
			id: user._id.toString(),
			username: user.username,
			email: user.email,
			password: user.password,
			favoriterecipe: user.favoriterecipe,
			historyrecipe: user.historyrecipe,
		})
	} catch (error) {
			res.json({ error });
	}
}