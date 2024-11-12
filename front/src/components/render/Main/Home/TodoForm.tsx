import { Button } from "../../../UI/design-system/button/Button";

type FormData = {
    title: string;
}

interface TodoFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formData: FormData;
    errorMessages: string[];
}

export const TodoForm = ({handleSubmit, handleChange, formData, errorMessages}: TodoFormProps) => {
    return (
        <div className="flex flex-col gap-2 border border-secondary p-4 rounded-lg">
        <form action="" className="flex items-center gap-4 " onSubmit={handleSubmit}>
            <label htmlFor="title">Nom de la tâche :</label>
            <input type="text" className="bg-slate-100 rounded-lg p-2"
            onChange={handleChange}
            value={formData.title}
            name="title"/>
            <Button type="submit">
                Ajouter
            </Button>
        </form>
        <div className="text-sm text-center">
            {errorMessages[0] && <p className="text-red-500">{errorMessages[0]}</p>}
        </div>
    </div>

    )
}