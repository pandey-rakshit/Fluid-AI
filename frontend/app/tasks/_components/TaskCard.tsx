"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Task, STATUS_CONFIG } from "@/types/task";
import DeleteButton from "./DeleteButton";

interface TaskCardProps {
    task: Task;
    index: number;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
}

export default function TaskCard({ task, index, onDelete, onEdit }: TaskCardProps) {
    const { resolvedTheme } = useTheme();
    const dark = resolvedTheme === "dark";
    const [hovered, setHovered] = useState(false);

    const cfg = STATUS_CONFIG[task.status] ?? STATUS_CONFIG["TODO"];
    const date = new Date(task.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ animationDelay: `${index * 55}ms` }}
            className={`task-row group flex items-center gap-4 px-4 py-3 rounded-xl border transition-all duration-200 ${dark
                ? `border-zinc-800 ${hovered ? "bg-zinc-800/70 border-zinc-700" : "bg-zinc-900/40"}`
                : `border-zinc-100 ${hovered ? "bg-white border-zinc-200 shadow-sm" : "bg-zinc-50/60"}`
                }`}
        >
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />

            <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${task.status === "DONE"
                    ? dark ? "line-through text-zinc-500" : "line-through text-zinc-400"
                    : dark ? "text-zinc-100" : "text-zinc-800"
                    }`}>
                    {task.title}
                </p>
                {task.description && (
                    <p className={`text-xs mt-0.5 truncate ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
                        {task.description}
                    </p>
                )}
            </div>

            <span className={`text-xs font-mono px-2 py-0.5 rounded-full border flex-shrink-0 ${cfg.badge}`}>
                {cfg.label}
            </span>

            <span className={`text-xs font-mono flex-shrink-0 hidden sm:block ${dark ? "text-zinc-600" : "text-zinc-300"}`}>
                {date}
            </span>

            <div className={`flex items-center gap-1 transition-opacity flex-shrink-0 ${hovered ? "opacity-100" : "opacity-0"}`}>
                <button
                    onClick={() => onEdit(task)}
                    className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors text-xs ${dark ? "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-700" : "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100"
                        }`}
                >
                    <i className="fa-solid fa-pen" />
                </button>
                <DeleteButton onDelete={() => onDelete(task.id)} />
            </div>
        </div>
    );
}