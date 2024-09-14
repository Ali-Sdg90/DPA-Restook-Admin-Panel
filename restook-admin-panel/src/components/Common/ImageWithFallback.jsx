import React, { useEffect } from "react";
import { API_BASE_IMG } from "../../constants/apiConstants";

const ImageWithFallback = ({ imageUrl, className, alt, needPrefix = true }) => {
    const handleImageError = (event) => {
        event.target.outerHTML = `<div class="gray-circle ${className}"></div>`;
    };

    // useEffect(() => {
    //     console.log("imageUrl >>", API_BASE_IMG + imageUrl);
    // }, []);

    return (
        <img
            src={`${needPrefix ? API_BASE_IMG : ""}${imageUrl}`}
            className={`${className} image-default-style`}
            alt={alt}
            onError={handleImageError}
        />
    );
};

export default ImageWithFallback;
