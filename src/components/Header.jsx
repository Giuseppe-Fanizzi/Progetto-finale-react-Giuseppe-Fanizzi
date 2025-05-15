import { Link, useNavigate } from "react-router";
import Searchbar from "./Searchbar";
import  supabase  from "../supabase/supabase-client";
import { useContext } from "react";
import SessionContext from "../context/SessionContext";
import logo from "../assets/logo.png";

export default function Header() {

   

    const navigate = useNavigate();
    const { session } = useContext(SessionContext);
      
      const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.log(error);
        alert("Signed out 👋");
        navigate ("/"  );
      };

    


    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg  py-2">
                    <div className="container d-flex align-items-center">


                        <Link to="/" className=" mt-0 ">
                            <img src={logo} alt="GameLab" className="d-inline-block align-text-top"
                                style={{ maxHeight: '145px',  }} />
                        </Link>

                        

                       
                        <button
                            className="navbar-toggler border-0"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#mainNav"
                            aria-controls="mainNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                       
                        <div className="collapse navbar-collapse" id="mainNav">
                           
                            <div className="mx-auto">
                                <Searchbar />
                            </div>
                            {session ? (
                            <ul>
                                <li>
                                    <details className="dropdown mt-1 d-flex justify-content-center align-items-center">
                                        <summary className="mt-1">
                                            Account
                                        </summary>
                                        

                                        <ul className="d-flex" dir="rtl">
                                            <li>
                                            <button className="bg-danger text-white p-1" onClick={signOut}>Logout</button>
                                            </li>
                                            <div className="d-flex mt-2">
                                            <li> <a href="/account">Settings</a></li>
                                            <li> <a href="/profile">Profile</a></li>

                                            </div>
                                        </ul>
                                        
                                    </details>
                                </li>
                            </ul>
                            ) : (

                           
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link text-white">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link text-white">
                                        Register
                                    </Link>
                                </li>
                            </ul>
                            )}
                        </div>

                    </div>
                </nav>
            </header>
        </>
    );
}