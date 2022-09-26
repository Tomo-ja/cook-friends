import styled from "styled-components";
import Image from 'next/future/image';

interface IImage {
	width: string,
	height?: string,
	radius?: boolean
	ratio?: number,
	scale?: number
}

const StyledImage = styled.div<IImage>`
	display: block;
	position: relative;
	width: ${props => props.width};
	height: ${props => props.height ? props.height : 'auto'};
	border-radius: ${props => props.radius ? '5px' : '0px'};
	aspect-ratio: ${props => props.ratio ? props.ratio : 'auto'};
	transition: all 0.25s;

	@media only screen and (max-width: 768px)  {
    transform: scale(${props => props.scale ? props.scale : 1});
  }
`

export default StyledImage