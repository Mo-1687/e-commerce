"use client";

import { getCartData } from "@/API/CartActions/CartActions";
import { CartData } from "@/interface/Cart/CartProducts.type";
import { createContext, useCallback, useEffect, useState } from "react";
interface CountContextType {
  count: number;
  userID: string;
  updateCount: (data?: CartData, isClear?: boolean) => void;
}
export const countContext = createContext<CountContextType | null>(null);
const CountProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    getCartItemsNumber();
  }, []);

  const getCartItemsNumber = useCallback(async () => {
    const data = await getCartData();
    updateCount(data);
  }, []);

  function updateCount(data?: CartData, isClear?: boolean): void {
    if (isClear) {
      setCount(0);
      return;
    }
    if (data) {
      setUserID(data.data.cartOwner);
      const sum: number = data.data.products.reduce(
        (acc, product) => acc + product.count,
        0
      );
      setCount(sum);
    } else {
      setCount(0);
    }
  }

  return (
    <countContext.Provider value={{ updateCount, count, userID }}>
      {children}
    </countContext.Provider>
  );
};
export default CountProvider;
