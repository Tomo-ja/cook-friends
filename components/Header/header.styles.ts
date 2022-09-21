import styled from 'styled-components'

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  padding-inline: 36px;
	padding-block: 8px;
	box-shadow: 0px 2.5px 10px 3px rgba(0,0,0,0.5);
	position: fixed;
  top: 0;

	img{
		display: block;
		margin-right: 16px;
		height: 32px;
		object-fit: cover;

	}

	h1{
		margin: 0;
		margin-right: 32px;
		font-size: 17px;
		font-weight: bold;
		color: #151413;
	}

	nav{
		display: flex;
	}

	li{
		margin-left: 32px;
		color: #151413;
		font-size: 17px;
		font-weight: bold;
		list-style: none;
	}
`

export default Header