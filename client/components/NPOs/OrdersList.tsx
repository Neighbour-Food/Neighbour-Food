import React, { FC } from "react";
import "./ordersList.css";
import Accordion from "./Accordion";

const data = [
  {
    name: "Phonecia Diner",
    food: "100 frozen turkeys",
    pickUpTime: 8,
    status: "Ready",
  },
  {
    name: "Cleo",
    food: "Leftover banquet food",
    pickUpTime: 8,
    status: "Ready",
  },
  {
    name: "Black Eye Susie",
    food: "13 loaves of whole wheat bread",
    pickUpTime: 4,
    status: "Hold",
  },
];

const OrdersList: FC = () => {
  return (
    <div className="orders">
      <div className="accordion">
      <div className="labels">
        <div className='accordion-title-item'>Restaurant</div>
        <div className='accordion-title-item'>Pick Up Time</div>
        <div className='accordion-title-item'>Status</div>
        <div className='accordion-title-item'></div>
      </div>
        {data.map(({ name, food, pickUpTime, status }) => (
          <Accordion
            key={name}
            title={name}
            content={food}
            pickupTime={pickUpTime}
            status={status}
            food={food}
          />
        ))}
      </div>
    </div>
  );
};

export default OrdersList;