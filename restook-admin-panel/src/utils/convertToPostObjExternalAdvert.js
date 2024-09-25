import { convertFAtoEN } from "./convertFAtoENNumbers";

export const convertToPostObj = (data, profileId, alreadyExist, postMode) => {
    let restaurantData = {};
    let advertisementData = {};

    switch (postMode) {
        case "ExternalAdvert":
            restaurantData = {
                jobTitle: data.jobTitleRestaurant,
                phoneNumber: convertFAtoEN(data.phoneNumber),
                branch: data.branch,
                aboutUs: data.aboutUs,
                imageFileName: data.imageFileName,
                jobTypeId: data.jobTypeId,
                // cityId: 1, // ?
                contacts: {
                    phoneNumber: convertFAtoEN(data.connectionPhoneNumber),
                    instagram: data.instagram,
                    telegram: data.telegram,
                    lat: 35.770722, // Static value
                    long: 51.438833, // Static value
                    address: data.address,
                },
            };

            advertisementData = {
                // restaurantId: profileId, // ?
                status: "published", // Static value
                jobTitleId: data.jobTitleId,
                jobTitle: data.jobTitleAdvert,
                skillLevels: data.skillLevels || "",
                dutyStatus: data.dutyStatus || "",
                genders: data.genders || "",
                nation: data.nation || "",
                marriageStatus: data.marriageStatus || "",
                languages: data.languages || "",
                workExperience: data.workExperience,
                ageLimit: data.ageLimit,
                educationLevel: data.educationLevel,
                insurance: data.insurance,
                residence: data.residence,
                meal: data.meal,
                discount: data.discount,
                trainingClass: data.trainingClass,
                style: data.style,
                shuttleService: data.shuttleService,
                restInShif: data.restInShif,
                explanation: data.explanation,
                salary: data.salary,
                minSalary: convertFAtoEN(data.minSalary),
                maxSalary: convertFAtoEN(data.maxSalary),
            };

            if (alreadyExist) {
                return {
                    advertisementData,
                    tempAdId: Number(profileId[0]),
                };
            } else {
                return {
                    restaurantData,
                    advertisementData,
                    tempAdId: Number(profileId[0]),
                };
            }

        case "onlyRestaurant":
            restaurantData = {
                jobTitle: data.jobTitleRestaurant,
                phoneNumber: convertFAtoEN(data.phoneNumber),
                branch: data.branch,
                aboutUs: data.aboutUs,
                imageFileName: data.imageFileName,
                jobTypeId: data.jobTypeId,
                // cityId: 1, // ?
                contacts: {
                    phoneNumber: convertFAtoEN(data.connectionPhoneNumber),
                    instagram: data.instagram,
                    telegram: data.telegram,
                    lat: 35.770722, // Static value
                    long: 51.438833, // Static value
                    address: data.address,
                },
            };

            return restaurantData;

        case "newAdvertForRestaurant":
            restaurantData = {
                restaurantId: profileId || null,
                status: "published",
                jobTitleId: data.jobTypeId,
                jobTitle: data.jobTitle,
                skillLevels: data.skillLevels || [],
                dutyStatus: data.dutyStatus || null,
                genders: data.genders || [],
                nation: data.nation || null,
                marriageStatus: data.marriageStatus || null,
                languages: data.languages || [],
                workExperience: data.workExperience || null,
                ageLimit: data.ageLimit || null,
                educationLevel: data.educationLevel || null,
                insurance: data.insurance || false,
                residence: data.residence || false,
                meal: data.meal || false,
                discount: data.discount || false,
                trainingClass: data.trainingClass || false,
                style: data.style || false,
                shuttleService: data.shuttleService || false,
                restInShif: data.restInShift || false,
                explanation: data.explanation || "",
                salary: data.salary || false,
                minSalary: convertFAtoEN(data.minSalary)?.toString() || null,
                maxSalary: convertFAtoEN(data.maxSalary)?.toString() || null,
            };

            return restaurantData;
    }
};
