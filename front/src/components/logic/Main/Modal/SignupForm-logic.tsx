import { useSignupModal } from "../../../../hook/useSignupModal";
import { SignupForm } from "../../../render/Main/Modal/SignupForm";
export const SignupFormLogic = () => {

    const { handleChange, formData, handleSubmit, errorMessages  } = useSignupModal();


    return <SignupForm handleChange={handleChange} formData={formData} handleSubmit={handleSubmit} errorMessages={errorMessages}/>;
};
