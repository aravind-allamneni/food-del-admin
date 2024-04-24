import { useContext, useState } from "react";
import "./LoginPopup.css";
import { StoreContext } from "../../context/StoreContext";
import axiosInstance from "../../api";
import BASE_URL from "../../config";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ setShowLogin }) => {
  const { setToken, setIsLoggedIn } = useContext(StoreContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // console.log(`Data: ${JSON.stringify(data)}`);
    const loginFormData = new FormData();
    loginFormData.append("username", data.email);
    loginFormData.append("password", data.password);
    try {
      // console.log(`loginFormData: ${JSON.stringify(loginFormData)}`);
      const response = await axiosInstance.post(
        `${BASE_URL}/login/admin`,
        loginFormData
      );
      if ((response.status < 200) | (response.status > 299)) {
        console.log(`Error: ${response.status}`);
      }
      console.log(`Response: ${JSON.stringify(response.data)}`);
      setToken(response.data.access_token);
      localStorage.setItem("token", response.data.access_token);
      setShowLogin(false);
      setIsLoggedIn(true);
      navigate("/add");
    } catch (error) {
      console.log(`Error: ${JSON.stringify(error)}`);
    }
  };
  return (
    <div className="login-popup">
      <form onSubmit={onSubmitHandler} className="login-popup-container">
        <div className="login-popup-title">
          <h2>Login</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login-popup-inputs">
          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default LoginPopup;
