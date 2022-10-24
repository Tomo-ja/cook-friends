import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { spoonacularApiAxios } from "../../constants/axiosBase";
import SearchBarSection from "./searchBarSection.styled";
import SearchBar from "./searchBar.styles";
import SuggestBox from "./suggestBox.styles"; 
interface props {
	list?:(value :any)=>void
	userid?: string | undefined;
}
const SearchSection = ({ list, userid}:props) => {

	const router = useRouter()
	const inputRef = useRef<HTMLInputElement>(null)
	const [prediction, setPrediction] = useState<{id: number, name: string}[]>([])


	const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
		spoonacularApiAxios
			.get("/food/ingredients/autocomplete", {
				params: {
					number: 10,
					query: e.currentTarget.value,
					metaInformation: true,
				},
			})
			.then((data) => {
				const words: { id: number; name: string }[] = data.data;
				setPrediction(words);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			if (prediction.length === 0) {
				alert('Sorry we can not find the word as ingredients ')
			} else {
				alert('Please choose word from prediction box by pressing')
			}
		}
	}

	const handleSubmit = (ingredient: string, id: number) => {
		setPrediction([]);
		if (userid) {
		inputRef.current!.value = ingredient;
			return list?.({
				user_id: userid,
				ingredient_api_id: id,
				name: ingredient,
			});
		}
		inputRef.current!.value = "";

		router.push({
			pathname: "/explore",
			query: { keyword: ingredient },
		});
	};

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
					onClick={() => handleSubmit(word.name, word.id)}
				>{word.name}</li>
			))}
			</SuggestBox>

		}
	</SearchBarSection>
)
}

export default SearchSection