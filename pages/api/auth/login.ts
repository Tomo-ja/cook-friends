import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/user";
const bcrypt = require("bcrypt");
import { ObjectId } from "mongodb";

export default async function login(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try {
		await connectMongo();
		const user = await User.findOne({ email: req.body.data.email });
		if (!user) return res.json("NotExists");
		const isUserMatch = await bcrypt.compare(
			req.body.data.password,
			user.password
		);
		if (!isUserMatch) return res.json("worngPassword");
		return res.json({
			id: user._id.toString(),
			username: user.username,
			email: user.email,
			password: user.password,
			favoriterecipe: user.favoriterecipe,
			historyrecipe: user.historyrecipe,
		});
	} catch (error) {
		res.json({ error });
	}
}
