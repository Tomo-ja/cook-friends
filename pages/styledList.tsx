import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import Header from "../components/Header/header.styles"
import Container from "../styles/container.styles"
import CustomLink from "../components/CommonUse/link.styles"
import Input from "../components/Input/input.styles"
import Button from "../components/Button/button.styles"
import SearchBar from "../components/SearchBar/searchBar.styles"
import IconButton from '../components/IconButton/iconButton.styles'
import MainContent from '../components/CommonUse/mainContent.styles'
import SubContent from '../components/CommonUse/subContent.styles'



export default function styledList() {
	return (
			<>
				<Header>
					<h1>hello</h1>
					<nav>
						<li><CustomLink animeBorder={true}>Your Fridge</CustomLink></li>
						<li><CustomLink>Shopping List</CustomLink></li>
					</nav>
				</Header>
				<Container>
					<Input></Input>
					<Button width="300px" fontSize="14px" fontThin={true}>add</Button>
					<Button>add</Button>
					<SearchBar placeholder='Search by Keyword'></SearchBar>

					<MainContent >
						<h2>favo</h2>
					<IconButton backgroundColor='gray'>
						<FontAwesomeIcon icon={faTrash} style={{color:"#000"}} />
					</IconButton>
					</MainContent>
					<SubContent>
						<h3>expire food</h3>
					</SubContent>
				</Container>
			</>
	)
}