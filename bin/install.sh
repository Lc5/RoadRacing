#!/usr/bin/env bash

set -e

BASEDIR=$(dirname "$0")

cd $BASEDIR/..
cd web
if (drush status bootstrap | grep -q Successful); then echo 'Drupal already installed!'; exit 1; fi
cd ..
source .env
export $(cut -d= -f1 .env)
composer install
drupal init
cd web
/usr/bin/env PHP_OPTIONS="-d sendmail_path=`which true`" drush site-install standard --yes \
--account-mail=$DRUPAL_ACCOUNT_MAIL \
--account-name=$DRUPAL_ACCOUNT_NAME \
--account-pass=$DRUPAL_ACCOUNT_PASS \
--config-dir=/var/www/html/config/sync \
--db-url=mysql://$MYSQL_USER:$MYSQL_PASSWORD@db/$MYSQL_DATABASE \
--locale=en \
--site-mail=$DRUPAL_SITE_MAIL \
--site-name="$DRUPAL_SITE_NAME"
chown -R www-data:www-data /var/www/html/web /var/www/html/config
