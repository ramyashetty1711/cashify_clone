import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AppRoutes from "./AppRoutes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function App() {
  return (
    <>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </>
  );
}

export default App;
