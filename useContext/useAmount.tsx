import { Timestamp } from "mongodb";
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
	updateList: (list: any) => void;
	shoppingList: any[];
	updateShoppingList: (item: any) => void;
}
interface list {
	amount: number;
	created_at: Timestamp;
	ingredient_api_id: string;
	memo: string;
	name: string;
	_id: string;
}

export const amountContext = createContext<userDataInterface | null>(null);
// export const useOrderContext = useContext(orderContext)

const ContextAmount = ({ children }: children) => {
	const [amount, setAmount] = useState<boolean>(false);
	const [changedAmountList, setChangedAmountList] = useState<CurrentFridge[]>(
		[]
	);
	const [shoppingList, setShoppingList] = useState<any[]>(["he"]);
	// console.log("context", shoppingList);

	const updateShoppingList = (item: any) => {
		console.log("func", item);
		setShoppingList(item);
	};
	const updateList = (list: any) => {
		setChangedAmountList(list);
	};

	return (
		<amountContext.Provider
			value={{
				changedAmountList,
				updateList,
				shoppingList,
				updateShoppingList,
			}}
		>
			{children}
		</amountContext.Provider>
	);
};
export default ContextAmount;
