### THANK YOU FOR COMING
This application has created by [Tomo](https://github.com/Tomo-ja) and [Atsuya](https://github.com/tenmusu007)
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), Typescript, styled components for design, and mongodb for database.

## Introduction

### Before Use
- Because app is using [Spoonacular api](https://spoonacular.com/food-api) to get all related resorces with free plan, sometimes app hits api call limitation for a day and display static sample data we stored within app.
- If you want to pull and try in local, you need to create following environment variables.
    1. MONGO_URL ( You need to create the table on mongodb )
    2. API_KEY ( api key for spoonacular )
    3. API_BASE_URL ( your development server. normally http://localhost:3000 )
    
### Feature of App
**Without Account**
  - Brouse recipes serched by a ingredient name or random recipe app sugguests
  
**With Account**
  - Add/remove favorite recipes
  - Add/remove ingredients into shopping list from recipe detail in order to buy them at grocery store efficiently.
  - Add/remove ingredients into cloud fridge to track what you have and when you get them.
  - Let you know what is expiring (being in fridge for a long time)
  - Let you know what is missing to cook a dish you like when you open recipe detail
  
You can login this app with sample user
email address: guest@gmail.com
password: Guest1234

# Enjoy your experience!!


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## use case
[application use case on whimsical](https://whimsical.com/web-kitchen-use-case-UxygcF1dX56hJpvGxQxYuz)

## design
[application design on figma](https://www.figma.com/file/nhRqkIRlpRAaR4t33iHUaD/web-Kitchen?node-id=0%3A1)

## common rule

### 1. update the branch

Before create Pull Request, please update the branch by
`git pull origin main`
and fix conflict locally
