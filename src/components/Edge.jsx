import React, { useState, useEffect } from 'react';

const MicrosoftGraphData = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a request to the Microsoft Graph API
                const response = await fetch('https://graph.microsoft.com/v1.0/organization');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch data from Microsoft Graph API');
                }

                const responseData = await response.json();
                setData(responseData);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Microsoft Organization Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default MicrosoftGraphData;
