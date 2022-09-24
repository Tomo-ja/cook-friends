import styled from 'styled-components'

interface ILink {
	animeBorder?: boolean
}

const CustomLink = styled.a<ILink>`
	padding-block: 5px;
	color: inherit;
  cursor: pointer;
  border-bottom: 1px solid transparent;
	transition: all 0.25s ease;

	:hover{
		opacity: 0.6;
		border-bottom-color: ${props => props.animeBorder ? 'black' : 'transparent'};
	}
`

export default CustomLink

