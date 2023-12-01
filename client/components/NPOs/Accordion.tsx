import React, { useState } from 'react';

export interface AccordionProps {
  title: any;
  content: any;
  pickupTime: any;
  status: any;
  food: any;
}

const Accordion: React.FC<AccordionProps> = ({ title, content, pickupTime, status, food }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div className='accordion-title-item'>{title}</div>
        <div className='accordion-title-item'>{pickupTime}</div>
        <div className='accordion-title-item'>{status}</div>
        <div className='accordion-title-item'>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && <div className="accordion-content">{content}</div>}
    </div>
  );
};

export default Accordion;