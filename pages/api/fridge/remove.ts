import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../utils/connectMongo";
import Fridge from "../../../models/fridgeModel";
import Amount from "../../../components/ItemInFridge/amount";
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
		
		if (usedAmount === 0) {
			// console.log(typeof req.body.amount);
			const deletedIngredient = fridge.stock.filter(
				(value: {
					ingredient_api_id: string;
					name: string;
					stored_at: Timestamp;
					amount: number;
					_id: string;
				}) => value.ingredient_api_id !== req.body.ingredient_api_id
				);
			console.log(fridge);
			console.log("new Object", { _id : fridge._id, user_id: fridge.user_id ,stock: deletedIngredient, __v:fridge.__v });
			await fridge.save();
			res.json(fridge.summary);
		} else {
			fridge.stock.forEach(
				(element: {
					ingredient_api_id: string;
					name: string;
					stored_at: Timestamp;
					amount: number;
					_id: string;
				}) => {
					if (element.ingredient_api_id === req.body.ingredient_api_id) {
						element.amount = req.body.amount;
					}
				}
				);
				console.log(fridge);
				await fridge.save()
				// console.log(fridge);
				res.json( fridge.summary )
			}
			
		// for(let i=0; i<fridge.stock.length; i++){
			// 	if(fridge.stock[i].ingredient_api_id !== req.body.ingredient_api_id) { continue }
			
			// 	if (fridge.stock[i].amount === usedAmount) {
				// 		fridge.stock.splice(i,1)
				// 		break
				// 	} else if (fridge.stock[i].amount > usedAmount) {
					// 		fridge.stock[i].amount -= usedAmount
					// 		break
					// 	} else {
						// 		usedAmount -= fridge.stock[i].amount
		// 		fridge.stock[i].amount = 0
		// 	}
		// }
		
		
		// fridge.stock = fridge.stock.filter((food: { amount: number }) => food.amount > 0)
		
	} catch (error) {
		console.log(error);
		res.json({ error });
	}
}


// new Object {
//   _id: new ObjectId("633a59d4733aa93cea103d70"),
//   user_id: new ObjectId("633a59d4733aa93cea103d6e"),
//   stock: [
//     {
//       ingredient_api_id: '9087',
//       name: 'dates',
//       stored_at: 2022-10-22T00:00:00.000Z,
//       amount: 66,
//       _id: new ObjectId("6340ad31d2491104f1117f93")
//     },
//     {
//       ingredient_api_id: '1018',
//       name: 'edam cheese',
//       stored_at: 2022-10-22T00:00:00.000Z,
//       amount: 1,
//       _id: new ObjectId("6340ad4bd2491104f1117fe3")
//     },
//     {
//       ingredient_api_id: '9087',
//       name: 'dates',
//       stored_at: 2022-10-28T00:00:00.000Z,
//       amount: 1,
//       _id: new ObjectId("6340ba31d2491104f11182dc")
//     },
//     {
//       ingredient_api_id: '15136',
//       name: 'crab',
//       stored_at: 2022-10-28T00:00:00.000Z,
//       amount: 2,
//       _id: new ObjectId("6340ba38d2491104f11182ec")
//     }
//   ],
//   __v: 124
// }
// {
//   _id: new ObjectId("633a59d4733aa93cea103d70"),
//   user_id: new ObjectId("633a59d4733aa93cea103d6e"),
//   stock: [
//     {
//       ingredient_api_id: '9087',
//       name: 'dates',
//       stored_at: 2022-10-22T00:00:00.000Z,
//       amount: 66,
//       _id: new ObjectId("6340ad31d2491104f1117f93")
//     },
//     {
//       ingredient_api_id: '1018',
//       name: 'edam cheese',
//       stored_at: 2022-10-22T00:00:00.000Z,
//       amount: 1,
//       _id: new ObjectId("6340ad4bd2491104f1117fe3")
//     },
//     {
//       ingredient_api_id: '93757',
//       name: 'verjus',
//       stored_at: 2022-10-28T00:00:00.000Z,
//       amount: 0,
//       _id: new ObjectId("6340ba2dd2491104f11182ce")
//     },
//     {
//       ingredient_api_id: '9087',
//       name: 'dates',
//       stored_at: 2022-10-28T00:00:00.000Z,
//       amount: 1,
//       _id: new ObjectId("6340ba31d2491104f11182dc")
//     },
//     {
//       ingredient_api_id: '15136',
//       name: 'crab',
//       stored_at: 2022-10-28T00:00:00.000Z,
//       amount: 2,
//       _id: new ObjectId("6340ba38d2491104f11182ec")
//     }
//   ],
//   __v: 124
// }