import React, { FC, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { FormAuthFC, FormAuthValidation } from '../models/FormAuthFC';
import { useDispatch } from 'react-redux';
import { fetchUserByEmail, register } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../features/currentUserSlice';
import { ToastGenericFC } from '../models/ToastGeneric';
import ToastGeneric from './ToastGeneric';

const FormAuth: FC<FormAuthFC> = ({ type }) => {
    const { Formik } = formik;
    const [showToast, setShowToast] = useState(false);
    const [contentToast, setContentToast] = useState<Omit<ToastGenericFC, 'show'>>()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectForm = () => {
        const form: FormAuthValidation = {
            email: yup.string().required(),
            password: yup.string().required(),
        }

        if (type === "register") {
            form.name = yup.string().required();
            form.surname = yup.string().required();
            form.repeatPassword = yup.string().required();
        }
        return form
    }

    const submit = async (e: any) => {
        const userByEmail = await fetchUserByEmail(e.email);
        if (type === "login" && userByEmail[0]) {
            dispatch(setCurrentUser(userByEmail[0]));
            /* setContentToast({ title: "Success", content: "Login successfully made", type: "Success" }) */
            navigate('/dashboard');
        } else if (type === "register" && userByEmail.length === 0) {
            await register(e);
            /* setContentToast({ title: "Success", content: "Successful registration", type: "Success" }) */
            navigate('/login');
        }
        
        setContentToast({ title: "Error", content: "Something went wrong", type: "Danger" })
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000)
    }

    const schema = yup.object().shape({ ...selectForm() });

    return (
        <>

            <Formik
                validationSchema={schema}
                onSubmit={submit}
                initialValues={type === 'register' ? {
                    name: 'Mark',
                    surname: 'Otto',
                    email: '',
                    password: '',
                    repeatPassword: ''
                } : {
                    email: '',
                    password: '',
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        {
                            type === 'register' &&
                            <Row className="mb-3">
                                <Form.Group as={Col} md="4" controlId="validationFormik01">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        isValid={touched.name && !errors.name}
                                        isInvalid={!!errors.name}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationFormik02">
                                    <Form.Label>Surname</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="surname"
                                        value={values.surname}
                                        onChange={handleChange}
                                        isValid={touched.surname && !errors.surname}
                                        isInvalid={!!errors.surname}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                        }
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="validationFormikUsername">
                                <Form.Label>Email</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="example@gmail.com"
                                        aria-describedby="inputGroupPrepend"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isValid={touched.email && !errors.email}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationFormik03">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    isInvalid={!!errors.password}
                                />

                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        {
                            type === 'register' &&
                            <Row className="mb-3">
                                <Form.Group as={Col} md="4" controlId="validationFormik04">
                                    <Form.Label>Repeat Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="repeatPassword"
                                        value={values.repeatPassword}
                                        onChange={handleChange}
                                        isInvalid={!!errors.repeatPassword || (values.password !== values.repeatPassword)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.repeatPassword || "password is not the same"}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                        }
                        <Button type="submit">Submit form</Button>
                    </Form>
                )}
            </Formik>
            <ToastGeneric show={showToast} title={contentToast?.title || ''} content={contentToast?.content || ''} type={contentToast?.type || 'Success'} />
        </>
    );
}

export default FormAuth