import styled from "styled-components";
import Image from 'next/future/image';

interface IImage {
	width: string,
	height?: string,
	radius?: string
	ratio?: number,
	scale?: number,
	shadow? : boolean
}

const StyledImage = styled.div<IImage>`
	display: block;
	position: relative;
	width: ${props => props.width};
	height: ${props => props.height ? props.height : 'auto'};
	border-radius: ${props => props.radius ? props.radius : '0px'};
	aspect-ratio: ${props => props.ratio ? props.ratio : 'auto'};
	transition: all 0.25s;
	overflow: hidden;
	box-shadow: ${props => props.shadow ? "5px 5px 12px #b5b5b5, -5px -5px 12px #ffffff" : 'none'};

	@media only screen and (max-width: 768px)  {
    transform: scale(${props => props.scale ? props.scale : 1});
  }
`

export default StyledImage