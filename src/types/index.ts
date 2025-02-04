import { PortCategory, PortProject, PortContact, PortAdmin, PortLogger } from "@prisma/client"

export type TCategory = Pick<PortCategory, "id" | "name" | "status" | "createdAt" | "adminId" | "updatedAt">
export type TProject = Pick<PortProject, "id" | "name" | "slug" | "image" | "link" | "stack" | "visible" | "description" | "featured" | "categoryId" | "createdAt" | "adminId">
export type TActivity = Pick<PortLogger, "id" | "email" | "message" | "status" | "userId" | "createdAt" | "updatedAt">
export type TAdmin = Pick<PortAdmin, "id" | "firstname" | "lastname" | "email" | "image" | "password" | "role" | "status" | "token" | "createdAt">
export type TContactProps = Pick<PortContact, "id" | "fullname" | "message" | "email" | "phone" | "createdAt" | "updatedAt">

export type TCategoryProps = {
    admin: {
        id: string, firstname: string, lastname: string
    },
    project: {
        id: string, name: string
    }[]
} & PortCategory

export type TProjectProps = {
    user: Pick<TAdmin, "id" | "firstname" | "lastname">,
    category: Pick<TCategory, "name">,
} & TProject

export type TAdminProps = {
    project: Pick<TProject, "id">[]
    category: Pick<TCategory, "id">[],
} & TAdmin


