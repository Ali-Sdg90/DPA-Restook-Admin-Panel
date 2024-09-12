import React, { useContext } from "react";
import { Button, Card, Flex } from "antd";
import ImageWithFallback from "../Common/ImageWithFallback";

import { ReactComponent as CheckIcon } from "../../assets/images/advertisement-review/Check.svg";
import { ReactComponent as CrossIcon } from "../../assets/images/advertisement-review/Cross.svg";
import { ReactComponent as UserSquareIcon } from "../../assets/images/advertisement-review/User - Square.svg";
import { CommonContext } from "../../store/CommonContextProvider";
import { patchRequest } from "../../services/apiService";

const AdvertReviewFirstCard = ({ advertData, id }) => {
    const { setToastifyObj } = useContext(CommonContext);

    const patchStatus = async (isPublished) => {
        const res = await patchRequest(
            `/advertisements/${id}`,
            { status: isPublished ? "published" : "draft" },
            true,
            setToastifyObj
        );

        if (res.success) {
            setToastifyObj(() => ({
                title: res.message,
                mode: "success",
            }));
        } else {
            console.error("ERROR IN PATCH", res);
        }
    };

    return (
        <Card className="first-card">
            <Flex justify="space-between" gap={"14px"}>
                <Flex className="right-side" gap={"24px"}>
                    <div className="advert-img-container">
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
            </Flex>
        </Card>
    );
};

export default AdvertReviewFirstCard;
