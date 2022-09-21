import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../utils/connectMongo";
import User from "../../models/testModel";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  console.log("working");
	try {
		await connectMongo();
		console.log("connected to Mongo");
		const auth = await User.create(req.body);
    res.json({ auth });
	} catch (error) {
    res.status(500).json({ error });
	}
}
