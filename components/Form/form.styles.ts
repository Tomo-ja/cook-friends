import styled from "styled-components";
interface formSize{
	witdh: string;
}
const FormStyled =
	styled.form `
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 100px auto;
	.ErrMesg {
		margin-bottom: 8px;
		color: #e01111;
		text-align: center;
		p {
			margin: 8px 0;
		}
	}
	label {
		text-align: left;
		padding-bottom: 8px;
	}
	div {
		width: 100%;
	}
	button {
		margin-top: 10px;
	}
	a {
		padding-top: 8px;
		color: #ffaa4e;
	}
	@media only screen and (max-width: 375px) {
		
	}

`;

export default FormStyled;
