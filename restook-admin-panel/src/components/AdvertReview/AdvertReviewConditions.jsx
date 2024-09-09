import React from "react";
import { Card, Col, Flex, Row } from "antd";
import { conditionIcons } from "../../constants/advertReviewConstants";

const AdvertReviewConditions = ({ advertData }) => {
    return (
        <Card className="third-card">
            <div className="condition-title">شرایط</div>

            <Row gutter={[24, 24]}>
                {conditionIcons.map((item, index) => (
                    <Col span={8} key={index} className="condition-item">
                        <Flex gap={"8px"} align="center">
                            <>{item}</>
                            <>
                                {advertData.conditions[index]?.title}
                                {": "}
                                {advertData.conditions[index]?.format
                                    ? advertData.conditions[index]?.format
                                    : " _"}
                            </>
                        </Flex>
                    </Col>
                ))}
            </Row>
        </Card>
    );
};

export default AdvertReviewConditions;
