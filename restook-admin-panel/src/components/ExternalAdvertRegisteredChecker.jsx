import React, { useState, useEffect, useContext } from "react";
import ExternalAdvertRegistered from "./ExternalAdvertRegistered";
import ExternalAdvertNotRegistered from "./ExternalAdvertNotRegistered";
import { getRequest } from "../services/apiService";
import { UserContext } from "../store/UserContextProvider";

const ExternalAdvertRegisteredChecker = () => {
    const [profileData, setProfileData] = useState(null);
    const { userPlace } = useContext(UserContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getRequest(
                    `/temp/tempAdDetail?id=${userPlace.match(/\d+/g)}`
                );

                if (res && res.success) {
                    setProfileData(res.data);
                } else {
                    throw new Error(
                        "Error in ExternalAdvertRegisteredChecker: getData"
                    );
                }
            } catch (error) {
                console.log("ERROR >>", error);
            }
        };

        getData();
    }, [userPlace]);

    if (profileData && profileData.alreadyExist) {
        console.log("ExternalAdvertRegistered");
        return <ExternalAdvertRegistered data={profileData} />;
    } else {
        // console.clear();
        console.log("ExternalAdvertNotRegistered");
        return <ExternalAdvertNotRegistered data={profileData} />;
    }
};

export default ExternalAdvertRegisteredChecker;
