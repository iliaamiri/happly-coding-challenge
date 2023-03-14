## Introduction

This app is meant for the Happly Laravel Challenge.
It's a simple app that shows you Kanye West quotes randomly and lets you update it.

- The user must be logged-in to see the quotes.
- The quotes are fetched from a laravel api endpoint.
- The user can update the quote by clicking on the update button fetched from the api.

## Table of Contents

  <ol>
    <li>
      <a href="#how-to-run-the-app">How to run the app</a>
    </li>
    <li>
      <a href="#troubleshooting">Troubleshooting</a>
        <ul>
            <li><a href="#curl-ssl-error">Curl SSL error</a></li>
        </ul>
    </li>
  </ol>

## How to run the app

### 1. Clone the repo

```bash
git clone https://github.com/Mindful-Connect/happly-laravel-challenge
cd happly-laravel-challenge
```

### 2. Install dependencies

```bash
composer install
npm install
```

### 3. Creating `.env`

Create a new .env file by duplicating the .env.example file and updating the values for your environment. If you are
using SQLite, update the `DB_CONNECTION` to sqlite and set the `DB_DATABASE` to an absolute path to the SQLite file, for
example:

```js
DB_CONNECTION = sqlite
DB_DATABASE = /absolute/path/to/database.sqlite
```

### 4. Generate a new application key by running:

```bash
php artisan key:generate
```

### 5. Run the migrations

```bash
php artisan migrate
```

### 6. Compile the assets (vite + react) by running:

```bash
npm run dev
```

### 7. Run the app

```bash
php artisan serve
```

Your application should now be running at http://localhost:8000.

### 8. Run the SSR server (optional)

```bash
php artisan inertia:start-ssr
```

📝 Note: No unit tests were written for this app.

## Troubleshooting

### Curl SSL error

If you get the following error when visiting http://localhost:8000/api/newQuote:

```bash
curl: (60) SSL certificate problem: unable to get local issuer certificate
More details here: https://curl.haxx.se/docs/sslcerts.html
```

You can fix it by following this guide:
https://medium.com/@narendravaghela/how-to-fix-curl-error-60-ssl-certificate-problem-80e7dafafa57