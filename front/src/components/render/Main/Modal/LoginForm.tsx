import { Button } from "../../../UI/design-system/button/Button";

interface LoginpFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formData: FormData;
    errorMessages: string[];
    successMessages?: string | null | undefined;
}

type FormData = {
    email: string;
    password: string;
};

export const LoginForm = ({
    handleChange,
    formData,
    handleSubmit,
    errorMessages,
    successMessages,
}: LoginpFormProps) => {
    return (
        <form
            action="POST"
            className="flex flex-col gap-6 p-6"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col gap-2">
                <label htmlFor="">Email :</label>
                <input
                    type="email"
                    required
                    className="rounded-lg p-2 border border-primary text-black"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="">Mot de passe :</label>
                <input
                    type="password"
                    required
                    className="rounded-lg p-2 border border-primary text-black"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            <div>
                {errorMessages[0] && (
                    <p className="text-red-500 text-sm text-center">
                        {errorMessages[0]}
                    </p>
                )}
                {successMessages && (
                    <p className="text-green-500 text-sm text-center">
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
