import { Button } from "../../../UI/design-system/button/Button";

interface LoginFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const LoginForm = ({handleSubmit}:LoginFormProps ) => {
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
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="">Mot de passe :</label>
                <input
                    type="password"
                    required
                    className="rounded-lg p-2 border border-primary text-black"
                />
            </div>

            <Button type="submit" ariaLabel="Valider le formulaire">Valider</Button>
        </form>
    );
};
