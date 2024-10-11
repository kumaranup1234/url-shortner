import userIcon from "../../assets/icons8-user.svg"
import {useState} from "react";
import {validateEmail} from "../../utils/helper.js";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance.js";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {authState} from "../../recoil/atoms.js";

const ProfileSettings = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const setAuthState = useSetRecoilState(authState);
    const { user } = useRecoilValue(authState);

    // Handle profile image upload with size validation
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        // Check if file size is larger than 2MB (2 * 1024 * 1024 bytes)
        const fileSizeLimit = 2 * 1024 * 1024;
        if (file.size > fileSizeLimit) {
            toast.error("File size should not exceed 2MB!");
            return;
        }

        const formData = new FormData();
        formData.append("profileImage", file);

        try {
            const response = await axiosInstance.post('/api/users/profile-image', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            toast.success("Profile image updated successfully!");

            // Update the Recoil state with the new profile image
            setAuthState((prevState) => ({
                ...prevState,
                user: { ...prevState.user, profileImage: response.data.profileImage }
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

        const myPromise = axiosInstance.put('/api/users/profile', {
            username: name,
            email: email,
        });

        toast.promise(myPromise, {
            loading: 'Updating...',
            success: 'Profile updated successfully!',
            error: 'Error updating details'
        }).then((response) => {
            // Update the Recoil state after the username and email are updated
            setAuthState((prevState) => ({
                ...prevState,
                user: {...prevState.user, username: name, email: email}
            }));
        }).catch((error) => {
            console.error('Error updating profile:', error);
        });
    }

    return (
        <div className="w-3/4">
            <div className="bg-gray-100">
                <div className="flex mb-4 bg-teal-900 text-white p-4">
                    <p className="text-white text-center">
                        Profile Photo
                    </p>
                </div>
                <div className="flex justify-center p-8">
                    <img src={user.profileImage || userIcon} alt="user icon" className="w-10 h-10 rounded-full"/>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="ml-5 mt-1"
                    />
                </div>
            </div>

            <div className="mt-10  bg-gray-100">
                <div className="flex mb-4 bg-teal-900 text-white p-4">
                    <p className="text-white text-center">
                        Contact information
                    </p>
                </div>
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="text-sm font-semibold mb-2">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={user.username}
                                placeholder="Enter your name"
                                className="p-2 border border-gray-300 rounded-md w-full"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-sm font-semibold mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={user.email}
                                placeholder="Enter your email"
                                className="p-2 border border-gray-300 rounded-md w-full"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button className="border-gray-300 bg-teal-900 text-white ml-1 rounded border p-2">Update</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default ProfileSettings;