import { getRequest } from "./apiService";

export const getTableData = async (
    endpoint,
    pageFilter,
    currentPage,
    isAdminStatus,
    objectKey = endpoint
) => {
    const res = await getRequest(
        `/${endpoint}?${isAdminStatus ? "adminStatus" : "status"}=${
            pageFilter.status
        }&sortBy=${pageFilter.sortBy}&sortOrder=${
            pageFilter.sortOrder
        }&page=${currentPage}&search=${pageFilter.search}&date=${
            pageFilter.date
        }`
    );

    console.log("RESSSSS >>", res);

    if (res.success) {
        // console.log("YESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");

        const restaurants = res.data[objectKey];
        restaurants.unshift({ id: -1 });

        return [restaurants, res.data.totalPages];
    } else {
        console.log("ERROR IN FILTERING!!!!!", pageFilter);
    }
};
