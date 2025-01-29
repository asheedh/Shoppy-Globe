import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import appStore from "./redux/Store";
import { Provider } from "react-redux";
import { useState, useEffect } from "react";

function App() {
  const [searchItem, setSearchItem] = useState(""); 
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    }
  }, []); // ✅ FIXED

  return (
    <Provider store={appStore}>
      <Header setSearchItem={setSearchItem} isLogin={isLogin} setIsLogin={setIsLogin} />
      <Outlet context={{ searchItem }} />
    </Provider>
  );
}

export default App;
