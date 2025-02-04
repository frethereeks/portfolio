import { TProjectProps } from "@/types";
import { TableColumnsType } from "antd";
// import { ItemType } from "antd/es/menu/interface";
import Image from "next/image";

export const PROJECT_COLUMNS = (): TableColumnsType<TProjectProps> => {
    return [
        {
            key: "Product Details",
            title: "Product Details",
            render: (_, val) => (
                <div className="flex gap-2 items-center flex-1">
                    <div className="h-10 w-10 md:h-12 md:w-12 flex-shrink-0 relative bg-primary rounded-md overflow-hidden">
                        <Image src={val.image} alt={val.name} fill className="absolute left-0 top-0 h-full w-full rounded-md object-cover flex-shrink-0" />
                    </div>
                    <div className="flex flex-col text-secondary">
                        <h4 className="text-sm md:text-base font-semibold whitespace-nowrap text-primary">{val.name}</h4>
                    </div>
                </div>
            )
        },
        {
            key: "Stack",
            title: "Stack",
            render: (_, val) => (
                <p className="text-xs md:text-sm text-dark/60 opacity-70 font-medium">&#8358;{val.stack}</p>
            )
        },
        {
            key: "Category",
            title: "Category",
            render: (_, val) => (
                <p className="text-xs md:text-sm text-dark/60 opacity-70 font-medium">{val.category.name}</p>
            )
        },
        {
            key: "Featured",
            title: "Featured",
            render: (_, val) => (
                <span>{(val.featured ? "True" : "False")}</span>
            )
        },
        {
            key: "Visible",
            title: "Visible",
            render: (_, val) => (
                <button className={`py-1 px-4 ${val.visible ? 'text-teal-700 bg-teal-100' : 'text-text bg-grey/60'} rounded-[2rem] text-xs`}>
                    {val.visible ? "Visible" : "Hidden"}
                </button>
            )
        },
        {
            key: "Date Added",
            title: "Date Added",
            render: (_, val) => (
                <span>{new Date(val.createdAt!).toDateString()}</span>
            )
        },
        // {
        //     key: "Action",
        //     title: "Action",
        //     colSpan: 2,
        //     render: (_, val) => (
        //         <aside className="flex-1 flex justify-center gap-4" >
        //             {action(val.id)}
        //         </aside>
        //     )
        // },
    ]
}
