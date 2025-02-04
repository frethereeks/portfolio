import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Input, } from 'antd'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { GrMailOption } from 'react-icons/gr'
import { TAdminProps } from '@/types'
import { $Enums } from '@prisma/client'

export default function AddAdmin({ closeModal, data }: { data?: TAdminProps, closeModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [form] = Form.useForm<TAdminProps>()
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const statusRef = useRef<HTMLSelectElement | null>(null)
    const roleRef = useRef<HTMLSelectElement | null>(null)

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                id: data?.id,
                firstname: data?.firstname,
                lastname: data?.lastname,
                email: data?.email,
                image: data?.image,
                status: data?.status,
                role: data?.role,
            })
        }
        else {
            form.resetFields()
        }
    }, [data, form])

    const handleSubmit = async (values: TAdminProps) => {
        toast.loading(`Please wait while your request is being processed...`, { id: "8206" })
        setLoading(true)
        // let data;
        try {
            const formData = new FormData()
            Object.entries(values).map(([key, value]) => {
                formData.append(key, value as string)
            })
            // if (values.id) {
            //     data = await updateSale(formData)
            // }
            // else {
            //     data = await createSale(formData)
            // }
            // if (data?.error) toast.error(data?.message, { id: "8206" })
            // else {
            //     toast.success(data?.message, { id: "8206" })
            router.refresh()
            // }
            closeModal(prev => !prev)
            form.resetFields()
        } catch (error) {
            toast.error(`Something went wrong. Due to ${error}`, { id: "8206" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <aside className='flex flex-col gap-4 bg-danger pb-0'>
            <div className="pt-4 px-4">
                <div className="container mx-auto">
                    <h4 className='heading-three font-semibold pb-4'>{data ? "Edit" : "Create"} Admin Details</h4>
                    <Form
                        form={form}
                        onFinish={(data) => {
                            handleSubmit(data)
                        }}
                        className="flex flex-col mt-4 relative"
                        style={{padding: 0, margin: 0}}
                    >
                        <div className="grid sm:grid-cols-2 gap-4 bg-secondary">
                            <Form.Item<TAdminProps> noStyle name="firstname">
                                <Input required placeholder='First Name e.g. Angela' pattern='[A-Z][a-z]+' />
                            </Form.Item>
                            <Form.Item<TAdminProps> noStyle name="lastname">
                                <Input required placeholder='Last Name e.g. Jones' pattern='[A-Z][a-z]+' />
                            </Form.Item>
                            <div className="sm:col-span-2">
                                <Form.Item<TAdminProps> noStyle name="email">
                                    <Input required placeholder='person@email.com' pattern='[A-Za-z0-9_+.%-]+@[A-Za-z0-9]+\.[a-zA-Z]{2,}' />
                                </Form.Item>
                            </div>
                            <Form.Item<TAdminProps> noStyle name="role">
                                <select
                                    ref={roleRef}
                                    id='status'
                                    style={{ border: "1px solid #ddd", color: "#aaa", padding: ".51rem", }}
                                    className='relative z-40 bg-background rounded-md w-full cursor-pointer'
                                >
                                    {
                                        Object.entries($Enums.PortRole).map(([key, value]) => <option key={key} className='relative capitalize text-xs' value={value}>{value}</option>)
                                    }
                                </select>
                            </Form.Item>
                            <Form.Item<TAdminProps> noStyle name="status">
                                <select
                                    ref={statusRef}
                                    id='status'
                                    style={{ border: "1px solid #ddd", color: "#aaa", padding: ".51rem", paddingBottom: 0 }}
                                    className='relative z-40 bg-background rounded-md w-full cursor-pointer'
                                >
                                    {
                                        Object.entries($Enums.PortStatus).map(([key, value]) => <option key={key} className='relative capitalize text-xs' value={value}>{value}</option>)
                                    }
                                </select>
                            </Form.Item>
                        </div>
                        <Button htmlType='submit' loading={loading} className="absolute left-0 -bottom-11 rounded-full py-2 px-5 md:px-8 w-[40%] bg-primary shadow-primary shadow-md text-white text-sm text-center flex-1 cursor-pointer flex items-center justify-center gap-2 mt-2"><GrMailOption className="text-sm text-inherit" />{loading ? 'Processing...' : data ? 'Edit' : 'Create'}</Button>
                    </Form>
                </div>
            </div>
        </aside>
    )
}
