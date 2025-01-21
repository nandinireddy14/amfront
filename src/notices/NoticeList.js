import React from "react";
import NoticeCard from "./NoticeCard";
const NoticeList = (props) => {
  if (props.items.length === 0) {
    return <h1>No Notice !</h1>;
  }
  return (
    <ul
      style={{
        display: "flex",
        flexWrap: "wrap",
        listStyle: "none",
        margin: "auto",
      }}
    >
      {props.items.map((notice) => (
        <NoticeCard
          key={notice._id}
          id={notice._id}
          noticename={notice.noticename}
          // author={notice.author}
          // price={notice.price}
          description={notice.description}
         
          // email={notice.email}
          // phone={notice.phone}
          // images={notice.images}
          // creator={notice.creator}
        />
      ))}
    </ul>
  );
};
export default NoticeList;