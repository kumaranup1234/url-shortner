import React, {useState, useEffect, useRef} from "react";
import templates from "../templates/templates.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance.js";

const TemplateEditor = ({ id }) => {
    const [searchParams] = useSearchParams();
    const username = searchParams.get("username");
    const templateId = searchParams.get("templateId");
    const profileInputRef = useRef(null);
    const imageInputRefs = useRef([]);
    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false);

    // Find the template by ID
    const [selectedTemplate, setSelectedTemplate] = useState(
        templates.find(template => template.id === parseInt(templateId)) || templates[0]
    );

    // Initialize formData with the correct fields from template
    const [formData, setFormData] = useState({
        profilePhoto: null,
        username: username || "",
        name: "",
        bio: "",
        links: Array(selectedTemplate?.metadata?.links || 0).fill().map(() => ({ label: "", url: "" })),
        images: Array(selectedTemplate?.metadata?.images || 0).fill().map(() => null),
    });

    // Active tab state for the editor
    const [activeTab, setActiveTab] = useState("profile");

    // Update formData when selected template changes
    useEffect(() => {
        const template = templates.find(t => t.id === parseInt(templateId)) || templates[0];
        setSelectedTemplate(template);
    }, [templateId]);

    useEffect(() => {
        const fetchExistingOneLink = async () => {
            try {
                const res = await axiosInstance.get('/api/onelink/my-page');
                if (res.data.success && res.data.data.templateId === parseInt(templateId)) {
                    console.log("inside")
                    setIsEditMode(true);

                    const { username, name, bio, links, images, profilePhotoUrl } = res.data.data;

                    setFormData({
                        username,
                        name,
                        bio,
                        templateId: parseInt(templateId),
                        links: links.length > 0
                            ? links
                            : Array(selectedTemplate?.metadata?.links || 0).fill().map(() => ({ label: "", url: "" })),
                        images: images.length > 0
                            ? images.map(url => url ? { file: null, preview: url } : null)
                            : Array(selectedTemplate?.metadata?.images || 0).fill().map(() => null),
                        profilePhoto: profilePhotoUrl ? { file: null, preview: profilePhotoUrl } : null,
                    });
                    console.log(formData)
                } else {
                    setFormData(prev => ({
                        ...prev,
                        links: Array(selectedTemplate?.metadata?.links || 0).fill().map((_, i) =>
                            prev.links[i] || { label: "", url: "" }
                        ),
                        images: Array(selectedTemplate?.metadata?.images || 0).fill().map((_, i) =>
                            prev.images[i] || null
                        ),
                    }));
                }
            } catch (err) {
                console.error("Failed to fetch OneLink data", err);
            }
        };

        if (username && selectedTemplate) {
            fetchExistingOneLink();
        }
    }, [username, selectedTemplate]);


    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (field, file) => {
        if (!file) return;

        console.log('Profile photo selected:', file);
        console.log('Is valid File:', file instanceof File);

        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image should be less than 2MB");
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setFormData((prev) => ({
            ...prev,
            [field]: { file, preview: imageUrl }
        }));
    };

    const handleExtraImageChange = (index, file) => {
        if (!file) return;

        console.log(`Image ${index} selected:`, file);
        console.log(`Is valid File:`, file instanceof File);

        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image should be less than 2MB");
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setFormData((prev) => {
            const updatedImages = [...prev.images];
            updatedImages[index] = { file, preview: imageUrl };
            return { ...prev, images: updatedImages };
        });
    };

    const handleLinkChange = (index, value, type) => {
        setFormData((prev) => {
            const updatedLinks = [...prev.links];
            updatedLinks[index] = { ...updatedLinks[index], [type]: value };
            return { ...prev, links: updatedLinks };
        });
    };

    // Tab Button Component
    const TabButton = ({ name, label, active }) => (
        <button
            onClick={() => setActiveTab(name)}
            className={`px-4 py-2.5 font-medium rounded-lg transition-all duration-200 ${
                active
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
            }`}
        >
            {label}
        </button>
    );

    const handleOneLinkSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!formData.username || !formData.name || !formData.bio) {
                toast.error('Please fill out all required fields (Name, Bio)');
                return;
            }

            // Filter out empty links
            const validLinks = formData.links.filter(link =>
                link.label && link.label.trim() !== '' &&
                link.url && link.url.trim() !== ''
            );

            const requiredLinksCount = selectedTemplate?.metadata?.links || 0;
            if (validLinks.length < requiredLinksCount) {
                toast.error(`This template requires at least ${requiredLinksCount} valid link(s).`);
                return;
            }

            // Filter out empty images - only new files, not existing URLs
            const newImages = formData.images.filter(imgObj =>
                imgObj && imgObj.file instanceof File
            );

            const form = new FormData();
            form.append('name', formData.name);
            form.append('bio', formData.bio);
            form.append('links', JSON.stringify(validLinks));

            // Only append username for create, not update
            if (!isEditMode) {
                form.append('username', formData.username);
                form.append('templateId', selectedTemplate.id);
            }

            // Add profile photo if it's a new file
            if (formData.profilePhoto?.file instanceof File) {
                form.append('profilePhoto', formData.profilePhoto.file);
                console.log('✅ Profile photo appended:', formData.profilePhoto.file.name);
            }

            // Add new images only
            newImages.forEach((imgObj) => {
                form.append('images', imgObj.file);
                console.log(`✅ New image appended:`, imgObj.file.name);
            });

            // Debug: Log all form data entries
            console.log('=== FORM DATA ENTRIES ===');
            for (let [key, value] of form.entries()) {
                if (value instanceof File) {
                    console.log(`${key}: File - ${value.name} (${value.size} bytes)`);
                } else {
                    console.log(`${key}: ${value}`);
                }
            }

            const endpoint = isEditMode ? '/api/onelink/update' : '/api/onelink/create';
            const successMessage = isEditMode ? 'OneLink page updated successfully!' : 'OneLink page created successfully!';

            const response = await axiosInstance.post(endpoint, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                toast.success(successMessage);
                navigate('/onelinkPages');
            } else {
                toast.error(response.data.message || `Failed to ${isEditMode ? 'update' : 'create'} OneLink page`);
            }
        } catch (error) {
            console.error(`Error ${isEditMode ? 'updating' : 'creating'} OneLink:`, error);
            if (error.response) {
                console.error('Error response:', error.response.data);
                toast.error(error.response.data.message || 'Server error occurred');
            } else {
                toast.error(`An error occurred while ${isEditMode ? 'updating' : 'creating'} your OneLink page`);
            }
        }
    };

    // Render the core fields (username, name, bio) that are consistent across templates
    const renderProfileTab = () => {
        return (
            <div className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={formData.username || ""}
                        onChange={(e) => handleInputChange("username", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                        disabled={true}
                    />
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Name *
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={formData.name || ""}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                    />
                </div>

                <div>
                    <label htmlFor="bio" className="block text-sm font-semibold text-gray-700 mb-2">
                        Bio *
                    </label>
                    <textarea
                        id="bio"
                        value={formData.bio || ""}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows="4"
                        placeholder="Tell people about yourself..."
                    />
                </div>

                <div>
                    <label htmlFor="profilePhoto" className="block text-sm font-semibold text-gray-700 mb-2">
                        Profile Photo
                    </label>
                    <input
                        ref={profileInputRef}
                        id="profilePhoto"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange("profilePhoto", e.target.files[0])}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    />
                    {formData.profilePhoto && (
                        <div className="mt-3 flex flex-col items-center gap-2">
                            <img
                                src={formData.profilePhoto?.preview}
                                alt="Profile Preview"
                                className="h-24 w-24 object-cover rounded-full border-4 border-gray-200 shadow-sm"
                            />
                            <button
                                onClick={() => {
                                    setFormData((prev) => ({ ...prev, profilePhoto: null }));
                                    if (profileInputRef.current) {
                                        profileInputRef.current.value = '';
                                    }
                                }}
                                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                            >
                                Remove Image
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Render additional image uploaders based on template requirements
    const renderImagesTab = () => {
        if (!selectedTemplate?.metadata?.images) {
            return (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-lg mb-2">📷</div>
                    <p className="text-gray-500">This template doesn't support additional images.</p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-700 font-medium">
                        This template supports {selectedTemplate.metadata.images} additional image{selectedTemplate.metadata.images !== 1 ? 's' : ''}.
                    </p>
                </div>

                {Array(selectedTemplate.metadata.images).fill().map((_, index) => (
                    <div key={`image-${index}`} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <label htmlFor={`image-${index}`} className="block text-sm font-semibold text-gray-700 mb-3">
                            Image {index + 1}
                        </label>
                        <input
                            ref={el => imageInputRefs.current[index] = el}
                            id={`image-${index}`}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleExtraImageChange(index, e.target.files[0])}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                        />
                        {formData.images[index] && (
                            <div className="mt-3 flex flex-col items-center gap-2">
                                <img
                                    src={formData.images[index].preview}
                                    alt={`Image ${index + 1} Preview`}
                                    className="max-h-32 w-auto object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                                />
                                <button
                                    onClick={() => {
                                        setFormData((prev) => {
                                            const updatedImages = [...prev.images];
                                            updatedImages[index] = null;
                                            return { ...prev, images: updatedImages };
                                        });
                                        if (imageInputRefs.current[index]) {
                                            imageInputRefs.current[index].value = '';
                                        }
                                    }}
                                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                                >
                                    Remove Image
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    // Render link fields based on template requirements
    const renderLinksTab = () => {
        if (!selectedTemplate?.metadata?.links) {
            return (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-lg mb-2">🔗</div>
                    <p className="text-gray-500">This template doesn't support links.</p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-700 font-medium">
                        This template supports {selectedTemplate.metadata.links} link{selectedTemplate.metadata.links !== 1 ? 's' : ''}.
                    </p>
                </div>

                {formData.links.map((link, index) => (
                    <div key={`link-${index}`} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                            <span className="font-semibold text-sm text-gray-700">Link {index + 1}</span>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Label
                                </label>
                                <input
                                    type="text"
                                    value={link.label}
                                    onChange={(e) => handleLinkChange(index, e.target.value, "label")}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., Portfolio, GitHub, LinkedIn"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    URL
                                </label>
                                <input
                                    type="url"
                                    value={link.url}
                                    onChange={(e) => handleLinkChange(index, e.target.value, "url")}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="https://example.com"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    // Render the live preview of the template with the current form data
    const renderPreview = () => {
        // Check for required core fields
        const coreFields = ["username", "name", "bio"];
        const isCoreMissing = coreFields.some(field => !formData[field]);

        if (isCoreMissing) {
            return (
                <div className="flex items-center justify-center p-8">
                    <div className="text-center">
                        <div className="text-amber-500 text-4xl mb-4">⚠️</div>
                        <p className="text-amber-700 font-medium">Please fill out all required fields</p>
                        <p className="text-amber-600 text-sm mt-1">(Username, Name, Bio)</p>
                    </div>
                </div>
            );
        }

        const TemplateComponent = selectedTemplate.component;

        return (
            <TemplateComponent
                {...formData}
                username={formData.username}
                name={formData.name}
                bio={formData.bio}
                profilePhoto={formData.profilePhoto?.preview}
                links={formData.links}
                images={formData.images.map(img => img ? img.preview : null)}
            />
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Template Editor</h1>
                    <p className="text-gray-600">Customize your template and see live preview</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Editor Panel */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        {/* Editor Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                            <h2 className="text-xl font-bold mb-1">
                                Customizing: {selectedTemplate?.name || "Template"}
                            </h2>
                            <p className="text-blue-100 text-sm">
                                Fill out the fields below to customize your template
                            </p>
                        </div>

                        {/* Tabbed Navigation */}
                        <div className="p-6 pb-0">
                            <div className="flex space-x-2 mb-6">
                                <TabButton name="profile" label="Profile Info" active={activeTab === "profile"} />
                                <TabButton name="links" label="Links" active={activeTab === "links"} />
                                <TabButton name="images" label="Images" active={activeTab === "images"} />
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="px-6 pb-6">
                            <div className="bg-gray-50 rounded-lg p-6 min-h-[400px]">
                                {activeTab === "profile" && renderProfileTab()}
                                {activeTab === "links" && renderLinksTab()}
                                {activeTab === "images" && renderImagesTab()}
                            </div>
                        </div>

                        <div className="px-6 pb-6">
                            <button
                                onClick={handleOneLinkSubmit}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-4 font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-300"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                    {isEditMode ? "Edit OneLink": "Create OneLink"}
                                </span>
                            </button>
                        </div>

                        {/* Template Info Footer */}
                        <div className="bg-blue-50 border-t border-blue-100 p-4">
                            <p className="font-semibold text-blue-800 text-sm mb-2">Template Features:</p>
                            <div className="flex flex-wrap gap-4 text-sm text-blue-700">
                                <span className="flex items-center">
                                    🔗 {selectedTemplate?.metadata?.links || 0} links
                                </span>
                                <span className="flex items-center">
                                    📷 {selectedTemplate?.metadata?.images || 0} additional images
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Preview Panel */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        {/* Preview Header */}
                        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
                            <h2 className="text-xl font-bold mb-1">Live Preview</h2>
                            <p className="text-green-100 text-sm">
                                See how your template looks in real-time
                            </p>
                        </div>

                        {/* Preview Content */}
                        <div className="p-6">
                            <div className="bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center py-8">
                                <div className="flex-shrink-0">
                                    {renderPreview()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateEditor;