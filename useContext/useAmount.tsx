import { Timestamp } from "mongodb";
import React, {
	Children,
	createContext,
	ReactNode,
	useContext,
	useState,
} from "react";
import { Fridge } from "../helpers/typesLibrary";
interface children {
	children: ReactNode;
}
interface userDataInterface {
	changedAmountList: Fridge;
	updateList: (list: any) => void;
	shoppingList: any[];
	updateShoppingList: (item: any) => void;
}

export const amountContext = createContext<userDataInterface | null>(null);

const ContextAmount = ({ children }: children) => {
	const [changedAmountList, setChangedAmountList] = useState<Fridge>([]);
	const [shoppingList, setShoppingList] = useState<any[]>(["he"]);

	const updateShoppingList = (item: any) => {
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
