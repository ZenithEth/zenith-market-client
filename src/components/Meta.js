import React from "react";
import { Helmet } from "react-helmet";

//Context

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta name="theme-color" content="#0f0f0f" />

      <meta name="msapplication-navbutton-color" content="#0f0f0f" />

      <meta name="apple-mobile-web-app-status-bar-style" content="#0f0f0f" />
    </Helmet>
  );
};
Meta.defaultProps = {
  title: "NFT market place",
  keywords: "Janvinsha",
};
export default Meta;
