import React, { FC, useState, useEffect } from "react";
import Accordion from "./Accordion";
import axios from "axios";

const OrdersList: FC = () => {
  const [apiData, setApiData] = useState<any>();
  const [restaurantNames, setRestaurantNames] = useState<string[]>([]);

  useEffect(() => {
    getMeals(1);
  }, []);

  const getMeals = async (id: number) => {
    try {
      const response = await axios.get(
        'http://localhost:4000/api/meals/getAvail/1'
      );
      console.log(response.data.data.restaurants);
      const restaurants = response.data.data.restaurants;
      const names = restaurants.map((restaurant) => restaurant.name);
      setRestaurantNames(names);
      setApiData(response.data);
      
    } catch (error) {
      alert("Get Meals Error");
      console.error("Error getting meals:", error.message);
    }
  };

  return (
    <div className="orders">
      <div className="accordion">
        <div className="labels">
          <div className="accordion-title-item">Restaurant</div>
          <div className="accordion-title-item">Pick Up Time</div>
          <div className="accordion-title-item">Status</div>
          <div className="accordion-title-item"></div>
        </div>
        {restaurantNames.map((restaurantName, index) => (
          <Accordion
            key={index}
            name={restaurantName}
            // Replace the following props with your actual data properties
            title=""
            pickupTime=""
            status=""
            image=""
            specialInstructions=""
          />
        ))}
      </div>
    </div>
  );
};

export default OrdersList;