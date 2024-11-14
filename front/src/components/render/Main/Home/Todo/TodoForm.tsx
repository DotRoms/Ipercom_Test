import { Button } from "../../../../UI/design-system/button/Button";

type FormData = {
    title: string;
};

interface TodoFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formData: FormData;
    errorMessages: string[];
    successMessage: string;
}

// TodoForm render component
// This component is used to render the form to add a new task
export const TodoForm = ({
    handleSubmit,
    handleChange,
    formData,
    errorMessages,
    successMessage,
}: TodoFormProps) => {
    return (
        <div className="flex flex-col border border-secondary p-4 rounded-lg mb-8">
            <form
                action=""
                className="flex items-center gap-4 "
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col">
                    <input
                        type="text"
                        className="bg-slate-100 rounded-lg p-2"
                        onChange={handleChange}
                        value={formData.title}
                        name="title"
                        placeholder="Ajouter une tâche"
                    />
                </div>
                <Button type="submit">Ajouter</Button>
            </form>
            <div className="text-sm text-center">
                {errorMessages[0] && (
                    <p className="text-red-500 mt-4">{errorMessages[0]}</p>
                )}
                {successMessage && (
                    <p className="text-green-500 mt-4">{successMessage}</p>
                )}
            </div>
        </div>
    );
};
