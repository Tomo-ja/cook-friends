import { NextPage } from 'next'
import Image from 'next/image'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassHalf, faStar } from "@fortawesome/free-solid-svg-icons";

import IngredientSection from '../../components/Recipe/ingredientSection';
import HowToSection from '../../components/Recipe/howtoSection';

import StyledRecipe, {RecipeContainer} from '../../components/Recipe/recipe.styles'
import StyledImage from '../../styles/image.styles'
import StyledIconButton from '../../components/IconButton/iconButton.styles';
import StyledTagSection from '../../components/Recipe/tagSection.styles';

import parseCookies, { stringToDate } from '../../helpers/index'
import { User, RecipeInfo, Fridge } from '../../helpers/typesLibrary'
import appAxios, { spoonacularApiAxios } from '../../constants/axiosBase'




type Props = {
	user: User | null,
	fridge: Fridge | null,
	recipeInfo: RecipeInfo | null
}

const Recipe: NextPage<Props> = ({user, fridge, recipeInfo}: Props) => {
	if(recipeInfo === null) { return <></>}


	return (
		<RecipeContainer>
			<StyledRecipe>
				<h2>{recipeInfo.title}</h2>
				<StyledTagSection>
					{user && 
						//TODO: need to change the color depends on user favorite data
						<StyledIconButton backgroundColor='#ffaa4e'>
							<FontAwesomeIcon icon={faStar} color='white' style={{width: '16px', height: '16px'}}/>
						</StyledIconButton>
					}
					<FontAwesomeIcon icon={faHourglassHalf} size='sm' style={{display: 'block', marginRight: '8px'}}/>
					<p>{recipeInfo.readyInMinutes} min</p>
				</StyledTagSection>
				<StyledImage width='100%' ratio={2} radius='10px'>
					<Image 
						src={recipeInfo.image}
						alt={recipeInfo.title}
						layout='fill'
						objectFit='cover'
					/>
				</StyledImage>
				<IngredientSection ingredients={recipeInfo.extendedIngredients} fridge={fridge}/>
				<HowToSection instruction={recipeInfo.analyzedInstructions[0].steps} />
			</StyledRecipe>
		</RecipeContainer>
	)
}

export default Recipe

Recipe.getInitialProps = async ({ req, res, query}): Promise<Props> => {
	const cookieData = parseCookies(req)
	const user: User | null = cookieData.user ? JSON.parse(cookieData.user) : null
	const fridge: Fridge = []
	let recipeInfo: RecipeInfo | null = null

	if(req?.url) {
		const recipeId: number = Number(req.url.split('/')[2])
		try{
			const response = await spoonacularApiAxios.get(`/recipes/${recipeId}/information`, 
			{params: {
				includeNutrition: false
			}}
		)
		recipeInfo = response.data as RecipeInfo
		}catch{
			if(res){
				res.statusCode = 404
				res.end('not found')
			}
		}
	} else {
		console.log('coming recipe page without id')
		// FIXME: later handle another api call without id like data itself
		if(res){
			res.statusCode = 404
			res.end('not found')
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
		recipeInfo
	}
}