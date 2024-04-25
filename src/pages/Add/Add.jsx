import { assets } from "../../assets/assets";
import "./Add.css";
import axiosInstance from "../../api";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

const Add = () => {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const { token, setToken } = useContext(StoreContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/menucategories");
        setCategories(response.data);
      } catch (error) {
        console.error(`Error fetching menu categories: ${error}`);
      }
    };
    fetchCategories();
  }, []);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const uploadFormData = new FormData();
    uploadFormData.append("file", image);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(config);
    try {
      const uploadResponse = await axiosInstance.post(
        "/menuitems/upload",
        uploadFormData,
        config
      );
      if (uploadResponse.status !== 200) {
        throw new Error("Failed to upload file");
      }
      const uploadResponseData = uploadResponse.data;
      console.log(`File upload successfull: ${uploadResponseData.file_url}`);
      data.image = uploadResponseData.file_url;

      const response = await axiosInstance.post(`/menuitems`, data, config);
      if ((response.status < 200) | (response.status > 299)) {
        throw new Error("Failed to create menu item");
      }

      setData({
        name: "",
        description: "",
        price: "",
        category: "",
      });
      setImage(false);
      toast.success("Succeess: Menu Item Added");
    } catch (error) {
      console.log(`Error: ${error}`);
      toast.error(`Failed: Creating a new menu item: ${error}`);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="type item name here"
            autoComplete="given-name"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="type the description here"
            required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category">
              {categories.map((item, index) => {
                return (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="100"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};
export default Add;
