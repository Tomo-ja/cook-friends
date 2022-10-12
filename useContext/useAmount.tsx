import React, {
	Children,
	createContext,
	ReactNode,
	useContext,
	useState,
} from "react";
import { CurrentFridge } from "../helpers/typesLibrary";
interface children {
	children: ReactNode;
}
interface userDataInterface {
	changedAmountList: CurrentFridge[];
	updateList: (newOrder: any) => void;
}

export const amountContext = createContext<userDataInterface | null>(null);
// export const useOrderContext = useContext(orderContext)

const Amount = ({ children }: children) => {
	const [amount, setAmount] = useState<boolean>(false);
  const [changedAmountList, setChangedAmountList] = useState<CurrentFridge[]>(
		[]
	);  
	const updateList = (newOrder: any) => {
		setChangedAmountList(newOrder);
	};
	
	return (
		<amountContext.Provider value={{ changedAmountList, updateList }}>
			{children}
		</amountContext.Provider>
	);
};
export default Amount;
