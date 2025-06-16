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
        infinite: templates.length > 1,
        speed: 500,
        slidesToShow: Math.min(3, templates.length),
        slidesToScroll: 1,
        arrows: false,
        swipe: true,
        touchMove: true,
        centerMode: templates.length === 1,
        centerPadding: templates.length === 1 ? "0px" : "10px",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(2, templates.length),
                    centerMode: templates.length === 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 p-6 justify-center items-center">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-teal-900 mb-2">Select a Template</h1>
                <p className="text-lg text-gray-600">You can add links and bio later.</p>
            </div>

            <div className="w-full max-w-5xl">
                <Slider {...settings}>
                    {templates.map((template) => {
                        const TemplateComponent = template.component;
                        return (
                            <div className="flex justify-center" key={template.id}>
                                <div
                                    className="rounded-lg transition cursor-pointer"
                                    onClick={() => handleTemplateSelect(template.id)}
                                >
                                    <div className="p-4">
                                        <TemplateComponent isClicked={template.id === selectedTemplate} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>

            <div className="text-center mt-4">
                <button
                    onClick={handleConfirmSelection}
                    disabled={selectedTemplate === null}
                    className="px-4 py-2 bg-teal-900 text-white rounded-md hover:bg-teal-800 transition"
                >
                    Select Template
                </button>
            </div>
        </div>
    );
};

export default TemplateSelection;
