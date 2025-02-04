"use client"

import React, { useState } from 'react'
// import { ASSETS_URL } from '@/constants'
// import Image from 'next/image'
import { useForm } from 'antd/es/form/Form'
import { Button, Form, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { emailValidationRules, textValidationRules } from '@/lib/validator'
import "react-phone-number-input/style.css"
import PhoneNumber from "react-phone-number-input"
import flags from "react-phone-number-input/flags"

type TFormProps = {
  fullname: string
  email: string
  phone: string
  message: string
}

export default function ContactSection() {
  const [form] = useForm<TFormProps>()
  const [loading, setLoading] = useState<boolean>(false)
  const [phone, setPhone] = useState<string>()

  const handleSubmit = (data: TFormProps) => {
    setLoading(true)
    console.log('data', data, "phone", phone)
    form.resetFields()
    setLoading(false)
  }

  return (
    <section className='relative px-4 bg-milk dark:bg-primary py-20'>
      {/* <Image src={ASSETS_URL['freds_photo_doc']} alt='freds_photo_doc' className='object-cover opacity-50' fill /> */}
      <div className="container mx-auto flex flex-col lg:flex-row justify-between gap-4">
        <aside className="flex-1">
          <h1 className="text-4xl md:text-6xl text-primary dark:text-milk font-bold w-full max-w-xl leading-loose">Let&apos;s talk <span className="font-black text-6xl md:text-7xl lg:text-8xl text-white dark:text-primary bg-milk dark:bg-milk py-0">Business</span> </h1>
          <Form
            form={form}
            onFinish={(values) => {
              handleSubmit(values)
            }}
            className='relative max-w-lg mx-auto pt-10 pb-5 flex flex-col gap-4 mt-10'
          >
            <Form.Item<TFormProps> name="fullname" rules={textValidationRules()}>
              <Input pattern='[A-Z][a-z]+\s[A-Z][a-z]+' required placeholder='Full Name (2 Names, First Letter Uppercase) e.g. Andrey Fredericks' className='' />
              <span className="hidden peer-placeholder-shown:flex text-xs text-white bg-danger p-2">Full Name Invalid. Must be 2 Names and first letter uppercase e.g. John Doe</span>
            </Form.Item>
            <Form.Item<TFormProps> name="email" rules={emailValidationRules()}>
              <Input type='email' required placeholder='Valid Email e.g. someone@email.com' />
            </Form.Item>
            <Form.Item<TFormProps> noStyle name="phone">
              <Input placeholder='Phone Number (optional)' />
            </Form.Item>
            <Form.Item<TFormProps> noStyle name="phone" className='bg-white'>
              <PhoneNumber
                onChange={val => setPhone(val?.valueOf())}
                flags={flags}
                className='w-full'
                defaultCountry='NG'
                international
                key={"802slksd034"}
                countryCallingCodeEditable={false}
                limitMaxLength={true}
              />
            </Form.Item>
            <Form.Item<TFormProps> noStyle name="message">
              <TextArea maxLength={200} rows={10} required placeholder='Please, say something about the reason for this message...' />
            </Form.Item>
            <Button htmlType='submit' loading={loading} disabled={loading} style={{position: "relative"}} className=''><span className="absolute block top-0 left-0 w-full h-full bg-primary rounded-md overflow-hidden"></span> <p className='relative text-milk'>Send Message</p></Button>
          </Form>
        </aside>
        <aside className="flex-1">

        </aside>
      </div>
    </section>
  )
}
