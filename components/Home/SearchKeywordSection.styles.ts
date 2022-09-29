import styled from "styled-components";

interface IFilterSection {
	backgroundColor?: string;
}

const FilterSection = styled.div<IFilterSection>`

	display: flex;
	flex-wrap: wrap;
	margin-bottom: 16px;

	button {
		display: block;
		background-color: ${(props) => props.backgroundColor};
		padding: 8px;
		font-size: 13px;
		border: none;
		border-radius: 5px;
		margin-right: 10px;
		margin-bottom: 10px;
		transition: all 0.25s;
		cursor: pointer;

		:hover{
			background-color: #ffaa4e;
			color: white;
		}
	}


`;

export default FilterSection;
