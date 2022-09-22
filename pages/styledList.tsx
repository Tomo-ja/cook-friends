import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import Header from "../components/Header/header.styles"
import Container from "../components/CommonUse/container.styles"
import Link from "../components/CommonUse/link.styles"
import Input from "../components/CommonUse/input.styles"
import Button from "../components/CommonUse/button.styles"
import SearchBar from "../components/CommonUse/searchBar.styles"
import IconButton from '../components/CommonUse/iconButton.styles'



export default function styledList() {
	return (
			<>
				<Header>
					<h1>hello</h1>
					<nav>
						<li><Link animeBorder={true}>Your Fridge</Link></li>
						<li><Link>Shopping List</Link></li>
					</nav>
				</Header>
				<Container>
					<Input></Input>
					<Button width="300px" fontSize="14px" fontThin={true}>add</Button>
					<Button>add</Button>
					<SearchBar></SearchBar>
					<IconButton backgroundColor='gray'>
						<FontAwesomeIcon icon={faTrash} style={{color:"#000"}} />
					</IconButton>

				</Container>
			</>
	)
}