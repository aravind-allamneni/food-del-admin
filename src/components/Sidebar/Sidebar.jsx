import { NavLink } from "react-router-dom"
import { assets } from "../../assets/assets"
import "./Sidebar.css"
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Menu Item</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Menu Items</p>
        </NavLink>
        <NavLink to="/addcategory" className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Menu Category</p>
        </NavLink>
        <NavLink to="/categories" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Categories</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <img src={assets.parcel_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}
export default Sidebar