import React from "react";
import loader from "../../../content/assets/loader.gif";

const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} alt="loader" className="loader_img" />
    </div>
  );
};

export default Loader;
