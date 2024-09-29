import React, { useContext } from "react";
import { Button, Card, Flex } from "antd";
import ImageWithFallback from "../Common/ImageWithFallback";

import { ReactComponent as CheckIcon } from "../../assets/images/advertisement-review/Check.svg";
import { ReactComponent as CrossIcon } from "../../assets/images/advertisement-review/Cross.svg";
import { ReactComponent as BackIcon } from "../../assets/images/home-page/Arrow - Right.svg";
import { ReactComponent as UserSquareIcon } from "../../assets/images/advertisement-review/User - Square.svg";
import { CommonContext } from "../../store/CommonContextProvider";
import { patchRequest } from "../../services/apiService";
import { UserContext } from "../../store/UserContextProvider";
import { useNavigate } from "react-router-dom";

const AdvertReviewFirstCard = ({ advertData, id, showBtns, backAddress }) => {
    const { setToastifyObj } = useContext(CommonContext);
    const { setUserPlace } = useContext(UserContext);

    const navigate = useNavigate();

    const patchStatus = async (isPublished) => {
        const res = await patchRequest(
            `/advertisements/${id}`,
            { status: isPublished ? "published" : "closed" },
            true,
            setToastifyObj
        );

        if (res.success) {
            setToastifyObj(() => ({
                title: res.message,
                mode: "success",
            }));

            console.log("success-res >>", res);
        } else {
            console.error("ERROR IN PATCH", res);
        }

        setUserPlace("new-advertisements");
        navigate("/home-page");
    };

    const backBtnHandler = (backAddress) => {
        setUserPlace(backAddress);

        if (backAddress === "advertisements-list") {
            navigate("/advertisements-list");
        }
    };

    return (
        <Card className="first-card">
            <Flex justify="space-between" gap={"14px"}>
                <Flex className="right-side" gap={"24px"}>
                    <div className="advert-img-container">
                        {backAddress ? (
                            <div
                                className="back-arrow-btn"
                                onClick={() => backBtnHandler(backAddress)}
                            >
                                <BackIcon />
                            </div>
                        ) : (
                            ""
                        )}

                        {advertData.imageUrl ? (
                            <ImageWithFallback
                                imageUrl={advertData.imageUrl}
                                className={"advert-img"}
                                alt={"advert-img"}
                                needPrefix={true}
                            />
                        ) : (
                            <div className="advert-img-placeholder"></div>
                        )}
                    </div>

                    <Flex className="advert-title-data" gap={"16px"} vertical>
                        <div className="advert-name">
                            {advertData.restaurantTitle
                                ? advertData.restaurantTitle
                                : "_"}
                        </div>

                        <Flex className="advert-address" gap={"16px"}>
                            <UserSquareIcon className="address-icon" />
                            آدرس :{" "}
                            {advertData.address ? advertData.address : "_"}
                        </Flex>
                    </Flex>
                </Flex>

                {showBtns ? (
                    <Flex className="left-side" vertical gap={"8px"}>
                        <Button
                            type="primary"
                            className="confirm-btn"
                            onClick={() => patchStatus(true)}
                        >
                            <CheckIcon />
                            تأیید
                        </Button>

                        <Button
                            type="primary"
                            className="deny-btn"
                            onClick={() => patchStatus(false)}
                        >
                            <CrossIcon />
                            عدم تأیید
                        </Button>
                    </Flex>
                ) : (
                    ""
                )}
            </Flex>
        </Card>
    );
};

export default AdvertReviewFirstCard;
