import { useState } from "react";
import "./AddCategory.css";
import { assets } from "../../assets/assets";
import axiosInstance from "../../api";
import { toast } from "react-toastify";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(false);

  const onChangeHandler = (event) => {
    setCategory(event.target.value);
    console.log(category)
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // send image to POST /upload endpoint and get image url
    const uploadFormData = new FormData();
    uploadFormData.append('file', image);
    try{
      const uploadResponse = await axiosInstance.post("/menuitems/upload", uploadFormData);
      if(uploadResponse.status !== 200){
        throw new Error("Failed to upload file");
      }
      const uploadResponseData = uploadResponse.data;
      console.log(`File upload successfull: ${uploadResponseData.file_url}`);
      
      // populate body with category name and image url
      // send body to POST /menucategory API endpoint
      const response = await axiosInstance.post("/menucategories", {
        "name": category,
        "image": uploadResponseData.file_url,
      });
      if(response.status<200 | response.status>299){
        throw new Error("Failed to create menu category")
      }
      setCategory("");
      setImage(false);
      toast.success("Succeess: Category Added");
    } catch (error) {
      console.log(`Error: ${error}`);
      toast.error(`Failed: Creating a new category: ${error}`);
    }

    console.log(category, image)
  }

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => {setImage(e.target.files[0])}} type="file" id="image" hidden required/>
        </div>
        <div className="add-product-name flex-col">
          <p>Category Name</p>
          <input onChange={onChangeHandler} value={category} type="text" name="name" placeholder="type category here" autoComplete="given-name" />
        </div>
        <button type="submit" className="add-btn">ADD</button>
      </form>
    </div>
  )
}
export default AddCategory