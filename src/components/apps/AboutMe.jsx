import React from "react";
import {
  profileDescription,
  educationExperience,
  skills,
  githubRepos,
} from "../../data/data";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const SkillItem = ({ skillItem, isTechStack }) => (
  <div className="flex items-center ring-2 ring-neutral-700 bg-neutral-900 rounded-sm p-2 pl-3">
    {skillItem.icon}{" "}
    <span
      className={`text-neutral-400 hover:text-neutral-200 duration-150 ease-in-out cursor-pointer ${
        isTechStack ? "text-xs" : "text-sm"
      }`}
    >
      {skillItem.name}
    </span>
  </div>
);

function AboutMe({ page }) {
  const renderProjectCard = (repo, index) => {
    return (
      <div
        className="bg-neutral-900/80 rounded-md p-2 hover:translate-x-1 hover:-translate-y-1 duration-300 text-selection"
        key={index}
      >
        <div className="flex items-center justify-between">
          <a
            href={repo.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View GitHub repository"
          >
            <FaGithub size={30} />
          </a>
          <a
            href={repo.liveURL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit live site"
          >
            <FaExternalLinkAlt size={15} />
          </a>
        </div>
        <h3 className="font-bold mt-6">{repo.name}</h3>
        <p className="text-neutral-700 mt-4 text-sm">{repo.description}</p>
        <div className="flex items-center mt-4 gap-2 flex-wrap"></div>
      </div>
    );
  };

  return (
    <main className="h-[100vh] w-full ml-2.5 mt-2">
      {page === "About Me" ? (
        <div className="hero min-h-auto justify-start">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src="https://i.pinimg.com/564x/05/6c/65/056c65643e34cb3927358b2c031b7c05.jpg"
              className="max-w-sm rounded-lg shadow-2xl h-96 w-96"
              alt="Profile"
            />
            <div>
              <h1 className="text-5xl font-bold">About Me</h1>
              <p className="py-6">{profileDescription}</p>
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
              <time className="font-mono italic">
                {educationExperience[1].graduation}
              </time>
              <div className="text-lg font-bold font-3xl">
                {educationExperience[1].institution}
              </div>
              {educationExperience[1].degree}
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
              <time className="font-mono italic">
                {educationExperience[0].graduation}
              </time>
              <div className="text-lg font-bold font-3xl">
                {educationExperience[0].institution}
              </div>
              {educationExperience[0].degree}
            </div>
            <hr className="bg-gray-500" />
          </li>
          <div className="mx-auto">???</div>
        </ul>
      ) : page === "Skills" ? (
        <div className="flex flex-wrap justify-center gap-3">
          <div className="block w-full text-center my-6 text-3xl">Skills</div>
          {skills.map((skill) => (
            <SkillItem skillItem={skill} key={skill.key} isTechStack={false} />
          ))}
        </div>
      ) : page === "Projects" ? (
        <main>
          <div className="grid sm:grid-cols-2 gap-12 px-6 pt-4">
            {githubRepos.map((repo, index) => renderProjectCard(repo, index))}
          </div>
        </main>
      ) : page === "Resume" ? (
        <main className="border-0 flex w-full justify-center opacity-75 mt-2 text-sm">
          too bored to make a resume.
        </main>
      ) : (
        "404 not found"
      )}
    </main>
  );
}

export default AboutMe;
