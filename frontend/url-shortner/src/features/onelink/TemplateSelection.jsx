import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import templates from "../../templates/templates.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TemplateSelection = () => {
    const [searchParams] = useSearchParams();
    const username = searchParams.get("username");
    const navigate = useNavigate();
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const handleTemplateSelect = (templateId) => {
        setSelectedTemplate(templateId);
    };

    const handleConfirmSelection = () => {
        if (selectedTemplate !== null) {
            navigate(`/customize-template?username=${username}&templateId=${selectedTemplate}`);
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        centerPadding: "0px",
        className: "center",
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 p-6 pt-12 justify-start items-center transition-colors duration-300">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-teal-900 dark:text-teal-400 mb-2">Select a Template</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">You can add links and bio later.</p>
            </div>

            <div className="w-full max-w-6xl px-12">
                <style>{`
                    .slick-prev:before, .slick-next:before {
                        color: #115e59; 
                        font-size: 30px;
                    }
                    /* Dark mode override for arrows */
                    @media (prefers-color-scheme: dark) {
                        .slick-prev:before, .slick-next:before {
                            color: #2dd4bf; 
                        }
                    }
                    /* We can also add a class-based override if 'dark' class is on html/body */
                    :global(.dark) .slick-prev:before, :global(.dark) .slick-next:before {
                         color: #2dd4bf !important;
                    }

                    .slick-list {
                        padding-top: 20px;
                        padding-bottom: 40px;
                    }
                    .slick-dots li button:before {
                        font-size: 12px;
                        color: #115e59;
                    }
                    :global(.dark) .slick-dots li button:before {
                        color: #2dd4bf !important;
                    }
                `}</style>
                <Slider {...settings}>
                    {templates.map((template) => {
                        const TemplateComponent = template.component;
                        return (
                            <div key={template.id} className="px-4"> {/* Padding between slides */}
                                <div
                                    className={`relative rounded-2xl transition-all duration-300 cursor-pointer border-2 bg-white dark:bg-gray-900
                                        ${template.id === selectedTemplate
                                            ? "border-teal-600 dark:border-teal-500 shadow-xl scale-95 z-10"
                                            : "border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl hover:scale-100"
                                        }`}
                                    onClick={() => handleTemplateSelect(template.id)}
                                >
                                    <div className="h-[450px] flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl m-2 overflow-hidden transition-colors">
                                        {/* Scale down to fit nicely */}
                                        <div className="transform scale-[0.6] origin-center pointer-events-none">
                                            <TemplateComponent isClicked={template.id === selectedTemplate} />
                                        </div>
                                    </div>

                                    <div className="text-center py-4 border-t border-gray-100 dark:border-gray-800">
                                        <p className="font-bold text-gray-800 dark:text-gray-200 text-lg">{template.name}</p>
                                        {template.id === selectedTemplate && (
                                            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mt-1 block">
                                                Selected
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>

            <div className="text-center mt-12 pb-12">
                <button
                    onClick={handleConfirmSelection}
                    disabled={selectedTemplate === null}
                    className={`px-10 py-3.5 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1
                        ${selectedTemplate === null
                            ? "bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border border-transparent"
                            : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-200 hover:shadow-xl"
                        }
                    `}
                >
                    Continue to Editor
                </button>
            </div>
        </div>
    );
};

export default TemplateSelection;