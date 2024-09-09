import React, { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CommonContext } from "../../store/CommonContextProvider";

const Toastify = () => {
    const { toastifyObj } = useContext(CommonContext);

    useEffect(() => {
        if (toastifyObj?.mode) {
            notify(toastifyObj);
        }
    }, [toastifyObj]);

    const notify = ({ title, mode }) => {
        if (!toast[mode]) {
            console.error(`Invalid toast mode: ${mode}`);
            return;
        }

        toast[mode](title, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default Toastify;
