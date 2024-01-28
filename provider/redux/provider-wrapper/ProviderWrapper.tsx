"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../featurtes/store";

const ProviderWrapper = ({ children }: any) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderWrapper;
