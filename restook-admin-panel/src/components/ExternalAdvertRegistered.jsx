import React, { useEffect } from "react";

const ExternalAdvertRegistered = ({ data }) => {
    useEffect(() => {
        console.log("DATA >>", data);
    }, [data]);

    return (
        <div>
            <h1>ExternalAdvertRegistered :)</h1>
        </div>
    );
};

export default ExternalAdvertRegistered;
