import { Dispatch, SetStateAction } from "react";
import { AlertInfo } from "../../helpers/typesLibrary";
import StyledAlert from "./alert.styles";


type Props = {
	message: string,
	isError: boolean,
	setAlert: Dispatch<SetStateAction<AlertInfo | null>>
}

const Alert = ({ message, isError, setAlert }: Props) => {

	return (
		<StyledAlert isError={isError} onAnimationEnd={() => setAlert(null)}>
			{message}
		</StyledAlert>
	)
}

export default Alert