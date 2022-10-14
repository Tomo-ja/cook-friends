import { Timestamp } from "mongodb";
import React, {
	Children,
	createContext,
	ReactNode,
	useContext,
	useState,
} from "react";
interface children {
	children: ReactNode;
}
interface userDataInterface {
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

export const shoppingContext = createContext<userDataInterface | null>(null);
// export const useOrderContext = useContext(orderContext)

const ContextShopping = ({ children }: children) => {
	const [shoppingList, setShoppingList] = useState<list[]>([]);

	const updateShoppingList = (item: any) => {
		setShoppingList(item);
	};

	return (
		<shoppingContext.Provider
			value={{
				shoppingList,
				updateShoppingList,
			}}
		>
			{children}
		</shoppingContext.Provider>
	);
};
export default ContextShopping;
