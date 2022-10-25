import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '../../../utils/connectMongo'
import ShoppingList from '../../../models/shoppingListModel'

/*
	expecting body{
		user_id: 632a4e972852e67132cc00dd,
		ingredient_api_id: string,
		name: string,
		amount: number,
		unit: string,
		memo: string
	}
*/

export default async function addToShoppingList(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try{
		await connectMongo()
		const shoppingList = await ShoppingList.findOne({user_id: req.body.user_id})
		let newItem = true
		
		for (let i=0; i<shoppingList.list.length; i++) {
			if (shoppingList.list[i].ingredient_api_id !== req.body.ingredient_api_id) { continue }
			shoppingList.list[i].amount = shoppingList.list[i].amount + parseFloat(req.body.amount) 
			shoppingList.list[i].memo = `${shoppingList.list[i].memo} \n${req.body.memo}`
			newItem = false
			break
		}

		if (newItem){
			shoppingList.list.push({
				ingredient_api_id: req.body.ingredient_api_id,
				name: req.body.name,
				created_at: Date.now(),
				amount: req.body.amount,
				memo: req.body.memo
			})
		}
		await shoppingList.save()
		res.json({ shoppingList })

	} catch(error) {
		console.error({error})
		res.json({ error })
	}
}