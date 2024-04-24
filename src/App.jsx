import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import AddCategory from "./pages/AddCategory/AddCategory";
import ListCategories from "./pages/ListCategories/ListCategories";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useState } from "react";
import Login from "./pages/Login/Login";
import { StoreContext } from "./context/StoreContext";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { isLoggedIn } = useContext(StoreContext);

  return (
    <div>
      <ToastContainer
        position="top-right"
        style={{ top: "0", right: "0", left: "auto", bottom: "auto" }}
      />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <Navbar setShowLogin={setShowLogin} />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/add" replace />
              ) : (
                <Login setShowLogin={setShowLogin} />
              )
            }
          />
          <Route
            path="/add"
            element={isLoggedIn ? <Add /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/list"
            element={isLoggedIn ? <List /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/addcategory"
            element={
              isLoggedIn ? <AddCategory /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/categories"
            element={
              isLoggedIn ? <ListCategories /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/orders"
            element={isLoggedIn ? <Orders /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>
    </div>
  );
};
export default App;
