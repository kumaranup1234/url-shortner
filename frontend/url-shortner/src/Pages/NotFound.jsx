import notFoundImage from '../assets/icons8-page-not-found.svg';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <img src={notFoundImage} alt="Page not found" className="mb-8" />
            <h1 className="text-4xl font-bold">Oops! Page not found.</h1>
            <p className="text-gray-600 mt-4">The page you are looking for doesn't exist or has been moved.</p>
        </div>
    );
};

export default NotFound;
