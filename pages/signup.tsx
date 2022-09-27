import { useEffect, useState } from "react";
import Index from "../components/Example"
import { Form } from "../components/Form/Form"
import Container from "../styles/container.styles"

export default function SignIn() {

		return (
			<Container>
				<Form btn='Sign up' signUp={true} />
			</Container>
		);
}
