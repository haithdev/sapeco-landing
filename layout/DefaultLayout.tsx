import Footer from "components/Footer";
import Header from "components/Header";
import React, { Fragment } from "react";

const DefaultLayout: React.FC = ({ children }) => {
  //! State

  //! Function

  //! Render
  return (
    <div id="root">
      <main>{children}</main>
    </div>
  );
};

export default DefaultLayout;
