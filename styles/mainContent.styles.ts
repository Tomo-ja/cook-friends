import styled from 'styled-components'


const MainContent = styled.main`

	color: #151413;

	h2{
		margin: 0;

		margin-bottom: 36px;
		font-size: 28px;
		font-weight: bold;
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 5px;
	}

	h3{
		margin: 0;

		margin-bottom: 36px;
		font-size: 20px;
		font-weight: bold;
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 5px;
	}

  @media only screen and (max-width: 768px)  {
      h2{
				font-size: 20px;
				margin-bottom: 16px;
				text-underline-offset: 3px;
			}

			h3{
				font-size: 17px;
				margin-bottom: 16px;
				text-underline-offset: 3px;

			}
  }

`

export default MainContent