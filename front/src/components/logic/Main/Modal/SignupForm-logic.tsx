import { useSignupModal } from "../../../../hook/useSubmitSignupModal";

import { SignupForm } from "../../../render/Main/Modal/SignupForm";

export const SignupFormLogic = () => {

    // Destructuring const from useSignupModal hook for return them to the SignupForm component
    const {
        handleChange,
        formData,
        handleSubmit,
        errorMessages,
        successMessages,
    } = useSignupModal();

    return (
        <SignupForm
            handleChange={handleChange}
            formData={formData}
            handleSubmit={handleSubmit}
            errorMessages={errorMessages}
            successMessages={successMessages}
        />
    );
};
