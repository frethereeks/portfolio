import { BiLogoAws, BiLogoCss3, BiLogoDocker, BiLogoFigma, BiLogoFirebase, BiLogoGithub, BiLogoHtml5, BiLogoJavascript, BiLogoMongodb, BiLogoNodejs, BiLogoPhp, BiLogoPostgresql, BiLogoReact, BiLogoRedux, BiLogoSass, BiLogoTailwindCss, BiLogoTypescript, BiLogoVuejs } from "react-icons/bi";

export type TSkillProps = {
    id: string;
    name: string
    icon: JSX.Element;
}

export const skillsData: TSkillProps[] =
    [
        {
            id: "8239z6nzxa9248",
            name: "HTML5",
            icon: <BiLogoHtml5 />
        },
        {
            id: "8239z6nzxa9249",
            name: "CSS3",
            icon: <BiLogoCss3 />
        },
        {
            id: "8239z6nzxa9250",
            name: "SaSS",
            icon: <BiLogoSass />
        },
        {
            id: "8239z6nzxa9251",
            name: "TailwindCSS",
            icon: <BiLogoTailwindCss />
        },
        {
            id: "8239z6nzxa9252",
            name: "Javascript",
            icon: <BiLogoJavascript />
        },
        {
            id: "8239z6nzxa9253",
            name: "Typescript",
            icon: <BiLogoTypescript />
        },
        {
            id: "8239z6nzxa92534",
            name: "React",
            icon: <BiLogoReact />
        },
        {
            id: "8239z6nzxa92535",
            name: "NextJS",
            icon: <BiLogoJavascript />
        },
        {
            id: "8239z6nzxa92536",
            name: "VueJS",
            icon: <BiLogoVuejs />
        },
        {
            id: "8239z6nzxa92537",
            name: "NodeJS",
            icon: <BiLogoNodejs />
        },
        {
            id: "8239z6nzxa92538",
            name: "PHP",
            icon: <BiLogoPhp />
        },
        {
            id: "8239z6nzxa92539",
            name: "MongoDB",
            icon: <BiLogoMongodb />
        },
        {
            id: "8239z6nzxa925390",
            name: "Docker",
            icon: <BiLogoDocker />
        },
        {
            id: "8239z6nzxa925391",
            name: "Github",
            icon: <BiLogoGithub />
        },
        {
            id: "8239z6nzxa925392",
            name: "AWS",
            icon: <BiLogoAws />
        },
        {
            id: "8239z6nzxa925393",
            name: "Figma",
            icon: <BiLogoFigma />
        },
        {
            id: "8239z6nzxa925394",
            name: "Firebase",
            icon: <BiLogoFirebase />
        },
        {
            id: "8239z6nzxa925395",
            name: "Postgresql",
            icon: <BiLogoPostgresql />
        },
        {
            id: "8239z6nzxa925396",
            name: "Redux",
            icon: <BiLogoRedux />
        },
    ]