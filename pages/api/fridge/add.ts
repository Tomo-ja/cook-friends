import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../utils/connectMongo";
import Fridge from "../../../models/fridgeModel";
import { Timestamp } from "mongodb";

/*
	expecting body {
		user_id: 632a4e972852e67132cc00dd,
		ingredient_api_id: string,
		name: string
		amount: number,
		unit: string,
	}
*/

export default async function addToFridge(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try {
		await connectMongo();
		const fridge = await Fridge.findOne({ user_id: req.body.user_id });
		const alreadyStored = fridge.stock.filter(
			(item: { ingredient_api_id: any }) =>
				Number(item.ingredient_api_id) === Number(req.body.ingredient_api_id)
		);
		if (alreadyStored.length > 0) {
			const tempoArr = await fridge.stock.filter(
				(value: {
					ingredient_api_id: number;
					name: string;
					stored_at: Timestamp;
					amount: number;
					_id: string;
				}) => Number(value.ingredient_api_id) !== Number(req.body.ingredient_api_id)
			);
			const updateAmount =
			Number(alreadyStored[0].amount) + Number(req.body.amount);
					await tempoArr.push({
						ingredient_api_id: req.body.ingredient_api_id,
						name: req.body.name,
						amount: updateAmount,
						stored_at: req.body.stored_at || Date.now(),
						_id : alreadyStored[0]._id
					});
					fridge.stock = await tempoArr
					await fridge.save();
			res.json(fridge.summary);
		} else {
			fridge.stock.push({
				ingredient_api_id: req.body.ingredient_api_id,
				name: req.body.name,
				amount: req.body.amount,
				stored_at: req.body.stored_at || Date.now(),
			});
			await fridge.save();
			res.json(fridge.summary);
		}
	} catch (error) {
		console.log({ error });
		res.json({ error });
	}
}
