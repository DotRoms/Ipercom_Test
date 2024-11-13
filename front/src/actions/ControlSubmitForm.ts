import {
    loginSchema,
    signupSchema,
    taskSchema,
} from "../lib/zod/formShemasZod";

type formDataSignupProps = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

interface ControlInputValueOnSubmitSignupFormProps {
    formData: formDataSignupProps;
    setErrorMessages: (error: string[]) => void;
}

type formDataLoginProps = {
    email: string;
    password: string;
};

type formDataTaskProps = {
    title: string;
};

interface ControlInputValueOnSubmitTaskFormProps {
    formData: formDataTaskProps;
    setErrorMessages: (error: string[]) => void;
}

interface ControlInputValueOnSubmitLoginFormProps {
    formData: formDataLoginProps;
    setErrorMessages: (error: string[]) => void;
}

// This function is used to validate the data entered in the Signup form
export const ControlInputValueOnSubmitSignupForm = async ({
    formData,
    setErrorMessages,
}: ControlInputValueOnSubmitSignupFormProps) => {
    const result = signupSchema.safeParse(formData);
    if (!result.success) {
        setErrorMessages(result.error.errors.map((error) => error.message));
        return false;
    }
    return result.data;
};

// This function is used to validate the data entered in the Login form
export const ControlInputValueOnSubmitLoginForm = async ({
    formData,
    setErrorMessages,
}: ControlInputValueOnSubmitLoginFormProps) => {
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
        setErrorMessages(result.error.errors.map((error) => error.message));
        return false;
    }
    return result.data;
};

// This function is used to validate the data entered in the Task form
export const ControlInputValueOnSubmitTaskForm = async ({
    formData,
    setErrorMessages,
}: ControlInputValueOnSubmitTaskFormProps) => {
    const result = taskSchema.safeParse(formData);
    if (!result.success) {
        setErrorMessages(result.error.errors.map((error) => error.message));
        return false;
    }
    return result.data;
};
