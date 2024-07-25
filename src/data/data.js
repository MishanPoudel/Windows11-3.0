import {
  JavascriptOriginal,
  PythonOriginal,
  Html5Original,
  Css3Original,
  ExpressOriginal,
  ReactOriginal,
  NextjsOriginal,
  TailwindcssOriginal,
  BootstrapPlain,
  NodejsOriginal,
  MongodbPlain,
  PostmanPlain,
  CPlain,
} from "devicons-react";

export const githubProjectsURL =
  "https://api.github.com/users/MishanPoudel/repos";

const githubLink = "https://github.com/MishanPoudel";

export const profileDescription = [
  "Hello, I'm Mishan Poudel, an experienced front-end web developer specializing in crafting seamless and dynamic user experiences. With expertise in HTML, CSS, JavaScript, and modern frameworks like React and Next.js, I bring innovative designs to life and ensure they perform flawlessly across all devices. Let's create exceptional web experiences together!",
];

export const workExperienceTemplate = [
  {
    key: 1,
    company: "", // Add company name here
    description: [
      "", // Add description points here
    ],
    duration: "", // Add duration here
    designation: "", // Add designation here
    type: "work",
  },
];

export const githubRepos = [
  {
    name: "Portfolio",
    techUsed: ["Next.js", "TailwindCSS"],
    description: "Uncover deeper insights into my journey and capabilities.",
    githubLink: `${githubLink}/Portfolio`,
    liveURL: "https://portfolio-vert-one-79.vercel.app/",
  },
  {
    name: "Emoji-TicTacToe",
    techUsed: ["React", "TailwindCSS"],
    description:
      "Emoji TicTacToe adds a fun twist to the classic game with colorful emojis, offering single and local multiplayer modes, responsive design, and captivating animations.",
    githubLink: `${githubLink}/Emoji-TicTacToe`,
    liveURL: "https://emoji-tic-tac-toe.vercel.app/",
  },
  {
    name: "GTA-VI(Early Access)",
    techUsed: ["Python"],
    description:
      "Explore chaos in GTA VI(Early Access), a Python and Ursina-powered open-world adventure. Engage in a gripping narrative, experience dynamic gameplay, and unlock exclusive updates. Navigate the urban jungle and gear up for the thrill! ",
    githubLink: `${githubLink}/GTA-VI-Early-Access-`,
    liveURL: `${githubLink}/GTA-VI-Early-Access-`,
  },
  {
    name: "NYX",
    techUsed: ["HTML", "CSS", "JavaScript"],
    description:
      "NYX is a sleek Website Blocker that empowers users to block distracting websites for set durations, promoting productivity and focus.",
    githubLink: `${githubLink}/nyx`,
    liveURL: `${githubLink}/nyx`,
  },
];

export const educationExperience = [
  {
    key: 1,
    institution: "Kathmandu Valley College",
    graduation: "May 2023",
    degree: "XII",
    type: "education",
  },
  {
    key: 2,
    institution: "Little Angels' School",
    graduation: "Aug 2021",
    degree: "X",
    type: "education",
  },
];

export const navLinks = [
  {
    key: 1,
    link: "home",
    url: "/",
  },
  {
    key: 2,
    link: "experience",
    url: "/experience",
  },
  {
    key: 3,
    link: "projects",
    url: "/projects",
  },
];

const iconSize = 15;
const iconClass = "mx-auto";

export const skills = [
  {
    key: 1,
    name: "Python",
    type: "language",
    icon: PythonOriginal ? (
      <PythonOriginal className={iconClass} size={iconSize} />
    ) : null,
  },
  {
    key: 2,
    name: "JavaScript",
    type: "language",
    icon: JavascriptOriginal ? (
      <JavascriptOriginal className={iconClass} size={iconSize} />
    ) : null,
  },
  {
    key: 3,
    name: "HTML",
    type: "language",
    icon: Html5Original ? (
      <Html5Original className={iconClass} size={iconSize} />
    ) : null,
  },
  {
    key: 4,
    name: "CSS",
    type: "language",
    icon: Css3Original ? (
      <Css3Original className={iconClass} size={iconSize} />
    ) : null,
  },
  {
    key: 5,
    name: "React",
    type: "framework",
    icon: ReactOriginal ? (
      <ReactOriginal className={iconClass} size={iconSize} />
    ) : null,
  },
  {
    key: 6,
    name: "Next.js",
    type: "framework",
    icon: NextjsOriginal ? (
      <NextjsOriginal className={iconClass} size={iconSize} />
    ) : null,
  },
  {
    key: 7,
    name: "TailwindCSS",
    type: "framework",
    icon: TailwindcssOriginal ? (
      <TailwindcssOriginal className={iconClass} size={iconSize} />
    ) : null,
  },
  {
    key: 10,
    name: "Bootstrap",
    type: "framework",
    icon: BootstrapPlain ? (
      <BootstrapPlain className={iconClass} size={iconSize} />
    ) : null,
  },
  {
    key: 11,
    name: "Node.JS",
    type: "framework",
    icon: NodejsOriginal ? (
      <NodejsOriginal className={iconClass} size={iconSize} />
    ) : null,
  },
  {
    key: 12,
    name: "MongoDB",
    type: "database",
    icon: MongodbPlain ? (
      <MongodbPlain className={iconClass} size={iconSize} />
    ) : null,
  },
  {
    key: 13,
    name: "Postman",
    type: "tool",
    icon: PostmanPlain ? (
      <PostmanPlain className={iconClass} size={iconSize} />
    ) : null,
  },
  {
    key: 14,
    name: "C",
    type: "language",
    icon: CPlain ? <CPlain className={iconClass} size={iconSize} /> : null,
  },
  {
    key: 15,
    name: "Express",
    type: "framework",
    icon: ExpressOriginal ? (
      <ExpressOriginal className={iconClass} size={iconSize} />
    ) : null,
  },
];
export const socialMediaLinks = {
  linkedin: "https://www.linkedin.com/in/mishanpoudel/",
  github: githubLink,
};
