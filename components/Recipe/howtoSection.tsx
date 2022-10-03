import { RecipeInstruction } from "../../helpers/typesLibrary"

import StyledSection, {classNames} from "./section.styles"

type Props = {
	instruction: RecipeInstruction[]
}
const HowToSection = ({ instruction }: Props) => {
	return(
		<StyledSection  needListNumber={true}>
			<h3>How to Cook</h3>
			<ul>
				{instruction.map(step => (
					<li 
						key={step.number}
						className={classNames.numberingList}
					>
						{step.step.replaceAll('&amp;', '&')}
					</li>
				))}
			</ul>
		</StyledSection>
	)
}

export default HowToSection
