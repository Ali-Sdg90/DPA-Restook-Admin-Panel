import React from "react";

import { ReactComponent as LeftArrowIcon } from "../../assets/images/advertisement-review/Chevron - Left (2).svg";
import { AdvertActionBtnsStyle } from "../../constants/AdvertActionBtnsConstants";

const AdvertActionBtns = ({ resumeCounter, setIsModalOpen }) => {
    const actionBtnFunc = (index) => {
        switch (index) {
            case 3:
                setIsModalOpen(true);
                break;
            default:
                console.log("ERROR in AdvertActionBtns switch");
        }
    };

    return (
        <div className="advert-action-btns">
            {AdvertActionBtnsStyle.map((btn, index) => (
                <div
                    className="advert-action-btn"
                    style={{
                        border: `1px solid ${btn.borderColor}`,
                        background: btn.backColor,
                    }}
                    key={index}
                    onClick={() => actionBtnFunc(index)}
                >
                    <div className="right-section">
                        {btn.icon}
                        <div className="btn-text">
                            <div className="main-text">{btn.text}</div>
                            {index === 0 ? (
                                <div className="secondary-text">
                                    رزومه {resumeCounter}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>

                    <div className="left-section">
                        <LeftArrowIcon />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdvertActionBtns;
