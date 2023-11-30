import React, { FC } from "react";

const data = [
  {
    name: "Phonecia Diner",
    food: "100 frozen turkeys",
    pickUpTime: 8,
    status: "Ready"
  },
  {
    name: "Cleo",
    food: "Leftover banquet food",
    pickUpTime: 8,
    status: "Ready"
  },
  {
    name: "Black Eye Susie",
    food: "13 loaves of whole wheat bread",
    pickUpTime: 4,
    status: "Hold"
  },
]

const OrdersList: FC = () => {
  
 
  return (
    <div className="orders">
      <div className="labels">
        <div>Restaurant</div>
        <div>Food</div>
        <div>Pick Up Time</div>
        <div>Status</div>
        <div></div>
      </div>
      <div className="orders-list">
        {data.map((restaurant: any) => (
          <div className="restaurant">
          <div>{restaurant.name}</div>
          <div>{restaurant.food}</div>
          <div>{restaurant.pickUpTime}</div>
          <div>{restaurant.status}</div>
            <button>+ or -</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;