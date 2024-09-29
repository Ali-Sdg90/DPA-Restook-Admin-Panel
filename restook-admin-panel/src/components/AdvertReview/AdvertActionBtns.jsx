import React, { useContext } from "react";

import { ReactComponent as LeftArrowIcon } from "../../assets/images/advertisement-review/Chevron - Left (2).svg";
import { AdvertActionBtnsStyle } from "../../constants/AdvertActionBtnsConstants";
import { UserContext } from "../../store/UserContextProvider";

const AdvertActionBtns = ({ resumeCounter, setIsModalOpen, advertId }) => {
    const { setUserPlace } = useContext(UserContext);

    const actionBtnFunc = (index) => {
        switch (index) {
            case 0:
                setUserPlace(`restaurant-resume-list-${advertId}`);
                break;
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
                                 {resumeCounter} رزومه 
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
