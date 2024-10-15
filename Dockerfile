FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip git curl sqlite3 libsqlite3-dev \
    && docker-php-ext-install pdo pdo_sqlite

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs

WORKDIR /var/www/html
COPY . .

RUN mkdir -p public/build && chown -R www-data:www-data public/build

RUN composer install

RUN npm install && npm run build --prefix ./

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/public/build

CMD php artisan serve --host=0.0.0.0 --port=8000
EXPOSE 8000
