import React from "react";
import { Button, Card, Flex } from "antd";

const AdvertReviewInfo = ({ advertData }) => {
    return (
        <Card className="second-card">
            <Flex justify="flex-end" className="edit-btn-container">
                <Button className="edit-info-btn">ویرایش اطلاعات</Button>
            </Flex>

            <div className="about-title">شرح موقعیت شغلی</div>

            <div className="about-content">{advertData.explanation}</div>

            <hr className="divider" />

            <div className="salary-title">حقوق</div>

            <div className="salary-content">
                {advertData.salaryFormat ? advertData.salaryFormat : "توافقی"}
            </div>
        </Card>
    );
};

export default AdvertReviewInfo;
