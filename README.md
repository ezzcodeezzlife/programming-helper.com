[aiservice.vercel.app/](https://aiservice.vercel.app/)

## Getting Started

### Clone the repository and install dependencies

```
git clone https://github.com/ezzcodeezzlife/openaiwebsite.git
cd openaiwebsite
npm install
```

### Configure your local environment

Copy the .env.local.example file in this directory to .env.local (which will be ignored by Git):

```
cp .env.local.example .env.local
```

Add details for one or more providers (e.g. Google, Twitter, GitHub, Email, etc).

### Start the application

To run your site locally, use:

```
npm run dev
```

To run it in production mode, use:

```
npm run build
npm run start
```
