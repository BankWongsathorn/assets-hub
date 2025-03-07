# Assets Hub

## Configuring the Environment Variables

To configure the environment variables, update the `.env` file with the appropriate values:

```
API_URL={API_URL}
DATABASE_URL="postgresql://{USERNAME}:{PASSWORD}@{SERVER}:{PORT}/{DB}"
NEXTAUTH_SECRET={SECRET_KEY}
```

## Installation

```sh
$ bun install
```

## Database

Start Docker:

```sh
$ docker compose up -d
```

Push table to database:

```sh
$ bun db:push
```

Insert data to database:

```sh
$ bun db:seed
```

Show data table

```sh
$ bun db:std
```

Stop Docker:

```sh
$ docker compose down -v
```

## Usage

Run server:

```sh
$ bun dev
```
