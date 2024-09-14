import React, { useContext } from "react";
import { Button, Modal } from "antd";
import { patchRequest } from "../../services/apiService";
import { CommonContext } from "../../store/CommonContextProvider";
import { UserContext } from "../../store/UserContextProvider";
import { useParams } from "react-router-dom";

const AdvertActionModal = ({ isModalOpen, setIsModalOpen, advertId }) => {
    const { setToastifyObj } = useContext(CommonContext);
    const { setUserPlace } = useContext(UserContext);

    const { id } = useParams();

    const handleOk = async () => {
        try {
            console.log("OK");

            const res = await patchRequest(
                `/advertisements/${advertId}`,
                { status: "closed" },
                true,
                setToastifyObj
            );

            if (res.success) {
                setToastifyObj(() => ({
                    title: res.message,
                    mode: "success",
                }));

                console.log("success-res >>", res);

                setUserPlace(`restaurant-adverts-list-${id}`);
            } else {
                console.log("ERROR", res);
                throw new Error(res);
            }
        } catch (error) {
            console.log("Validation Failed:", error);

            setIsModalOpen(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button
                    key="back"
                    onClick={handleCancel}
                    className="red-close-btn"
                >
                    خیر
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleOk}
                    className="submit-btn"
                >
                    بله
                </Button>,
            ]}
            width={"520px"}
            closeIcon={false}
            className="modal-container"
        >
            <div className="modal-text">
                آیا برای توقف انتشار آگهی اطمینان دارید؟
            </div>
        </Modal>
    );
};

export default AdvertActionModal;
