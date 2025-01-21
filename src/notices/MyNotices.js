import { useState, useEffect, useContext } from "react";

import "./MyNotices.css";
import NoticeCard from "./NoticeCard";
import NoticeList from "./NoticeList";
import { AuthContext } from "../context/auth-context";

import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";

const MyNotices = () => {
  const auth = useContext(AuthContext);

  const [loadedNotices, setLoadedNotices] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getNotices = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/notices/notices/${auth.userId}`
        );
        const responseData = await response.json();
        console.log("loadedNotices >> ", responseData.data.notices);
        setLoadedNotices(responseData.data.notices);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "error while getting notices by user id");
        console.log("Error while retrieving");
      }
    };
    getNotices();
  }, [auth.userId]);

  const clearError = () => {
    setError(false);
  };

  return (
    <>
      <div style={{ marginTop: "100px" }}></div>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedNotices && <NoticeList items={loadedNotices} />}
    </>
  );
};

export default MyNotices;
