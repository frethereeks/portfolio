import type { Metadata } from "next";
import { Urbanist, Inspiration, Mulish } from "next/font/google"
import localFont from "next/font/local";
import "../globals.css";
import { Toaster } from "react-hot-toast"
import DashThemeProvider from "@/provider/DashThemeProvider";
import { AntdRegistry } from '@ant-design/nextjs-registry'
import DashLayout from "@/modules/dashboard/layout/DashLayout";
import DashImage from "@/modules/dashboard/layout/DashImage";

const eugusto = localFont({ src: "../../fonts/Eugusto.otf", variable: "--eugusto", weight: "100 900", });
const urbanist = Urbanist({ subsets: ["latin"], variable: "--urbanist", weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], fallback: ["cursive"] });
const inspiration = Inspiration({ subsets: ["latin"], variable: "--inspiration", weight: "400", fallback: ["Helvetica", "Arial", "sans-serif"] });
export const mulish = Mulish({ subsets: ["latin"], variable: "--mulish", weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"], fallback: ["Helvetica", "Arial", "sans-serif"] });

export const metadata: Metadata = {
    title: "Frederick Portfolio :: Dashboard",
    description: "Frederick is a senior software developer with extensive experience in software development, infrastructure and architecture using in HTML, CSS, SaSS, TailwindCSS, Javascript, Typescript, React, NextJS, Vue, Nuxt, NodeJS, Laravel, PHP, MySQL, MongoDB, AWS, git, github, vercel, VPS, docker and many more.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <body className={`${eugusto.variable} ${mulish.variable} ${inspiration.variable} ${urbanist.variable} antialiased font-urbanist relative`}>
                <AntdRegistry>
                    <DashThemeProvider>
                        <Toaster />
                        <DashLayout image={<DashImage />}>
                            <div className="font-mulish min-h-[80vh]"> {children} </div>
                        </DashLayout>
                    </DashThemeProvider>
                </AntdRegistry>
            </body>
        </html>
    );
}
