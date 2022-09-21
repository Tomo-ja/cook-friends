import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '../../../utils/connectMongo'
import Fridge from '../../../models/fridgeModel'

/*
	expecting body {
		user_id: 632a4e972852e67132cc00dd,
	}
*/

export default async function showInFridge(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try{
		await connectMongo()
		const fridge = await Fridge.findOne({user_id: req.body.user_id})
		res.json( fridge.summary )

	} catch (error) {
		console.log({ error })
		res.json({ error })
	}
}