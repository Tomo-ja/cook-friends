import { useState, useRef, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { spoonacularApiAxios } from "../../constants/axiosBase";
import SearchBarSection from "./searchBarSection.styled";
import SearchBar from "./searchBar.styles";
import SuggestBox from "./suggestBox.styles";
import { RecipeSearchResult } from "../../helpers/typesLibrary";


const SearchSection = () => {

	const router = useRouter()
	const inputRef = useRef<HTMLInputElement>(null)
	const [prediction, setPrediction] = useState<{id: number, name: string}[]>([])


	const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
		spoonacularApiAxios.get('/food/ingredients/autocomplete', { 
			params: {
				number: 10,
				query: e.currentTarget.value,
			}
		}).then(data => {
			const words: {id: number, name: string}[] = data.data
			setPrediction(words)
		}).catch(error => {
			console.log(error)
		})
	}

	// FIXME: recreate this function to search any keyword or multiple keywords
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			if (prediction.length === 0) {
				alert('Sorry we can not find the word as ingredients ')
			} else {
				alert('Please choose word from prediction box by pressing')
			}
		}
	}

	// FIXME: if it call on explore page, need to setState result
	const handleSubmit = (ingredient: string) => {
		setPrediction([])
		inputRef.current!.value = ""
		router.push({
			pathname: '/explore',
			query: {keyword: ingredient}
		})
	}

return(
	<SearchBarSection>
		<SearchBar 
			placeholder='Search by Ingredients' 
			onChange={handleOnChange} 
			onKeyDown={handleKeyDown}
			ref={inputRef}
		/>
		{prediction.length !== 0 && 
			<SuggestBox>
			{prediction.map(word => (
				<li 
					key={word.id}
					onClick={() => handleSubmit(word.name)}
				>{word.name}</li>
			))}
			</SuggestBox>

		}
	</SearchBarSection>
)
}

export default SearchSection