import React, { FC } from "react";


const IsLoading: FC = () => {
  
  return (
    <>
    <div className="loader-container">
          <p className="loader-p">Hold on...</p>
        <div className="loader"></div>
    </div>
    </>
  );
};

export default IsLoading;