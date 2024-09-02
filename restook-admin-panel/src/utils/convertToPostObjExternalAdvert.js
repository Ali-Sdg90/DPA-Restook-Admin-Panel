export const convertToPostObj = (data, profileId) => {
    const restaurantData = {
        jobTitle: data.jobTitle,
        phoneNumber: data.phoneNumber,
        branch: data.branch,
        aboutUs: data.aboutUs,
        imageFileName: data.imageFileName,
        jobTypeId: data.jobTypeId,
        // cityId: 1, // ?
        contacts: {
            phoneNumber: data.phoneNumber,
            instagram: data.instagram,
            telegram: data.telegram,
            lat: 35.770722, // Static value
            long: 51.438833, // Static value
            address: data.address,
        },
    };

    const advertisementData = {
        // restaurantId: profileId, // ?
        status: "published", // Static value
        // jobTitleId: profileId, // ?
        jobTitle: data.jobTitle,
        skillLevels: data.skillLevels || [],
        dutyStatus: data.dutyStatus || [],
        genders: data.genders || [],
        nation: data.nation || [],
        marriageStatus: data.marriageStatus || [],
        languages: data.languages || [],
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
        minSalary: data.minSalary,
        maxSalary: data.maxSalary,
    };

    return {
        restaurantData,
        advertisementData,
        tempAdId: profileId[0],
    };
};
