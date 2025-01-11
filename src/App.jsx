import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import appStore from "./redux/Store";
import { Provider } from "react-redux";
import { useState } from "react";

function App() {
  const [searchItem, setSearchItem] = useState(""); // Manage search term here

  return (
    <Provider store={appStore}>
      <Header setSearchItem={setSearchItem} />
      <Outlet context={{ searchItem }} />
    </Provider>
  );
}

export default App;
