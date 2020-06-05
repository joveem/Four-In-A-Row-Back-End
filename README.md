# Four in a row (Back-End)

The Back-End of [Four In A Row](https://github.com/joveem/Four-In-A-Row) game

It's a RESTful API built with [NodeJS](https://nodejs.org), [Express](https://expressjs.com/) and [Socket.IO](https://socket.io/), which receives and responds to HTTP requests in the game and handles WebSockets

The goal is to register and authenticate users, save data (such as character customization) and manage connections in real time to the multiplayer game rooms

---

### Getting Started:

#### Prerequisites

To install this project in development mode, you need to have a Package Manager (reccomended: [NPM](https://www.npmjs.com/get-npm) our [Yarn](https://classic.yarnpkg.com/en/docs/install)) and a basic environment with [NodeJS v12+](https://nodejs.org/en/download/) installed to run it

##### Cloning the repository:

``` 
git clone https://github.com/joveem/
Four-In-A-Row-Back-End.git
cd Four-In-A-Row-Back-End
#
```

##### Installing dependencies:

(with NPM)

``` 
npm install
```
(with Yarn)

``` 
yarn
```

##### Running:

```
node src/.
```


##### Paste ALL this code in a command line to clone and run the server at once:

(with NPM)

``` 
# Clone the repository:
git clone https://github.com/joveem/Four-In-A-Row-Back-End.git
# Directory changing
cd Four-In-A-Row-Back-End
# Install dependencies:
npm install
# Start Server:
node src/.
#
```

(with Yarn)

``` 
# Clone the repository:
git clone https://github.com/joveem/Four-In-A-Row-Back-End.git
# Directory changing
cd Four-In-A-Row-Back-End
# Install dependencies:
yarn
# Start Server:
node src/.
#
```

---

### Routes

The base URL is: http://localhost:2929/

#### Test Route:

A route to see if the server is running

http://localhost:2929/

| ENDPOINT | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| / | `GET`  | - | - |**Code:** 200 - OK<br />**Content:** "Server works!"  |  **Code:** 503 - Service Unavailable |