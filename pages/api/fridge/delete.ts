import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../utils/connectMongo";
import Fridge from "../../../models/fridgeModel";
import { Timestamp } from "mongodb";

/*
	expecting body {
		user_id: 632a4e972852e67132cc00dd,
		ingredient_api_id: string,
		amount: number,
	}
*/

export default async function removeFromFridge(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try {
		await connectMongo();
		const fridge = await Fridge.findOne({ user_id: req.body.user_id });
			fridge.stock = fridge.stock.filter(
				(value: {
					ingredient_api_id: string;
					name: string;
					stored_at: Timestamp;
					amount: number;
					_id: string;
				}) => value.ingredient_api_id !== req.body.ingredient_api_id
			);

		await fridge.save();		
		res.json(fridge.summary);
	} catch (error) {
		console.log(error);
		res.json({ error });
	}
}
