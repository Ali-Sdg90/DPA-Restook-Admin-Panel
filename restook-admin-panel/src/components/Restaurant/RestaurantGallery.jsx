import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row, Spin, Image, Flex } from "antd";

import { ReactComponent as BackIcon } from "../../assets/images/home-page/Arrow - Right.svg";
import { ReactComponent as Image2Icon } from "../../assets/images/restaurants-page/Image - 2.svg";
import { ReactComponent as ImagePlusIcon } from "../../assets/images/restaurants-page/Image - Plus.svg";
import { ReactComponent as TrashIcon } from "../../assets/images/restaurants-page/Trash - 2.svg";
import { ReactComponent as VideoIcon } from "../../assets/images/restaurants-page/Video - Plus.svg";

import { UserContext } from "../../store/UserContextProvider";
import { CommonContext } from "../../store/CommonContextProvider";

import {
    deleteRequest,
    getRequest,
    postRequest,
} from "../../services/apiService";

import { API_BASE_IMG } from "../../constants/apiConstants";

import { convertToBase64 } from "../../utils/convertToBase64";
import PageWrapper from "../Common/PageWrapper";

const RestaurantGallery = () => {
    const { userPlace, setUserPlace } = useContext(UserContext);
    const { setToastifyObj } = useContext(CommonContext);

    const [imageData, setImageData] = useState();
    const [newImageData, setNewImageData] = useState([]);
    const [videoData, setVideoData] = useState();
    const [id, setId] = useState();
    const [loadingAddNewImg, setLoadingAddNewImg] = useState(false);
    const [loadingSendData, setLoadingSendData] = useState(false);

    useEffect(() => {
        setId(userPlace.match(/\d+/g));
    }, []);

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const fileType = selectedFile.type.split("/")[1];

            try {
                const base64 = await convertToBase64(selectedFile);
                handleUpload(base64, selectedFile.name, fileType);
            } catch (error) {
                console.error("Error converting file to base64:", error);
            }
        }
    };

    const handleUpload = async (base64, fileName, fileType) => {
        if (!base64 || !fileName) return;

        setLoadingAddNewImg(true);

        try {
            const imgName = `${new Date().getTime().toString()}.${fileType}`;
            const res = await postRequest(
                "/upload",
                {
                    name: imgName,
                    destinationName: "restaurant",
                    // destinationName: "profile",
                    base64: base64,
                },
                true,
                setToastifyObj
            );

            if (res.success) {
                setToastifyObj(() => ({
                    title: res.message,
                    mode: "success",
                }));

                console.log("success-res >>", res);

                setImageData((prevState) => [
                    ...prevState,
                    {
                        fileName: res.response,
                        type: "image",
                        url: `/uploads/images/restaurant/${res.response}`,
                    },
                ]);

                setNewImageData((prevState) => [
                    ...prevState,
                    {
                        fileName: res.response,
                        type: "image",
                        url: `/uploads/images/restaurant/${res.response}`,
                    },
                ]);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.error("Error uploadingAddNewImg file:", error);
        } finally {
            setLoadingAddNewImg(false);
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getRequest(
                    `/gallery?restaurantId=${id}`,
                    true,
                    setToastifyObj
                );

                if (res && res.success) {
                    setImageData(res.data.images);
                    setVideoData(res.data.video);

                    console.log("success res >>", res.data);
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.error(`Error in CreateNewRestaurant-getData: `, error);
            }
        };

        if (id) {
            getData();
        }
    }, [id]);

    const backBtnHandler = () => {
        setUserPlace(`restaurant-profile-${id}`);
    };

    const addNewBtnClickHandler = () => {
        if (imageData.length < 5) {
            document.querySelector(".hidden-input").click();
        } else {
            setToastifyObj(() => ({
                title: "حداکثر ۵ عکس میتوانید برای رستوران آپلود کنید",
                mode: "warning",
            }));
        }
    };

    const deleteImgHandler = async (index) => {
        console.log("image ID >>", imageData[index - 1].id);

        if (imageData[index - 1] && imageData[index - 1].id) {
            try {
                const res = await deleteRequest(
                    `/gallery?id=${imageData[index - 1].id}`,
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
                    throw new Error();
                }
            } catch (error) {
                console.log("ERROR >>", error);
            }
        } else {
            console.log("LOCAL DELETE");

            setToastifyObj(() => ({
                title: "فایل با موفقیت حذف شد.",
                mode: "success",
            }));
        }

        setImageData((prevState) => {
            const newImageData = [...prevState];
            newImageData.splice(index - 1, 1);

            return newImageData;
        });
    };

    const submitList = async () => {
        setLoadingSendData(true);

        try {
            const res = await postRequest(
                "/gallery",
                {
                    files: newImageData.map((image) => ({
                        fileName: image.fileName,
                        type: "image",
                    })),
                    restaurantId: id[0],
                },
                true,
                setToastifyObj
            );

            if (res.success) {
                setToastifyObj(() => ({
                    title: res.message,
                    mode: "success",
                }));

                // console.log(
                //     "POST ARRAY>>",
                //     newImageData.map((image) => ({
                //         fileName: image.fileName,
                //         type: "image",
                //     }))
                // );

                console.log("success-res >>", res);

                setUserPlace(`restaurant-profile-${id}`);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.error("Error RestaurantGallery file:", error);
        } finally {
            setLoadingSendData(false);
        }
    };

    return (
        <PageWrapper>
            {imageData ? (
                <Row gutter={[24, 24]} className="content">
                    <Col span={24} className="table-section">
                        <>
                            <Card
                                title={
                                    <>
                                        <span
                                            onClick={backBtnHandler}
                                            className="back-arrow-btn"
                                        >
                                            <BackIcon />
                                        </span>
                                        <span>گالری رستوران</span>
                                    </>
                                }
                                className="image-video-card"
                            >
                                <Row
                                    className="image-video-section"
                                    gutter={26}
                                >
                                    <Col span={12}>
                                        <div className="section-title">
                                            ویدئو
                                        </div>
                                        <div className="video-section">
                                            {videoData &&
                                            Object.keys(videoData).length >
                                                0 ? (
                                                <h1>YES</h1>
                                            ) : (
                                                <div className="add-video-box-contents">
                                                    <VideoIcon />
                                                    <div>افزودن ویدئو</div>
                                                </div>
                                            )}
                                        </div>
                                    </Col>

                                    <Col span={12}>
                                        <div className="section-title">
                                            تصاویر
                                        </div>

                                        <Row className="image-gallery-section">
                                            {Array.from({ length: 6 }).map(
                                                (_, index) => (
                                                    <div
                                                        className="image-box"
                                                        key={index}
                                                    >
                                                        {index === 0 ? (
                                                            <>
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={
                                                                        handleFileChange
                                                                    }
                                                                    className="hidden-input"
                                                                />
                                                                <Button
                                                                    className="add-new-image-box"
                                                                    type="text"
                                                                    loading={
                                                                        loadingAddNewImg
                                                                    }
                                                                    onClick={
                                                                        addNewBtnClickHandler
                                                                    }
                                                                >
                                                                    <div className="add-img-div">
                                                                        <ImagePlusIcon />
                                                                        <div>
                                                                            افزودن
                                                                            تصویر
                                                                        </div>
                                                                    </div>
                                                                </Button>
                                                            </>
                                                        ) : imageData[
                                                              index - 1
                                                          ] ? (
                                                            <>
                                                                <div
                                                                    className="image-delete-btn"
                                                                    onClick={() =>
                                                                        deleteImgHandler(
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    <TrashIcon />
                                                                </div>
                                                                <Image
                                                                    width={200}
                                                                    src={
                                                                        API_BASE_IMG +
                                                                        imageData[
                                                                            index -
                                                                                1
                                                                        ].url
                                                                    }
                                                                />
                                                            </>
                                                        ) : (
                                                            <div className="empty-image-box">
                                                                <Image2Icon />
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>

                            <Flex justify="flex-end">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="submit-btn"
                                    onClick={() => submitList()}
                                    loading={loadingSendData}
                                >
                                    ثبت اطلاعات
                                </Button>
                            </Flex>
                        </>
                    </Col>
                </Row>
            ) : (
                <Spin size="large" className="loading-token-spinner" />
            )}
        </PageWrapper>
    );
};

export default RestaurantGallery;
