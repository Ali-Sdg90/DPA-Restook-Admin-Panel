import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { UserContext } from "../store/UserContextProvider";
import { convertFAtoEN } from "./../utils/convertFAtoENNumbers";

const useTableData = () => {
    const pageFilterMemo = useMemo(
        () => ({
            status: "PENDING",
            sortBy: "",
            sortOrder: "ASC",
            date: "",
        }),
        []
    );

    const [pageFilter, setPageFilter] = useState(pageFilterMemo);
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [sortMode, setSortMode] = useState({ mode: "", isASC: false });
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDateOpen, setIsDateOpen] = useState(false);
    const [dateValue, setDateValue] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const { setUserPlace } = useContext(UserContext);

    const calendarRef = useRef(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setIsDateOpen(false);

        const sendDate = convertFAtoEN(
            new Intl.DateTimeFormat("fa-IR").format(date)
        );

        setDateValue(sendDate);
        console.log("DATE >>", sendDate);
    };

    const handleOpenChange = (open) => {
        setIsDateOpen(open);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(event.target)
            ) {
                setIsDateOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [calendarRef]);

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

    const backBtnHandler = () => {
        setUserPlace("home-page");
    };

    return {
        pageFilter,
        tableData,
        totalPage,
        sortMode,
        currentPage,
        selectedDate,
        isDateOpen,
        calendarRef,
        isLoading,
        dateValue,
        sortTable,
        handleInputChange,
        setTableData,
        setTotalPage,
        handlePageChange,
        setCurrentPage,
        setPageFilter,
        backBtnHandler,
        handleDateChange,
        handleOpenChange,
        setIsLoading,
    };
};

export default useTableData;
