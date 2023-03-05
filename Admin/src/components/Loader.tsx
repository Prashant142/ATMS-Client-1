import React from "react";
import { Circles } from "react-loader-spinner";
const Loader = ({ isLoading }: any) => {
  return (
    isLoading && (
      <div className="loader-main">
        <Circles
          height="60"
          width="60"
          color="#e6813f"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={isLoading}
        />
      </div>
    )
  );
};

export default Loader;
