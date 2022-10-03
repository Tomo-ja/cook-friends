import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/user";
import mongoose from "mongoose";

/*
	expecting body{
		user_id: 632a4e972852e67132cc00dd,
	}
*/

export default async function login(req: NextApiRequest, res: NextApiResponse<any>) {
	try {
		await connectMongo();
		const user = await User.findOne({ _id: new mongoose.Types.ObjectId(req.body.user_id) })
		user.historyrecipe = [];
		await user.save()
		res.json({user})
	} catch (error) {
			res.json({ error });
	}
}