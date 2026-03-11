# Fluid AI — Frontend

Next.js web application for the Task Manager — list, create, edit, and delete tasks with a clean dark/light interface.

**Live App** → [fluid-ai-yqba.vercel.app/tasks](https://fluid-ai-yqba.vercel.app/tasks)

---

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx                      # Root layout, fonts, Font Awesome, ThemeProvider
│   ├── page.tsx                        # Redirects to /tasks
│   ├── globals.css                     # Tailwind, CSS variables, theme tokens
│   └── tasks/
│       ├── page.tsx                    # Tasks page — state, API calls, layout
│       └── _components/
│           ├── TaskList.tsx            # Filter tabs + task list container
│           ├── TaskCard.tsx            # Individual task row
│           ├── TaskForm.tsx            # Create / edit form (inline)
│           ├── DeleteButton.tsx
|           └── ToggleThemeButton.tsx   # Dark/light/system toggle
├── libs/
│   └── api.ts                          # All fetch calls to the FastAPI backend
└── types/
    └── task.ts                          # Task types, TaskStatus, STATUS_CONFIG
```

---

## Features

- Create, edit, and delete tasks
- Task status — `todo`, `in_progress`, `done`
- Filter tasks by status
- Progress bar tracking completion
- Dark / light / system theme toggle
- Animated task rows on load
- Inline create and edit forms
- Error state handling

---

## Local Development

**Prerequisites:** Node.js 18+, npm

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

App available at `http://localhost:3000`

---

## Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the FastAPI backend |

---

## Tech Stack

| | |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Icons | Font Awesome 6 |
| Fonts | Outfit, IBM Plex Mono (Google Fonts) |
| Theme | next-themes |
| HTTP | Native `fetch` |

---

## Deployment (Vercel)

1. Push to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Add environment variable in dashboard:

| Key | Value |
|---|---|
| `NEXT_PUBLIC_API_URL` | Your deployed backend URL |

Vercel auto-detects Next.js — no build configuration needed.

---

## Author

**Rakshit Pandey**
[github.com/pandey-rakshit](https://github.com/pandey-rakshit) · [linkedin.com/in/pandey-rakshit](https://linkedin.com/in/pandey-rakshit)