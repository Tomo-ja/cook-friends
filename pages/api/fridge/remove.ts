import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../utils/connectMongo";
import Fridge from "../../../models/fridgeModel";
import Amount from "../../../components/FridgeSection/amount";
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
		let usedAmount = parseFloat(req.body.amount);
			
		for(let i=0; i<fridge.stock.length; i++){
				if(fridge.stock[i].ingredient_api_id !== req.body.ingredient_api_id) { continue }
			
				if (fridge.stock[i].amount === usedAmount) {
						fridge.stock.splice(i,1)
						break
					} else if (fridge.stock[i].amount > usedAmount) {
							fridge.stock[i].amount -= usedAmount
							break
						} else {
								usedAmount -= fridge.stock[i].amount
				fridge.stock[i].amount = 0
			}
		}
		fridge.stock = fridge.stock.filter((food: { amount: number }) => food.amount > 0)
				await fridge.save();
				res.json(fridge.summary);
		
	} catch (error) {
		console.error(error);
		res.json({ error });
	}
}

