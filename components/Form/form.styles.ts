import styled from "styled-components";

const FormStyled = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 300px;
	margin: 0 auto;
	.ErrMesg {
		margin-bottom: 8px;
		color: #E01111;
		text-align: center;
	}
	label {
		text-align: left;
		padding-bottom: 8px;
	}
	div {
		width: 100%;
	}
	button{
		margin-top: 10px;
	}
`;

export default FormStyled;