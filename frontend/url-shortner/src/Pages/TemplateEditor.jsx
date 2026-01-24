import { useState, useEffect } from "react";
import templates from "../templates/templates.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from 'sonner';
import { FaMagic } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneLink, createOneLink, updateOneLink, resetOneLinkSuccess } from "../store/slices/onelinkSlice";

// --- Minimalist Components (Moved Outside to Prevent Re-renders/Focus Loss) ---

const MinimalInput = ({ label, value, onChange, placeholder, disabled, type = "text", as = "input", error }) => (
    <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors">
            {label}
        </label>
        {as === "textarea" ? (
            <textarea
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-3 bg-white dark:bg-gray-800 border ${error ? 'border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400'} rounded-lg transition-colors duration-200 resize-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 outline-none`}
                rows="4"
                placeholder={placeholder}
                disabled={disabled}
            />
        ) : (
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-3 bg-white dark:bg-gray-800 border ${error ? 'border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400'} rounded-lg transition-colors duration-200 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 outline-none ${disabled ? 'bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-600 cursor-not-allowed' : ''}`}
                placeholder={placeholder}
                disabled={disabled}
            />
        )}
        {error && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{error}</p>}
    </div>
);

const FileUploadMinimal = ({ label, preview, onChange, onRemove }) => (
    <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors">{label}</label>
        {!preview ? (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-indigo-400 dark:hover:border-indigo-400 transition-all group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-3 text-gray-400 dark:text-gray-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">Click to upload image</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={onChange} />
            </label>
        ) : (
            <div className="relative group w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <img src={preview} alt="Upload" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={onRemove} className="bg-white text-red-600 px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-red-50">
                        Remove
                    </button>
                </div>
            </div>
        )}
    </div>
);

