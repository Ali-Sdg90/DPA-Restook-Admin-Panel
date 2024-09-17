import { getRequest } from "./apiService";

export const getTableData = async (
    endpoint,
    pageFilter,
    currentPage,
    isAdminStatus,
    objectKey = endpoint,
    miscEndpoint = ""
) => {
    const res = await getRequest(
        `/${endpoint}?${isAdminStatus ? "adminStatus" : "status"}=${
            pageFilter.status
        }&sortBy=${pageFilter.sortBy}&sortOrder=${
            pageFilter.sortOrder
        }&page=${currentPage}&date=${pageFilter.date}${miscEndpoint}`
    );

    console.log("RESSSSS >>", res);

    if (res.success) {
        const restaurants = res.data[objectKey];
        restaurants.unshift({ id: -1 });

        return [restaurants, res.data.totalPages];
    } else {
        console.log("ERROR IN FILTERING!", pageFilter);
    }
};

export const getTableData2 = async (
    getAddress,
    objectKey,
) => {
    const res = await getRequest(getAddress);

    console.log("RESSSSS >>", res);

    if (res.success) {
        const restaurants = res.data[objectKey];
        restaurants.unshift({ id: -1 });

        return [restaurants, res.data.totalPages];
    } else {
        console.log("ERROR IN FILTERING!");
    }
}; // Need to change
