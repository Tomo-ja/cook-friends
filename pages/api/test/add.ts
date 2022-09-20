// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '../../../utils/connectMongo'
import Test from '../../../models/testModel'

export type Data = {
  name: string,
	email: string
}

export default async function addTest(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

	try{

		await connectMongo()

		console.log('connected to mongo')
	
		const test = await Test.create(req.body)
	
		res.json({ test })

	} catch(error){
		res.json({ error })
	}

}

/*
url: http://localhost:3000/api/test/add
method: post
body: name: "test", email: "test@email.com"
*/