import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '../../../utils/connectMongo'
import ShoppingList from '../../../models/shoppingListModel'

/*
	expecting body{
		user_id: 
	}
	test id: 632a4e972852e67132cc00dd
*/

export default async function createShoppingList(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try{
		await connectMongo()
		const shoppingList = await ShoppingList.create(req.body)

		res.json({ shoppingList })

	} catch(error) {
		console.log({error})
		res.json({ error })
	}
}