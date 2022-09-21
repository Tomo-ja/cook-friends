import Header from "../components/Header/header.styles"
import Link from "../components/CommonUse/link.styles"

export default function styledList() {
	return (
			<>
				<Header>
					<h1>hello</h1>
					<nav>
						<li><Link>Your Fridge</Link></li>
						<li><Link>Shopping List</Link></li>
					</nav>
				</Header>
			</>
	)
}