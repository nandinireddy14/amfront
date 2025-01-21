import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./AllNotices.css";

import NoticeList from "./NoticeList";

import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";

const AllNotices = () => {
  const [loadedNotices, setLoadedNotices] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");
  const [query, setQuery] = useState();

  useEffect(() => {
    let queryOptions = "";
    
    if (query && query.length > 2) {
      queryOptions += `q=${query}`;
    }

    console.log(
      "Query String in Use Effect All Notices Component >>>",
      queryOptions
    );

    const getNotices = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/notices/allnotices?${queryOptions}`
        );
        const responseData = await response.json();
        // console.log(responseData);
        if (responseData.status === "fail" || responseData.status === "error") {
          throw new Error(
            responseData.message || "Error While Fetching notices Data"
          );
        }
        setLoadedNotices(responseData.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "error while fetching notices data");
        console.log("error while fetching notices data");
      }
    };
    getNotices();
  }, [query]);

  const clearError = () => {
    setError(false);
  };
  return (
    <>
       <div id="notice_filter">
        <div className="query_div">
          <form>
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </form>
        </div>
      </div> 
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <div id="notice_list_component">
        {!isLoading && loadedNotices && <NoticeList items={loadedNotices} />}
      </div>
    </>
  );
};

export default AllNotices;