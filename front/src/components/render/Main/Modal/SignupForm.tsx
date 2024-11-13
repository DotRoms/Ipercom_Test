import { Button } from "../../../UI/design-system/button/Button";

interface SignupFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formData: FormData;
    errorMessages: string[];
    successMessages?: string | null | undefined;
}

type FormData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

// SignupForm render component
// This component is used to render the signup form
export const SignupForm = ({
    handleSubmit,
    handleChange,
    formData,
    errorMessages,
    successMessages,
}: SignupFormProps) => {
    
    return (
        <form
            onSubmit={handleSubmit}
            action="POST"
            className="flex flex-col gap-6 p-6"
        >
            <div className="flex flex-col gap-2">
                <label htmlFor="">Name</label>
                <input
                    type="text"
                    required
                    className="rounded-lg p-2 border border-primary text-black"
                    onChange={handleChange}
                    value={formData.name}
                    name="name"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="">Email :</label>
                <input
                    type="email"
                    required
                    className="rounded-lg p-2 border border-primary text-black"
                    onChange={handleChange}
                    value={formData.email}
                    name="email"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="">Mot de passe :</label>
                <input
                    type="password"
                    required
                    className="rounded-lg p-2 border border-primary text-black"
                    onChange={handleChange}
                    value={formData.password}
                    name="password"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="">Confirmation :</label>
                <input
                    type="password"
                    required
                    className="rounded-lg p-2 border border-primary text-black"
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    name="confirmPassword"
                />
            </div>
            <div>
                {errorMessages[0] && (
                    <p className="text-red-500 text-xs text-center">
                        {errorMessages[0]}
                    </p>
                )}
                {successMessages && (
                    <p className="text-green-500 text-xs text-center">
                        {successMessages}
                    </p>
                )}
            </div>
            <Button type="submit" ariaLabel="Valider le formulaire">
                Valider
            </Button>
        </form>
    );
};
