export class ApiService {
    static apiBase: string = 'http://localhost:5142/api';

    // GET method
    static async get(path: string) {
        try {
            const response = await fetch(`${this.apiBase}${path}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred');
            }
            return response.json();
        } catch (error) {
            console.error("Failed to fetch data:", error);
            throw error;
        }
    }

    // POST method
    static async post(path: string, data: Record<string, unknown>) {
        try {
            const response = await fetch(`${this.apiBase}${path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred');
            }

            return response.json();
        } catch (error) {
            console.error("Failed to post data:", error);
            throw error;
        }
    }

    // PUT method
    static async put(path: string, data: Record<string, unknown>) {
        try {
            const response = await fetch(`${this.apiBase}${path}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred');
            }
            return response.json();
        } catch (error) {
            console.error("Failed to update data:", error);
            throw error;
        }
    }

    // DELETE method
    static async delete(path: string) {
        try {
            const response = await fetch(`${this.apiBase}${path}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Error deleting data from ${path}: ${response.status}`);
            }
            return response.json();
        } catch (error) {
            console.error("Failed to delete data:", error);
            throw error;
        }
    }
}
