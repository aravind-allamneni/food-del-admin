import { useEffect, useState } from "react";
import "./ListCategories.css";
import axiosInstance from "../../api";
import { toast } from "react-toastify";
import BASE_URL from "../../config";

const ListCategories = () => {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/menucategories");
      setCategories(response.data);
    } catch (error) {
      console.error(`Error fetching menu categories: ${error}`);
      toast.error("Failed to fetch menu categories");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, [])

  const removeMenuCategory = async(id) => {
    try {
      const response = await axiosInstance.delete(`/menucategories/${id}`);
      if(response.status<200 | response.status>299){
        throw new Error("Delete manu category api call failed");
      }
      toast.success("Success: Deleted Category");
      await fetchCategories();
    } catch (error) {
      toast.error("Failed: Unable to delete category")
    }
  }

  return (
    <div className="list add flex-col">
      <p>Manu Categories</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Action</b>
        </div>
        {categories.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={BASE_URL+"/"+item.image} alt="" />
              <p>{item.name}</p>
              <p className="cursor" onClick={() => removeMenuCategory(item.id)}>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default ListCategories