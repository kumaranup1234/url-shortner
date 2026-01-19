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
        <div className="min-h-screen flex flex-col bg-gray-50 p-6 pt-12 justify-start items-center">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-teal-900 mb-2">Select a Template</h1>
                <p className="text-lg text-gray-600">You can add links and bio later.</p>
            </div>

            <div className="w-full max-w-6xl px-12">
                <style>{`
                    .slick-prev:before, .slick-next:before {
                        color: #115e59; 
                        font-size: 30px;
                    }
                    .slick-list {
                        padding-top: 20px;
                        padding-bottom: 40px;
                    }
                    .slick-dots li button:before {
                        font-size: 12px;
                        color: #115e59;
                    }
                `}</style>
                <Slider {...settings}>
                    {templates.map((template) => {
                        const TemplateComponent = template.component;
                        return (
                            <div key={template.id} className="px-4"> {/* Padding between slides */}
                                <div
                                    className={`relative rounded-2xl transition-all duration-300 cursor-pointer border-2 bg-white
                                        ${template.id === selectedTemplate
                                            ? "border-teal-600 shadow-xl scale-95 z-10"
                                            : "border-gray-200 shadow-lg hover:shadow-xl hover:scale-100"
                                        }`}
                                    onClick={() => handleTemplateSelect(template.id)}
                                >
                                    <div className="h-[450px] flex items-center justify-center bg-gray-50 rounded-xl m-2 overflow-hidden">
                                        {/* Scale down to fit nicely */}
                                        <div className="transform scale-[0.6] origin-center pointer-events-none">
                                            <TemplateComponent isClicked={template.id === selectedTemplate} />
                                        </div>
                                    </div>

                                    <div className="text-center py-4 border-t border-gray-100">
                                        <p className="font-bold text-gray-800 text-lg">{template.name}</p>
                                        {template.id === selectedTemplate && (
                                            <span className="text-xs font-bold text-teal-600 uppercase tracking-widest mt-1 block">
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

            <div className="text-center mt-12">
                <button
                    onClick={handleConfirmSelection}
                    disabled={selectedTemplate === null}
                    className={`px-10 py-3 rounded-full font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1
                        ${selectedTemplate === null
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-teal-900 text-white hover:bg-teal-800 hover:shadow-teal-900/30"
                        }
                    `}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default TemplateSelection;