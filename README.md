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
5. Start the development server:
   ```sh
   npm run dev
   ```

## Troubleshooting

If you see an error like  
`Failed to resolve import "axios" from "src/services/api.ts"`  
run the following command in your project root to install axios:

```sh
npm install axios
```

## Security Note

**Never commit your `.env` file to version control.**  
Your `.env` contains sensitive credentials (like your MongoDB password).  
If it was committed, follow these steps:
1. Add `.env` to `.gitignore`.
2. Remove it from git history (`git rm --cached server/.env` and commit).
3. Change your database password immediately.
4. (Optional) Use `git-filter-repo` to remove `.env` from all past commits.
