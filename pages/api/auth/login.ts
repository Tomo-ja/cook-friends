import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/user";
const bcrypt = require("bcrypt");

export default async function login(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		try {
			await connectMongo();
			const user = await User.findOne({ username: req.body.username })
			if (!user) return res.json("We can't find the user");
			const isUserMatch = await bcrypt.compare(req.body.password, user.password);
			if (!isUserMatch) return res.json("password is wrong");
			return res.json({ user });
	} catch (error) {
			res.json({ error });
	}
	}
}