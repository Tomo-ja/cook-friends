import styled from 'styled-components'

interface IIconButton {
	width?: string,
	backgroundColor?: string
}

const IconButton = styled.button<IIconButton>`
	all: unset;
  width: ${props => props.width ? props.width : '30px'};
	aspect-ratio: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	background-color: ${props => props.backgroundColor ? props.backgroundColor : 'transparent'};
	transition: all 0.25s ease;

	:hover {
		opacity: 0.6;
	}
`

export default IconButton