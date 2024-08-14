import { useState } from "react";

const useTableData = () => {
    const [pageFilter, setPageFilter] = useState({
        status: "PENDING",
        sortBy: "jobTitle",
        sortOrder: "ASC",
        search: "",
        date: "",
    });
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [sortMode, setSortMode] = useState({ mode: "", isASC: false });

    const sortTable = (mode) => {
        let sortOrder = "ASC";

        setSortMode((prevState) => {
            if (prevState.mode === mode) {
                sortOrder = prevState.isASC ? "DESC" : "ASC";
                return { mode, isASC: !prevState.isASC };
            } else {
                return { mode, isASC: true };
            }
        });

        setPageFilter((prevState) => ({
            ...prevState,
            sortBy: mode,
            sortOrder,
        }));
    };

    const handleInputChange = (e, column) => {
        setPageFilter((prevState) => ({
            ...prevState,
            [column]: e.target.value,
        }));
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        console.log("Current page:", page);
    };

    return {
        pageFilter,
        tableData,
        totalPage,
        sortMode,
        currentPage,
        sortTable,
        handleInputChange,
        setTableData,
        setTotalPage,
        handlePageChange,
        setCurrentPage,
    };
};

export default useTableData;
