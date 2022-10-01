import styled from "styled-components";

export const Modal = styled.div`
	width: 100vw;
	height: 100%;
	position: absolute;
	background-color: #ffffffaa;
	top: 0;
	right: 0;
	z-index: 50;

	> div{
		width: max(35%, 375px);
		max-width: 550px;
		padding: 36px 16px;
		margin-inline: auto;
		background-color: white;
		border: 3px solid #151413;
		border-radius: 10px;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	h3{
		text-align: center;
	}

	span{
		display: inline-block;
		width: 100%;
		font-size: 11px;
		line-height: 1.5em;
		text-align: center;
	}

	form {

		margin-block: 36px;

		> div{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 8px
		}
	}

	.buttonGroup{
		display: flex;
		width: 100%;
		justify-content: space-around;

	}

`
export const classNames = {
	buttonGroup: 'buttonGroup'
}

export default Modal