import React from "react";

function AboutMe({ page }) {
  return (
    <main className="h-[100vh] w-full ml-2.5 mt-2">
      {page === "About Me" ? (
        <div className="hero min-h-auto pr-6">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src="https://i.pinimg.com/564x/05/6c/65/056c65643e34cb3927358b2c031b7c05.jpg"
              className="max-w-sm rounded-lg shadow-2xl h-96 w-96"
              alt="this"
            />
            <div>
              <h1 className="text-5xl font-bold">MONKE</h1>
              <p className="py-6">I LIKE MONKEs</p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      ) : page === "Education" ? (
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
          <li>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-start md:text-end mb-10">
              <time className="font-mono italic">1984</time>
              <div className="text-lg font-black">First Macintosh computer</div>
              The Apple Macintosh—later rebranded as the Macintosh 128K—is the
              original Apple Macintosh personal computer. It played a pivotal
              role in establishing desktop publishing as a general office
            </div>
            <hr className="bg-gray-500" />
          </li>
          <li>
            <hr className="bg-gray-500" />
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end mb-10">
              <time className="font-mono italic">1998</time>
              <div className="text-lg font-black">iMac</div>
              iMac is a family of all-in-one Mac desktop computers designed and
              built by Apple Inc. It has been the primary part of Apple's
              consumer desktop offerings since its debut in August 1998, and has
              evolved through seven distinct forms
            </div>
            <hr className="bg-gray-500" />
          </li>
          <li>
            <hr className="bg-gray-500" />
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-start md:text-end mb-10">
              <time className="font-mono italic">2015</time>
              <div className="text-lg font-black">Apple Watch</div>
              The Apple Watch is a line of smartwatches produced by Apple Inc.
              It incorporates fitness tracking, health-oriented capabilities,
              and wireless telecommunication, and integrates with iOS and other
              Apple products and services
            </div>
          </li>
        </ul>
      ) : page === "Skills" ? (
        <main>Skils</main>
      ) : page === "Projects" ? (
        <main>projects</main>
      ) : page === "Resume" ? (
        <main>resume</main>
      ) : (
        "404 not found"
      )}
    </main>
  );
}

export default AboutMe;
