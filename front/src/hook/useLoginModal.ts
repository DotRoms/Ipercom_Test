
export const useLoginModal = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("is submiting");
    }

    return {
        handleSubmit
    }
}