import React, { createContext, useState, useEffect, useContext } from "react";
import { getRequest } from "../services/apiService";
import { UserContext } from "../store/UserContextProvider";
import { Form } from "antd";
import { CommonContext } from "./CommonContextProvider";

export const ExternalAdvertContext = createContext();

export const ExternalAdvertContextProvider = ({
    children,
    mainAPI,
    onlyFirstCard = false,
    haveAdvertData = false,
    rootUserPlace,
}) => {
    const [form] = Form.useForm();

    const { userPlace, setUserPlace } = useContext(UserContext);
    const { setToastifyObj } = useContext(CommonContext);

    const [jobTypes, setJobTypes] = useState();
    const [profileId, setProfileId] = useState();
    const [jobTitles, setJobTitles] = useState();
    const [languages, setLanguages] = useState();
    const [imageName, setImageName] = useState();
    const [mappedData, setMappedData] = useState();
    const [profileImg, setProfileImg] = useState();
    const [jobAdvantages, setJobAdvantages] = useState();
    const [jobConditions, setJobConditions] = useState();
    const [apiResponse, setApiResponse] = useState(null);
    const [isSalaryAgreed, setIsSalaryAgreed] = useState(false);
    const [isAllDataFetched, setIsAllDataFetched] = useState(false);

    const fetchData = async (url, setStateFunction, errorMessage) => {
        try {
            const res = await getRequest(url, true, setToastifyObj);

            if (res && res.success) {
                setStateFunction(res.data);
            } else {
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error(`Error in ${url} : `, error);
        }
    };

    useEffect(() => {
        setProfileId(userPlace.match(/\d+/g));

        setIsAllDataFetched(false);
    }, [userPlace]);

    useEffect(() => {
        const fetchAllData = async () => {
            const fetchPromises = [
                fetchData(`${mainAPI}${profileId}`, setApiResponse),
                fetchData(`/options/jobTypes`, setJobTypes),
            ];

            if (!onlyFirstCard) {
                fetchPromises.push(
                    fetchData(`/options/jobTitles`, setJobTitles),
                    fetchData(`/options/jobConditions`, setJobConditions),
                    fetchData(`/options/jobAdvantages`, setJobAdvantages),
                    fetchData(`/options/languages`, setLanguages)
                );
            }

            await Promise.all(fetchPromises).then(() => {
                console.log("ALL DATA FETCHED");
                setIsAllDataFetched(true);
            });
        };

        if (profileId) {
            console.log("profileId >>", profileId);
            fetchAllData();
        }
    }, [userPlace, profileId]);

    useEffect(() => {
        console.log("imageName >>", imageName);
    }, [imageName]);

    useEffect(() => {
        if (apiResponse) {
            console.log("apiResponse >>", apiResponse);

            if (
                apiResponse.restaurant &&
                apiResponse.restaurant.imageFileName
            ) {
                setImageName(apiResponse.restaurant.imageFileName);
            } else if (apiResponse.imageUrl) {
                setImageName(apiResponse.imageUrl.split("/").pop());
            }

            let localMappedData;

            if (!haveAdvertData) {
                localMappedData = {
                    aboutUs: apiResponse.aboutUs || "",
                    address: apiResponse.contacts[0]
                        ? apiResponse.contacts[0].address
                        : null,
                    alreadyExist: apiResponse.alreadyExist || null,
                    branch: apiResponse.branch || "",
                    connectionPhoneNumber: apiResponse.contacts[0]
                        ? apiResponse.contacts[0].phoneNumber
                        : null,
                    imageFileName: apiResponse.imageUrl
                        ? apiResponse.imageUrl.split("/")[4]
                        : "",
                    instagram: apiResponse.contacts[0]
                        ? apiResponse.contacts[0].instagram
                        : null,
                    jobTitleRestaurant: apiResponse.jobTitle || "",
                    jobTypeId: apiResponse.jobTypeId || null,
                    phoneNumber: apiResponse.phoneNumber || null,
                    telegram: apiResponse.contacts[0]
                        ? apiResponse.contacts[0].telegram
                        : null,
                    website: apiResponse.website || null,
                };

                setProfileImg(apiResponse.imageUrl);
            } else {
                const { restaurant, advertisement } = apiResponse;

                localMappedData = {
                    aboutUs: restaurant.aboutUs || "",
                    address: restaurant.contacts
                        ? restaurant.contacts.address
                        : null,
                    advertisementUrl: advertisement.advertisementUrl || "",
                    ageLimit: advertisement.ageLimit || null,
                    alreadyExist: restaurant.alreadyExist || null,
                    branch: restaurant.branch || "",
                    connectionPhoneNumber: restaurant.contacts
                        ? restaurant.contacts.phoneNumber
                        : null,
                    dutyStatus: advertisement.dutyStatus || null,
                    educationLevel: advertisement.educationLevel || null,
                    explanation: advertisement.explanation || "",
                    genders: advertisement.genders
                        ? advertisement.genders
                        : null,
                    imageFileName:
                        restaurant.imageFileName || "resPlaceHolder.png",
                    instagram: restaurant.contacts
                        ? restaurant.contacts.instagram
                        : null,
                    jobTitleAdvert: restaurant.jobTitle || "",
                    jobTitleRestaurant: restaurant.jobTitle || "",
                    jobTitleId: advertisement.jobTitleId || "",
                    jobTypeId: restaurant.jobTypeId || null,
                    languages: advertisement.languages
                        ? advertisement.languages
                        : null,
                    marriageStatus: advertisement.marriageStatus || null,
                    maxSalary: advertisement.maxSalary * 1000000 || null,
                    minSalary: advertisement.minSalary * 1000000 || null,
                    nation: advertisement.nation || null,
                    phoneNumber: restaurant.phoneNumber || null,
                    restaurantId: restaurant.id,
                    salary: advertisement.salary || null,
                    skillLevels: advertisement.skillLevels
                        ? advertisement.skillLevels.map((item) => item.key)
                        : null,
                    telegram: restaurant.contacts
                        ? restaurant.contacts.telegram
                        : null,
                    workExperience: advertisement.workExperience || null,
                    jobTitle: restaurant.jobTitle,
                    website: restaurant.website,
                };

                setProfileImg(restaurant.imageUrl);

                // For advantages
                if (
                    advertisement.advantages &&
                    Array.isArray(advertisement.advantages)
                ) {
                    advertisement.advantages.forEach((advantage) => {
                        if (
                            advantage.key &&
                            typeof advantage.value !== "undefined"
                        ) {
                            localMappedData[advantage.key] = advantage.value;
                        }
                    });
                }
            }

            setMappedData(localMappedData);

            console.log("mappedData >>", localMappedData);
            form.setFieldsValue(localMappedData);

            if (localMappedData.maxSalary || localMappedData.minSalary) {
                setIsSalaryAgreed(false);
            } else {
                setIsSalaryAgreed(true);
            }
        }
    }, [apiResponse, onlyFirstCard, haveAdvertData]);

    // useEffect(() => {
    //     console.log("mappedData >>", mappedData);
    // }, [mappedData]);

    useEffect(() => {
        if (userPlace === rootUserPlace) {
            setIsAllDataFetched(false);
        }
    }, [userPlace]);

    const backBtnHandler = () => {
        setUserPlace(rootUserPlace);
    };

    const handleSalarySwitchChange = (checked) => {
        setIsSalaryAgreed(checked);
    };

    return (
        <ExternalAdvertContext.Provider
            value={{
                form,
                profileImg,
                apiResponse,
                jobTypes,
                jobTitles,
                jobConditions,
                jobAdvantages,
                languages,
                isAllDataFetched,
                isSalaryAgreed,
                mappedData,
                profileId,
                imageName,
                setImageName,
                backBtnHandler,
                handleSalarySwitchChange,
                setMappedData,
            }}
        >
            {children}
        </ExternalAdvertContext.Provider>
    );
};
