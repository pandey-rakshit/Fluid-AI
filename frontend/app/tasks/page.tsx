"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Task, CreateOrUpdateTaskRequest } from "@/types/task";
import TaskList from "./_components/TaskList";
import { ThemeToggle } from "@/app/tasks/_components/ToggleThemeButton";

const MOCK_TASKS: Task[] = [
    { id: "1", title: "Design system architecture", description: "Plan the folder structure and data flow", status: "DONE", created_at: "2026-03-01T10:00:00Z", updated_at: "2026-03-01T10:00:00Z" },
    { id: "2", title: "Build repository layer", description: "File-based storage with JSON", status: "IN_PROGRESS", created_at: "2026-03-05T09:00:00Z", updated_at: "2026-03-05T09:00:00Z" },
    { id: "3", title: "Write API endpoints", description: "CRUD with FastAPI and CBV pattern", status: "IN_PROGRESS", created_at: "2026-03-08T14:00:00Z", updated_at: "2026-03-08T14:00:00Z" },
    { id: "4", title: "Setup CI/CD pipeline", description: null, status: "TODO", created_at: "2026-03-10T08:00:00Z", updated_at: "2026-03-10T08:00:00Z" },
    { id: "5", title: "Add Firebase integration", description: "Migrate from file storage to Firestore", status: "TODO", created_at: "2026-03-11T11:00:00Z", updated_at: "2026-03-11T11:00:00Z" },
];

export default function TasksPage() {
    const { resolvedTheme } = useTheme();
    const dark = resolvedTheme === "dark";

    const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
    const [filter, setFilter] = useState("ALL");
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const counts = {
        all: tasks.length,
        todo: tasks.filter((t) => t.status === "TODO").length,
        in_progress: tasks.filter((t) => t.status === "IN_PROGRESS").length,
        done: tasks.filter((t) => t.status === "DONE").length,
    };

    const handleSave = (data: CreateOrUpdateTaskRequest) => {
        if (editingTask) {
            setTasks((prev) => prev.map((t) => t.id === editingTask.id ? { ...t, ...data } : t));
            setEditingTask(null);
        } else {
            const newTask: Task = { ...data, id: String(Date.now()), status: data.status || "TODO", description: data.description || null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
            setTasks((prev) => [...prev, newTask]);
            setShowForm(false);
        }
    };

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
                                {counts.done}/{counts.all} completed
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

                    {/* Progress bar */}
                    <div className={`w-full h-1 rounded-full mb-6 ${dark ? "bg-zinc-800" : "bg-zinc-200"}`}>
                        <div
                            className="h-1 rounded-full bg-emerald-400 transition-all duration-700"
                            style={{ width: counts.all ? `${(counts.done / counts.all) * 100}%` : "0%" }}
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
                        onDelete={(id) => setTasks((prev) => prev.filter((t) => t.id !== id))}
                        onEdit={(task) => { setEditingTask(task); setShowForm(false); }}
                        onCancelForm={() => setShowForm(false)}
                        onCancelEdit={() => setEditingTask(null)}
                    />

                    {/* Footer */}
                    {tasks.length > 0 && (
                        <p className={`text-center text-xs font-mono mt-8 ${dark ? "text-zinc-700" : "text-zinc-300"}`}>
                            {counts.todo} remaining · {counts.in_progress} in progress
                        </p>
                    )}
                </div>
            </main>
        </>
    );
}