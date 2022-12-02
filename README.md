![CI Workflow Status](https://github.com/fadavi/gh-users-by-lang/actions/workflows/node.js.yml/badge.svg?branch=main)

# Search GitHub Users by Programming Languages

## How to run in development environment
```bash
$ npm i
$ GITHUB_TOKEN=<YOUR_PERSONAL_TOKEN> npm run dev
```

## How to run using docker
```bash
$ docker build -t ghusers . --build-arg GITHUB_TOKEN=<YOUR_PERSONAL_TOKEN>
$ docker run -p3000:3000 -t ghusers
```

## Sample request

- [HTTPie](https://httpie.io/):
```bash
$ http :3000/users langs==javascript,-java limit==20

```

- cURL:
```bash
$ curl -s 'http://localhost:3000/users?langs=javascript,-java&limit=20' | jq
```
