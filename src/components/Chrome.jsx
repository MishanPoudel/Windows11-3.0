import React, { useState, useEffect } from 'react';

const Chrome = () => {
    const homeUrl = 'https://www.google.com/webhp?igu=1';
    const [url, setUrl] = useState('https://www.google.com/webhp?igu=1');
    const [displayUrl, setDisplayUrl] = useState('https://www.google.com');

    useEffect(() => {
        const lastVisitedUrl = localStorage.getItem("chrome-url");
        const lastDisplayedUrl = localStorage.getItem("chrome-display-url");
        if (lastVisitedUrl) {
            setUrl(lastVisitedUrl);
            setDisplayUrl(lastDisplayedUrl);
        }
    }, []);

    const storeVisitedUrl = (url, displayUrl) => {
        localStorage.setItem("chrome-url", url);
        localStorage.setItem("chrome-display-url", displayUrl);
    }

    const refreshChrome = () => {
        document.getElementById("chrome-screen").src += '';
    }

    const goToHome = () => {
        setUrl(homeUrl);
        setDisplayUrl("https://www.google.com");
        refreshChrome();
    }

    const checkKey = (e) => {
        if (e.key === "Enter") {
            let enteredUrl = e.target.value.trim();
            if (enteredUrl.length === 0) return;

            if (!enteredUrl.startsWith("http://") && !enteredUrl.startsWith("https://")) {
                enteredUrl = "https://" + enteredUrl;
            }

            setUrl(enteredUrl);
            setDisplayUrl(enteredUrl.includes("google.com") ? 'https://www.google.com' : enteredUrl);
            storeVisitedUrl(enteredUrl, enteredUrl);
            document.getElementById("chrome-url-bar").blur();
        }
    }

    const handleDisplayUrl = (e) => {
        setDisplayUrl(e.target.value);
    }

    return (
        <div className="h-full w-full flex flex-col flex-grow">
            <iframe src={url} className="flex-grow" id="chrome-screen" title="Chrome Url"></iframe>
        </div>
    );
}

export default Chrome;
