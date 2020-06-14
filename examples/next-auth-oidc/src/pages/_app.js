import { App } from "onekijs-next";
import React from "react";
import settings from "../settings";
import "../css/tailwind.css";

const MyApp = (props) => {
  return <App {...props} settings={settings} />;
};

export default MyApp;
