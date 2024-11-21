import {Link} from "react-router-dom";

const MainFooter = () => {
    return (
        <div className="flex flex-col min-h-screen">
        <footer className="bg-teal-900 text-white py-4">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    Built by Anup Kumar | © {new Date().getFullYear()} URL Shortener
                </p>
                <div className="flex justify-center mt-2 space-x-4">
                    <Link to="/privacy-policy" className="text-white hover:text-teal-300 text-sm">
                        Privacy Policy
                    </Link>
                    <Link to="/terms-of-service" className="text-white hover:text-teal-300 text-sm">
                        Terms of Service
                    </Link>
                    <a href="https://github.com/kumaranup1234" target="_blank"
                       className="text-white hover:text-teal-300 text-sm">
                        GitHub
                    </a>
                    <a href="https://icons8.com/" target="_blank"
                       className="text-white hover:text-teal-300 text-sm underline">
                        Icons by Icons8
                    </a>
                </div>
            </div>
        </footer>
        </div>
    );
};

export default MainFooter;
