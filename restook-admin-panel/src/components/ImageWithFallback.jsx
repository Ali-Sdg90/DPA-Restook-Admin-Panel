import React, { useEffect } from "react";
import { API_BASE_IMG } from "../constants/apiConstants";

const ImageWithFallback = ({ imageUrl, className, alt, needPrefix = true }) => {
    const handleImageError = (event) => {
        event.target.outerHTML = `<div class="gray-circle"></div>`;
    };

    useEffect(() => {
        // console.log("imageUrl >>", imageUrl);
    });

    return (
        <img
            src={`${needPrefix ? API_BASE_IMG : ""}${imageUrl}`}
            className={className}
            alt={alt}
            onError={handleImageError}
        />
    );
};

export default ImageWithFallback;
