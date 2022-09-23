import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Header from "../components/Header/header.styles";
import Container from "../components/CommonUse/container.styles";
import Link from "../components/CommonUse/link.styles";
import Input from "../components/CommonUse/input.styles";
import Button from "../components/CommonUse/button.styles";
import SearchBar from "../components/CommonUse/searchBar.styles";
import IconButton from "../components/CommonUse/iconButton.styles";
import MainContent from "../components/CommonUse/mainContent.styles";
import SubContent from "../components/CommonUse/subContent.styles";
import Filter from "../components/Filter/filter.styles";
import { useState } from "react";
import Form from "../components/Form/form.styles";
import ItemFridge from "../components/ItemInFridge/itemInFridge.styles";
import ItemToBuy from "../components/ItemToBuy/itemToBuy.styles";
import Recipe from "../components/Recipe/recipe.styles";

export default function StyledList() {
	const [filter, setFilter] = useState<boolean>(false);
	return (
		<>
			<Header>
				<h1>hello</h1>
				<nav>
					<li>
						<Link animeBorder={true}>Your Fridge</Link>
					</li>
					<li>
						<Link>Shopping List</Link>
					</li>
				</nav>
			</Header>
			<Container>
				<Filter
					backgroundColor={filter ? "#FFAA4E" : "#D9D9D9"}
					onClick={() => setFilter(!filter)}
				>
					food{" "}
				</Filter>
				<Button width='300px' fontSize='14px' fontThin={true}>
					add
				</Button>
				<Button>add</Button>
				<SearchBar placeholder='Search by Keyword'></SearchBar>

				<MainContent>
					<h2>favo</h2>
					<ItemFridge>
						<div className='ItemFridgeLeft'>
							<p className='FoodName'>Name of food</p>
							<p className='ExpireDate'>Expire date in 3days</p>
						</div>
						<div className='ItemFridgeRight'>
							<div className='Arrow-Top'></div>
							<p className='Amount'>amount : 400g</p>
							<div className='Arrow-Bottom'></div>
							<IconButton backgroundColor='gray'>
								<FontAwesomeIcon icon={faTrash} style={{ color: "#000" }} />
							</IconButton>
						</div>
					</ItemFridge>
					<ItemToBuy>
						<div className='NameAmount'>
							<p className='FoodName'>Name of Food</p>
							<p className='Amount'>Amount 500g</p>
						</div>
						<p className='txt'>
							Memo area. if food comes from resipe, show the name of dish for.
							if it’s added from manually show whatever memo has. over size will
							be scroll
						</p>
						<div className='btnContainer'>
							<IconButton backgroundColor='gray'>
								<FontAwesomeIcon icon={faTrash} style={{ color: "#000" }} />
							</IconButton>
							<IconButton backgroundColor='gray'>
								<FontAwesomeIcon icon={faTrash} style={{ color: "#000" }} />
							</IconButton>
						</div>
					</ItemToBuy>
					<Recipe>
						<p className='DishName'>Name of Dish</p>
						<img src='' alt='' className='Img' />
						<div className='IngredientConatiner'>
							<p className='Ingredients'>Ingredients</p>
							<p className='People'>serving for 2 people</p>
							<div className='EachIngredients'>
								<div className='EachIngredientsRight'>
									<input type='checkbox' />
									<label className='FoodName'>food</label>
								</div>
								<p className='Amount'>Amount 400g</p>
							</div>
						</div>
						<div className='InstructionContainer'>
							<p className='Instruction'>Instruction</p>
							<ul>
								<li>how to desc</li>
							</ul>
						</div>
					</Recipe>
				</MainContent>
				<SubContent>
					<Form>
						<Input></Input>
						<Input></Input>
						<Button width='300px' fontSize='14px' fontThin={true}>
							add
						</Button>
					</Form>
				</SubContent>
			</Container>
		</>
	);
}
