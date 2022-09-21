import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '../../../utils/connectMongo'
import Fridge from '../../../models/fridgeModel'

/*
	expecting body {
		user_id: 632a4e972852e67132cc00dd,
		ingredient_api_id: string,
		name: string
		category: [string],
		amount: number,
		unit: string,
	}
*/

export default async function addToFridge(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try{
		await connectMongo()
		const fridge = await Fridge.findOne({user_id: req.body.user_id})
		fridge.stock.push({
			ingredient_api_id: req.body.ingredient_api_id,
			name: req.body.name,
			category: req.body.category,
			amount: req.body.amount,
			unit: req.body.unit,
			stored_at: req.body.stored_at || Date.now(),
		})
		await fridge.save()
		res.json({ fridge })

	} catch (error) {
		console.log({ error })
		res.json({ error })
	}
}