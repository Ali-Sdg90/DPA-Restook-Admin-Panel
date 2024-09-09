import React from "react";
import { Card, Col, Flex, Row } from "antd";
import {
    advantagesIcon,
    advantagesTitles,
} from "../../constants/advertReviewConstants";

const AdvertReviewAdvantages = ({ advertData }) => {
    return (
        <Card className="forth-card">
            <div className="advantages-title">مزایا</div>

            <Row gutter={[24, 24]}>
                {advertData.advantages.map(
                    (item, index) =>
                        advantagesTitles.includes(item.key) && (
                            <Col
                                span={8}
                                key={index}
                                className="advantage-item"
                            >
                                <Flex gap={"8px"} align="center">
                                    <>
                                        {
                                            advantagesIcon[
                                                advantagesTitles.indexOf(
                                                    item.key
                                                )
                                            ]
                                        }
                                    </>
                                    <>{item.title}</>
                                </Flex>
                            </Col>
                        )
                )}
            </Row>
        </Card>
    );
};

export default AdvertReviewAdvantages;
