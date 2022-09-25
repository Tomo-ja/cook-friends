import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import parseCookies from '../helpers'
import { spoonacularApiAxios } from '../constants/axiosBase';

import SearchSection from '../components/SearchBarSection/index'
import ItemInFridge from '../components/ItemInFridge/explore.index'

import StyledExplore from '../components/Explore/explore.styles'
import StyledMainContent from '../styles/mainContent.styles'
import StyledSubContent from '../styles/subContent.styles'

import StyledItemInFridge, { classNames } from '../components/ItemInFridge/itemInFridge.style'





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
        <title>Recipes | Cookit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchSection />
      <StyledMainContent>
        <h2>Result of &quot;{router.query.keyword}&quot;</h2>
        <StyledItemInFridge useAsFilter={false}>
            <div className={classNames.itemFridgeLeft}>
              <p className={classNames.foodName}>
                food name
              </p>
              <p className={classNames.expireDate}>
                3 days
              </p>
            </div>
            <div className={classNames.itemFridgeRight}>
              <div className={classNames.arrowTop}></div>
              <div className={classNames.amount}>amount: 400g</div>
              <div className={classNames.arrowBottom}></div>
            </div>
        </StyledItemInFridge>

      </StyledMainContent>
      <StyledSubContent>
        <h3>Use Food in Your Fridge?</h3>
        <ItemInFridge></ItemInFridge>
      </StyledSubContent>

    </StyledExplore>
	)
}

export default Explore

{/* <ItemFridge>
<div className='ItemFridgeLeft'>
  <p className='FoodName'>Name of food</p>
  <p className='ExpireDate'>Expire date in 3days</p>
</div>
<div className='ItemFridgeRight'>
  <div className='Arrow-Top'></div>
  <p className='Amount'>amount : 400g</p>
  <div className='Arrow-Bottom'></div>
  <IconButton backgroundColor='gray'>
    <FontAwesomeIcon icon={faTrash} style={{ color: "#000" }} />
  </IconButton>
</div>
</ItemFridge> */}


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