import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import Head from 'next/head'

import parseCookies from '../helpers'
import { spoonacularApiAxios } from '../constants/axiosBase';

import StyledExplore from '../components/Explore/explore.styles'
import StyledSEarchSection from '../components/SearchBarSection/index'
import StyledMainContent from '../styles/mainContent.styles'
import StyledSubContent from '../styles/subContent.styles'


type Props = {
  data: {
    user: string
  }
}

const Explore: NextPage<Props> = ({ data }: Props) => {
  const router = useRouter()
  console.log(router.query.keyword)

	return (
		<StyledExplore>
      <Head>
        <title>Recipes | CF</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledSEarchSection />
      <StyledMainContent>
        <h2>Result of &quot;{router.query.keyword}&quot;</h2>

      </StyledMainContent>
      <StyledSubContent>

      </StyledSubContent>

    </StyledExplore>
	)
}

export default Explore


Explore.getInitialProps = async ({ req, res }): Promise<Props> => {
  const data = parseCookies(req)
  // const d = await spoonacularApiAxios.get('/recipes/random', {params : {
  //   number: 1
  // }})
  // console.log(d.data)
  // console.log('this is req',req?.headers)

  if(res){
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: '/'})
      res.end()
    }
  }

  return {
    data: data && data
  } as Props
}