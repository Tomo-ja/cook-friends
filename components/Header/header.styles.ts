import styled from 'styled-components'

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  padding-inline: 44px;
	padding-block: 8px;
	background-color: white;
	box-shadow: 0px 2.5px 10px 3px rgba(0,0,0,0.5);
	position: fixed;
  top: 0;

	img{
		margin-right: 16px;
		cursor: pointer;
	}
	
	div{
		display: flex;
		align-items: center
	}

	h1{
		margin: 0;
		margin-inline: 16px;
		font-size: 17px;
		font-weight: bold;
		color: #151413;
	}

	ul{
		display: flex;
	}

	li{
		margin-left: 32px;
		color: #151413;
		font-size: 17px;
		font-weight: bold;
		list-style: none;
	}

	@media only screen and (max-width: 768px)  {
      padding-inline: min(44px, 5%);
			
			li{
				margin-left: 16px;
				font-size: 11px;
			}
  }

	@media only screen and (max-width: 375px) {
		li{
			font-size: 8px;
		}
}
`

export default Header