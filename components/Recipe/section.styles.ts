import styled from "styled-components";

interface ISection {
	needListNumber?: boolean
}

export const Section = styled.section<ISection>`
	margin-bottom: 44px;
	margin-top: 36px;
	color: #151413;
	
	h3 > span {
		font-size: 13px;
		color: #93918F;
	}

	p.explain{
		margin-top: 16px;
		font-size: 13px;
	}

	p.textRed{
		color: #FB2149;
	}

	ul{
		padding: 0;
		padding-left: ${props => props.needListNumber ? '1.2em' : '0px'};
	}

	li{
		font-size: 17px;
		line-height: 1.5em;
	}

	.numberingList {
		list-style: decimal;
		text-indent: 8px;
		padding-block: 8px;
		border-bottom: 1px solid #e4e2e0;

		::marker{
			font-weight: bold;
		}
	}

	.complexList {
		display: flex;
		width: 100%;
		align-items: center;
	}

	.inOneLine{
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		padding-block: 8px;
		border-bottom: 1px solid #e4e2e0;
		margin-left: 16px;
		
		p:first-child{
			margin-right: 8px;
		}
	}

  @media only screen and (max-width: 768px)  {
		h3 > span {
			font-size: 11px;
		}
		li{
			font-size: 13px
		}
		p.explain{
		font-size: 11px;
	}
  }
`
export const classNames = {
	textRed: 'textRed',
	explain: 'explain',
	inOneLine: 'inOneLine',
	numberingList: 'numberingList',
	complexList: 'complexList'
}

export default Section