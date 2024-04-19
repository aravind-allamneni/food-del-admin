import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Add from "./pages/Add/Add";
import AddCategory from "./pages/AddCategory/AddCategory";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer 
        position="top-right" 
        style={{ top: '0', right: '0', left: 'auto', bottom: 'auto' }}
      />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add />}/>
          <Route path="/addcategory" element={<AddCategory />}/>
          <Route path="/list" element={<List />}/>
          <Route path="/orders" element={<Orders />}/>
        </Routes>
      </div>
    </div>
  )
}
export default App