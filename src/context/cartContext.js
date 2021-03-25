import { createContext } from "react";
/**
 * CartContext guardará los datos del carrito de compras al igual
 * que la logica que este manejará, como añadir un elemento o quitarlo
 * de la lista
 */
export const CartContext = createContext({
  cart: [],
  addItem: () => {},
  restartCart: () => {},
});
