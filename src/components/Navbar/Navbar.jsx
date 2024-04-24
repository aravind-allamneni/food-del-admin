import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const { token, setToken, setIsLoggedIn } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsLoggedIn(false);
    navigate("/login");
  };
  useEffect(() => {
    console.log(`Token: ${token}`);
  }, [token]);
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="" />
      <div className="profile">
        {!token ? (
          <button onClick={() => setShowLogin((prev) => !prev)}>Sign In</button>
        ) : (
          <div onClick={logout} className="navbar-profile">
            <img className="profile" src={assets.profile_image} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
