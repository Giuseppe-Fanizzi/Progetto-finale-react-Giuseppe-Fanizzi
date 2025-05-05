import { Link, useNavigate } from "react-router";
import Searchbar from "./Searchbar";
import  supabase  from "../supabase/supabase-client";
import { useContext } from "react";
import SessionContext from "../context/SessionContext";


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

                        
                        <Link to="/" className="navbar-brand text-white fs-3">
                            GameLab
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
                                    <details className="dropdown mt-3">
                                        <summary>
                                            Account
                                        </summary>
                                        <ul dir="rtl">
                                            <li> <a href="#">Settings</a></li>
                                            <li>
                                            <button onClick={signOut}>Logout</button>
                                            </li>
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