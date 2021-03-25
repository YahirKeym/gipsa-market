import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
const style = {
  height: "12rem",
  width: "12rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "white",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
};
/**
 * Dustbin es el componente en donde se dropeara el item que el usuario selecciones
 */
export const Dustbin = ({ items }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ITEM,
    drop: () => ({ name: "Dustbin" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  let backgroundColor = "#fff";
  let color = "#000";
  if (isActive) {
    color = "#fff";
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    color = "#fff";
    backgroundColor = "darkkhaki";
  }
  return (
    <div
      ref={drop}
      role={"Dustbin"}
      style={{ ...style, backgroundColor, color }}
    >
      {isActive ? "Deja el producto" : "Arrastra aquí tus productos"}
      <div>
        <i className="fas fa-shopping-cart"></i>
      </div>
      <div>[{items}]</div>
    </div>
  );
};
