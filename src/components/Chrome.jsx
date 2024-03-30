import React from "react";

const Chrome = () => {
  const homeUrl = "https://www.google.com/webhp?igu=1";

  return (
    <div className="h-full w-full flex flex-col flex-grow">
      <iframe
        src={homeUrl}
        className="flex-grow"
        id="chrome-screen"
        title="Chrome Url"
      ></iframe>
    </div>
  );
};

export default Chrome;