const TemplateEditor = () => {
    const [searchParams] = useSearchParams();
    const username = searchParams.get("username");
    const templateId = searchParams.get("templateId");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Redux state
    const { oneLinkData, loading, success } = useSelector((state) => state.onelink);

    const [isEditMode, setIsEditMode] = useState(false);

    // Find the template by ID
    const [selectedTemplate, setSelectedTemplate] = useState(
        templates.find(template => template.id === parseInt(templateId)) || templates[0]
    );

    // Initialize formData
    const [formData, setFormData] = useState({
        profilePhoto: null,
        username: username || "",
        name: "",
        bio: "",
        links: Array(selectedTemplate?.metadata?.links || 0).fill().map(() => ({ label: "", url: "" })),
        images: Array(selectedTemplate?.metadata?.images || 0).fill().map(() => null),
    });

    const [activeTab, setActiveTab] = useState("profile");

    // Effects
    useEffect(() => {
        const template = templates.find(t => t.id === parseInt(templateId)) || templates[0];
        setSelectedTemplate(template);
    }, [templateId]);

    useEffect(() => {
        if (username) {
            dispatch(fetchOneLink());
        }
    }, [username, dispatch]);

    useEffect(() => {
        if (oneLinkData && oneLinkData.templateId === parseInt(templateId)) {
            setIsEditMode(true);
            const { username, name, bio, links, images, profilePhotoUrl } = oneLinkData;

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
        }
    }, [oneLinkData, templateId, selectedTemplate]);

    useEffect(() => {
        if (success) {
            navigate('/onelinkPages');
            dispatch(resetOneLinkSuccess());
        }
    }, [success, navigate, dispatch]);

    // Handlers
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (field, file) => {
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image should be less than 2MB");
            return;
        }
        const imageUrl = URL.createObjectURL(file);
        setFormData((prev) => ({ ...prev, [field]: { file, preview: imageUrl } }));
    };

    const handleExtraImageChange = (index, file) => {
        if (!file) return;
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

    const handleOneLinkSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.name || !formData.bio) {
            toast.error('Please fill out all required fields (Name, Bio)');
            return;
        }

        const validLinks = formData.links.filter(link => link.label?.trim() !== '' && link.url?.trim() !== '');
        if (validLinks.length < (selectedTemplate?.metadata?.links || 0)) {
            toast.error(`This template requires at least ${selectedTemplate?.metadata?.links} valid link(s).`);
            return;
        }

        const newImages = formData.images.filter(imgObj => imgObj && imgObj.file instanceof File);
        const form = new FormData();
        form.append('name', formData.name);
        form.append('bio', formData.bio);
        form.append('links', JSON.stringify(validLinks));

        if (!isEditMode) {
            form.append('username', formData.username);
            form.append('templateId', selectedTemplate.id);
        }

        if (formData.profilePhoto?.file instanceof File) {
            form.append('profilePhoto', formData.profilePhoto.file);
        }

        newImages.forEach((imgObj) => {
            form.append('images', imgObj.file);
        });

        if (isEditMode) {
            dispatch(updateOneLink(form));
        } else {
            dispatch(createOneLink(form));
        }
    };

    // --- Render Helpers ---

    const renderProfileTab = () => (
        <div className="space-y-6 animate-fadeIn">
            <MinimalInput label="Username" value={formData.username} disabled={true} />
            <MinimalInput
                label="Display Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g. Alex Smith"
            />
            <MinimalInput
                label="Bio"
                as="textarea"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Tell your story..."
            />
            <FileUploadMinimal
                label="Profile Photo"
                preview={formData.profilePhoto?.preview}
                onChange={(e) => handleImageChange("profilePhoto", e.target.files[0])}
                onRemove={() => setFormData(prev => ({ ...prev, profilePhoto: null }))}
            />
        </div>
    );

    const renderLinksTab = () => {
        if (!selectedTemplate?.metadata?.links) return <div className="text-center text-gray-400 py-10">No links available for this template</div>;

        return (
            <div className="space-y-6 animate-fadeIn">
                {formData.links.map((link, i) => (
                    <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 group hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Link #{i + 1}</span>
                        </div>
                        <div className="space-y-3">
                            <input
                                type="text"
                                value={link.label}
                                onChange={(e) => handleLinkChange(i, e.target.value, "label")}
                                placeholder="Title (e.g. Instagram)"
                                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm text-gray-800 dark:text-gray-200 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 outline-none"
                            />
                            <input
                                type="url"
                                value={link.url}
                                onChange={(e) => handleLinkChange(i, e.target.value, "url")}
                                placeholder="URL (https://...)"
                                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm text-gray-800 dark:text-gray-200 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 outline-none"
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderImagesTab = () => {
        if (!selectedTemplate?.metadata?.images) return <div className="text-center text-gray-400 py-10">No galleries available for this template</div>;

        return (
            <div className="space-y-6 animate-fadeIn">
                {Array(selectedTemplate?.metadata?.images || 0).fill().map((_, i) => (
                    <FileUploadMinimal
                        key={i}
                        label={`Gallery Image ${i + 1}`}
                        preview={formData.images[i]?.preview}
                        onChange={(e) => handleExtraImageChange(i, e.target.files[0])}
                        onRemove={() => handleExtraImageChange(i, null)}
                    />
                ))}
                {(!selectedTemplate?.metadata?.images) && <p className="text-gray-400 text-center">No images supported</p>}
            </div>
        );
    };

    const renderPreview = () => {
        const TemplateComponent = selectedTemplate.component;
        const coreFields = ["username", "name", "bio"];
        const isCoreMissing = coreFields.some(field => !formData[field]);

        if (isCoreMissing) return (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-gray-900 transition-colors">
                <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 dark:text-indigo-400 rounded-full flex items-center justify-center mb-4 text-2xl">
                    <FaMagic />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Welcome!</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Start editing your details to see them appear here live.</p>
            </div>
        );

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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans transition-colors duration-300">
            {/* Top Navigation Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </button>
                    <div className="flex bg-white dark:bg-gray-900 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-gray-800 transition-colors">
                        {["profile", "links", "images"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === tab
                                    ? "bg-indigo-600 text-white shadow-sm"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md font-medium border border-green-100 dark:border-green-800/30 hidden sm:inline-block transition-colors">
                        ● Auto-saving
                    </span>
                    <button
                        onClick={handleOneLinkSubmit}
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all flex items-center gap-2"
                    >
                        {loading && <div className="w-3 h-3 border-2 border-white/50 border-t-white rounded-full animate-spin" />}
                        {isEditMode ? "Save Changes" : "Publish"}
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex flex-col lg:flex-row gap-12 items-start justify-center">

                {/* Editor Section */}
                <div className="flex-1 w-full max-w-2xl">
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-indigo-100/50 dark:border-indigo-900/20 overflow-hidden relative transition-colors">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                        <div className="p-6 md:p-8">
                            <div className="flex items-center gap-2 mb-6">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white transition-colors">
                                    Edit {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                                </h2>
                            </div>

                            {activeTab === "profile" && renderProfileTab()}
                            {activeTab === "links" && renderLinksTab()}
                            {activeTab === "images" && renderImagesTab()}
                        </div>
                    </div>
                </div>

                {/* Preview Section */}
                <div className="flex flex-col items-center sticky top-8">
                    <div className="mb-4 flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide uppercase">Live Preview</span>
                    </div>

                    {/* Minimalist Phone Container */}
                    <div className="w-[375px] h-[700px] bg-white dark:bg-gray-900 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-[4px] border-white dark:border-gray-800 overflow-hidden relative transition-all duration-300 ring-1 ring-gray-900/5 dark:ring-white/5">
                        <div className="w-full h-full overflow-y-auto scrollbar-hide bg-white dark:bg-gray-950 transition-colors">
                            {renderPreview()}
                        </div>
                        {/* Subtle inner shadow for depth */}
                        <div className="absolute inset-0 pointer-events-none rounded-[2.5rem] shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]"></div>
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-gray-400 text-xs">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                        <span>Mobile View</span>
                    </div>
                </div>

            </div>

            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default TemplateEditor;