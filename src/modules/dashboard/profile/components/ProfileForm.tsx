"use client"
import React, { useEffect } from 'react'
import { Button, Form, Image, Input } from 'antd'
import { fileUpload } from '@/lib'
import { updateAdmin } from '@/action'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { PortAdmin } from '@prisma/client'

type TProfileProps = {
    id: string
    firstname: string
    lastname: string
    email: string
    image: string
    password: string
    confirmPassword: string
    verifyPassword: string
}

export default function ProfileForm({ data }: { data: PortAdmin | null }) {
    const [form] = Form.useForm<TProfileProps>()
    const router = useRouter()
    const [loading, setLoading] = React.useState<boolean>(false)
    const [image, setImage] = React.useState<{ name: string, value: string }>({
        name: "Click to Upload Image",
        value: data?.image ?? ""
    })

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e?.target?.files![0]
        setImage((prev) => ({ ...prev, name: file.name }))
        const data = await fileUpload(file) as unknown as string
        form.setFieldValue("image", data)
        setImage(prev => ({ ...prev, value: data }))
    }

    const handleSubmit = async (values: TProfileProps) => {
        toast.loading(`Please wait while your request is being processed...`, { id: "8206" })
        setLoading(true)

        try {
            const formData = new FormData()
            Object.entries(values).map(([key, value]) => {
                formData.append(key, value as string)
            })
            const data = await updateAdmin(formData)
            if (data?.error) toast.error(data?.message, { id: "8206" })
            else {
                toast.success(data?.message, { id: "8206" })
                router.refresh()
            }
            form.resetFields()
        } catch (error) {
            toast.error(`Something went wrong. Due to ${error}`, { id: "8206" })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                id: data?.id,
                firstname: data?.firstname,
                lastname: data?.lastname,
                image: data.image!,
                email: data.email,
                // password: data.password,
            })
        }
    }, [data, form])

    return (
        <>
            <aside className="relative bg-white rounded-md p-4 shad flex justify-between items-center gap-4">
                <div className="flex-1">
                    <h2 className="font-bold font-eugusto text-text heading-three">{data?.firstname} {data?.lastname}</h2>
                    <p className="text-small">This is your profile information as seen by others.</p>
                </div>
                <div className="bg-primary top-0 right-0 w-20 h-full z-20 border absolute overflow-hidden">
                    <Image src={image.value} alt="Preview Image" className={`w-full h-full absolute object-contain object-center flex-shrink-0 flex`} />
                </div>
            </aside>
            <aside className='rounded-md'>
                <Form
                    onFinish={(values) => {
                        handleSubmit(values)
                    }}
                    disabled={loading}
                    form={form}
                    size='middle'
                    className='grid md:grid-cols-2 gap-4'
                >
                    <div className="bg-white flex flex-col p-4">
                        <Form.Item<TProfileProps> name="id" style={{ height: 0 }}>
                            <Input placeholder='Enter First Name' hidden style={{ visibility: "hidden" }} required />
                        </Form.Item>
                        <div>
                            <label htmlFor="image" className="text-slate-700 text-sm">Profile Image</label>
                            <Form.Item<TProfileProps> name="image">
                                <label htmlFor="image" className="border bg-light-secondary rounded-md h-20 p-8 cursor-pointer grid place-items-start text-slate-700 relative" style={{ padding: 32, marginBottom: 8 }}>
                                    <input type="file" onChange={handleFileUpload} name="image" id="image" accept='image/jpeg, image/png' className="absolute left-0 top-0 w-full h-full opacity-0 hidden cursor-pointer" required style={{ opacity: 0 }} /> {image.name}
                                    <div className="bg-secondary top-0 right-0 w-20 h-full z-20 absolute overflow-hidden">
                                        <Image src={image.value} alt="Preview Image" className={`h-full absolute object-contain object-center flex-shrink-0 ${image.value ? 'flex' : 'hidden'}`} />
                                    </div>
                                </label>
                            </Form.Item>
                        </div>
                        <Form.Item<TProfileProps> name="firstname" required className='mt-0'>
                            <Input placeholder='Enter First Name' required />
                        </Form.Item>
                        <Form.Item<TProfileProps> name="lastname" required>
                            <Input placeholder='Enter Last Name' required />
                        </Form.Item>
                        <Form.Item<TProfileProps> name="email" required>
                            <Input type='email' placeholder='Enter Email' />
                        </Form.Item>
                    </div>
                    <div className="bg-white flex flex-col p-4 h-max">
                        <Form.Item<TProfileProps> name="password">
                            <Input type='password' placeholder='Enter Password (Leave empty to keep your current password)' />
                        </Form.Item>
                        <Form.Item<TProfileProps> name="confirmPassword">
                            <Input type='password' placeholder='Confirm Password' />
                        </Form.Item>
                        <Form.Item<TProfileProps> name="verifyPassword" required>
                            <Input type='password' placeholder='Verify Password to Save Changes' />
                        </Form.Item>
                        <Button htmlType='submit' disabled={loading} type='default' onClick={() => form.submit()} className='button bg-primary text-white w-max'>Update Profile</Button>
                    </div>
                </Form>
            </aside>
        </>
    )
}
