import { FolioAdmin } from "@prisma/client";
import { Avatar } from "antd";
import { ColumnsType } from "antd/es/table";
import moment from "moment";

export const ADMIN_COLUMN = (): ColumnsType<FolioAdmin> => [
    {
        key: "Admin Details",
        title: "Admin Details",
        render: (_, val) => (
            <div className="flex items-center gap-2">
                <Avatar shape="circle" src={val.image} size={"small"} className="flex-shrink-0" />
                <p className="flex-1 text-text text-default font-bold">{val.firstname} {val.lastname}</p>
            </div>
        )
    },
    {
        key: "Email",
        title: "Email",
        render: (_, val) => (
            <div className="flex items-center gap-2">
                <p className="flex-1 text-text opacity-70 text-xsmall font-medium">{val.email}</p>
            </div>
        )
    },
    {
        key: "Status",
        title: "Status",
        render: (_, val) => (
            <div className="flex items-center gap-2">
                <p className="flex-1 text-text opacity-70 text-xsmall font-medium">{val.status}</p>
            </div>
        )
    },
    {
        key: "Projects Created",
        title: "Projects Created",
        render: (_, val) => (
            <div className="flex items-center gap-2">
                <p className="flex-1 text-text opacity-70 text-xsmall font-medium">{val.status}</p>
            </div>
        )
    },
    {
        key: "Date Registered",
        title: "Date Registered",
        render: (_, val) => (
            <div className="flex items-center gap-2">
                <p className="flex-1 text-text opacity-70 text-xsmall font-medium">{moment(val.createdAt).format("YYYY-MM-DD")}</p>
            </div>
        )
    },
    {
        key: "Last Login",
        title: "Last Login",
        render: (_, val) => (
            <div className="flex items-center gap-2">
                <p className="flex-1 text-text opacity-70 text-xsmall font-medium">{moment(val.updatedAt).format("YYYY-MM-DD")}</p>
            </div>
        )
    },
]