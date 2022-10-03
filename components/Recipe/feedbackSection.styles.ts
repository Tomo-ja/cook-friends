import styled from "styled-components";


const FeedbackSection = styled.div`

	h3{
		text-align: center;
	}
	div{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-block: 36px;

		button{
			width: 40%;
			margin-inline: 16px;
			margin-bottom: 24px;

			:active{
					transform: translateY(5px)
			}
		}

		@media screen and (max-width: 768px) {
			flex-direction: column;
			align-items: center;

			button{
				width: 60%;
				font-size: 13px;
				margin-bottom: 16px;
			}
		}


	}
`

export default FeedbackSection