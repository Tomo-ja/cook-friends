import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import Header from "../components/Header/header.styles"
import Container from "../styles/container.styles"
import IconButton from '../components/IconButton/iconButton.styles'
import MainContent from '../styles/mainContent.styles'
import SubContent from '../styles/subContent.styles'
import RecipeItem from '../components/Recipe/recipeItem.styles'



export default function styledList() {
	return (
			<Container>
					<MainContent >
						<h2>favo</h2>
					<IconButton backgroundColor='gray'>
						<FontAwesomeIcon icon={faTrash} style={{color:"#000"}} />
					</IconButton>
					<RecipeItem>
						
					</RecipeItem>
					</MainContent>
					<SubContent>
						<h3>expire food</h3>
					</SubContent>
			</Container>
	)
}