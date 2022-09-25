import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import parseCookies, { stringToDate } from '../helpers'
import { User, Fridge } from '../helpers/typesLibrary'
import appAxios, { spoonacularApiAxios } from '../constants/axiosBase';

import SearchSection from '../components/SearchBarSection/index'
import ItemInFridge from '../components/ItemInFridge/index'

import StyledExplore from '../components/Explore/explore.styles'
import StyledMainContent from '../styles/mainContent.styles'
import StyledSubContent from '../styles/subContent.styles'



type Props = {
  user: User | null,
  fridge: Fridge
}

const Explore: NextPage<Props> = ({ user, fridge }: Props) => {
  const router = useRouter()
  console.log(router.query.keyword)
  console.log('user data', user)
  console.log('fridge data', fridge)
	return (
		<StyledExplore>
      <Head>
        <title>Recipes | Cookit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchSection />
      <StyledMainContent>
        <h2>Result of &quot;{router.query.keyword}&quot;</h2>
      </StyledMainContent>
      <StyledSubContent>
        <h3>Use Food in Your Fridge?</h3>
        <ItemInFridge />
      </StyledSubContent>

    </StyledExplore>
	)
}

export default Explore


Explore.getInitialProps = async ({ req, res }): Promise<Props> => {
  const cookieData = parseCookies(req)
  const user: User | null = cookieData.user ? JSON.parse(cookieData.user) : null
  const fridge: Fridge = []

  if (user) {
    const fridgeData = await appAxios.post('/api/fridge/show', {
      user_id: user.id
    })
    Object.values(fridgeData.data).forEach((value: any) => {
      fridge.push(
        {
          ingredient_api_id: value.ingredient_api_id,
          name: value.name,
          amount: value.amount,
          unit: value.unit,
          category: value.category,
          stored_at: stringToDate(value.stored_at)
        }
      )
    })
  }

  // const d = await spoonacularApiAxios.get('/recipes/random', {params : {
  //   number: 1
  // }})
  // console.log(d.data)
  // console.log('this is req',req?.headers)

  if(res){
    if (Object.keys(cookieData).length === 0 && cookieData.constructor === Object) {
      res.writeHead(301, { Location: '/'})
      res.end()
    }
  }

  return {
    user: cookieData ? JSON.parse(cookieData.user) as User : null,
    fridge
  } as Props
}