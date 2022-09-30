import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie'
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassHalf, faStar } from "@fortawesome/free-solid-svg-icons";
import StyledRecipesSection from "./recipesSection.styles";
import StyledRecipeItem from "./item.styles";
import StyledImage from "../../styles/image.styles";
import { RecipeSearchResult, User } from "../../helpers/typesLibrary";
import IconButton from "../IconButton/iconButton.styles";
import appAxios from "../../constants/axiosBase";

type Props = {
	recipesSearchResult: RecipeSearchResult,
	user: User | null,
	handleClickRecipe: (id: number) => void
}

const RecipeSection = ({ recipesSearchResult, user, handleClickRecipe }: Props) => {

	const [cookie, setCookie] = useCookies(['user'])

	const [isFavRecipe, setIsFavRecipe] = useState<boolean[]>([])

	const initFavRecipeState = (): boolean[] => {
		const state: boolean[] = []
		if(user){
			recipesSearchResult.results.forEach((recipe, idx) => {
				user.favoriterecipe.forEach(fav => {
					if (Number(fav) === recipe.id) {
						state[idx] = true
					}
				})
			})
		}
		return state
	}

	useEffect(() => {
		setIsFavRecipe(initFavRecipeState())
	}, [recipesSearchResult])

	const updateDatabase = async (recipeId: number, url: string) => {
		try {
			const response = await appAxios.post(`api/recipe/${url}`, {
				user_id: user!.id,
				recipe_id: recipeId.toString()
			})
			const updatedUser = await response.data
			setCookie('user', JSON.stringify(updatedUser.user), {
				path: '/',
				maxAge: 3600, // expires 1hr
				sameSite: true 
			})
		}catch(err){
			console.error(err)
		}
	}

	const handleFavButton = async (recipeId: number, idx: number) => {

		let url: string
		if (isFavRecipe[idx]){
			url = 'removeFav'
		} else {
			url = 'addFav'
		}

		await updateDatabase(recipeId, url)

		setIsFavRecipe(prev => {
			const newState = [...prev]
			newState[idx] = !prev[idx]
			return newState
		})
	}


	return (
		<StyledRecipesSection lessThan3={recipesSearchResult.results.length < 3}>
			{recipesSearchResult.results.map((recipe, idx) => (
				<StyledRecipeItem key={recipe.id}>
					{user && 
						<IconButton backgroundColor={isFavRecipe[idx] ? 'white': '#c4c4c4'} onClick={() => handleFavButton(recipe.id, idx)}>
							<FontAwesomeIcon icon={faStar} color={isFavRecipe[idx] ? '#ffaa4e': 'white'} style={{width: '16px', height: '16px'}}/>
						</IconButton>
					}
					<StyledImage width="100%" ratio={1} radius={"5px"} shadow={true}>
						<Image 
							onClick={()=> handleClickRecipe(recipe.id)}
							src={recipe.image}
							alt={'picture of dish'}
							layout='fill'
							objectFit="cover"
						/>
					</StyledImage>
					<h3 onClick={()=> handleClickRecipe(recipe.id)}>{recipe.title}</h3>
				</StyledRecipeItem>
			))}
		</StyledRecipesSection>
	)
}

export default RecipeSection