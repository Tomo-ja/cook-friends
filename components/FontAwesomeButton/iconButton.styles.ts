import styled from 'styled-components'

interface IIconButton {
	backgroundColor: string,
	width?: string,
	square?: boolean
}

const IconButton = styled.button<IIconButton>`
	all: unset;
  width: ${props => props.width ? props.width : '30px'};
	aspect-ratio: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: ${props => props.square ? '0' : '50%'};
	background-color: ${props => props.backgroundColor };
	transition: all 0.25s ease;
	position: relative;

	:hover {
		opacity: 0.6;
	}

	:active{
		top: 1px;
	}

	::after {
		content: "";
		display: block;
		position: absolute;
		border-radius: 50%;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: all 0.5s;
		box-shadow: 0 0 10px 10px ${props => props.backgroundColor};
	}

	:active::after{
		box-shadow: 0 0 0 0 ${props => props.backgroundColor};
		opacity: 1;
		transition: 0s;
	}
`

export default IconButton