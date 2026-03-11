import { Task, CreateOrUpdateTaskRequest } from "@/types/task";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: "Unknown error" }));
        throw new Error(error.message ?? `HTTP ${res.status}`);
    }
    if (res.status === 204) return undefined as T;
    return res.json();
}

export const getTasks = (): Promise<Task[]> =>
    fetch(`${BASE_URL}/api/v1/tasks/`).then(handleResponse<Task[]>);

export const getTask = (id: string): Promise<Task> =>
    fetch(`${BASE_URL}/api/v1/tasks/${id}`).then(handleResponse<Task>);

export const saveTask = (data: CreateOrUpdateTaskRequest): Promise<Task> =>
    fetch(`${BASE_URL}/api/v1/tasks/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then(handleResponse<Task>);

export const updateTask = (id: string, data: CreateOrUpdateTaskRequest): Promise<Task> =>
    fetch(`${BASE_URL}/api/v1/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then(handleResponse<Task>);

export const deleteTask = (id: string): Promise<void> =>
    fetch(`${BASE_URL}/api/v1/tasks/${id}`, { method: "DELETE" }).then(handleResponse<void>);