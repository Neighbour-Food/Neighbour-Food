import React, { FC } from "react";
import { useSelector } from "react-redux/";
import { RootState } from "../../state/store";
import OrdersList from "./OrdersList";
import Sidebar from "../Sidebar";
import NpoFeedImage from "../../../assets/npoFeedImage";
import PersonIcon from "../../../assets/personIcon";
import "./feed.css";

const Feed: FC = () => {
  const orgName = useSelector((state: RootState) => state.user.orgName);

  return (
    <>
      <div className="feed">
        <Sidebar />
        <div className="npo-feed">
          <div>
            <h1>
              Hi {orgName},<br />
              <span> 3 restaurants</span> are ready <br />for pick up
              <br />
            </h1>
            <div className="npo-feed-image">
              <NpoFeedImage />
            </div>
          </div>
          <OrdersList />
        </div>
      </div>
    </>
  );
};

export default Feed;
