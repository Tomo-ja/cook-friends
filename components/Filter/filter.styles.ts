import styled from "styled-components";
interface IIconButton {
	backgroundColor?: string;
}
const Filter = styled.button<IIconButton>`
	background-color: ${(props) =>
		props.backgroundColor};
	padding: 8px;
	font-size: 13px;
  border: none;
  height: 25px;
  align-items: center;
`;

export default Filter;
