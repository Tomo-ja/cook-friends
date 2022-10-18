import StyledIconButton from "./iconButton.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSquareXmark, faCartPlus, faShoppingCart, faStar, faPlus, faHourglassHalf, IconDefinition, } from "@fortawesome/free-solid-svg-icons";

export enum IconKind {
	Trash,
	XMark, 
	CartPlus,
	Cart,
	Star,
	Plus,
	TimeGlass
} 

const pickIcon = (kind: IconKind): IconDefinition => {
	switch (kind) {
		case IconKind.Trash: return faTrash
		case IconKind.XMark: return faSquareXmark
		case IconKind.CartPlus: return faCartPlus
		case IconKind.Cart: return faShoppingCart
		case IconKind.Star: return faStar
		case IconKind.Plus: return faPlus
		case IconKind.TimeGlass: return faHourglassHalf
	}
}

type Props = {
	handleClick: (target: any, target2?: any) => void,
	target: any,
	target2?: any
	iconKind: IconKind,
	iconColor?: string,
	isButtonSquare?: boolean,
	bcColor?: string,
	width?: string,
	displayOnlyMobile?: boolean

}



const FontAwesomeButton = ({ handleClick, target, target2, iconKind, isButtonSquare,iconColor, bcColor, width, displayOnlyMobile }: Props) => {
	
	const icon = pickIcon(iconKind)

	return (
		<StyledIconButton
			width={width && width}
			backgroundColor={bcColor ? bcColor : '#000'}
			square={isButtonSquare}
			displayOnlyMobile={displayOnlyMobile}
			onClick={()=> handleClick(target, target2)}
		>
			<FontAwesomeIcon
				icon={icon}
				color={iconColor ? iconColor : 'white'}
				style={{display: 'block', width: '16px', height: '16px'}}
			/>
		</StyledIconButton>
	)
}
export default FontAwesomeButton