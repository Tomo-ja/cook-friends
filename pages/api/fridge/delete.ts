import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../utils/connectMongo";
import Fridge from "../../../models/fridgeModel";

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
			(food: {[x: string]: any; amouingredient_api_idnt: string }) =>
				food.ingredient_api_id !== req.body.food
		);

		await fridge.save();
		res.json(fridge.summary);
	} catch (error) {
		console.log(error);
		res.json({ error });
	}
}
