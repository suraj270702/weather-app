import React from "react";
import Table from "../table/Table";

const HomePage = () => {
  return (
    <div className="bg-black h-full">
      <div className="w-[96%] lg:w-[90%] mx-auto bg-custom-bg h-full">
        <div className="text-white">
          <Table />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
