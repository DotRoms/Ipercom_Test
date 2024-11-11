import { signupSchema } from "../lib/formShemasZod";

type formDataProps = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface ControlInputValueOnSubmitSignupFormProps {
    formData: formDataProps;
    setErrorMessages: (error: string[]) => void;
}
export const ControlInputValueOnSubmitSignupForm = async ({formData, setErrorMessages} :ControlInputValueOnSubmitSignupFormProps) => {
 const result = signupSchema.safeParse(formData);
    if(!result.success){
        setErrorMessages(result.error.errors.map((error) => error.message));
        return false;
    }
    return result.data;
}