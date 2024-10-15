# Laravel-blog

Laravel-blog is a simple blog application that uses a Laravel backend and a React frontend. The technologies used during the development of the project include Laravel Breeze for authentication, Laravel Gate for user permissions management, SQLite for data storage, and React for building the user interface. Tailwind CSS is used for styling the user interface.

## Key Technologies

-   **Laravel Backend**: The backend is built using the Laravel PHP framework.
-   **Breeze Authentication**: Authentication and registration are implemented using the Laravel Breeze package.
-   **React Frontend**: The user interface is built with React.
-   **Laravel Gate**: Permission management for regulating different levels of user access.
-   **SQLite Database**: Uses a simple SQLite database for data storage.
-   **Tailwind CSS**: Tailwind CSS is used for styling the frontend.

## Installation and Configuration

To install Laravel-blog, follow these steps:

### 1. Clone the Repository

First, clone the project from the Git repository:

```bash
git clone https://github.com/hansie95/laravel-blog.git
cd laravel-blog
```

### 2. Set Up the `.env` File

Create a `.env` file based on the `.env.example` file:

```bash
cp .env.example .env
```

### 3. Install Dependencies

Run the following command to install PHP and JavaScript dependencies:

```bash
composer install
npm install
```

Then generate the application key:

```bash
php artisan key:generate
```

### 4. Run Database Migrations

Run the database migrations to create the SQLite database:

```bash
php artisan migrate
```

### 5. Build the Frontend

Build the frontend assets:

```bash
npm run build
```

### 6. Run the Application

Run the Laravel built-in server to access the application:

```bash
php artisan serve
```

The server will be available by default at `http://127.0.0.1:8000`.

## Requirements

-   PHP 8.2
-   Node.js 16 or newer
-   Composer
