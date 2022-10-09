import styled from "styled-components";

interface IHeroSlideItem {
	backgroundImageUrl: string
}

export const HeroSlideItem = styled.div<IHeroSlideItem>`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 16px;
	aspect-ratio: 3/2;
	background-image: url(${props => props.backgroundImageUrl});
	background-position: center center;
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-size: cover;
	border-radius: 10px;

	.textOnImage{
		display: inline-block;
		width: fit-content;
		color: #151413;
		text-decoration: none;
		background-color: rgba(255, 255, 255, 0.3);
	}

	button{
		align-self: flex-end;

		:active{
		transform: translateY(5px)
		}
	}

	@media screen and (max-width: 768px) {
		button{
			font-size: 13px;
		}
	}
`

export const classNames = {
	textOnImage: 'textOnImage'
}

export default HeroSlideItem