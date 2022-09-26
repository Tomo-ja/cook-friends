import type { NextPage } from 'next'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import parseCookies, { stringToDate } from '../helpers'
import { User, Fridge } from '../helpers/typesLibrary'
import appAxios, { spoonacularApiAxios } from '../constants/axiosBase';

import SearchSection from '../components/SearchBarSection/index'

import StyledExplore from '../components/Explore/explore.styles'
import StyledMainContent from '../styles/mainContent.styles'
import StyledSubContent from '../styles/subContent.styles'



type Props = {
  user: User | null,
  fridge: Fridge
}

const DynamicFridgeSection = dynamic(() => import('../components/ItemInFridge/index'),
{ssr: false})

const Explore: NextPage<Props> = ({ user, fridge }: Props) => {
  const router = useRouter()
  console.log(router.query.keyword)
  console.log('user data', user)
	return (
		<StyledExplore>
      <Head>
        <title>Recipes | Cookit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchSection />
      <StyledMainContent>
        <h2>Result of &quot;{router.query.keyword}&quot;</h2>
        <DynamicFridgeSection fridge={fridge} useAsFilter={false}/>
      </StyledMainContent>
      <StyledSubContent>
        <h3>Use Food in Your Fridge?</h3>
        <DynamicFridgeSection fridge={fridge} useAsFilter={true}/>
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
          stored_at: stringToDate(value.stored_at).toString()
        }
      )
    })
  }

  console.log(req?.url)

  // const result = await spoonacularApiAxios.get('/recipes/complexSearch', {params: {

  // }})

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
    user,
    fridge
  } as Props
}

// for recipe page
//GET https://api.spoonacular.com/recipes/324694/analyzedInstructions

// sample response for search
/*
https://api.spoonacular.com/recipes/complexSearch?query=pizza tomato&number=2&apiKey=afdef5c81c6b457698172bdcf9f1b143&offset=0&sort=popularity&addRecipeInformation=true&instructionsRequired=false
{
    "results": [
        {
            "vegetarian": false,
            "vegan": false,
            "veryHealthy": false,
            "cheap": false,
            "veryPopular": true,
            "sustainable": false,
            "weightWatcherSmartPoints": 6,
            "gaps": "no",
            "preparationMinutes": 5,
            "cookingMinutes": 10,
            "aggregateLikes": 910,
            "healthScore": 33,
            "id": 715495,
            "title": "Turkey Tomato Cheese Pizza",
            "readyInMinutes": 15,
            "servings": 6,
            "sourceUrl": "http://www.pinkwhen.com/turkey-tomato-cheese-pizza-recipe/",
            "image": "https://spoonacular.com/recipeImages/715495-312x231.jpg",
            "imageType": "jpg",
            "summary": "You can never have too many main course recipes, so give Turkey Tomato Cheese Pizzan a try. For <b>$2.04 per serving</b>, this recipe <b>covers 22%</b> of your daily requirements of vitamins and minerals. This recipe makes 6 servings with <b>242 calories</b>, <b>19g of protein</b>, and <b>8g of fat</b> each. 910 people have made this recipe and would make it again. This recipe is typical of Mediterranean cuisine. From preparation to the plate, this recipe takes approximately <b>15 minutes</b>. A mixture of bell pepper, onion, tomato sauce, and a handful of other ingredients are all it takes to make this recipe so yummy. To use up the pepper you could follow this main course with the <a href=\"https://spoonacular.com/recipes/dr-pepper-cake-with-flour-cooked-frosting-539165\">Dr. Pepper Cake with Flour Cooked Frosting</a> as a dessert. All things considered, we decided this recipe <b>deserves a spoonacular score of 94%</b>. This score is outstanding. Try <a href=\"https://spoonacular.com/recipes/turkey-tomato-pizza-430522\">Turkey Tomato Pizza</a>, <a href=\"https://spoonacular.com/recipes/tomato-cheese-pizza-430570\">Tomato Cheese Pizza</a>, and <a href=\"https://spoonacular.com/recipes/cheese-tomato-pizza-696636\">Cheese & Tomato Pizza</a> for similar recipes.",
            "cuisines": [
                "Mediterranean",
                "Italian",
                "European"
            ],
            "dishTypes": [
                "lunch",
                "main course",
                "main dish",
                "dinner"
            ],
            "analyzedInstructions": [
                {
                    "name": "",
                    "steps": [
                        {
                            "number": 1,
                            "step": "Heat up your grill to 450 degrees.Start off with your whole wheat crust and spread the tomato sauce evenly over the top.",
                            "ingredients": [
                                {
                                    "id": 11549,
                                    "name": "tomato sauce",
                                    "localizedName": "tomato sauce",
                                    "image": "tomato-sauce-or-pasta-sauce.jpg"
                                },
                                {
                                    "id": 0,
                                    "name": "spread",
                                    "localizedName": "spread",
                                    "image": ""
                                },
                                {
                                    "id": 0,
                                    "name": "crust",
                                    "localizedName": "crust",
                                    "image": ""
                                },
                                {
                                    "id": 0,
                                    "name": "wheat",
                                    "localizedName": "wheat",
                                    "image": ""
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404706,
                                    "name": "grill",
                                    "localizedName": "grill",
                                    "image": "grill.jpg"
                                }
                            ]
                        },
                        {
                            "number": 2,
                            "step": "Add a little cheese, bell pepper, onion, turkey and create a layer.Top with another layer of cheese, turkey, tomato, bell pepper, onion.",
                            "ingredients": [
                                {
                                    "id": 10211821,
                                    "name": "bell pepper",
                                    "localizedName": "bell pepper",
                                    "image": "bell-pepper-orange.png"
                                },
                                {
                                    "id": 1041009,
                                    "name": "cheese",
                                    "localizedName": "cheese",
                                    "image": "cheddar-cheese.png"
                                },
                                {
                                    "id": 11529,
                                    "name": "tomato",
                                    "localizedName": "tomato",
                                    "image": "tomato.png"
                                },
                                {
                                    "id": 5165,
                                    "name": "whole turkey",
                                    "localizedName": "whole turkey",
                                    "image": "turkey-raw-whole.jpg"
                                },
                                {
                                    "id": 11282,
                                    "name": "onion",
                                    "localizedName": "onion",
                                    "image": "brown-onion.png"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 3,
                            "step": "Add another layer of cheese, and then sprinkle with pepper.",
                            "ingredients": [
                                {
                                    "id": 1041009,
                                    "name": "cheese",
                                    "localizedName": "cheese",
                                    "image": "cheddar-cheese.png"
                                },
                                {
                                    "id": 1002030,
                                    "name": "pepper",
                                    "localizedName": "pepper",
                                    "image": "pepper.jpg"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 4,
                            "step": "Place the pizza on a ceramic grill plate and place into the grill.Grill for 6-10 minutes, or until cooked as desired.Slice, and serve immediately.",
                            "ingredients": [],
                            "equipment": [
                                {
                                    "id": 404706,
                                    "name": "grill",
                                    "localizedName": "grill",
                                    "image": "grill.jpg"
                                }
                            ],
                            "length": {
                                "number": 10,
                                "unit": "minutes"
                            }
                        }
                    ]
                }
            ],
            "spoonacularSourceUrl": "https://spoonacular.com/turkey-tomato-cheese-pizza-715495"
        },
    ],
    "offset": 0,
    "number": 2,
    "totalResults": 11
}

*/