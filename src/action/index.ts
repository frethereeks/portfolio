"use server"

import { IDENTIFIED_TABLES } from "@/constants";
import { generateSlug } from "@/lib";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { appRoutePaths } from "@/routes/paths";
import { TCategory, TProjectProps, TContactProps, TAdminProps } from "@/types";
import { $Enums, PortProject, } from "@prisma/client";
import bcryptjs from "bcryptjs"
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import nodeMailer from "nodemailer"

export const fetchUser = async () => {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const data = await prisma.portAdmin.findFirst({
        where: {
            email: user?.email?.toLowerCase() as string
        },
    })
    // if (!data) {
    //     signOut()
    //     redirect(appRoutePaths.signin)
    // }
    return data;
}

// common form data
const adminData = (data: FormData) => ({
    firstname: data?.get("firstname")?.valueOf() as string,
    lastname: data?.get("lastname")?.valueOf() as string,
    email: data?.get("email")?.valueOf() as string,
    image: data?.get("image")?.valueOf() as string || "",
    plainPassword: data?.get("password")?.valueOf() as string,
    role: data?.get("role")?.valueOf() as $Enums.PortRole || "ROOT",
})

// const saleData = (data: FormData) => ({
//     food: Number(data?.get("food")?.valueOf() as string),
//     drink: Number(data?.get("drink")?.valueOf() as string),
//     alcohol: Number(data?.get("alcohol")?.valueOf() as string),
//     createdAt: data?.get("createdAt")?.valueOf() as string,
// })

const projectData = (data: FormData) => ({
    name: data?.get("name")?.valueOf() as string,
    link: data?.get("link")?.valueOf() as string,
    image: data?.get("image")?.valueOf() as string,
    popular: data?.get("popular")?.valueOf() as boolean,
    status: data?.get("status")?.valueOf() as $Enums.PortStatus,
    description: data?.get("description")?.valueOf() as string,
    categoryId: data?.get("categoryId")?.valueOf() as string,
    visible: data?.get("visible")?.valueOf() as boolean,
    featured: data?.get("featured")?.valueOf() as boolean,
    stack: data?.get("stack")?.valueOf() as string,
})

export const createAdmin = async (data: FormData) => {
    const { firstname, lastname, email, plainPassword, role, } = adminData(data)
    // }
    const salt = await bcryptjs.genSalt(10)
    const password = await bcryptjs.hash(plainPassword, salt)
    const imageList = ["/profile1.png", "/profile2.png", "/profile3.png", "/profile4.png", "/profile5.png",
    ]
    const image = Math.random() > 0.8 ? imageList[0] : Math.random() > 0.6 ? imageList[1] : Math.random() > 0.4 ? imageList[2] : Math.random() > 0.2 ? imageList[3] : imageList[4]
    // check duplicates
    const alreadyExists = await prisma.portAdmin.findFirst({
        where: { email: email.toLowerCase(), }
    })
    if (alreadyExists) {
        return {
            error: true, message: `A user already exists with the same email`
        }
    }
    try {
        await prisma.portAdmin.create({
            data: {
                firstname, lastname, email, password, role, image, token: ""
            }
        })
        return { error: false, message: `New User Created Successfully. Please, check your email to complete the registration`, }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to create this user account`, }
    }

}

export const createCategory = async (data: FormData) => {
    const user = await fetchUser()
    const name = data?.get("name")?.valueOf() as string;
    // check duplicates
    const alreadyExists = await prisma.portCategory.findFirst({
        where: { name: name.toLowerCase(), }
    })
    if (alreadyExists) {
        return {
            error: true, message: `A category already exists with the same name`
        }
    }
    try {
        await prisma.portCategory.create({
            data: {
                name, adminId: user?.id!
            }
        })
        return { error: false, message: `New Category Created Successfully.`, }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to create this category. Please, try again`, }
    }

}

