import React, { useState } from "react";
import OrderCard from "../Restaurants/OrderCard";

export interface AccordionProps {
  name: string;
  title: string;
  pickupTime: string;
  status: string;
  image: string;
  specialInstructions: string;
}

const Accordion: React.FC<AccordionProps> = ({
  name,
  title,
  pickupTime,
  status,
  image,
  specialInstructions,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
      <div className="accordion-item">
        <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
          <div className="accordion-title-item">{name}</div>
          <div className="accordion-title-item">{pickupTime}</div>
          <div className="accordion-title-item">{status}</div>
          <div className="accordion-title-item">{isActive ? "-" : "+"}</div>
        </div>
        <div className="ruler">
          {isActive && (
            <div className="drop-down">
              <div className="accordion-content">
                {
                  <OrderCard
                    title={title}
                    image={image}
                    specialInstructions={specialInstructions}
                  />
                }
              </div>
              <div className="order-buttons">
                <button className="pick-up-order-button">Pick Up</button>
                <button className="cancel-order-button">Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
  );
};

export default Accordion;
