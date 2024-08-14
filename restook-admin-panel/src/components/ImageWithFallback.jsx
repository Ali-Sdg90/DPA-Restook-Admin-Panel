import React from "react";
import { API_BASE_IMG } from "../constants/apiConstants";

const ImageWithFallback = ({ imageUrl, className, alt }) => {
    const handleImageError = (event) => {
        event.target.outerHTML = `<div class="gray-circle"></div>`;
    };

    return (
        <img
            src={`${API_BASE_IMG}${imageUrl}`}
            className={className}
            alt={alt}
            onError={handleImageError}
        />
    );
};

export default ImageWithFallback;
