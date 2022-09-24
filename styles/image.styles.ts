import styled from "styled-components";
import Image from "next/image";

interface IImage {
	width?: string,
	height?: string,
	ratio?: number,
	radius?: boolean
}

const StyledImage = styled(Image)<IImage>`
	display: block;
	object-fit: cover;
	width: ${props => props.width ? props.width : 'auto'};
	height: ${props => props.height ? props.height : 'auto'};
	aspect-ratio: ${props => props.ratio ? props.ratio : 'auto'};
	border-radius: ${props => props.radius ? '5px' : '0px'}

`

export default StyledImage