export const createMessage = async (data: FormData) => {
    const fullname = data?.get("fullname")?.valueOf() as string;
    const email = data?.get("email")?.valueOf() as string;
    const message = data?.get("message")?.valueOf() as string;
    const phone = data?.get("phone")?.valueOf() as string;

    try {
        await prisma.portContact.create({
            data: {
                fullname, email, message, phone
            }
        })
        revalidatePath(appRoutePaths.contact)
        return { error: false, message: `Message has been Sent Successfully.`, }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to send message. Please, try again later`, }
    }
}

export const createProject = async (data: FormData) => {
    const user = await fetchUser()
    const { name, link, image, description, categoryId, visible, featured, stack } = projectData(data)
    const slug = generateSlug(name)
    // check duplicates
    const alreadyExists = await prisma.portProject.findFirst({
        where: {
            AND: [{ name: name.toLowerCase(), categoryId }]
        }
    })
    if (alreadyExists) {
        return {
            error: true, message: `A menu already exists with the same name under this category`
        }
    }
    try {
        await prisma.portProject.create({
            data: {
                name, slug, link, image, description, categoryId, adminId: user?.id!, visible, featured, stack, 
            }
        })
        revalidatePath(appRoutePaths.adminproject)
        return { error: false, message: `New Menu Record Created Successfully.`, }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to create this menu record`, }
    }
}

// ACCOUNT RESET
export const handleReset = async (email: string) => {
    const validMail = await prisma.portAdmin.findFirst({ where: { email } })
    if (!validMail) return { error: true, message: `We do not have a member with this email...Please, confirm and try again` };
    try {
        const token = randomUUID()
        const html = `
              <section style="max-width: 40rem; width: 100%; margin: 0 auto; padding: 2rem;" className="flex flex-col">
                  <div className="flex gap-1">
                  <div style="background: rgb(59, 130, 246); font-size: 2rem; color: white; text-align: center; padding: 2rem 1rem;" className="h-10 w-10 rounded-full bg-primary flex-shrink-0">Password Reset</div>
                      <div style="padding: 1rem;" className="flex flex-col flex-1">
                      <p style="color: rgb(100,116,139); font-size: 1rem; line-height: 1.8;" className="text-xs text-slate-500">We have received your request to reset your password. If you indeed initiated the action, click the link below:</p>
                          <a href='http://localhost:3000/auth/reset?email=${email}&token=${token}' target="_blank" style="background: rgb(59, 130, 246); padding: 1rem 2rem; width: max-content; margin: 0 auto; color: white; font-weight: bold; font-size: 1.125rem; line-height: 1.6rem;" className="font-bold text-slate-600 text-lg">View our Trending Courses</a>
                      </div>
                      <p style="color: rgb(100,116,139); font-size: .65rem; padding: 1rem; text-align:center; line-height: 1.25rem;" className="text-xs text-slate-700 text-center py-2">If you did not initiate this action. Simply ignore this message.</p>
                  </div>
              </section>
          `;
        console.log({ html })
        // const transport = nodeMailer.createTransport({
        //     host: process.env.MAIL_HOST,
        //     port: 465,
        //     secure: true,
        //     auth: {
        //         user: process.env.MAIL_USERNAME,
        //         pass: process.env.MAIL_PASSWORD
        //     }
        // })

        // transport.sendMail({
        //     from: `EDIMCS.ng <${process.env.MAIL_FROM}>`,
        //     to: email,
        //     // bcc: 'EDIMCS Password Reset <fakemail@gmail.com>',
        //     replyTo: 'EDIMCS No Reply <no-reply@edimcs.com>',
        //     subject: 'EDIMCS Password Reset Request',
        //     html
        // }, (err) => {
        //     if (err) {
        //         return { error: true, message: `Something went wrong. We could not send the mail...Please, try again` };
        //     }
        // })
        // await prisma.portAdmin.update({
        //     where: { email },
        //     data: { token }
        // })
        revalidatePath(appRoutePaths.signIn)
        return { error: false, message: `Password Reset Link has been sent to your email...` };
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Something went wrong. We could not send the mail...Please, try again` };
    }
}

export const handlePasswordReset = async (data: FormData) => {
    const email = data.get("email")?.valueOf() as string
    const plainPassword = data.get("password")?.valueOf() as string
    const salt = await bcryptjs.genSalt(10)
    const password = await bcryptjs.hash(plainPassword, salt)
    const validMail = await prisma.portAdmin.findFirst({ where: { email } })
    if (!validMail) return { error: true, message: `We do not have a member with this email...Please, confirm and try again` };
    try {
        await prisma.portAdmin.update({
            where: { email },
            data: { password, token: "" }
        })
        revalidatePath("/auth/reset")
        return { error: false, message: `Password Reset Link was successfully.` };
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Something went wrong. We could not complete your request...Please, try again` };
    }
}

