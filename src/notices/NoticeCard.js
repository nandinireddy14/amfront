import React from "react";
import { useNavigate } from "react-router-dom";
import "./NoticeCard.css";
const NoticeCard = (props) => {
  const navigate = useNavigate();
  // console.log("in Notice card props.id >>>> ", props.id);
  const getDetailsHandler = () => {
    navigate(`/noticedetails/${props.id}`);
  };
  return (
    // <div>
    //     <div class="name">{props.noticename} </div>
    //     <div class="name">{props.description} </div>
    //     <button style={{ marginTop: "30px" }} onClick={getDetailsHandler}>
    //            Notice Details
    //     </button>
    // </div>
    //<h1>Hello</h1>
    <div id="content">
      <div className="card">
        <div className="noticeText">
          <div className="name1">{props.noticename} </div>
          <div className="name2">{props.description} </div>
        </div>
        <div className="name-button">
          <button onClick={getDetailsHandler}>
            Notice Details
          </button>
      </div>
      </div>
    </div>

    // <li style={{ padding: "20px 20px" }}>
    //   <div id="container">
    //     <div class="card">
    //       <div class="card__details">
    //         {/* <span class="tag">{props.notice_type}</span> */}
    //         <div class="name">{props.noticename} </div>
    //         <div class="name">{props.description} </div>


    //         {/* <span style={{ fontSize: "20px", color: "black" }}>
    //           ₹{props.price}
    //         </span>
    //         <span style={{ color: "darkgrey" }}>/Hour</span> */}


    //       </div>
    //     </div>
    //   </div>
    // </li>
  );
};
export default NoticeCard;
