import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Dustbin } from "../components/Dustbin";
import { Item } from "../components/Item";
import http from "../helpers/http";
import { CartContext } from "../context/cartContext";
/**
 * Market se encargará de encapsular la logica del e-commerce
 * como el drag and drop y el virtual scroll
 */
export default function Market() {
  const [productsInView, setProductsInView] = useState([]);
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState(0);
  const [page, setPage] = useState(1);
  const [updatingPage, setUpdatingPage] = useState(true);
  const [moreScroll, setMoreScroll] = useState(true);
  function addItem(id, products) {
    const newItems = products;
    const findIndex = newItems.findIndex((element) => element.ID === id);
    newItems.splice(findIndex, 1);
    setProductsInView(newItems);
    const items = cart;
    items.push([id]);
    setCart(items);
    setItems(items.length);
  }
  function restartCart() {}
  let context = {
    cart,
    addItem,
    restartCart,
  };
  useEffect(() => {
    const getItems = async () => {
      const { data } = await http(`/productos/reloj/${page}`);
      setMoreScroll(false);
      if (data) {
        setProductsInView([...productsInView, ...data.products]);
        setUpdatingPage(false);
        setMoreScroll(true);
      }
    };
    if (moreScroll) {
      getItems();
    }
  }, [page]);
  // Es el evento observador para traer más productos haciendo scroll
  if (moreScroll) {
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY === document.body.offsetHeight &&
        !updatingPage &&
        moreScroll
      ) {
        setUpdatingPage(true);
        setPage(page + 1);
      }
    });
  }
  return (
    <CartContext.Provider value={context}>
      <DndProvider backend={HTML5Backend}>
        <section className="d-flex row mt-3 m-0">
          <div className="col-12">
            <div
              style={{ overflow: "hidden", clear: "both" }}
              className="d-flex justify-content-center col-12"
            >
              <Dustbin items={items} />
            </div>
            <div
              style={{ overflow: "hidden", clear: "both" }}
              className="row d-flex justify-content-center"
            >
              {productsInView.map((item, key) => {
                return (
                  <Item
                    key={key}
                    name={item.NAME}
                    price={item.PRICE}
                    description={item.DESCRIPTION}
                    id={item.ID}
                    image={item.IMAGE}
                    products={productsInView}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </DndProvider>
    </CartContext.Provider>
  );
}
