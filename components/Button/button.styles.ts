import styled from 'styled-components'

interface IButton {
	width?: string,
	fontSize?: string,
	fontThin?: boolean,
	backgroundColor?: string
}

const Button = styled.button<IButton>`
	all: unset;
	display: block;
	width: ${props => props.width ? props.width : '100%'};
	padding-block: 1em;
	background-color: ${props => props.backgroundColor ? props.backgroundColor : '#FFAA4E'};
	border-radius: 999px;
	color: #fff;
	font-size: ${props => props.fontSize ? props.fontSize : '17px'};
	font-weight: ${props => props.fontThin ? 'normal' : 'bold'};
  text-align: center;
	transition: all 0.25s ease;
	position: relative;

	&:hover{
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
		box-shadow: 0 0 10px 10px ${props => props.backgroundColor ? props.backgroundColor : "#FFAA4E"};
	}

	:active::after{
		box-shadow: 0 0 0 0 ${props => props.backgroundColor ? props.backgroundColor : '#FFAA4E'};
		opacity: 1;
		transition: 0s;
	}
`


export default Button