"use client";

import { useTheme } from "next-themes";
import { Task, CreateOrUpdateTaskRequest } from "@/types/task";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

const FILTERS = [
    { key: "ALL", label: "All", icon: "fa-layer-group" },
    { key: "TODO", label: "To Do", icon: "fa-circle-dot" },
    { key: "IN_PROGRESS", label: "In Progress", icon: "fa-spinner" },
    { key: "DONE", label: "Done", icon: "fa-circle-check" },
];

interface TaskListProps {
    tasks: Task[];
    filter: string;
    editingTask: Task | null;
    showForm: boolean;
    counts: Record<string, number>;
    onFilterChange: (f: string) => void;
    onSave: (data: CreateOrUpdateTaskRequest) => void;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
    onCancelForm: () => void;
    onCancelEdit: () => void;
}

export default function TaskList({
    tasks, filter, editingTask, showForm, counts,
    onFilterChange, onSave, onDelete, onEdit, onCancelForm, onCancelEdit,
}: TaskListProps) {
    const { resolvedTheme } = useTheme();
    const dark = resolvedTheme === "dark";

    const filtered = tasks.filter((t) => filter === "all" || t.status === filter);

    return (
        <div>
            {/* Filter tabs */}
            <div className="flex gap-1 mb-5">
                {FILTERS.map((f) => (
                    <button
                        key={f.key}
                        onClick={() => onFilterChange(f.key)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f.key
                            ? dark ? "bg-zinc-800 text-zinc-100 border border-zinc-700" : "bg-white text-zinc-800 border border-zinc-200 shadow-sm"
                            : dark ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-400 hover:text-zinc-600"
                            }`}
                    >
                        <i className={`fa-solid ${f.icon} text-xs`} />
                        <span className="hidden sm:inline">{f.label}</span>
                        <span className={`font-mono ${filter === f.key ? "text-zinc-400" : "text-zinc-600"}`}>
                            {counts[f.key]}
                        </span>
                    </button>
                ))}
            </div>

            {/* New task form */}
            {showForm && !editingTask && (
                <div className="mb-3 fade-in">
                    <TaskForm onSave={onSave} onCancel={onCancelForm} />
                </div>
            )}

            {/* List */}
            <div className="space-y-2">
                {filtered.length === 0 && (
                    <div className={`text-center py-16 text-sm font-mono ${dark ? "text-zinc-600" : "text-zinc-400"}`}>
                        <i className="fa-solid fa-inbox text-2xl mb-3 block" />
                        No tasks here
                    </div>
                )}
                {filtered.map((task, i) =>
                    editingTask?.id === task.id ? (
                        <div key={task.id} className="fade-in">
                            <TaskForm initial={task} onSave={onSave} onCancel={onCancelEdit} />
                        </div>
                    ) : (
                        <TaskCard key={task.id} task={task} index={i} onDelete={onDelete} onEdit={onEdit} />
                    )
                )}
            </div>
        </div>
    );
}