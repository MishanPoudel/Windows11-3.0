import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import {
  profileDescription,
  educationExperience,
  githubRepos,
  skills,
} from "../../data/data";

const ProjectCard = ({ repo }) => {
  const renderSkills = () => {
    return repo.techUsed.map((tech, index) => (
      <div
        key={index}
        className="bg-white bg-opacity-20 rounded-md px-2 py-1 text-xs"
      >
        {tech}
      </div>
    ));
  };

  return (
    <div className="bg-neutral-900/80 rounded-md px-4 pt-3 hover:translate-x-1 hover:-translate-y-1 duration-300 text-selection">
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
      <div className="flex items-center mt-4 gap-2 flex-wrap">
        {renderSkills()}
      </div>
    </div>
  );
};

const Skill = ({ icon, name, size }) => (
  <div
    className={`w-[${
      size === 48 ? "6em" : "5em"
    }] h-24 flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2`}
  >
    {React.cloneElement(icon, { size })}
    <div className="text-balance text-center text-sm select-none pt-2">
      {name}
    </div>
  </div>
);

const SkillsList = ({ x, y }) => (
  <div className="flex flex-wrap gap-2">
    <>
      {skills.slice(x, y).map((skill) => (
        <Skill key={skill.key} icon={skill.icon} name={skill.name} size={48} />
      ))}
    </>
  </div>
);

const AboutMe = ({ page, handleDivClick, expandedDiv }) => {
  const [resumeUrl, setResumeUrl] = React.useState(null);

  React.useEffect(() => {
    // Probe possible resume locations and pick the first that exists.
    const candidates = ["/docs/resume.pdf"];
    let cancelled = false;

    (async () => {
      for (const p of candidates) {
        try {
          const res = await fetch(p, { method: "HEAD" });
          if (!cancelled && res && res.ok) {
            setResumeUrl(p);
            return;
          }
        } catch (err) {
          // ignore and try next
        }
      }
      if (!cancelled) setResumeUrl(null);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const renderPageContent = () => {
    switch (page) {
      case "About Me":
        return (
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
        );
      case "Education":
        return (
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical my-8">
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
                <time className="font-mono text-lg italic">
                  {educationExperience[1].graduation}
                </time>
                <div className="text-xl font-bold font-3xl">
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
                <time className="font-mono text-lg italic">
                  {educationExperience[0].graduation}
                </time>
                <div className="text-xl font-bold font-3xl">
                  {educationExperience[0].institution}
                </div>
                {educationExperience[0].degree}
              </div>
              <hr className="bg-gray-500" />
            </li>
            <div className="mx-auto">???</div>
          </ul>
        );
      case "Skills":
        return (
          <div className="main-container flex h-screen relative">
            {expandedDiv === 0 && (
              <>
                <div
                  className="w-[5em] h-28 flex flex-col pt-2 items-center rounded-md hover:bg-white hover:bg-opacity-20"
                  onDoubleClick={() => handleDivClick(1)}
                >
                  <img
                    src="/images/apps/folder.png"
                    alt="Technical"
                    className="w-12 h-12"
                  />
                  <div className="text-balance text-center text-sm select-none pt-2">
                    Technical Skills
                  </div>
                </div>

                <div
                  className="w-[5em] h-28 flex flex-col pt-2 items-center rounded-md hover:bg-white hover:bg-opacity-20"
                  onDoubleClick={() => handleDivClick(2)}
                >
                  <img
                    src="/images/apps/folder.png"
                    alt="Soft"
                    className="w-12 h-12"
                  />
                  <div className="text-balance text-center text-sm select-none pt-2">
                    Soft Skills
                  </div>
                </div>

                <div
                  className="w-[5em] h-28 flex flex-col pt-2 items-center rounded-md hover:bg-white hover:bg-opacity-20"
                  onDoubleClick={() => handleDivClick(3)}
                >
                  <img
                    src="/images/apps/folder.png"
                    alt="Design"
                    className="w-12 h-12"
                  />
                  <div className="text-balance text-center text-sm select-none pt-2">
                    Design Skills
                  </div>
                </div>
              </>
            )}

            {expandedDiv === 1 && (
              <div className="flex absolute top-0 gap-2">
                <SkillsList x={0} y={17} />
              </div>
            )}

            {expandedDiv === 2 && (
              <div className="flex absolute top-0 gap-1">
                <div className="w-[6.5em] h-28 flex flex-col pt-2 items-center rounded-md hover:bg-white hover:bg-opacity-20">
                  <img
                    src="/images/folders/communication.png"
                    alt="Communication"
                    className="w-12 h-12"
                  />
                  <div className="text-pretty text-center text-sm select-none pt-2">
                    Communication
                  </div>
                </div>
                <div className="w-[6em] h-28 flex flex-col pt-2 items-center rounded-md hover:bg-white hover:bg-opacity-20">
                  <img
                    src="/images/folders/teamwork.png"
                    alt="Teamwork"
                    className="w-12 h-12"
                  />
                  <div className="text-pretty text-center text-sm select-none pt-2">
                    Teamwork
                  </div>
                </div>
                <div className="w-[5em] h-28 flex flex-col pt-2 items-center rounded-md hover:bg-white hover:bg-opacity-20">
                  <img
                    src="/images/folders/problem.png"
                    alt="Problem"
                    className="w-12 h-12"
                  />
                  <div className="text-pretty text-center text-sm select-none pt-2">
                    Problem Solving
                  </div>
                </div>
                <div className="w-[6em] h-28 flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20">
                  <img
                    src="/images/folders/management.png"
                    alt="Project"
                    className="w-12 h-12"
                  />
                  <div className="text-pretty text-center text-sm select-none pt-2">
                    Project Management
                  </div>
                </div>
              </div>
            )}

            {expandedDiv === 3 && (
              <div className="flex absolute top-0 gap-2">
                <SkillsList x={17} y={20} />
              </div>
            )}
          </div>
        );
      case "My Stuffs":
        return (
          <div className="w-full h-full overflow-y-auto p-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#666 transparent' }}>
            <div className="grid sm:grid-cols-2 gap-2">
              {githubRepos.map((repo, index) => (
                <ProjectCard key={index} repo={repo} />
              ))}
            </div>
          </div>
        );
      case "Resume":
        return (
          <main className="w-full flex flex-col items-center justify-center p-6 overflow-auto">
            <div className="text-center mb-6">
              <p className="text-sm">please hire me😭🙏</p>
              {resumeUrl && <p className="text-xs text-neutral-500">Click to view full resume</p>}
            </div>
            {resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-sm aspect-[8.5/11] rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow"
              >
                <iframe
                  title="Resume Preview"
                  src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  className="w-full h-full border-none bg-white"
                  style={{ pointerEvents: "none" }}
                />
              </a>
            ) : (
              <div className="text-center text-sm text-neutral-400 p-8 border border-dashed border-neutral-700 rounded-lg">
                <p>📄 Resume not found</p>
                <p className="mt-2 text-xs">Place your PDF at <code className="bg-neutral-800 px-2 py-1 rounded">/docs/resume.pdf</code></p>
              </div>
            )}
          </main>
        );
      default:
        return "404 not found";
    }
  };

  return (
    <main className="h-[100vh] w-full ml-2.5 mt-2">
      {renderPageContent()}
    </main>
  );
};

export default AboutMe;
