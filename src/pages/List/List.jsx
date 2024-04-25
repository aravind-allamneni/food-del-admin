import { useContext, useEffect, useState } from "react";
import "./List.css";
import axiosInstance from "../../api";
import BASE_URL from "../../config";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

const List = () => {
  const [menuItems, setMenuItems] = useState([]);
  const { token } = useContext(StoreContext);
  const fetchMenuItems = async () => {
    try {
      const response = await axiosInstance.get("/menuitems");
      setMenuItems(response.data);
    } catch (error) {
      console.error(`Error fetching menu items: ${error}`);
      toast.error("Failed to fetch menu list");
    }
  };
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const removeMenuItem = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axiosInstance.delete(`/menuitems/${id}`, config);
      if ((response.status < 200) | (response.status > 299)) {
        throw new Error("Delete api call failed");
      }
      toast.success("Success: Deleted menu item");
      await fetchMenuItems();
    } catch (error) {
      toast.error("Failed: Unable to delete menu item");
    }
  };
  return (
    <div className="list add flex-col">
      <p>Menu Items</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {menuItems.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={BASE_URL + "/" + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p className="cursor" onClick={() => removeMenuItem(item.id)}>
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default List;
