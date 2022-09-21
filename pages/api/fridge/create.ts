import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '../../../utils/connectMongo'
import Fridge from '../../../models/fridgeModel'

/*
	expecting body{
		user_id: 
	}
	test id: 632a4e972852e67132cc00dd
*/

export default async function createFridge(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try{
		await connectMongo()
		const fridge = await Fridge.create(req.body)
		res.json({ fridge })
	} catch(error) {
		console.log({error})
		res.json({ error })
	}
}