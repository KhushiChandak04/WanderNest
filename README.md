# WanderNest

## Project Info

WanderNest is your ultimate travel companion for international trips. Plan itineraries, get visa guidance, find vegetarian food, and manage budgets—all in one place.

## Folder Structure

```
d:\GitHub\WanderNest
├── src
│   ├── components
│   │   ├── Navigation.tsx
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   └── ui
│   │       ├── button.tsx
│   │       ├── toaster.tsx
│   │       ├── sonner.tsx
│   │       └── tooltip.tsx
│   ├── pages
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── PlanTrip.tsx
│   │   ├── NotFound.tsx
│   │   ├── VisaGuide.tsx
│   │   └── FoodFinder.tsx
│   ├── assets
│   │   └── hero-world-map.jpg
│   ├── App.tsx
│   └── main.tsx
├── server
│   ├── models
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── .env
│   └── server.js
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── ...other config files
```

> The backend uses MongoDB Atlas and connects with Mongoose in `server/server.js`.

## How to run locally

1. Clone the repository:
   ```sh
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Install Framer Motion for animations:
   ```sh
   npm install framer-motion
   ```
4. **Install Axios for API requests:**
   ```sh
   npm install axios
   ```
5. Backend (server) – run in a new terminal:
   - In PowerShell (Windows), set your environment variables (per-session):
     ```powershell
     # Required: x.ai (Grok) API key – keep secret and never commit
     $env:XAI_API_KEY = "<your-xai-api-key>"

     # Optional: allow demo responses if upstream is unavailable
     $env:AI_DEMO_FALLBACK = "true"

     cd server
     npm install
     npm run start
     ```
   - Health check: http://localhost:5000/api/ai/health → `{ ok: true, hasKey: true }`

6. Frontend (root):
   ```powershell
   npm install
   npm run dev
   # open http://localhost:8080
   ```

Notes
- Dev proxy: Vite proxies `/api` → `http://localhost:5000` (see `vite.config.ts`).
- Client only calls your backend; the API key is never exposed to the browser.
- To go live (no demo fallback): remove the environment variable `AI_DEMO_FALLBACK` and restart the server.

## Troubleshooting

If you see an error like  
`Failed to resolve import "axios" from "src/services/api.ts"`  
run the following command in your project root to install axios:

```sh
npm install axios
```

## Security Note

**Never commit your `.env` file to version control.**  
Your `.env` contains sensitive credentials (e.g., API keys, database URIs).  
If it was committed, follow these steps:
1. Add `.env` to `.gitignore`.
2. Remove it from git history (`git rm --cached server/.env` and commit).
3. Rotate any exposed API keys/passwords immediately.
4. (Optional) Use `git-filter-repo` to remove `.env` from all past commits.
