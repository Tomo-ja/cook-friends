import styled from "styled-components";

const StyledSwitch = styled.div`
display: none;
	width: 100%;
	margin: 20px 0;
	font-size: 30px;
	text-align: end;

	@media only screen and (max-width: 768px) {
    display: block;
	}
`;
export default StyledSwitch;
