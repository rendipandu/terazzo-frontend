import React, { useEffect, useState, useRef } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { UserItems } from '../../../data/terazzo/type';
import { createUser, getUsers } from '../../../data/terazzo/client';
import { useAuth } from '../../../data/auth/store';

type Object<T> = {
    [key: string]: T;
}

export type FormDivision = {
    actionType: string;
    defaultValue?: UserItems;
    toggle: () => void;
}

const UserForm = (props: FormDivision) => {
    const { credential } = useAuth(); // Get Bearer token
    const dataForm = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dataPayload, setDataPayload] = useState<UserItems>({} as UserItems);
    const [formError, setFormError] = useState<Object<any>>({});

    const isValidEmail = (emails: string): boolean => {
        const emailArray = emails.split(',').map(email => email.trim());

        const isValid = emailArray.every(email => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        });

        return isValid;
    };

    const validateForm = (name: string, value: string) => {
        const errors = { ...formError };

        if (name === 'passwprd' && (!value || value === '')) {
            errors[name] = 'Please input Password';
        } else if (name === 'label' && (!value || value === '')) {
            errors[name] = 'Please input Name';
        } else if (name === 'email' && (!value || value === '')) {
            errors[name] = 'Please input Email Address';
        } else {
            delete errors[name];
        }

        return errors;
    };

    const onChangePayload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget ?? e;
        const payload = dataPayload
            ? { ...dataPayload }
            : {} as UserItems;

        const errors = validateForm(name, value);
        setFormError(errors);

        // @ts-ignore
        payload[name] = value;
        setDataPayload(payload);
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        const newDataPayload: Object<any> = { ...dataPayload };
        const newFormError: Object<any> = { ...formError };
        const { name, email, password, role } = newDataPayload;

        // Validate form
        const nameError = validateForm('name', name);
        const emailError = validateForm('email', email);
        const passwordError = validateForm('password', password);
        const roleError = validateForm('role', role);

        setFormError({
            ...newFormError,
            name: nameError.name,
            email: emailError.email,
            password: passwordError.password,
            role: roleError.role,
        });

        // Validate email format
        if (email && !isValidEmail(email)) {
            setFormError((prev) => ({
                ...prev,
                email: 'Invalid Email Format',
            }));
        }

        if (
            nameError.name ||
            emailError.email ||
            roleError.role ||
            passwordError.password ||
            !isValidEmail(email)
        ) {
            setIsLoading(false);
            return;
        }

        if (props.defaultValue) {
            // await updateDivision({
            //     id: id || dataPayload.id,
            //     label: label || dataPayload.label,
            //     email: email || dataPayload.email,
            //     branch: 1,
            //     active: 1,
            // });

            props.toggle();
        } else {
            await createUser(
                credential,
                { name, email, password, role }
            );
            await getUsers(credential);
            props.toggle();
        }
    };

    const reset = () => {
        setIsLoading(false);
        setDataPayload({} as UserItems);
        setFormError({});
    }

    useEffect(() => {
        if (props.defaultValue) {
            setDataPayload(props.defaultValue);
        }

        return () => {
            if (!props.defaultValue) reset();
        }
    }, [props.defaultValue])

    return (
        <Form ref={dataForm} className='master_holiday_form' onSubmit={onSubmit}>
            <Form.Group className='mb-3'>
                <Form.Label className='d-block'>
                    Name
                    <span className='text-danger'> *</span>
                </Form.Label>
                <Form.Control
                    name='name'
                    placeholder='Input name'
                    isInvalid={formError['label']}
                    value={dataPayload?.name ?? ''}
                    onChange={onChangePayload}
                    disabled={props.actionType === 'view'}
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label className='d-block'>
                    Email
                    <span className='text-danger'> *</span>
                </Form.Label>
                <Form.Control
                    name='email'
                    placeholder='Input email'
                    isInvalid={formError['email']}
                    value={dataPayload?.email ?? ''}
                    onChange={onChangePayload}
                    disabled={props.actionType === 'view'}
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label className='d-block'>
                    Password
                    <span className='text-danger'> *</span>
                </Form.Label>
                <Form.Control
                    name='password'
                    placeholder='Input password'
                    isInvalid={formError['password']}
                    value={dataPayload?.password ?? ''}
                    onChange={onChangePayload}
                    disabled={props.actionType === 'view'}
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label className='d-block'>
                    Role
                    <span className='text-danger'> *</span>
                </Form.Label>
                <Form.Control
                    name='role'
                    placeholder='Input role'
                    isInvalid={formError['role']}
                    value={dataPayload?.role ?? ''}
                    onChange={onChangePayload}
                    disabled={props.actionType === 'view'}
                />
            </Form.Group>

            <Form.Group className='d-flex gap-2 justify-content-end'>
                <Button variant='light' className='form_button--close' onClick={props.toggle}>
                    Close
                </Button>
                {props.actionType !== 'view' && (
                    <Button
                        type='submit'
                        variant='primary'
                        className='d-flex gap-2 align-items-center justify-content-center'
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span >Loading...</span>
                        ) : (
                            ''
                        )}
                        Save
                    </Button>
                )}
            </Form.Group>
        </Form>
    )
}

export default UserForm;