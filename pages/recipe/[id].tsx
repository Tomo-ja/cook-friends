import { NextPage } from 'next'
import parseCookies from '../../helpers/index'
import { User } from '../../helpers/typesLibrary'


type Props = {

}

const Recipe: NextPage<Props> = ({}: Props) => {
	return (
		<h1>recipe page</h1>
	)
}

export default Recipe

// Recipe.getInitialProps = async ({ req, res, query}): Promise<Props> => {
// 	const cookieData = parseCookies(req)
// 	const user: User | null = cookieData.user ? JSON.parse(cookieData.user) : null

// }