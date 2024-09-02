import React, { createContext, useState, useEffect, useContext } from "react";
import { getRequest } from "../services/apiService";
import { UserContext } from "../store/UserContextProvider";
import { Form } from "antd";

export const ExternalAdvertContext = createContext();

export const ExternalAdvertContextProvider = ({ children }) => {
    const [form] = Form.useForm();
    const [profileImg, setProfileImg] = useState();
    const { userPlace, setUserPlace } = useContext(UserContext);
    const [profileId, setProfileId] = useState();
    const [apiResponse, setApiResponse] = useState(null);
    const [jobTypes, setJobTypes] = useState();
    const [jobTitles, setJobTitles] = useState();
    const [jobConditions, setJobConditions] = useState();
    const [jobAdvantages, setJobAdvantages] = useState();
    const [languages, setLanguages] = useState();
    const [isAllDataFetched, setIsAllDataFetched] = useState(false);
    const [isSalaryAgreed, setIsSalaryAgreed] = useState(false);
    const [mappedData, setMappedData] = useState();

    const fetchData = async (url, setStateFunction, errorMessage) => {
        try {
            const res = await getRequest(url);

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
    }, [userPlace]);

    useEffect(() => {
        setIsAllDataFetched(false);
    }, [userPlace]);

    useEffect(() => {
        const fetchAllData = async () => {

            await Promise.all([
                fetchData(`/temp/tempAdDetail?id=${profileId}`, setApiResponse),
                fetchData(`/options/jobTypes`, setJobTypes),
                fetchData(`/options/jobTitles`, setJobTitles),
                fetchData(`/options/jobConditions`, setJobConditions),
                fetchData(`/options/jobAdvantages`, setJobAdvantages),
                fetchData(`/options/languages`, setLanguages),
            ]).then(() => {
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
        if (apiResponse) {
            const { restaurant, advertisement } = apiResponse;

            console.log("apiResponse >>", apiResponse);

            setProfileImg(restaurant.imageUrl);

            const localMappedData = {
                aboutUs: restaurant.aboutUs || "",
                address: restaurant.contacts
                    ? restaurant.contacts.address
                    : null,
                ageLimit: advertisement.ageLimit || null,
                branch: restaurant.branch || "",
                dutyStatus: advertisement.dutyStatus || null,
                educationLevel: advertisement.educationLevel || null,
                explanation: advertisement.explanation || "",
                genders: advertisement.genders ? advertisement.genders : null,
                imageFileName: restaurant.imageFileName || "resPlaceHolder.png",
                instagram: restaurant.contacts
                    ? restaurant.contacts.instagram
                    : null,
                jobTitle: restaurant.jobTitle || "",
                jobTypeId: restaurant.jobTypeId || null,
                languages: advertisement.languages
                    ? advertisement.languages
                    : null,
                marriageStatus: advertisement.marriageStatus || null,
                maxSalary: advertisement.maxSalary * 1000000 || null,
                minSalary: advertisement.minSalary * 1000000 || null,
                nation: advertisement.nation || null,
                phoneNumber: restaurant.phoneNumber || null,
                salary: advertisement.salary || null,
                skillLevels: advertisement.skillLevels
                    ? advertisement.skillLevels.map((item) => item.key)
                    : null,
                telegram: restaurant.contacts
                    ? restaurant.contacts.telegram
                    : null,
                workExperience: advertisement.workExperience || null,
            };

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

            setMappedData(localMappedData);

            console.log("mappedData >>", localMappedData);
            form.setFieldsValue(localMappedData);

            if (localMappedData.maxSalary || localMappedData.minSalary) {
                setIsSalaryAgreed(false);
            } else {
                setIsSalaryAgreed(true);
            }
        }
    }, [apiResponse]);

    useEffect(() => {
        if (userPlace === "external-advert-list") {
            setIsAllDataFetched(false);
        }
    }, [userPlace]);

    const backBtnHandler = () => {
        setUserPlace("external-advert-list");
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
                backBtnHandler,
                handleSalarySwitchChange,
                setMappedData,
            }}
        >
            {children}
        </ExternalAdvertContext.Provider>
    );
};
