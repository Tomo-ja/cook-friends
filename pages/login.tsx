import React from "react";

import Form from "../components/Form/Form";

import StyledContainer from "../styles/container.styles";

const Login = () => {
	return (
		<div>
			<StyledContainer>
				<Form btn='Login' signUp={false} />
			</StyledContainer>
		</div>
	);
};

export default Login;
