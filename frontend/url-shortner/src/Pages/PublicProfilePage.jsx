import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../shared/utils/axiosInstance";
import templates from "../templates/templates";

const PublicProfilePage = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get(`/api/onelink/${username}`);
                setUserData(res.data);
                setError(false);
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [username]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error || !userData) return <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">User not found</p>
    </div>;
    console.log(userData.data);

    const selectedTemplate = templates.find(t => t.id === Number(userData.data.templateId));
    if (!selectedTemplate) return <div>Template not found</div>;

    const TemplateComponent = selectedTemplate.actualComponent;
    return <TemplateComponent profilePhoto={userData.data.profilePhotoUrl} name={userData.data.name}
        bio={userData.data.bio} links={userData.data.links} username={userData.data.username} />;
};

export default PublicProfilePage;
