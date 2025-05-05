import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";


export default function Layout() {
    return (
        
        <div className="mb-5">

        <Header/>
        
       
        
        <div className="layout-content">
            
        <div className="style-layout-filters">
            <Sidebar/>
        </div>

         <div className="style-main-content text-center">
            
            <Outlet />
        </div>
        </div>


        <Footer/>
        </div>
    );
       
};