import "./Login.css";
import LoginPopup from "../../components/LoginPopup/LoginPopup";

const Login = ({ setShowLogin }) => {
  return (
    <div>
      <LoginPopup setShowLogin={setShowLogin} />
    </div>
  );
};
export default Login;
