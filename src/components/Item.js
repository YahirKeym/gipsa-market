import React, { useContext } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import { CartContext } from "../context/cartContext";

const style = {
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left",
};
export const Item = function Item({
  name,
  image,
  price,
  description,
  id,
  index,
  products,
}) {
  const { addItem } = useContext(CartContext);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ITEM,
    item: { name, image, price, description, id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        addItem(item.id, products);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const opacity = isDragging ? 0.4 : 1;
  return (
    <div
      ref={drag}
      role="Item"
      style={{ ...style, opacity }}
      data-testid={`item-${name}`}
      className="col-sm-12 col-md-5 col-lg-2 row"
    >
      <div className="col-12">
        <img
          src={image}
          alt={description}
          className="w-100 "
          style={{ maxHeight: "170px" }}
        />
      </div>
      <div className="col-12 row">
        <hr style={{ borderBottom: "1px solid #9e9e9e" }} className="col-12" />
        <div className="col-6">
          <span style={{ color: "#9e9e9e", fontSize: 18, fontWeight: 600 }}>
            {name}
          </span>
        </div>
        <div className="col-6 d-flex align-items-center">
          <span style={{ color: "#169fb2", fontSize: 20, fontWeight: 600 }}>
            ${price}
          </span>
        </div>
        <div className="col-12">
          <span style={{ fontSize: 13, fontWeight: 300, color: "#9e9e9e" }}>
            {description}
          </span>
        </div>
      </div>
    </div>
  );
};
