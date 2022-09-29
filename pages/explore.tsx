import type { NextPage } from 'next'
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import parseCookies, { stringToDate } from '../helpers'
import { User, Fridge, RecipeSearchResult, RecipeSearchParams } from '../helpers/typesLibrary'
import appAxios, { spoonacularApiAxios } from '../constants/axiosBase';

import SearchSection from '../components/SearchBarSection/index'

import StyledExplore from '../components/Explore/explore.styles'
import StyledMainContent from '../styles/mainContent.styles'
import StyledSubContent from '../styles/subContent.styles'
import StyledPagination from '../components/Explore/pagination.styles';

import { complexSearchData } from '../sampleApiData'

const NUMBER_ITEMS_AT_ONE_FETCH = 6


type Props = {
  user: User | null,
  fridge: Fridge,
  recipeSearchResult: RecipeSearchResult,
  searchParams: RecipeSearchParams
}

const DynamicFridgeSection = dynamic(() => import('../components/ItemInFridge/index'),
{ssr: true})

const DynamicRecipeSection = dynamic(() => import('../components/RecipesSection/index'), 
{ssr: true})

let isInitialRender = true

const Explore: NextPage<Props> = ({ user, fridge, recipeSearchResult, searchParams }: Props) => {
  const router = useRouter()

  router.query
  const [stateRecipesResult, setStateResult] = useState(recipeSearchResult)
  const [mustIncludeIngredients, setMustIncludeIngredients] = useState<string[]>([])
  const [page, setPage] = useState(1)

  const handlePagination = (nextPage: number) => {
    setPage(prev => prev + nextPage)
  }

  const pickDisplayItems = (propPage: number, totalResults: number): RecipeSearchResult => {
    console.count('display picker')
    const allRecipes = [...stateRecipesResult.results]
    const start = Math.max(((propPage - 1 ) * NUMBER_ITEMS_AT_ONE_FETCH), 0)
    let end = propPage * NUMBER_ITEMS_AT_ONE_FETCH
    if (end > totalResults) {
      end = totalResults
      console.log(end)
    } 
    console.log('start', start, 'end', end)
    console.log(stateRecipesResult)
    const displayRecipe = allRecipes.slice(start, end)
    console.log(displayRecipe)
    return {
      ...stateRecipesResult,
      results: displayRecipe
    }
  }

  useEffect(() => {
    const fetchSearchResult = async (offset: number) => {
      searchParams.offset = offset
      // const response = await spoonacularApiAxios.get('/recipes/complexSearch', {params: searchParams})
      const response = complexSearchData
      console.count('api called page changed')
      setStateResult(prev => {
        const newState = {...prev}
        newState.offset = offset
        newState.results.push(...response.data.results)
        newState.number = response.data.number
        return newState
      })
    }

    if ((page * NUMBER_ITEMS_AT_ONE_FETCH) > stateRecipesResult.results.length) {
      fetchSearchResult((stateRecipesResult.offset + NUMBER_ITEMS_AT_ONE_FETCH))
    } else {
      console.log('should appier when page back')
    }
  }, [page])

  useEffect(() => {
    const fetchSearchResult = async () => {
      console.count('api called fridge item filter')
      searchParams.includeIngredients = mustIncludeIngredients.join()
      // const response = await spoonacularApiAxios.get('/recipes/complexSearch', {params: searchParams})
      const response = complexSearchData
      setStateResult(response.data as RecipeSearchResult)
    }

    if (isInitialRender){
      isInitialRender = false
    } else {
      fetchSearchResult().catch(()=> console.log('fetch recipe with fridge item failed'))
    }
  }, [mustIncludeIngredients])

  useEffect(() => {
    setMustIncludeIngredients([])
    setStateResult(recipeSearchResult)
  }, [recipeSearchResult])

  useEffect(()=> {
    return () => {
      isInitialRender = true
    }
  }, [])

	return (
		<StyledExplore>
      <Head>
        <title>Recipes | Cookit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchSection />
      <StyledMainContent>
        <h2>Found {recipeSearchResult.totalResults} Recipes by &quot;{router.query.keyword}&quot;</h2>
        <DynamicRecipeSection 
          recipesSearchResult={pickDisplayItems(page, stateRecipesResult.totalResults)} 
          user={user}
        />
        <StyledPagination>
          {page > 1 &&
            <button onClick={() => handlePagination(-1)}>Previous</button>
          }
          {page * NUMBER_ITEMS_AT_ONE_FETCH < recipeSearchResult.totalResults && 
            <button onClick={() => handlePagination(1)}>Next</button>
          }
        </StyledPagination>
      </StyledMainContent>
      <StyledSubContent>
        <h3>Use Food in Your Fridge?</h3>
        <DynamicFridgeSection 
          fridge={fridge} 
          useAsFilter={true} 
          setMustIncludeIngredients={setMustIncludeIngredients}
          urlQuery={router.query}
        />
      </StyledSubContent>
    </StyledExplore>
	)
}

export default Explore


Explore.getInitialProps = async ({ req, res, query }): Promise<Props> => {
  const cookieData = parseCookies(req)
  const user: User | null = cookieData.user ? JSON.parse(cookieData.user) : null
  const fridge: Fridge = []
  let recipeSearchResult: RecipeSearchResult
  let params: RecipeSearchParams
  isInitialRender = true

  if(query.keyword) {
    params = {
      query: query.keyword,
      number: NUMBER_ITEMS_AT_ONE_FETCH,
      offset: 0,
      sort: 'popularity',
      addRecipeInformation: true,
      includeIngredients: ''
    }

    // const response = await spoonacularApiAxios.get('/recipes/complexSearch', {params: params})
    const response = complexSearchData
    recipeSearchResult = response.data as RecipeSearchResult
  } else {
    console.error('ERROR: coming explore page without keyword')
    recipeSearchResult = {
      results: [],
      offset: 0,
      number: 0,
      totalResults: 0
    }
    params = {
      query: "",
      number: 0,
      offset: 0,
      sort: 'popularity',
      addRecipeInformation: true,
      includeIngredients: ''
    }
  }

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
          stored_at: stringToDate(value.stored_at).toString()
        }
      )
    })
  }

  if(res){
    if (Object.keys(cookieData).length === 0 && cookieData.constructor === Object) {
      res.writeHead(301, { Location: '/'})
      res.end()
    }
  }

  return {
    user,
    fridge,
    recipeSearchResult,
    searchParams: params
  }
}

// for recipe page
//GET https://api.spoonacular.com/recipes/324694/analyzedInstructions
