import React, { useEffect } from "react";

const ExternalAdvertNotRegistered = ({ data }) => {
    useEffect(() => {
        console.log("DATA >>", data);
    }, [data]);

    return (
        <div>
            <h1>ExternalAdvertNotRegistered :)</h1>
        </div>
    );
};

export default ExternalAdvertNotRegistered;
