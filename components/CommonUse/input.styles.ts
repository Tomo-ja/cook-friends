import styled from 'styled-components'

const Input = styled.input`
	all: unset;
	width: 100%;
  height: 46px;
  padding-inline: 16px;
	margin-bottom: 16px;
  border: 1px solid #1E1C1A;
	
  border-radius: 5px;
  color: #151413;
  font-size: 17px;
	box-sizing: border-box;

	&:focus {
		border: 2px solid #ffaa4e;
		caret-color: #ffaa4e;
	}

`

export default Input