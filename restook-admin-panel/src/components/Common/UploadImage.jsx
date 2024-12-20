import React, { useContext, useState } from "react";
import { postRequest } from "../../services/apiService";
import { CommonContext } from "../../store/CommonContextProvider";
import { Button } from "antd";
import { convertToBase64 } from "../../utils/convertToBase64";

function UploadImage({ imageName, setImageName }) {
    const [loading, setLoading] = useState(false);
    const [showFileName, setShowFileName] = useState(imageName);

    const { setToastifyObj } = useContext(CommonContext);

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            try {
                const base64 = await convertToBase64(selectedFile);
                handleUpload(base64, selectedFile.name);
            } catch (error) {
                console.error("Error converting file to base64:", error);
            }
        }
    };

    const handleUpload = async (base64, fileName) => {
        if (!base64 || !fileName) return;

        setLoading(true);

        try {
            const imgName = `${new Date().getTime().toString()}.png`;
            const res = await postRequest(
                "/upload",
                {
                    name: imgName,
                    // destinationName: "restaurant",
                    destinationName: "profile",
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

                setImageName(res.response);
                setShowFileName(fileName);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-image-input">
            <input
                type="text"
                value={showFileName}
                contentEditable={false}
                disabled
                className="image-name-input"
            />

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden-input"
            />
            <Button
                className="upload-btn"
                type="text"
                onClick={() => document.querySelector(".hidden-input").click()}
                loading={loading}
            >
                انتخاب فایل
            </Button>
        </div>
    );
}

export default UploadImage;
