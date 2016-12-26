#!/usr/bin/env bash

set -e

composer install
cd web
drupal config:import
drupal update:entities
chown -R www-data:www-data /var/www/html/web /var/www/html/config