export const handleTokenVerification = async (email: string, token: string) => {
    try {
        const validMail = await prisma.portAdmin.findFirst({ where: { email, token } })
        if (!validMail) return { error: true, message: `We do not have an account with these details...Perhaps, this is an old link` };
        else return { error: false, message: `Success! Please, complete the process by choosing a new password` };
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Something went wrong. We could not complete your request...Please, try again` };
    }
}

// FETCH LOGICS
export const fetchAdmins = async () => {
    const user = await fetchUser()
    try {
        let data = await prisma.portAdmin.findMany({
            include: {
                Project: { select: { id: true } },
                Category: { select: { id: true }}
            },
            orderBy: { createdAt: "desc" }
        }) as unknown as TAdminProps[]
        data = user?.role === "ROOT" ? data : data.filter((el) => el.role !== "ROOT")
        return { error: false, message: `Record Retrieved Successfully.`, data, role: user?.role }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to fetch this record`, }
    }
}

export const fetchSales = async () => {
    const user = await fetchUser()
    try {
        const data = await prisma.portContact.findMany({
            orderBy: { createdAt: "desc" }
        }) as TContactProps[]
        return { error: false, message: `Record Retrieved Successfully.`, data, role: user?.role }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to fetch this record`, }
    }
}

export const fetchDashboardData = async () => {
    const user = await fetchUser()
    try {
        const [sales, menu, users, category] = await prisma.$transaction([
            prisma.portContact.findMany({ select: { id: true } }),
            prisma.portProject.findMany({ select: { id: true, visible: true, featured: true } }),
            prisma.portAdmin.findMany({ select: { id: true, status: true, role: true } }),
            prisma.portCategory.findMany({
                include: {
                    project: { select: { id: true, name: true } },
                    admin: { select: { firstname: true, lastname: true, id: true } },
                },
                orderBy: { createdAt: "desc" }
            })
        ])
        return { error: false, message: `Record Retrieved Successfully.`, data: { sales, menu, users, category, user }, role: user?.role }
    } catch (error) {
        console.log('error', error)
        return { error: true, message: `Unable to fetch this record`, }
    }
}

export const fetchMessage = async () => {
    const user = await fetchUser()
    try {
        const data = await prisma.portContact.findMany({
            orderBy: { createdAt: "desc" }
        })
        return { error: false, message: `Record Retrieved Successfully.`, data, role: user?.role }
    } catch (error) {
        console.log('error', error)
        return { error: true, message: `Unable to fetch this record`, }
    }
}

export const fetchProjects = async () => {
    const user = await fetchUser()
    try {
        const data = await prisma.portProject.findMany({
            include: {
                category: {select: { name: true, }},
                Admin: { select: { firstname: true, lastname: true, id: true } },
            },
            orderBy: { createdAt: "desc" }
        }) as unknown as TProjectProps[]
        const category = await prisma.portCategory.findMany({
            where: { status: "ACTIVE" }
        }) as TCategory[]

        return { error: false, message: `Record Retrieved Successfully.`, data: { data, category }, role: user?.role }
    } catch (error) {
        console.log('error', error)
        return { error: true, message: `Unable to fetch this record`, }
    }
}

export const fetchSearch = async (query: string) => {
    try {
        const data = await prisma.portProject.findMany({
            where: {
                OR: [
                    {
                        name: { contains: query },
                    },
                    {
                        description: { contains: query }
                    },
                    {
                        category: {
                            name: { contains: query }
                        }
                    },
                ]
            },
            include: {
                category: { select: { name: true } },
            },
            orderBy: { createdAt: "desc" }
        }) as PortProject[]

        return { error: false, message: `${data.length} result found.`, data }
    } catch (error) {
        console.log('error', error)
        return { error: true, message: `Unable to fetch this record`, }
    }
}

// GET LOGICS FOR CLIENT SIDE
export const getPageProject = async () => {
    try {
        const project = await prisma.portProject.findMany({
            include: {
                category: { select: { name: true } },
            },
            orderBy: { createdAt: "desc" }
        }) as PortProject[]
        const category = await prisma.portCategory.findMany({
            where: { status: "ACTIVE" }
        }) as TCategory[]

        return { error: false, message: `Record Retrieved Successfully.`, data: { project, category } }
    } catch (error) {
        console.log('error', error)
        return { error: true, message: `Unable to fetch this record`, }
    }
}

export const getSinglePageProject = async ({ slug }: { slug: string }) => {
    let similar;
    try {
        const project = await prisma.portProject.findFirst({
            where: { slug },
            include: {
                category: { select: { name: true } },
            },
            orderBy: { createdAt: "desc" }
        }) as (PortProject & { category: { name: string } })
        if (project) {
            similar = await prisma.portProject.findMany({
                where: {
                    categoryId: project.categoryId
                },
                take: 6
            })
        }
        else {
            similar = await prisma.portProject.findMany({
                take: 6
            })
        }
        return { error: false, message: `Record Retrieved Successfully.`, data: { project, similar } }
    } catch (error) {
        console.log('error', error)
        return { error: true, message: `Unable to fetch this record`, }
    }
}

// UPDATE LOGICS
export const updateAdmin = async (data: FormData) => {
    const id = data?.get("id")?.valueOf() as string;
    const status = data?.get("status")?.valueOf() as $Enums.PortStatus;
    const { firstname, lastname, email, plainPassword, role, image, } = adminData(data)

    const salt = await bcryptjs.genSalt(10)
    const password = await bcryptjs.hash(plainPassword, salt)
    // check duplicates
    const alreadyExists = await prisma.portAdmin.findFirst({
        where: {
            id,
            NOT: [{ email: { contains: email.toLowerCase(), } }]
        }
    })
    if (alreadyExists) {
        return {
            error: true, message: `Another user already exists with the same email`
        }
    }
    try {
        if (plainPassword !== "") {
            await prisma.portAdmin.update({
                data: { firstname, lastname, email, password, role, image, status, },
                where: { id }
            })
        }
        else {
            await prisma.portAdmin.update({
                data: { firstname, lastname, email, role, image, status, },
                where: { id }
            })
        }
        revalidatePath(appRoutePaths.admindashboard)
        return { error: false, message: `Record Updated Successfully.` }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to update this record`, }
    }
}

