import userIcon from "../../assets/icons8-user.svg"
import {useState} from "react";
import {validateEmail} from "../../utils/helper.js";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance.js";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {authState} from "../../recoil/atoms.js";

const ProfileSettings = () => {
    const { user } = useRecoilValue(authState);
    const [email, setEmail] = useState(user.email || "");
    const [name, setName] = useState(user.username || "");
    const [selectedImage, setSelectedImage] = useState("");
    const setAuthState = useSetRecoilState(authState);

    const initialEmail = user.email || "";
    const initialName = user.username || "";

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleImageUpload = async (e) => {
        e.preventDefault();
        const fileInput = document.querySelector('input[type="file"]');
        const file = fileInput.files[0];

        const fileSizeLimit = 2 * 1024 * 1024; // 2MB
        if (file.size > fileSizeLimit) {
            toast.error("File size should not exceed 2MB!");
            return;
        }

        const formData = new FormData();
        formData.append("profileImage", file);

        try {
            const response = await axiosInstance.post('/api/users/profile-image', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success("Profile image updated successfully!");

            setAuthState((prevState) => ({
                ...prevState,
                user: { ...prevState.user, profileImage: response.data.profileImage },
            }));
        } catch (error) {
            toast.error("Error updating profile image");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !name.length) {
            toast.error("Please enter a valid name!");
            return;
        }
        if (!validateEmail(email)) {
            toast.error("Please enter a valid email");
            return;
        }

        const dataToSend = {};
        if (name !== initialName) dataToSend.username = name;
        if (email !== initialEmail) dataToSend.email = email;

        if (Object.keys(dataToSend).length === 0) {
            toast.success("No changes detected!");
            return;
        }

        const myPromise = axiosInstance.put('/api/users/profile', dataToSend);

        toast.promise(myPromise, {
            loading: 'Updating...',
            success: 'Profile updated successfully!',
            error: 'Error updating details',
        }).then(() => {
            setAuthState((prevState) => ({
                ...prevState,
                user: { ...prevState.user, username: name, email: email },
            }));
        }).catch((error) => {
            console.error('Error updating profile:', error);
        });
    };

    return (
        <div className="w-full md:w-3/4 px-4 lg:ml-32">
            <div className="bg-gray-100 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row items-center md:justify-between p-4 bg-teal-900 text-white">
                    <p className="text-lg font-medium">Profile Photo</p>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center p-6 space-y-4 md:space-y-0 md:space-x-4">
                    {selectedImage ? (
                        <img src={selectedImage} alt="Selected" className="w-16 h-16 rounded-full" />
                    ) : (
                        <img
                            src={user.profileImage || userIcon}
                            alt="user icon"
                            className="w-16 h-16 rounded-full"
                        />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full md:w-auto"
                    />
                    <button
                        onClick={handleImageUpload}
                        className="w-full md:w-auto bg-teal-900 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-800"
                    >
                        Upload
                    </button>
                </div>
            </div>

            <div className="mt-8 bg-gray-100 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row items-center md:justify-between p-4 bg-teal-900 text-white">
                    <p className="text-lg font-medium">Contact Information</p>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="name"
                                className="text-sm font-semibold mb-2"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                placeholder="Enter your name"
                                className="p-2 border border-gray-300 rounded-md w-full"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="email"
                                className="text-sm font-semibold mb-2"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                placeholder="Enter your email"
                                className="p-2 border border-gray-300 rounded-md w-full"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>


                        <button
                            className="w-full md:w-auto bg-teal-900 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-800"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
