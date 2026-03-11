"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Task, CreateOrUpdateTaskRequest } from "@/types/task";
import TaskList from "./_components/TaskList";
import { ThemeToggle } from "@/app/tasks/_components/ToggleThemeButton";
import { getTasks, saveTask, deleteTask } from "@/libs/api";

export default function TasksPage() {
    const { resolvedTheme } = useTheme();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState("ALL");
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const dark = mounted ? resolvedTheme === "dark" : false;

    useEffect(() => {
        getTasks().then(setTasks).catch((e) => setError(e.message)).finally(() => setLoading(false));
    }, [])

    const counts = {
        ALL: tasks.length,
        TODO: tasks.filter((t) => t.status === "TODO").length,
        IN_PROGRESS: tasks.filter((t) => t.status === "IN_PROGRESS").length,
        DONE: tasks.filter((t) => t.status === "DONE").length,
    };

    const handleSave = async (data: CreateOrUpdateTaskRequest) => {
        try {
            if (editingTask) {
                const updated = await saveTask({ ...data, id: editingTask.id });
                setTasks((prev) => prev.map((t) => t.id === editingTask.id ? updated : t));
                setEditingTask(null);
            } else {
                const created = await saveTask(data);
                setTasks((prev) => [...prev, created]);
                setShowForm(false);
            }
        } catch (e: any) {
            setError(e.message);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTask(id);
            setTasks((prev) => prev.filter((t) => t.id !== id));
        } catch (e: any) {
            setError(e.message)
        }
    }

    return (
        <>
            <style>{`
        @keyframes slideUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .task-row { animation: slideUp 0.35s ease forwards; opacity: 0; }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        .fade-in { animation: fadeIn 0.2s ease forwards; }
      `}</style>

            <main className={`min-h-screen transition-colors duration-300 ${dark ? "bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900"}`}>
                <div className="max-w-2xl mx-auto px-4 py-10">

                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
                            <p className={`text-sm mt-0.5 font-mono ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
                                {counts.DONE}/{counts.ALL} completed
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <ThemeToggle />
                            <button
                                onClick={() => { setShowForm(true); setEditingTask(null); }}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                                style={{ background: dark ? "#f4f4f5" : "#18181b", color: dark ? "#18181b" : "#f4f4f5" }}
                            >
                                <i className="fa-solid fa-plus text-xs" />
                                New task
                            </button>
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-4 px-4 py-3 rounded-lg border border-red-800 bg-red-900/20 text-red-400 text-sm font-mono">
                            <i className="fa-solid fa-circle-exclamation mr-2" />
                            {error}
                        </div>
                    )}

                    {/* Loading */}
                    {loading ? (
                        <div className={`text-center py-16 text-sm font-mono ${dark ? "text-zinc-600" : "text-zinc-400"}`}>
                            <i className="fa-solid fa-spinner fa-spin text-2xl mb-3 block" />
                            Loading tasks...
                        </div>
                    ) : (
                        <>
                            {/* Progress bar */}
                            <div className={`w-full h-1 rounded-full mb-6 ${dark ? "bg-zinc-800" : "bg-zinc-200"}`}>
                                <div
                                    className="h-1 rounded-full bg-emerald-400 transition-all duration-700"
                                    style={{ width: counts.ALL ? `${(counts.DONE / counts.ALL) * 100}%` : "0%" }}
                                />
                            </div>

                            <TaskList
                                tasks={tasks}
                                filter={filter}
                                editingTask={editingTask}
                                showForm={showForm}
                                counts={counts}
                                onFilterChange={setFilter}
                                onSave={handleSave}
                                onDelete={handleDelete}
                                onEdit={(task) => { setEditingTask(task); setShowForm(false); }}
                                onCancelForm={() => setShowForm(false)}
                                onCancelEdit={() => setEditingTask(null)}
                            />

                            {tasks.length > 0 && (
                                <p className={`text-center text-xs font-mono mt-8 ${dark ? "text-zinc-700" : "text-zinc-300"}`}>
                                    {counts.TODO} remaining · {counts.IN_PROGRESS} in progress
                                </p>
                            )}
                        </>
                    )}
                </div>
            </main>
        </>
    );
}