export const updateContact = async (data: FormData) => {
    const user = await fetchUser()
    // const { alcohol, drink, food, createdAt } = saleData(data)
    const fullname = data?.get("fullname")?.valueOf() as string;
    const email = data?.get("email")?.valueOf() as string;
    const message = data?.get("message")?.valueOf() as string;
    const phone = data?.get("phone")?.valueOf() as string;
    const status = data?.get("status")?.valueOf() as string;

    // const alreadyExists = await prisma.portContact.findFirst({
    //     where: {
    //         createdAt: new Date(createdAt).toISOString(),
    //         NOT: [{ id }]
    //     }
    // })
    // if (alreadyExists) {
    //     return {
    //         error: true, message: `There is an existing Sales Report for this Day.`
    //     }
    // }
    try {
        await prisma.portContact.update({
            data: {
                fullname, email, message, phone, status: status as $Enums.PortContactStatus,
            },
            where: { id: user.id }
        })
        return { error: false, message: `Sale Record updated Successfully.`, }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to update this record`, }
    }

}

export const updateProject = async (data: FormData) => {
    const user = await fetchUser()
    const id = data?.get("id")?.valueOf() as string
    const { name, featured, link, stack, visible, image, description, categoryId, status } = projectData(data)
    const slug = generateSlug(name)
    // check duplicates
    const alreadyExists = await prisma.portProject.findFirst({
        where: {
            AND: [{ name: name.toLowerCase(), categoryId }],
            NOT: [{ id }]
        }
    })
    if (alreadyExists) {
        return {
            error: true, message: `A project already exists with the same name under this category`
        }
    }
    try {
        await prisma.portProject.update({
            data: {
                name, slug, featured, link, stack, visible, image, description, categoryId, adminId: user?.id!,
            },
            where: { id }
        })
        revalidatePath(appRoutePaths.adminproject)
        return { error: false, message: `Menu record updated successfully.`, }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to update this menu record`, }
    }
}

