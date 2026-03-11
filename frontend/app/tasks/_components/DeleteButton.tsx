"use client";

import { useTheme } from "next-themes";

interface DeleteButtonProps {
    onDelete: () => void;
}

export default function DeleteButton({ onDelete }: DeleteButtonProps) {
    const { resolvedTheme } = useTheme();
    const dark = resolvedTheme === "dark";

    return (
        <button
            onClick={onDelete}
            className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors text-xs ${dark ? "text-zinc-500 hover:text-red-400 hover:bg-red-900/20" : "text-zinc-400 hover:text-red-500 hover:bg-red-50"
                }`}
        >
            <i className="fa-solid fa-trash" />
        </button>
    );
}