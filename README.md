# Overview

This is our original full-stack application to help cooking situation.

<img src="/Preview.png" alt="Preview of the App">

Users can browse online recipes, memorize and manage ingredients to make cooking situation efficient.
This application has created by [Tomo](https://github.com/Tomo-ja) and [Atsuya](https://github.com/tenmusu007).

⚠️ Because all data provided by third party api ([Spoonacular api](https://spoonacular.com/food-api)) under free plan, sometimes app hits api call limitation for a day and display static sample data we stored within app.

## Motivation

We decided to develop this application based on our real life problem of cooking situation as well as improve our management skill about application development as a team.

While Agile method, we used mainly Kanban, helped us plan and develop application easy and efficiently, we could bring out what we've learned so far about front end and backend using Next.js.

Encountering different type of difficultly than developing application personally is now solid our experience of real work-like, which includes how to manage schedule and app with git, develop efficient way, and create reusable components structure.

### Feature of App

**Without Account**

- Browse recipes searched by a ingredient name or random recipe app suggests

**With Account**

- Add/remove favorite recipes
- Add/remove ingredients into shopping list from recipe detail in order to buy them at grocery store efficiently.
- Add/remove ingredients into cloud fridge to track what you have and when you get them.
- Let you know what is expiring (being in fridge for a long time)
- Let you know what is missing to cook a dish you like when you open recipe detail

You can login this app with sample user
email address: guest@gmail.com
password: Guest1234

## Usage

This application is available on [Vercel](https://cook-friends.vercel.app/)

or

```
git clone git@github.com:Tomo-ja/Book-store.git
```

⚠️ On your local, you need to define following environment variables:

1. MONGO_URL ( You need to create the table on mongodb )
2. API_KEY ( api key for spoonacular )
3. API_BASE_URL ( your development server. normally http://localhost:3000 )

## Language and Libraries

- Next.js(React.js)
- TypeScript
- Styled components
- MongoDB
- swiper

## Other

Use case is available on [whimsical](https://whimsical.com/web-kitchen-use-case-UxygcF1dX56hJpvGxQxYuz)

Design is available on [Figma](https://www.figma.com/file/nhRqkIRlpRAaR4t33iHUaD/web-Kitchen?node-id=0%3A1)

### Enjoy your experience :)
