import React, { useContext } from "react";
import { Button, Card, Col, Select, Row, Form } from "antd";
import { ExternalAdvertContext } from "../../store/ExternalAdvertContextProvider";
import {
    jobConditionsArray,
    jobConditionsTitleNames,
    maxAge,
    minRecord,
} from "../../constants/externalAdvertConstants";

const { Option } = Select;

const ExternalAdvertJobConditions = () => {
    const { jobTitles, jobConditions, languages, mappedData, setMappedData } =
        useContext(ExternalAdvertContext);

    const conditionBtnClickHandler = (category, key) => {
        console.log(category, key);

        setMappedData((prevState) => {
            const currentKeys = prevState[category] || [];

            const keyExists = currentKeys.includes(key);

            const updatedKeys = keyExists
                ? currentKeys.filter((item) => item !== key)
                : [...currentKeys, key];

            return {
                ...prevState,
                [category]: updatedKeys,
            };
        });
    };

    return (
        <Card title="شرایط شغلی" className="second-card">
            <Row>
                <Col span={8}>
                    <Form.Item label="عنوان شغلی" name="jobTypeId">
                        <Select placeholder="">
                            {jobTitles.map((title, index) => (
                                <Option value={title.id} key={index}>
                                    {title.title}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                {jobConditionsArray.map((field, index) => (
                    <Col span={8} key={index}>
                        <Form.Item
                            label={jobConditionsTitleNames[index]}
                            name="dutyStatus"
                        >
                            {field !== "adEducation"
                                ? jobConditions[field].map((item) => {
                                      if (field === "gender") {
                                          field = "genders";
                                      }

                                      return (
                                          <Button
                                              key={item.key}
                                              category={field}
                                              item={"default"}
                                              className={`card-btn ${
                                                  mappedData[field] &&
                                                  mappedData[field].includes(
                                                      item.key
                                                  )
                                                      ? "active-button"
                                                      : ""
                                              }`}
                                              onClick={() =>
                                                  conditionBtnClickHandler(
                                                      field,
                                                      item.key
                                                  )
                                              }
                                          >
                                              {item.value}
                                          </Button>
                                      );
                                  })
                                : languages.map((item) => (
                                      <Button
                                          key={item.id}
                                          item={"default"}
                                          category={"languages"}
                                          className={`card-btn ${
                                              mappedData["languages"] &&
                                              mappedData["languages"].includes(
                                                  item.id
                                              )
                                                  ? "active-button"
                                                  : ""
                                          }`}
                                          onClick={() =>
                                              conditionBtnClickHandler(
                                                  "languages",
                                                  item.id
                                              )
                                          }
                                      >
                                          {item.title}
                                      </Button>
                                  ))}
                        </Form.Item>
                    </Col>
                ))}

                <Row gutter={[48, 0]} style={{ width: "100%" }}>
                    <Col span={8}>
                        <Form.Item label="حداقل سابقه" name="workExperience">
                            <Select placeholder="">
                                {minRecord.map((record, index) => (
                                    <Option value={index} key={index}>
                                        {record}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="حداکثر سن" name="ageLimit">
                            <Select placeholder="">
                                {maxAge.map((age, index) => (
                                    <Option value={index} key={index}>
                                        {age}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="حداقل تحصیلات" name="educationLevel">
                            <Select placeholder="">
                                {jobConditions["adEducation"].map((item) => (
                                    <Button
                                        key={item.key}
                                        item={"default"}
                                        className="card-btn"
                                    >
                                        {item.value}
                                    </Button>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Row>
        </Card>
    );
};

export default ExternalAdvertJobConditions;
