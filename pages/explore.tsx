import type { NextPage } from 'next'
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Router, useRouter } from 'next/router';
import Head from 'next/head'
import { getCookie, setCookie } from 'cookies-next';

import parseCookies, { stringToDate } from '../helpers'
import { User, Fridge, RecipeSearchResult, RecipeSearchParams, RecipeInfo, RecipeSummary } from '../helpers/typesLibrary'
import appAxios, { spoonacularApiAxios } from '../constants/axiosBase';

import SearchSection from '../components/SearchBarSection/index'

import StyledExplore from '../components/Explore/explore.styles'
import StyledMainContent from '../styles/mainContent.styles'
import StyledSubContent from '../styles/subContent.styles'
import StyledPagination from '../components/Explore/pagination.styles';

import { complexSearchData } from '../sampleApiData'

const NUMBER_ITEMS_AT_ONE_FETCH = 3

type Props = {
  user: User | null,
  fridge: Fridge,
  recipeSearchResult: RecipeSearchResult,
  searchParams: RecipeSearchParams | null,
  recipeIds: number[] | null
}

const DynamicFridgeSection = dynamic(() => import('../components/ItemInFridge/index'),
{ssr: true})

const DynamicRecipeSection = dynamic(() => import('../components/RecipesSection/index'), 
{ssr: true})

let isInitialRender = true

const Explore: NextPage<Props> = ({ user, fridge, recipeSearchResult, searchParams, recipeIds }: Props) => {
  const router = useRouter()

  const [stateRecipesResult, setStateResult] = useState(recipeSearchResult)
  const [mustIncludeIngredients, setMustIncludeIngredients] = useState<string[]>([])
  const [page, setPage] = useState(1)

  const handlePagination = (nextPage: number) => {
    setPage(prev => prev + nextPage)
  }

  const pickDisplayItems = (propPage: number, totalResults: number): RecipeSearchResult => {
    const allRecipes = [...stateRecipesResult.results]
    const start = Math.max(((propPage - 1 ) * NUMBER_ITEMS_AT_ONE_FETCH), 0)
    let end = propPage * NUMBER_ITEMS_AT_ONE_FETCH
    if (end > totalResults) {
      end = totalResults
    } 
    const displayRecipe = allRecipes.slice(start, end)
    return {
      ...stateRecipesResult,
      results: displayRecipe
    }
  }

  const handleClickRecipe = (id: number) => {
    if (user) {
      if (!user.historyrecipe.includes(id.toString())) {
        user.historyrecipe.push(id.toString())
        setCookie('user', user)
      }
    }
    router.push(`/recipe/${id}`)
  }

  useEffect(() => {
    const fetchSearchResult = async (offset: number) => {
      if (searchParams) {
        searchParams.offset = offset
        // const response = await spoonacularApiAxios.get('/recipes/complexSearch', {params: searchParams})
        const response = complexSearchData
        setStateResult(prev => {
          const newState = {...prev}
          newState.offset = offset
          newState.results.push(...response.data.results)
          newState.number = response.data.number
          return newState
        })
      } else {
        const ids = 
          recipeSearchResult.totalResults > (offset + NUMBER_ITEMS_AT_ONE_FETCH) ?
          recipeIds!.slice(offset - 1, offset + NUMBER_ITEMS_AT_ONE_FETCH) :
          recipeIds!.slice(offset - 1, recipeIds!.length)
        const allRes = await Promise.all(ids.map(async id=> {
          const res = await spoonacularApiAxios.get(`/recipes/${id}/information`, 
            {params: {
              includeNutrition: false
            }}
          )
          return res.data as RecipeInfo
        }))
        const results = allRes.map(recipe => ({id: recipe.id, title: recipe.title, image: recipe.image}))
        setStateResult(prev => {
          const newState = {...prev}
          newState.offset = offset
          newState.results.push(...results)
          newState.number = allRes.length
          return newState
        })
      }
    }

    if ((page * NUMBER_ITEMS_AT_ONE_FETCH) > stateRecipesResult.results.length) {
      fetchSearchResult((stateRecipesResult.offset + NUMBER_ITEMS_AT_ONE_FETCH))
    } else {
      console.log('api didnt call by page change')
    }
  }, [page])

  useEffect(() => {
    const fetchSearchResult = async () => {
      searchParams!.includeIngredients = mustIncludeIngredients.join()
      // const response = await spoonacularApiAxios.get('/recipes/complexSearch', {params: searchParams})
      const response = complexSearchData
      setStateResult(response.data as RecipeSearchResult)
    }
    if(searchParams === null) { return }
    if (isInitialRender){
      isInitialRender = false
    } else {
      fetchSearchResult().catch(()=> console.log('fetch recipe with fridge item failed'))
      setPage(1)
    }
  }, [mustIncludeIngredients])

  useEffect(() => {
    setMustIncludeIngredients([])
    setStateResult(recipeSearchResult)
    setPage(1)
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
        {recipeIds ? 
          <></> : 
          <h2>Found {recipeSearchResult.totalResults} Recipes by &quot;{router.query.keyword}&quot;</h2>
        }
        <DynamicRecipeSection 
          recipesSearchResult={pickDisplayItems(page, stateRecipesResult.totalResults)} 
          user={user}
          handleClickRecipe={handleClickRecipe}
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
  let params: RecipeSearchParams | null = null
  let recipeIds: number[] | null = null

  isInitialRender = true

  if(query.keyword) {
    params = {
      query: query.keyword,
      number: NUMBER_ITEMS_AT_ONE_FETCH,
      offset: 0,
      sort: 'popularity',
      includeIngredients: ''
    }

    // const response = await spoonacularApiAxios.get('/recipes/complexSearch', {params: params})
    const response = complexSearchData
    recipeSearchResult = response.data as RecipeSearchResult
  } 
  else if (query.favorite || query.history) {
    if (query.favorite) {
      recipeIds = user!.favoriterecipe.map(id => Number(id))
    } else {
      recipeIds = user!.historyrecipe.map(id => Number(id))
    }
    const ids = recipeIds.slice(0, NUMBER_ITEMS_AT_ONE_FETCH)
    const allRes = await Promise.all(ids.map(async id => {
      const response = await spoonacularApiAxios.get(`/recipes/${id}/information`, 
        {params: {
          includeNutrition: false
        }}
      )
      return response.data as RecipeInfo
    }))

    recipeSearchResult = {
      results: allRes.map(recipe => ({id: recipe.id, title: recipe.title, image: recipe.image})),
      offset: 0,
      number: NUMBER_ITEMS_AT_ONE_FETCH,
      totalResults: recipeIds.length
    }
  }
  else {
    console.error('ERROR: coming explore page without keyword nor history nor favorite')
    recipeSearchResult = {
      results: [],
      offset: 0,
      number: 0,
      totalResults: 0
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
    searchParams: params,
    recipeIds
  }
}
