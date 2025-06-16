import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import templates from "../templates/templates";

const PublicProfilePage = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get(`/api/onelink/${username}`);
                setUserData(res.data);
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        };

        fetchData();
    }, [username]);

    if (!userData) return <p>User not found</p>;
    console.log(userData.data);

    const selectedTemplate = templates.find(t => t.id === Number(userData.data.templateId));
    if (!selectedTemplate) return <div>Template not found</div>;

    const TemplateComponent = selectedTemplate.actualComponent;
    return <TemplateComponent profilePhoto={userData.data.profilePhotoUrl} name={userData.data.name}
                              bio={userData.data.bio} links={userData.data.links} username={userData.data.username} />;
};

export default PublicProfilePage;
