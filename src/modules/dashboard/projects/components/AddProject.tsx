"use client"
import { Header3 } from '@/components/ui/Typography'
import React, { useEffect, useRef, useState } from 'react'
import { Form, Input, InputNumber } from "antd"
import { fileUpload } from '@/lib'
import TextArea from 'antd/es/input/TextArea'
import { TCategory, TProjectProps } from '@/types'
import toast from 'react-hot-toast'
import { createProject, updateProject } from '@/action'
import { useRouter } from 'next/navigation'
import { LuCheck, LuScrollText } from 'react-icons/lu'
import { $Enums } from '@prisma/client'
import Image from 'next/image'

/* 
import { CldUploadWidget } from 'next-cloudinary';
 
<CldUploadWidget signatureEndpoint="<API Endpoint (ex: /api/sign-cloudinary-params)>">
  {({ open }) => {
    return (
      <button onClick={() => open()}>
        Upload an Image
      </button>
    );
  }}
</CldUploadWidget>

*/

export default function AddProject({ closeModal, data, category }: { data?: TProjectProps, category: TCategory[] | undefined, closeModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [form] = Form.useForm<TProjectProps>()
    const [loading, setLoading] = useState<boolean>(false)
    const categoryRef = useRef<HTMLSelectElement | null>(null)
    const imagePreviewRef = useRef<HTMLImageElement | null>(null)
    const imageRef = useRef<HTMLInputElement | null>(null)
    const featuredRef = useRef<HTMLInputElement | null>(null)
    const visibleRef = useRef<HTMLSelectElement | null>(null)
    const [image, setImage] = useState<{ name: string, value: string }>({
        name: "Click to Upload Image",
        value: ""
    })
    const router = useRouter()

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                id: data?.id,
                name: data?.name,
                stack: data?.stack,
                image: data?.image,
                visible: data?.visible,
                categoryId: data?.categoryId,
                description: data.description,
                featured: data.featured,
            })
            // setImage((prev) => ({...prev, value: data?.image ?? ""}))
            if (categoryRef.current) categoryRef.current.value = data?.categoryId
            if (visibleRef.current) visibleRef.current.value = data?.visible as unknown as string
            if (imagePreviewRef.current) imagePreviewRef.current.src = data?.image
            if (featuredRef.current) featuredRef.current.checked = data?.featured
        }
        else {
            form.resetFields()
            if (imageRef.current) imageRef.current.value = ""
        }
    }, [data, form])

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        const file = e?.target?.files![0]
        setImage((prev) => ({ ...prev, name: file.name }))
        const data = await fileUpload(file) as unknown as string
        form.setFieldValue("image", data)
        setImage(prev => ({ ...prev, value: data }))
        setLoading(false)
    }

    const handleSubmit = async (values: TProjectProps) => {
        toast.loading(`Please wait while your request is being processed...`, { id: "8206" })
        setLoading(true)
        values.visible = visibleRef?.current?.value as unknown as boolean
        values.categoryId = categoryRef?.current?.value as string
        let data;
        try {
            const formData = new FormData()
            Object.entries(values).map(([key, value]) => {
                formData.append(key, value as string)
            })
            if (values.id) {
                data = await updateProject(formData)
            }
            else {
                data = await createProject(formData)
            }
            if (data?.error) toast.error(data?.message, { id: "8206" })
            else {
                toast.success(data?.message, { id: "8206" })
                router.refresh()
            }
            closeModal(prev => !prev)
            form.resetFields()
        } catch (error) {
            toast.error(`Something went wrong. Due to ${error}`, { id: "8206" })
        } finally {
            setLoading(false)
        }

    }

    return (
        <main className='flex flex-col'>
            <section className="pt-10 px-4">
                <div className="container mx-auto">
                    <Header3>{data ? "Edit" : "Create"} Project</Header3>
                    <Form
                        form={form}
                        onFinish={(data) => {
                            handleSubmit(data)
                        }}
                        className="flex flex-col mt-4">
                        {data?.id &&
                            <Form.Item<TProjectProps> name="id" style={{ height: 0 }}>
                                <Input hidden placeholder='' required style={{ visibility: "hidden", height: 0 }} />
                            </Form.Item>
                        }
                        <div className="flex flex-col">
                            <div className="mb-0">
                                <label htmlFor="image" className="text-text text-sm">Project Image</label>
                                <Form.Item<TProjectProps> name="image">
                                    <label htmlFor="image" className="border bg-light-secondary rounded-md h-20 p-8 cursor-pointer grid place-items-start text-text relative" style={{ padding: 32, marginBottom: 8 }}>
                                        <input ref={imageRef} type="file" onChange={handleFileUpload} defaultValue={data?.image} name="image" id="image" accept='image/jpeg, image/png' className="absolute left-0 top-0 w-full h-full opacity-0 hidden cursor-pointer" style={{ opacity: 0 }} /> {image.name}
                                        <div className="bg-secondary z-40 w-20 h-full top-0 right-0 absolute overflow-hidden">
                                            <Image ref={imagePreviewRef} src={image.value || ""} alt="Preview Image" className={`w-20 h-full absolute object-contain object-center flex-shrink-0 flex`} fill />
                                        </div>
                                    </label>
                                </Form.Item>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-text text-sm">Project Name</label>
                                <Form.Item<TProjectProps> name="name">
                                    <Input type='text' placeholder='Enter Project Name' />
                                </Form.Item>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="price" className="text-text text-sm">Project Price</label>
                                <Form.Item<TProjectProps> name="link">
                                    <InputNumber type='url' placeholder='Enter Project Link' min={100} style={{ width: '100%' }} className='w-full' />
                                </Form.Item>
                            </div>
                            <div className="flex gap-2">
                                <label htmlFor="featured" className="text-text text-sm pt-2">Add to featured Project: </label>
                                <Form.Item<TProjectProps> name="featured" className='flex-1 flex my-0'>
                                    <label htmlFor="featured" className="flex bg-slate-100 border-2 border-text p-1 w-full max-w-sm rounded-sm relative cursor-pointer">
                                        <input ref={featuredRef} type='checkbox' defaultChecked={data && (data?.featured && data?.featured)} placeholder='Make featured Project' className='peer absolute z-10 bg-transparent w-full h-full top-0 left-0 opacity-0 cursor-pointer' id='featured' />
                                        <span className="text-white bg-white peer-checked:bg-primary border border-primary relative peer-checked:ml-auto ml-0 w-6 h-6 rounded-full grid place-items-center flex-shrink-0"><LuCheck /></span>
                                    </label>
                                </Form.Item>
                            </div>
                            <div className="flex flex-col gap-2 relative">
                                <label htmlFor="categoryId" className="text-text text-sm">Category</label>
                                <Form.Item<TProjectProps> name="categoryId">
                                    <select
                                        ref={categoryRef}
                                        id='categoryId'
                                        style={{ border: "1px solid #ddd", color: "#aaa", padding: ".51rem" }}
                                        className='relative z-40 bg-white rounded-md w-full cursor-pointer'
                                    >
                                        {
                                            category?.reverse().map((value, key) => <option key={key} className='relative' value={value.id}>{value.name}</option>)
                                        }
                                    </select>
                                </Form.Item>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="status" className="text-text text-sm">Visibility Status</label>
                                <Form.Item<TProjectProps> name="visible">
                                    <select
                                        ref={visibleRef}
                                        id='visible'
                                        style={{ border: "1px solid #ddd", color: "#aaa", padding: ".51rem" }}
                                        className='relative z-40 bg-white rounded-md w-full cursor-pointer'
                                    >
                                        {
                                            Object.entries($Enums.PortStatus).map(([key, value]) => <option key={key} className='relative' value={value}>{value}</option>)
                                        }
                                    </select>
                                </Form.Item>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="description" className="text-text text-sm">Project Description</label>
                                <Form.Item<TProjectProps> name="description">
                                    <TextArea cols={10} rows={5} placeholder='Enter Project Description' />
                                </Form.Item>
                            </div>
                            <button disabled={loading} className="py-2 px-6 rounded-md cursor-pointer bg-primary text-white flex justify-center items-center gap-2"><LuScrollText className="text-sm text-inherit" />{loading ? 'Processing...' : data ? 'Edit Project' : 'Create Project'}</button>
                        </div>
                    </Form>
                </div>
            </section >
        </main >
    )
}
