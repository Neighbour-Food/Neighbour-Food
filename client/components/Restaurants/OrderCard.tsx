import React, { FC } from "react";
import "./orderCard.css";

export interface OrdersListProps {
  title: string;
  specialInstructions: string;
  image: string;
}

const OrdersList: React.FC<OrdersListProps> = ({
  title,
  specialInstructions,
  image,
}) => {
  return (
    <div className="order-card">
      <div className="order-card-title">{title}</div>
      <div className="order-card-special-instructions">{specialInstructions}</div>
      <input type="checkbox" className="order-card-checkbox"></input>
      <img src={image} alt="food image" className="order-card-img" />
    </div>
  );
};

export default OrdersList;
