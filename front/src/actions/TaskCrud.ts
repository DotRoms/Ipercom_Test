import { VerifyIfUserExistWithToken } from "../actions/VerifyIfUserExistWhitToken";

import { ApiService } from "../services/apiServices";

export const updateTask = (taskId: number) => {
    const handleUpdateTask = async () => {
        const userId = await VerifyIfUserExistWithToken();

        if (!userId || !taskId) {
            console.error("User or Task ID is missing");
            return;
        }

        const data = {
            taskId: taskId,
            userId: userId,
        };

        try {
            const response = await ApiService.put(`/Task/update`, data);
            return response;
        } catch (error) {
            console.error("Error updating task in DB:", error);
        }
    };

    return { handleUpdateTask };
};

export const deleteTask = (taskId: number) => {
    const handleDeleteTask = async () => {
        const userId = await VerifyIfUserExistWithToken();

        if (!userId || !taskId) {
            console.error("User or Task ID is missing");
            return;
        }

        try {
            const response = await ApiService.delete(
                `/Task/delete?userId=${userId}&taskId=${taskId}`
            );
            return response;
        } catch (error) {
            console.error("Error deleting task in DB:", error);
        }
    };

    return { handleDeleteTask };
};
