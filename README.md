[<img src="https://authada.de/wp-content/uploads/2018/04/H_da_logo_fbi-1-1200x480.png" alt="Hochschule Darmstadt" width="350"/>](https://www.h-da.de/ "Hochschule Darmstadt")

🏛 [Fachbereich Informatik](https://fbi.h-da.de/ "Fachbereich Informatik") - [Hochschule Darmstadt](https://www.h-da.de/ "Hochschule Darmstadt")
<br><br>

# 🚩 [FWE:](https://obs.fbi.h-da.de/mhb/modul.php?nr=30.2566&sem=20202 "Fortgeschrittene Webentwicklung - Modulbeschreibung") BRETSCH - Your booking system for e-vehicles

![](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square) ![](https://img.shields.io/badge/backend_coverage-100%25-brightgreen?style=flat-square) ![](https://img.shields.io/badge/framework-Material_UI-blue?style=flat-square) ![](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

## Table of content

- [📋 About the project](#-about-the-project)
  - [👥 Development](#-development)
- [🛠 Setup the project](#-setup-the-project)
- [🔍 Test the project](#-test-the-project)
  - [Testing automatically](#1-testing-automatically)
  - [Testing manually](#2-testing-manually)
- [💡 Frontend Reference](#-frontend-reference)
- [🖥️ API Reference](#%EF%B8%8F-api-reference)
  - [Route `/label`](#route-label)
    - [Route `/label/:label/task`](#route-labellabeltask)
  - [Route `/task`](#route-task)
    - [Route `/task/:taskId/label`](#route-tasktaskidlabel)
    - [Route `/task/:taskId/tracking`](#route-tasktaskidtracking)
  - [Route `/tracking`](#route-tracking)
- [⚠ Status codes](#-status-codes)
- [© License](#-license)

# 📋 About the project

> TODO

## 👥 Development

The participants or contributors of this project include:

🎓 **Cimpoes, Vitali**
GitLab: [@istvicimp](https://code.fbi.h-da.de/istvicimp "@istvicimp")<br>

🎓 **Cincato, Ricardo**
GitLab: [@istricinc](https://code.fbi.h-da.de/istricinc "@istricinc")<br>

🎓 **Heymel, Celine**
GitLab: [@istceheym](https://code.fbi.h-da.de/istceheym "@istceheym")<br>

🎓 **Vogel, Eliah**
GitLab: [@istelvoge](https://code.fbi.h-da.de/istelvoge "@istelvoge")<br>

🎓 **Walther, Ramon**
GitLab: [@istrawalt](https://code.fbi.h-da.de/istrawalt "@istrawalt")<br>

🎓 **Werner, Niklas**
GitLab: [@istnswern](https://code.fbi.h-da.de/istnswern "@istnswern")<br>

_This project is kindly supervised by T. Sauer / D. Schulz / D. Wohlfarth._

# 🛠 Setup the project

There is barley nothing easier than setting up this project. Just follow this 3 steps and you're ready to go:

1. Move over to the `bretsch-app/bretsch-api/` folder and create a `.env` file based on the `.env.example`. For default values use the `.env.dist` as base. After that repeat this process for the `bretsch-app/bretsch-frontend/` folder.
2. Now head back to the root folder and execute the following command:

   ```
   make start
   ```

   Alternatively if you can't use `make`, run:

   ```
   docker-compose up
   ```

   **Note:** In some cases, the creation of the DB docker is slower than the API docker. This is resulting in the API docker failing to connect to the DB and automatically synchronies the db schema. If this is the case, make sure to restart the project or execute the following command manually as soon as the db is up and running:

   ```
   make dbsync
   ```

   Alternatively if you can't use `make`, run:

   ```
   docker-compose exec bretsch-api npm run typeorm schema:sync
   ```

3. Thats it, your done, it's as simple as that! Your servers should be running now and got a working connection to the DB. You can verify this by checking the console output, which should tell you something like this:

   ```
   You can now view bretsch-frontend in the browser.

      Local:            http://localhost:80
      On Your Network:  http://172.18.0.3:80
   ```

   **Note:** The build process of the frontend could take a few minutes, so please be patient.

Oh and by the way, if you're willing to stop the running server ever again, try executing the following command at the root dir:

```
make stop
```

Alternatively if you can't use `make`, run:

```
docker-compose down
```

# 🔍 Test the project

So we included two separate options for you to test the project:

## 1. Testing automatically

This project includes defined automated tests (using jest and cypress). This helps you testing the project easily without spending hours and hours to check every existing route and functionality manually. The already defined api tests are used to test **every single route** for a minimum of a good and bad path. The frontend tests include component as well as E2E tests.

To run all tests, you have to simply start the servers and execute the following command at the root dir:

```
make test
```

Alternatively if you can't use `make`, run:

```
docker-compose exec bretsch-api npm run test
docker-compose exec bretsch-frontend npm run test
```

Depending on the system you're running the tests on, this takes up to a couple of minutes. After that, you're ending up with a detailed overview of the code coverage (_which should be at 100%!_) and the result of the executed tests (_which should tell you that all tests were passed successfully_) for the backend. Followed by the test results of the frontend jest tests.

![](bretsch-app/bretsch-api/doc/test_result.png)

To start the cypress test environment execute the following command at the root dir:

```
make cypress
```

Alternatively if you can't use `make`, move over to the `bretsch-app/cypress/` folder and run:

```
npm i
npm run cypress
```

### Specify what part to test:

If you just want to run the **frontend** tests, execute the following command at the root dir:

```
make ftest
```

Alternatively if you can't use `make`, run:

```
docker-compose exec bretsch-frontend npm run test
```

And if you just wanna run the **backend** tests, execute the following command at the root dir:

```
make btest
```

Alternatively if you can't use `make`, run:

```
docker-compose exec bretsch-api npm run test
```

## 2. Testing manually

If you willing to test the project, especially the backend, manually or wanna test a specific - not in the predefined test included - case, we recommend using the free and easy to use software [Postman](https://www.postman.com/). We also included all routes with a simple examples in our [Postman Collection](bretsch-app/bretsch-api/doc/postman/Bretsch-Backend.postman_collection.json) we're providing with this project. So feel free to test as much as you want, but keep in mind at some point you're going to run out of coffee!

Note that the predefined postman collection is based on the fixtures also delivered with the project. To add this example fixtures to your database simple execute the following command at the root dir:

```
make fixtures
```

Alternatively if you can't use `make`, run:

```
docker-compose exec bretsch-api npm run fixtures
```

# 💡 Frontend Reference

This is a short introduction to the essential functions as well as to some special features. But for most parts, the frontend is very user friendly and self-explanatory. So we keep this Reference kinda short by purpose. Well, then lets start already!

> TODO

Okay, so that should be enough for now. As we said, the rest is super easy to understand and shouldn't pose any major difficulties. But If it does, feel free to contact us!

# 🖥️ API Reference

This is a simple overview of all routes provided by the API, grouped by their routers and sorted alphabetically.

**Note:** For further information's including examples on each route, just click their method descriptions.

## Route `/example`

| Method                                                                                     | URL                              |
| ------------------------------------------------------------------------------------------ | -------------------------------- |
| [Create example](bretsch-app/bretsch-api/doc/api_reference/example/createExample.md)       | `POST /api/example/`             |
| [Delete example by id](bretsch-app/bretsch-api/doc/api_reference/bretsch/deleteExample.md) | `DELETE /api/example/:exampleId` |
| [Get example by id](bretsch-app/bretsch-api/doc/api_reference/bretsch/getExample.md)       | `GET /api/example/:exampleId`    |
| [Get examples](bretsch-app/bretsch-api/doc/api_reference/bretsch/getExamples.md)           | `GET /api/example/`              |
| [Patch example by id](bretsch-app/bretsch-api/doc/api_reference/bretsch/patchExample.md)   | `PATCH /api/example/:exampleId`  |

# ⚠ Status codes

The following table gives you a simple overview of the used http status codes used by the project and its respective meaning:

| STATUS CODE                 | Description                                                                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `200 OK`                    | Indicates that the request has succeeded.                                                                                                     |
| `201 Created`               | Indicates that the request has succeeded and a new resource has been created as a result.                                                     |
| `204 No Content`            | The server has fulfilled the request but doesn't need to return a response body.                                                              |
|                             |
| `400 Bad Request`           | The request couldn't be understood by the server due to incorrect syntax. The client **SHOULD NOT** repeat the request without modifications. |
| `404 Not Found`             | The server cannot find the requested resource.                                                                                                |
|                             |
| `500 Internal Server Error` | The server encountered an unexpected condition which prevented it from fulfilling the request.                                                |

# © License

**[MIT license](https://opensource.org/licenses/MIT)**

Copyright 2020 - BRETSCH™ Development Team <<develop@bretsch.eu>>

> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
