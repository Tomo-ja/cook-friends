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
	handleClick: (target: any) => void,
	target: any,
	iconKind: IconKind,
	isButtonSquare?: boolean,
	bcColor?: string,
	width?: string
}



const FontAwesomeButton = ({ handleClick, target, iconKind, isButtonSquare, bcColor, width }: Props) => {
	
	const icon = pickIcon(iconKind)

	return (
		<StyledIconButton
			width={width && width}
			backgroundColor={bcColor ? bcColor : '#000'}
			square={isButtonSquare}
			onClick={()=> handleClick(target)}
		>
			<FontAwesomeIcon
				icon={icon}
				color='white'
				style={{display: 'block', width: '16px', height: '16px'}}
			/>
		</StyledIconButton>
	)
}
export default FontAwesomeButton