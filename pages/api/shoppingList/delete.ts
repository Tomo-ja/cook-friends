import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '../../../utils/connectMongo'
import ShoppingList from '../../../models/shoppingListModel'

/*
	expecting body{
		user_id: 632a4e972852e67132cc00dd,
		ingredient_api_id: string,
	}
*/

export default async function deleteFromShoppingList(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try{
		await connectMongo()
		const shoppingList = await ShoppingList.findOne({user_id: req.body.user_id})
		let removedItem: any = null
		
		for (let i=0; i<shoppingList.list.length; i++) {
			if (shoppingList.list[i].ingredient_api_id !== req.body.ingredient_api_id) { continue }
			removedItem = shoppingList.list.splice(i, 1)
			break
		}

		await shoppingList.save()
		res.json({ shoppingList, removedItem })

	} catch(error) {
		console.error({error})
		res.json({ error })
	}
}