"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { CreateOrUpdateTaskRequest, Task, TaskStatus } from "@/types/task";

interface TaskFormProps {
    onSave: (data: CreateOrUpdateTaskRequest) => void;
    onCancel: () => void;
    initial?: Task | null;
}

export default function TaskForm({ onSave, onCancel, initial = null }: TaskFormProps) {
    const { resolvedTheme } = useTheme();
    const dark = resolvedTheme === "dark";

    const [title, setTitle] = useState(initial?.title || "");
    const [desc, setDesc] = useState(initial?.description || "");
    const [status, setStatus] = useState<TaskStatus>(initial?.status || "TODO");

    const base = `w-full px-3 py-2 text-sm rounded-md border outline-none transition-all font-mono ${dark
        ? "bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-600 focus:border-zinc-400"
        : "bg-white border-zinc-200 text-zinc-800 placeholder-zinc-400 focus:border-zinc-400"
        }`;

    return (
        <div className={`rounded-xl border p-4 space-y-3 ${dark ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200 shadow-sm"}`}>
            <input
                autoFocus
                placeholder="Task title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={base}
            />
            <input
                placeholder="Description (optional)"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className={base}
            />
            <div className="flex items-center gap-2">
                <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)} className={`${base} w-auto cursor-pointer`}>
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                </select>
                <div className="flex gap-2 ml-auto">
                    <button
                        onClick={onCancel}
                        className={`px-3 py-1.5 rounded-md border text-sm transition-colors ${dark ? "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200" : "border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-700"
                            }`}
                    >
                        <i className="fa-solid fa-xmark" />
                    </button>
                    <button
                        onClick={() => title.trim() && onSave({ title: title.trim(), description: desc.trim() || null, status })}
                        disabled={!title.trim()}
                        className={`px-3 py-1.5 rounded-md border text-sm transition-colors ${title.trim()
                            ? dark ? "border-emerald-700 text-emerald-400 hover:bg-emerald-900/30" : "border-emerald-400 text-emerald-600 hover:bg-emerald-50"
                            : "opacity-30 cursor-not-allowed border-zinc-700 text-zinc-600"
                            }`}
                    >
                        <i className="fa-solid fa-check" />
                    </button>
                </div>
            </div>
        </div>
    );
}