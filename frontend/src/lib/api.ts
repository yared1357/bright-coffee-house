const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
    async post(endpoint: string, data: any, token?: string) {
        const isFormData = data instanceof FormData;
        const headers: any = {};
        if (!isFormData) headers['Content-Type'] = 'application/json';
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: isFormData ? data : JSON.stringify(data),
        });
        return response.json();
    },

    async get(endpoint: string, token?: string) {
        const headers: any = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers });
        return response.json();
    },

    async delete(endpoint: string, token: string) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.json();
    },

    async put(endpoint: string, data: any, token: string) {
        const isFormData = data instanceof FormData;
        const headers: any = {};
        if (!isFormData) headers['Content-Type'] = 'application/json';
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers,
            body: isFormData ? data : JSON.stringify(data),
        });
        return response.json();
    }
};