/* export const updateStatus = async (payload: { id: string, status: string }, table: IDENTIFIED_TABLES) => {
    const { id, status } = payload
    try {
        switch (table) {
            case "user": {
                prisma.portAdmin.update({
                    data: { status: status as $Enums.PortStatus },
                    where: { id: id }
                })
            }
                break;
            case "menu": {
                prisma.portProject.update({
                    data: { status: status as $Enums.PortStatus },
                    where: { id: id }
                })
            }
                break;
            case "contact": {
                prisma.portContact.update({
                    data: { status: status as $Enums.ContactStatus },
                    where: { id: id }
                })
            }
                break;
            case "category": {
                prisma.portCategory.update({
                    data: { status: status as $Enums.PortStatus },
                    where: { id: id }
                })
            }
                break;

            default: return null;
        }
        
        return { error: false, message: `Record has been successfully Deleted` }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Something went wrong while attempting to make your request, please, try again.` }
    }
} */

export const updateCategory = async (data: FormData) => {
    const user = await fetchUser()
    const name = data?.get("name")?.valueOf() as string;
    const status = data?.get("status")?.valueOf() as $Enums.PortStatus;
    const id = data?.get("id")?.valueOf() as string;
    // check duplicates
    const alreadyExists = await prisma.portCategory.findFirst({
        where: {
            name: name.toLowerCase(),
            NOT: [{ id }]
        }
    })
    if (alreadyExists) {
        return {
            error: true, message: `A category already exists with the same name`
        }
    }
    try {
        await prisma.portCategory.update({
            data: {
                name, adminId: user.id, status
            },
            where: { id }
        })
        return { error: false, message: `Category Updated Successfully.`, }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to update this category. Please, try again`, }
    }

}


// DELETE ACTIONS
export const deleteEntity = async (id: string, table: IDENTIFIED_TABLES) => {
    const entityIDs = JSON.parse(id) as string[];
    try {
        switch (table) {
            case "user": {
                entityIDs.map(async (el) => {
                    await prisma.portAdmin.delete({
                        where: { id: el }
                    })
                })
            }
                break;
            case "sales": {
                entityIDs.map(async (el) => {
                    await prisma.portContact.delete({
                        where: { id: el }
                    })
                })
            }
                break;
            case "menu": {
                entityIDs.map(async (el) => {
                    await prisma.portProject.delete({
                        where: { id: el }
                    })
                })
            }
                break;
            case "contact": {
                entityIDs.map(async (el) => {
                    await prisma.portContact.delete({
                        where: { id: el }
                    })
                })
            }
                break;
            case "category": {
                entityIDs.map(async (el) => {
                    // Find the "General" category
                    const generalCategory = await prisma.portCategory.findFirst({
                        where: { name: 'General' },
                    });
                    const updateProject = prisma.portProject.updateMany({
                        where: { categoryId: el },
                        data: { categoryId: generalCategory?.id }
                    })
                    const deleteCategory = prisma.portCategory.delete({
                        where: { id: el },
                    })
                    await prisma.$transaction([updateProject, deleteCategory])
                })
            }
                break;

            default: return { error: true, message: "Invalid delete request detected." };
        }
        const path = `/admin/admin${table === "user" ? "users" : table}`
        revalidatePath(path)
        return { error: false, message: `${entityIDs.length} record${entityIDs.length > 1 ? "s" : ""} has been successfully Deleted` }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Something went wrong while attempting to make your request, please, try again.` }
    }
}