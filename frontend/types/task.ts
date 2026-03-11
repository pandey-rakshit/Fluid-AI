
export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE"

export interface Task {
    id: string;
    title: string;
    description: string | null;
    status: TaskStatus;
    created_at: string;
    updated_at: string;
}

export interface CreateOrUpdateTaskRequest {
    id?: string;
    title: string;
    description?: string | null;
    status?: TaskStatus
}

export const STATUS_CONFIG: Record<TaskStatus, { label: string; dot: string; badge: string }> = {
    TODO: {
        label: "To Do",
        dot: "bg-slate-400",
        badge: "dark:text-slate-400 dark:border-slate-700 dark:bg-slate-800/50 text-slate-500 border-slate-200 bg-slate-50",
    },
    IN_PROGRESS: {
        label: "In Progress",
        dot: "bg-amber-400",
        badge: "dark:text-amber-400 dark:border-amber-900 dark:bg-amber-900/20 text-amber-600 border-amber-200 bg-amber-50",
    },
    DONE: {
        label: "Done",
        dot: "bg-emerald-400",
        badge: "dark:text-emerald-400 dark:border-emerald-900 dark:bg-emerald-900/20 text-emerald-600 border-emerald-200 bg-emerald-50",
    },
};