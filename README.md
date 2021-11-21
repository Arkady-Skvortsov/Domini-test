<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

<span>Domini Games test app :)</span>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running app with Docker

```bash
  # build domini-image
  $ docker build -t 389798/domini-image .

  # up domini-main-container
  $ docker run --rm -p 3000:3000 --name domini-main-container 389798/domini-image

  # stop domini-main-container
  $ docker stop domini-main-container

  # Look inside domini-main-container
  $ docker exec -it domini-main-container /bin/bash

  # Remove domini-image
  $ docker rmi 389798/domini-image

  #PostgresQL (14 version)

  # download postgres image
  $ docker pull postgres

  # up pg-domini-container
  $ docker run --rm -p 5432:5432 --name pg-domini-container --env-file=./.development.env -e POSTGRES_USER=$PG_USER -e POSTGRES_PASSWORD=$PG_PASSWORD -e POSTGRES_DB=$PG_DB -v pg-domini:/var/lib/postgresql/data postgres

  # stop pg-domini-container
  $ docker stop pg-domini-container

  # look inside pg-domini-container
  $ docker exec -it pg-domini-container psql -U $PG_USER -W $PG_DB

  # Remove postgres image
  $ docker rmi postgres

  # up two containers together
  $ docker-compose up

  # down two container together
  $ docker-compose down
```

## Or you can use makefile

```bash
  # build domini-image
  $ make domini-build

  # up domini-main-container
  $ make domini-run

  # stop domini-main-container
  $ make domini-stop

  # look inside domini-main-container
  $ make domini-inside-container

  # stop domini-main-container
  $ make domini-rmi

  # PostgresQL (version 13)

  # download postgres image
  $ make pg-build

  # run pg-domini-container
  $ make pg-up

  # stop pg-domini-container
  $ make pg-down

  # look inside domini-container
  $ make pg-inside-container

  # remove postgres image
  $ make pg-rmi

  # build domini image + docker-compose up
  $ make chain-to-life

  # docker-compose down + docker-compose stop + rmi domini image
  $ make chain-to-down
```

## How to use and test project? :)

```bash

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
