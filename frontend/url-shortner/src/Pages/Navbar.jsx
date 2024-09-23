import { FaUserCircle } from "react-icons/fa";
const Navbar = () => {
    return(
        <>
             <nav className="bg-teal-900 p-4 flex items-center justify-between shadow-md">
                 {/* left */}
                 <div className="flex items-center space-x-6">
                     <div className="text-white font-bold text-2xl"> T.LY</div>
                     <div className="hidden md:flex space-x-4">
                         <a href="/dash" className="text-white hover:text-gray-300">
                             Dashboard
                         </a>
                         <a href="/link" className="text-white hover:text-gray-300">
                             Link
                         </a>
                         <a href="/docs" className="text-white hover:text-gray-300">
                             API Docs
                         </a>
                     </div>
                </div>

                 {/* right */}
                 <div className="flex items-center space-x-4">
                     <div className="flex items-center text-white">
                         <FaUserCircle className="w-8 h-8 mr-2" />
                         {/* <span>{isLoggedIn ? <button>logIn</button> : <button>logout</button>}</span> */}
                     </div>
                 </div>
            </nav>
        </>
    )
}
export default Navbar;


