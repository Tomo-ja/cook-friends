import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie, deleteCookie } from 'cookies-next'
import Link from 'next/link';
import Image from 'next/image';

import StyledLink from '../../styles/link.styles';
import StyledHeader from "./header.styles";
import StyledImage from '../../styles/image.styles';

import logo from "../../public/logo.png"
import { User } from '../../helpers/typesLibrary';

const getPageName = (url: string): string => {
	const urlX = url.slice(1, url.length)
	if (urlX.length === 0 ){
		return "Home"
	}
	let title: string = urlX.split('?')[0]
	title = title.split('/')[0]
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
			setUser(JSON.parse(cookie as string))
		}
	}, [router.asPath])

	return (
		<StyledHeader>
			<div>
				<Link href="/">
					<StyledImage width='132px' ratio={2.64} scale={0.7}>
						<Image
							src={ logo }
							alt='application logo'
							layout='fill'
							objectFit='contain'
						/>
					</StyledImage>
				</Link>
				<h1>{getPageName(router.asPath)}</h1>
			</div>
			<ul>
				{ (user && router.asPath !== "/login") && 
				<>
					<li>
						<Link href="/fridge" passHref>
							<StyledLink animeBorder={true}>Your Fridge</StyledLink>
						</Link>
					</li>
					<li>
						<Link href="/shoppingList" passHref>
							<StyledLink animeBorder={true}>Shopping List</StyledLink>
						</Link>
					</li>
				</>
				}
				<li>
						<Link href="/login" passHref >
							<StyledLink onClick={logout} animeBorder={true}>{user ? "Log out" : "Log in"}</StyledLink>
						</Link>
				</li>
			</ul>
		</StyledHeader>
	)
}

export default Header