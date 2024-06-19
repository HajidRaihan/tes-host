import React from "react";
import { Pagination } from "@nextui-org/react";

const Paginate = ({  currentPage, onPageChange }) => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "5px" }}>
      <Pagination
        total={10} // Set the total number of pages
        initialPage={currentPage} // Set the initial page
        onChange={onPageChange} // Handle page change event
      />
    </div>
  );
};

export default Paginate;
