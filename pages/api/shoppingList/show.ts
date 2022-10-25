import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '../../../utils/connectMongo'
import ShoppingList from '../../../models/shoppingListModel'

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
		const shoppingList = await ShoppingList.findOne({user_id: req.body.user_id})
		res.json({ shoppingList })

	} catch (error) {
		console.error({ error })
		res.json({ error })
	}
}