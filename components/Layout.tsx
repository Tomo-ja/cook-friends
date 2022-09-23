import { Component, ReactNode } from "react";
import Header from "./Header/index";

class Layout extends Component {
	render(): ReactNode {
			const { children } = this.props as any
			return (
				<>
					<Header />
					{children}
				</>
			)
	}
}

export default Layout