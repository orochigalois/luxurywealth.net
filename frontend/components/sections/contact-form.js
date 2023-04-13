import { useMemo, useState } from "react"
import { fetchAPI } from "utils/api"
import NextImage from "../elements/image"
import * as yup from "yup"
import { Formik, Form, Field } from "formik"
import FormButton from "../elements/form-button"
import Cookies from "js-cookie"
import NoSSR from "../noSSR";


const ContactForm = ({ data }) => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const localeName = useMemo(() => Cookies.get("NEXT_LOCALE") === 'en' ? 'Name' : '名字', [Cookies])
    const localeEmail = useMemo(() => Cookies.get("NEXT_LOCALE") === 'en' ? 'Email' : '邮箱', [Cookies])
    const localeMessage = useMemo(() => Cookies.get("NEXT_LOCALE") === 'en' ? 'Message' : '信息', [Cookies])
    const ContactSchema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
    })
    return (

        <section className="section flex flex-wrap overflow-hidden w-full mx-auto py-24 px-5 justify-between" id="contact">


            <div className="w-full overflow-hidden md:w-1/3 md:pr-8 pt-4 mb-10 md:mb-0">

                <p className="uppercase text-xs font-medium tracking-widestx2 mb-10 ">{data.title}</p>
                <p className="leading-normal">{data.text}</p>

            </div>
            <div className="w-full overflow-hidden md:w-2/3 md:pl-10 lg:pl-28">
                <NoSSR>
                    <Formik
                        initialValues={{ name: "", email: "", message: "" }}
                        validationSchema={ContactSchema}
                        onSubmit={async (values, { setSubmitting, setErrors }) => {
                            setLoading(true)

                            try {
                                setErrors({ api: null })
                                await fetchAPI(
                                    "/contact-form-submissions",
                                    {},
                                    {
                                        method: "POST",
                                        body: JSON.stringify({
                                            data: {
                                                name: values.name,
                                                email: values.email,
                                                message: values.message,
                                            }
                                        }),
                                    }
                                )
                            } catch (err) {
                                setErrors({ api: err.message })
                            }

                            setSuccess(true)

                            setLoading(false)
                            setSubmitting(false)
                        }}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <div>

                                <Form className="flex flex-wrap">
                                    <div className="w-full sm:w-1/2 sm:pr-4">
                                        <Field
                                            className="form-field"
                                            type="text"
                                            name="name"
                                            placeholder={localeName}
                                        />
                                        <p className="text-red-500 h-6 text-sm mt-1 text-left">
                                            {(errors.name && touched.name && errors.name) || errors.api}
                                        </p>
                                    </div>
                                    <div className="w-full sm:w-1/2 sm:pl-4">
                                        <Field
                                            className="form-field"
                                            type="email"
                                            name="email"
                                            placeholder={localeEmail}
                                        />
                                        <p className="text-red-500 h-6 text-sm mt-1 text-left">
                                            {(errors.email && touched.email && errors.email) || errors.api}
                                        </p>
                                    </div>
                                    <div className="w-full md:w-full">
                                        <Field
                                            name="message"
                                            className="form-field h-36 mt-3"
                                            as="textarea"
                                            placeholder={localeMessage}
                                        />
                                    </div>
                                    <div className="block mt-10">
                                        <FormButton isButton link={data.button} type="submit" disabled={isSubmitting} loading={loading}>
                                            {data.button.text}
                                        </FormButton>
                                    </div>
                                    {
                                        success && Cookies.get("NEXT_LOCALE") === 'en' && <p className="text-base mt-10 ml-10 feedback">Thanks for your feedback</p>
                                    }
                                    {
                                        success && Cookies.get("NEXT_LOCALE") === 'zh-CN' && <p className="text-base mt-10 ml-10 feedback">感谢您的反馈</p>
                                    }
                                </Form>

                            </div>
                        )}
                    </Formik>
                </NoSSR>
            </div>

        </section>
    )
}

export default ContactForm
