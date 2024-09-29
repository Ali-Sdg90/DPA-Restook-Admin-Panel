import React, { useContext } from "react";
import { ExternalAdvertContext } from "../../store/ExternalAdvertContextProvider";
import {
    Card,
    Col,
    Row,
    Form,
    Switch,
    Typography,
    Flex,
} from "antd";

const { Text } = Typography;

const ExternalAdvertJobAdvantages = () => {
    const { jobAdvantages, mappedData, setMappedData } = useContext(
        ExternalAdvertContext
    );

    return (
        <Card title="مزایای شغلی" className="third-card">
            <Row gutter={[48, 0]}>
                {jobAdvantages.jobAdvantages.map((item, index) => (
                    <Col span={12} key={index}>
                        <Form.Item valuePropName="checked">
                            <Flex justify="space-between">
                                <Text>{item.value}</Text>
                                <Switch
                                    checked={
                                        mappedData[item.key]
                                            ? mappedData[item.key]
                                            : false
                                    }
                                    onChange={() =>
                                        setMappedData((prevState) => ({
                                            ...prevState,
                                            [item.key]: !prevState[item.key],
                                        }))
                                    }
                                />
                            </Flex>
                        </Form.Item>
                    </Col>
                ))}
            </Row>
        </Card>
    );
};

export default ExternalAdvertJobAdvantages;
