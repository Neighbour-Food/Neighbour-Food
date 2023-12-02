import React, { FC } from "react";
import Accordion from "./Accordion";

const data = [
  {
    name: "Phonecia Diner",
    title: "100 frozen turkeys",
    pickUpTime: "8PM",
    status: "Ready",
    image:
    "https://i.postimg.cc/SNrJJydD/pexels-ella-olsson-1640772.jpg",
    specialInstructions: "keep them frozen until you cook them obvi",
  },
  {
    name: "Cleo",
    title: "Leftover banquet food",
    pickUpTime: "8PM",
    status: "Ready",
    image:
    "https://i.postimg.cc/SNrJJydD/pexels-ella-olsson-1640772.jpg",
    specialInstructions: "bring your own tupperware!",
  },
  {
    name: "Black Eye Susie",
    title: "13 loaves of whole wheat bread",
    pickUpTime: "4PM",
    status: "Hold",
    image:
    "https://i.postimg.cc/SNrJJydD/pexels-ella-olsson-1640772.jpg",
    specialInstructions:
      "you can only have them if you eat them in one sitting",
  },
];

const OrdersList: FC = () => {
  return (
    <div className="orders">
      <div className="accordion">
        <div className="labels">
          <div className="accordion-title-item">Restaurant</div>
          <div className="accordion-title-item">Pick Up Time</div>
          <div className="accordion-title-item">Status</div>
          <div className="accordion-title-item"></div>
        </div>
        {data.map(
          ({ name, title: title, pickUpTime, status, image, specialInstructions }) => (
            <Accordion
              name={name}
              title={title}
              pickupTime={pickUpTime}
              status={status}
              image={image}
              specialInstructions={specialInstructions}
            />
          )
        )}
      </div>
    </div>
  );
};

export default OrdersList;
