type TImage = {
    public_url: string
    private_url?: string
}

export type TProjectProps = {
    id: string;
    images: TImage[];
    slug: string;
    name: string
    type: string
    link: string
    stack: string[]
    description: string
    featured: boolean
    visible: boolean
}

export const projectData: TProjectProps[] =
    [
        {
            id: "8239z6nzxa9250",
            images: [
                {
                    public_url: "Tuwo_image.jpg",
                }
            ],
            slug: "tuwo-chinkafa-black-soup",
            name: "Tuwo Chinkafa & Black Soup",
            description: "A unique combination of protein and carbohydrate, yam and egg is a delicious food eaten by native Nigerian to get their day started on an elegant note.",
            link: "https://tuwo.netlify.app/",
            featured: false,
            visible: true,
            stack: ["NextJS", "Tailwind", "Redux Toolkit", "NodeJS", "MySQL"],
            type: "Full Stack"
        },
        {
            id: "8239z6nzxa9251",
            images: [
                {
                    public_url: "Yam_image.jpg",
                }
            ],
            slug: "yam-egg-sauce",
            name: "Yam & Egg Sauce",
            description: "A unique combination of protein and carbohydrate, yam and egg is a delicious food eaten by native Nigerian to get their day started on an elegant note.",
            link: "https://yam.netlify.app/",
            featured: false,
            visible: true,
            stack: ["NextJS", "Tailwind", "Redux Toolkit", "NodeJS", "MySQL"],
            type: "Front End"
        },
        {
            id: "8239z6nzxa9252",
            images: [
                {
                    public_url: "Akpu_image.jpg",
                }
            ],
            slug: "akpu-white-soup",
            name: "Akpu & White Soup",
            description: "White soup is a dish from the Eastern part of Nigeria. It is a rich-soup populated with assorted fish and meat components geared at enhancing the eating experience of whoever takes it on.",
            link: "https://akpu.netlify.app/",
            featured: false,
            visible: true,
            stack: ["NextJS", "Tailwind", "Redux Toolkit", "NodeJS", "MySQL"],
            type: "Full Stack"
        },
        {
            id: "8239z6nzxa9253",
            images: [
                {
                    public_url: "Rice_image.jpg",
                }
            ],
            slug: "porridge-beans-friend-yam",
            name: "Porridge Beans & Fried Yam",
            description: "When it comes to a sure fire balanced diet, porridge beans, fried yam with a chilly pepper sauce has been known to bring out the best in people. For an experience of what cloud this combination can take you, try it out with us today.",
            link: "https://porridge.netlify.app/",
            featured: false,
            visible: true,
            stack: ["NextJS", "Tailwind", "Redux Toolkit", "NodeJS", "MySQL"],
            type: "Back End"
        },
        {
            id: "8239z6nzxa92534",
            images: [
                {
                    public_url: "Rice_image.jpg",
                }
            ],
            slug: "porridge-beans-friend-yam",
            name: "Porridge Beans & Fried Yam1",
            description: "When it comes to a sure fire balanced diet, porridge beans, fried yam with a chilly pepper sauce has been known to bring out the best in people. For an experience of what cloud this combination can take you, try it out with us today.",
            link: "https://porridge.netlify.app/",
            featured: false,
            visible: true,
            stack: ["NextJS", "Tailwind", "Redux Toolkit", "NodeJS", "MySQL"],
            type: "Full Stack"
        },
        {
            id: "8239z6nzxa92535",
            images: [
                {
                    public_url: "Rice_image.jpg",
                }
            ],
            slug: "porridge-beans-friend-yam",
            name: "Porridge Beans & Fried Yam2",
            description: "When it comes to a sure fire balanced diet, porridge beans, fried yam with a chilly pepper sauce has been known to bring out the best in people. For an experience of what cloud this combination can take you, try it out with us today.",
            link: "https://porridge.netlify.app/",
            featured: false,
            visible: true,
            stack: ["NextJS", "Tailwind", "Redux Toolkit", "NodeJS", "MySQL"],
            type: "Full Stack"
        },
        {
            id: "8239z6nzxa92536",
            images: [
                {
                    public_url: "Rice_image.jpg",
                }
            ],
            slug: "porridge-beans-friend-yam",
            name: "Porridge Beans & Fried Yam3",
            description: "When it comes to a sure fire balanced diet, porridge beans, fried yam with a chilly pepper sauce has been known to bring out the best in people. For an experience of what cloud this combination can take you, try it out with us today.",
            link: "https://porridge.netlify.app/",
            featured: false,
            visible: true,
            stack: ["NextJS", "Tailwind", "Redux Toolkit", "NodeJS", "MySQL"],
            type: "Full Stack"
        },
        {
            id: "8239z6nzxa92537",
            images: [
                {
                    public_url: "Rice_image.jpg",
                }
            ],
            slug: "porridge-beans-friend-yam",
            name: "Porridge Beans & Fried Yam4",
            description: "When it comes to a sure fire balanced diet, porridge beans, fried yam with a chilly pepper sauce has been known to bring out the best in people. For an experience of what cloud this combination can take you, try it out with us today.",
            link: "https://porridge.netlify.app/",
            featured: false,
            visible: true,
            stack: ["NextJS", "Tailwind", "Redux Toolkit", "NodeJS", "MySQL"],
            type: "Front End"
        },
        {
            id: "8239z6nzxa92538",
            images: [
                {
                    public_url: "Rice_image.jpg",
                }
            ],
            slug: "porridge-beans-friend-yam",
            name: "Porridge Beans & Fried Yam5",
            description: "When it comes to a sure fire balanced diet, porridge beans, fried yam with a chilly pepper sauce has been known to bring out the best in people. For an experience of what cloud this combination can take you, try it out with us today.",
            link: "https://porridge.netlify.app/",
            featured: false,
            visible: true,
            stack: ["NextJS", "Tailwind", "Redux Toolkit", "NodeJS", "MySQL"],
            type: "Full Stack"
        },
        {
            id: "8239z6nzxa92539",
            images: [
                {
                    public_url: "Rice_image.jpg",
                }
            ],
            slug: "porridge-beans-friend-yam",
            name: "Porridge Beans & Fried Yam6",
            description: "When it comes to a sure fire balanced diet, porridge beans, fried yam with a chilly pepper sauce has been known to bring out the best in people. For an experience of what cloud this combination can take you, try it out with us today.",
            link: "https://porridge.netlify.app/",
            featured: false,
            visible: true,
            stack: ["NextJS", "Tailwind", "Redux Toolkit", "NodeJS", "MySQL"],
            type: "Full Stack"
        },
        {
            id: "8239z6nzxa925390",
            images: [
                {
                    public_url: "Rice_image.jpg",
                }
            ],
            slug: "porridge-beans-friend-yam",
            name: "Porridge Beans & Fried Yam7",
            description: "When it comes to a sure fire balanced diet, porridge beans, fried yam with a chilly pepper sauce has been known to bring out the best in people. For an experience of what cloud this combination can take you, try it out with us today.",
            link: "https://porridge.netlify.app/",
            featured: false,
            visible: true,
            stack: ["NextJS", "Tailwind", "Redux Toolkit", "NodeJS", "MySQL"],
            type: "Full Stack"
        },
        {
            id: "8239z6nzxa925391",
            images: [
                {
                    public_url: "Rice_image.jpg",
                }
            ],
            slug: "porridge-beans-friend-yam",
            name: "Porridge Beans & Fried Yam8",
            description: "When it comes to a sure fire balanced diet, porridge beans, fried yam with a chilly pepper sauce has been known to bring out the best in people. For an experience of what cloud this combination can take you, try it out with us today.",
            link: "https://porridge.netlify.app/",
            featured: false,
            visible: true,
            stack: ["NextJS", "Tailwind", "Redux Toolkit", "NodeJS", "MySQL"],
            type: "Full Stack"
        },
        {
            id: "8239z6nzxa925392",
            images: [
                {
                    public_url: "Rice_image.jpg",
                }
            ],
            slug: "porridge-beans-friend-yam",
            name: "Porridge Beans & Fried Yam9",
            description: "When it comes to a sure fire balanced diet, porridge beans, fried yam with a chilly pepper sauce has been known to bring out the best in people. For an experience of what cloud this combination can take you, try it out with us today.",
            link: "https://porridge.netlify.app/",
            featured: false,
            visible: true,
            stack: ["NextJS", "Tailwind", "Redux Toolkit", "NodeJS", "MySQL"],
            type: "Full Stack"
        },
        {
            id: "8239z6nzxa925393",
            images: [
                {
                    public_url: "Rice_image.jpg",
                }
            ],
            slug: "porridge-beans-friend-yam",
            name: "Porridge Beans & Fried Yam10",
            description: "When it comes to a sure fire balanced diet, porridge beans, fried yam with a chilly pepper sauce has been known to bring out the best in people. For an experience of what cloud this combination can take you, try it out with us today.",
            link: "https://porridge.netlify.app/",
            featured: false,
            visible: true,
            stack: ["NextJS", "Tailwind", "Redux Toolkit", "NodeJS", "MySQL"],
            type: "Full Stack"
        },
        {
            id: "8239z6nzxa925394",
            images: [
                {
                    public_url: "Rice_image.jpg",
                }
            ],
            slug: "porridge-beans-friend-yam",
            name: "Porridge Beans & Fried Yam11",
            description: "When it comes to a sure fire balanced diet, porridge beans, fried yam with a chilly pepper sauce has been known to bring out the best in people. For an experience of what cloud this combination can take you, try it out with us today.",
            link: "https://porridge.netlify.app/",
            featured: false,
            visible: true,
            stack: ["NextJS", "Tailwind", "Redux Toolkit", "NodeJS", "MySQL"],
            type: "Full Stack"
        },
        {
            id: "8239z6nzxa925395",
            images: [
                {
                    public_url: "Rice_image.jpg",
                }
            ],
            slug: "porridge-beans-friend-yam",
            name: "Porridge Beans & Fried Yam12",
            description: "When it comes to a sure fire balanced diet, porridge beans, fried yam with a chilly pepper sauce has been known to bring out the best in people. For an experience of what cloud this combination can take you, try it out with us today.",
            link: "https://porridge.netlify.app/",
            featured: false,
            visible: true,
            stack: ["NextJS", "Tailwind", "Redux Toolkit", "NodeJS", "MySQL"],
            type: "Full Stack"
        },
        {
            id: "8239z6nzxa925396",
            images: [
                {
                    public_url: "Rice_image.jpg",
                }
            ],
            slug: "porridge-beans-friend-yam",
            name: "Porridge Beans & Fried Yam13",
            description: "When it comes to a sure fire balanced diet, porridge beans, fried yam with a chilly pepper sauce has been known to bring out the best in people. For an experience of what cloud this combination can take you, try it out with us today.",
            link: "https://porridge.netlify.app/",
            featured: false,
            visible: true,
            stack: ["NextJS", "Tailwind", "Redux Toolkit", "NodeJS", "MySQL"],
            type: "Full Stack"
        },
    ]