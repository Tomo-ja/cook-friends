import StyledFilterSection from "./SearchKeywordSection.styles"

type Props = {
	keywords: string[]
}

const SearchKeywordSection = ({keywords}: Props) => {
	return (
		<StyledFilterSection>
			{keywords.map(key => (
				<button key={key}>{key}</button>
			))}
		</StyledFilterSection>
	)
}

export default SearchKeywordSection