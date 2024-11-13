import { LoginForm } from "../../../render/Main/Modal/LoginForm";

import { useLoginModal } from "../../../../hook/useSubmitLoginModal";

export const LoginFormLogic = () => {

    // Destructuring const from useLoginModal hook for return them to the LoginForm component
    const {
        handleChange,
        formData,
        handleSubmit,
        errorMessages,
        successMessages,
    } = useLoginModal();

    return (
        <LoginForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            formData={formData}
            errorMessages={errorMessages}
            successMessages={successMessages}
        />
    );
};
