# Road-Racing.pl

New website of Road-Racing.pl cycling club.

## Installation

### Prerequisites

Docker and Docker Compose installed.

### Installation steps

Clone the repository:

```
$ git clone https://github.com/Lc5/RoadRacing.git .
$ cd RoadRacing
```

Create local .env file:

> Please remember to change the credentials to more secure, if not in development environment.

```
$ cp .env.dist .env
```

Create local settings file for development purposes:

> This must not be done on production environment.

```
$ cp web/sites/example.settings.local.php web/sites/default/settings.local.php
``` 

Build and run containers:

```
$ docker-compose up -d
$ docker exec -it roadracing_app_1 "bash"
```

Install Drupal:

```
$ @roadracing_app_1: chmod u+x bin/*.sh
$ @roadracing_app_1: bin/install.sh
```

> The site should be now reachable under https://localhost on Unix systems.

> On Windows or OSX use the following command to find the IP of your Docker host: ```$ docker-machine ip default```

## Updating

```
$ git pull
$ docker exec -it roadracing_app_1 "bash"
$ @roadracing_app_1: bin/update.sh
```

## Common problems

If you see errors with permission, just run the following command to fix them:

```
$ @roadracing_app_1: chown -R www-data:www-data /var/www/html/web /var/www/html/config
```
