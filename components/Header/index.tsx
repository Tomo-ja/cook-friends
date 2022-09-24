import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie, deleteCookie } from 'cookies-next'
import Link from 'next/link';
import CustomLink from '../../styles/link.styles';
import StyledHeader from "./header.styles";
import StyledImage from '../../styles/image.styles';
import logo from "../../public/logoSample.png"
import { User } from '../../helpers/typesLibrary';

const getPageName = (url: string): string => {
	const title = url.slice(1, url.length)
	if (title.length === 0 ){
		return "Home"
	}
	return title.charAt(0).toUpperCase() + title.slice(1)
}

const Header = () => {
	const router = useRouter()
	const [user, setUser] = useState<User | null>(null)

	const logout = () => {
		setUser(null)
		deleteCookie('user', {path: '/', domain: 'localhost'})
	}

	useEffect (() => {
		const cookie = getCookie('user')
		if (cookie) {
			setUser(JSON.parse(cookie as string).user)
		}
	}, [router.asPath])

	return (
		<StyledHeader>
			<div>
				<Link href="/">
					<StyledImage
						src={ logo }
						alt='application logo'
						width='150px'
						height='32px'
					>
					</StyledImage>
				</Link>
				<h1>{getPageName(router.asPath)}</h1>
			</div>
			<ul>
				{ (user && router.asPath !== "/login") && 
				<>
					<li>
						<Link href="/fridge" passHref>
							<CustomLink animeBorder={true}>Your Fridge</CustomLink>
						</Link>
					</li>
					<li>
						<Link href="/shoppingList" passHref>
							<CustomLink animeBorder={true}>Shopping List</CustomLink>
						</Link>
					</li>
				</>
				}
				<li>
						<Link href="/login" passHref >
							<CustomLink onClick={logout} animeBorder={true}>{user ? "Log out" : "Log in"}</CustomLink>
						</Link>
				</li>
			</ul>
		</StyledHeader>
	)
}

export default Header