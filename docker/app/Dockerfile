FROM php:7.1-apache

MAINTAINER Łukasz Krzyszczak <lukasz.krzyszczak@gmail.com>

ARG guid
ARG hostname
ARG uid

# Packages
RUN apt-get update && apt-get install -y libpng12-dev libjpeg-dev libpq-dev mysql-client \
    && rm -rf /var/lib/apt/lists/* \
    # PHP extensions
    && docker-php-ext-configure gd --with-png-dir=/usr --with-jpeg-dir=/usr \
    && docker-php-ext-install gd mbstring opcache pdo pdo_mysql pdo_pgsql zip \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug

# Configuration
COPY config/php.ini /usr/local/etc/php
COPY config/default-ssl.conf $APACHE_CONFDIR/sites-available/default-ssl.conf
COPY config/custom.conf $APACHE_CONFDIR/conf-available/custom.conf
RUN printf "\nServerName $hostname\n" | tee -a "$APACHE_CONFDIR/conf-available/custom.conf"

# Apache
RUN a2enmod headers rewrite ssl
RUN a2dissite 000-default
RUN a2ensite default-ssl
RUN a2enconf custom

# SSL
RUN openssl req -x509 -newkey rsa:4086 \
    -subj "/C=XX/ST=XXXX/L=XXXX/O=XXXX/CN=$hostname" \
    -keyout "/etc/ssl/private/ssl-cert-snakeoil.key" \
    -out "/etc/ssl/certs/ssl-cert-snakeoil.pem" \
    -days 3650 -nodes -sha256

# User
RUN usermod -u $uid www-data
RUN groupmod -g $uid www-data

# Composer
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer
