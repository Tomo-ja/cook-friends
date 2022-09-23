import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/user";
import { parseCookies } from "nookies";
const bcrypt = require("bcrypt");
export default async function register(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	console.log("working");
	try {
		await connectMongo();
		console.log("connected to Mongo");
		const hashPsw = await bcrypt
			.hash(req.body.password, 12)
			.then((hashedPassword: string) => {
				return hashedPassword;
			});
		const newUser = {
			username: req.body.username,
			email: req.body.email,
			password: hashPsw,
		};

		const auth = await User.create(newUser);
		res.json(auth);
	} catch (error) {
		res.json({ error });
	}
}
