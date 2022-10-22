import { useRouter } from "next/router"
import StyledFilterSection from "./SearchKeywordSection.styles"

type Props = {
	keywords: string[]
}

const SearchKeywordSection = ({keywords}: Props) => {

	const router = useRouter()

	const handleClickKeyword = (keyword: string) => {
		router.push({
			pathname: '/explore',
			query: {keyword: keyword}
		})
	}

	return (
		<StyledFilterSection>
			{keywords.map(key => (
				<button key={key} onClick={()=> handleClickKeyword(key)}>{key}</button>
			))}
		</StyledFilterSection>
	)
}

export default SearchKeywordSection