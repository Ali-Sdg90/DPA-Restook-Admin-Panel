import React from "react";

import { ReactComponent as ResumeIcon } from "../../assets/images/advertisement-review/File - Text Recieved.svg";
import { ReactComponent as FireIcon } from "../../assets/images/advertisement-review/Fire (1).svg";
import { ReactComponent as EyeIcon } from "../../assets/images/advertisement-review/Eye - Slash 2.svg";
import { ReactComponent as CloseIcon } from "../../assets/images/advertisement-review/File - Cross.svg";
import { ReactComponent as leftArrowIcon } from "../../assets/images/advertisement-review/Chevron - Left (2).svg";

const btnStyles = [
    {
        icon: <ResumeIcon />,
        text: "رزومه های دریافتی",
        borderColor: "#9CD8BF",
        backColor: "#CCE5DC",
    },
    {
        icon: <FireIcon />,
        text: "ارتقاء آگهی",
        borderColor: "#F4A98A",
        backColor: "#EFCDBF",
    },
    {
        icon: <EyeIcon />,
        text: "توقف انتشار",
        borderColor: "#F4D78A",
        backColor: "#EFE3BF",
    },
    {
        icon: <CloseIcon />,
        text: "بستن آگهی",
        borderColor: "#F57979",
        backColor: "#EFBFC0",
    },
];

const AdvertActionBtns = () => {
    return (
        <div className="advert-action-btns">
            {btnStyles.map((btn, index) => (
                <div className="advert-action-btn">
                    {btn.icon}
                    <div className="btn-text">
                        <div>{btn.text}</div>
                        {index === 0 ? <div>رزومه {"16"}</div> : ""}
                    </div>

                    <div className="arrow-icon">
                        <leftArrowIcon />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdvertActionBtns;
