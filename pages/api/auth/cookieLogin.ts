import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/user";
// var ObjectId = require("mongodb").ObjectID;
import { ObjectId } from "mongodb";

export default async function login(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try {
		// await connectMongo();
		// console.log("server",JSON.parse(req.body.data));
		// const uid = new ObjectId(req.body.data)
		// console.log("uid",uid);
		// console.log(User.findOne({ email: "tenmusu007@gmail.com" }));
		// const user = User.findOne({ email: "tenmusu007@gmail.com" });
		// const user3 = await User.findOne({ _id: new ObjectId(req.body.data) });
		// const user = await User.findById(req.body.data);
		// const user2 = await User.findOne();
		// console.log("test", user);
		// console.log(user3);
		// return res.json({user3});
	} catch (error) {
		res.json({ error });
	}
}
