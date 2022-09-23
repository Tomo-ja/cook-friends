import styled from 'styled-components'

interface IButton {
	width?: string,
	fontSize?: string,
	fontThin?: boolean
}

const Button = styled.button<IButton>`
	all: unset;
	display: block;
	width: ${props => props.width ? props.width : '100%'};
	padding-block: 1em;
	background-color: #FFAA4E;
	border-radius: 999px;
	color: #fff;
	font-size: ${props => props.fontSize ? props.fontSize : '17px'};
	font-weight: ${props => props.fontThin ? 'normal' : 'bold'};
  text-align: center;
	transition: all 0.25s ease;

	&:hover{
		opacity: 0.6;
	}
`


export default Button