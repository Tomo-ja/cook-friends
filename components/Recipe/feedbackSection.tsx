import { useRouter } from "next/router";

import StyledFeedbackSection from "./feedbackSection.styles";
import StyledButton from "../Button/button.styles";
import { AlertInfo, User } from "../../helpers/typesLibrary";
import appAxios from "../../constants/axiosBase";
import { useCookies } from "react-cookie";
import { Dispatch, SetStateAction, useEffect, useState } from "react";


type Props = {
	handleReduceModalOpen: () => void,
	user: User | null
	recipeId: number,
	setAlert?: Dispatch<SetStateAction<AlertInfo | null>>,

}

const FeedbackSection = ({ handleReduceModalOpen, user, recipeId, setAlert }: Props) => {


	const router = useRouter()
	const [cookie, setCookie] = useCookies(['user'])
	const [isFav, setIsFav] = useState<boolean>(false)

	const handleFavorite = async () => {
		if (!user) return
		let url: string = isFav ? 'removeFav' : 'addFav'
		setIsFav(prev => !prev)
		try{
			const response = await appAxios.post(`api/recipe/${url}`, {
				user_id: user.id,
				recipe_id: recipeId.toString()
			})
			const updatedUser = await response.data
			console.log(updatedUser)
			setCookie('user', JSON.stringify(updatedUser), {
				path: '/',
				maxAge: 3600, 
				sameSite: true 
			})
			setAlert!({isError: false, message: `Successfully ${isFav ? 'UnFavorite' : 'Favorite'}`})
		} catch(error) {
			setAlert!({isError: true, message: `Failed ${isFav ? 'UnFavorite' : 'Favorite'}`})
		}
	}

	const handleClickBackToHome = () => {
		router.push('/')
	}

	useEffect(() => {
		if(user){
		const find = user.favoriterecipe.find(id => id === recipeId.toString())
		setIsFav(find ? true : false)
		}
	}, [])

	return (
		<StyledFeedbackSection>
			<h3>Did you cook this today?</h3>
			<div>
				{user && 
					<StyledButton onClick={() => handleFavorite()}>{isFav ? 'Remove from' : 'Add to'} Favorite recipe</StyledButton>
				}
				{user && 
					<StyledButton onClick={() => handleReduceModalOpen()}>Reduce Ingredients from Your Fridge</StyledButton>

				}
				<StyledButton backgroundColor="black" onClick={() => handleClickBackToHome()}>Back to Home</StyledButton>
			</div>
		</StyledFeedbackSection>
	)
}

export default FeedbackSection