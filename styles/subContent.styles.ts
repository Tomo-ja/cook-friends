import styled from 'styled-components'


const SubContent = styled.aside`

	color: #151413;

	h3{
		margin: 0;

		margin-bottom: 1.25em;
		font-size: 17px;
		font-weight: bold;
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 5px;
		text-decoration-color: #ffaa4e;

	}

	@media only screen and (max-width: 768px)  {

			h3{
				font-size: 17px;
				text-underline-offset: 3px;

			}
  }
`

export default SubContent