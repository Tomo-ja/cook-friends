import styled from 'styled-components'


const MainContent = styled.main`

	color: #151413;

	h2{
		margin: 0;

		width: 100%;
		margin-bottom: 36px;
		font-size: 28px;
		font-weight: bold;
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 5px;
	}

	h3{
		margin: 0;
		margin-bottom: 0.25em;
		font-size: 20px;
		font-weight: bold;

	}
	 & > div{
		width: 100%;
	 }

  @media only screen and (max-width: 768px)  {
      h2{
				font-size: 20px;
				margin-bottom: 24px;
				text-underline-offset: 3px;
			}

			h3{
				font-size: 17px;
			}
  }

`

export default MainContent