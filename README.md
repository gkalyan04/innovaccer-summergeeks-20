# [Innovaccer SummerGeeks 2020](https://github.com/gkalyan04/innovaccer-summergeeks-20)

## Assignment for SDE - Intern (Applications)

## Installation

1. Clone the repository using `git clone` and then change the directory to root of the project
```bash
git clone https://github.com/gkalyan04/innovaccer-summergeeks-20.git
cd innovaccer-summergeeks-20
```

2. Use `npm` or `yarn` to install dependencies for the project
```bash
yarn
```
OR
```bash
npm install
```

3. Make sure, MongoDB is running. If not installed, then install from [here](https://docs.mongodb.com/manual/installation/)

4. Setup `NodeMailer` and `Twilio SMS Api` configuration. Just go to `routes.js` , then simply enter your configuration.

5. Run the program either by `npm` or `yarn` using
```bash
yarn start
```
OR
```bash
npm start
```
The **console** logs the following if the app is running properly
```bash
Connected to database at: mongodb://localhost:27017/database
```

## Project Folder Structure

> **Note**: The folder tree does not include sub-directories for common/generated folders. For example - `node_modules`.

```bash
─── innovaccer-summergeeks-20
    ├── public
    │   └── style.css
    ├── views
    │   └── partials
    │       └── nav.ejs
    │   └── checkin.ejs
    │   └── checkout.ejs
    │   └── error.ejs
    │   └── host.ejs
    │   └── success.ejs
    ├── app.js
    ├── routes.js
    └── package.json
```

## Demo Video (https://youtu.be/l1uFaHDqc-o)
[![Watch the video](https://i.ibb.co/tCbQfJN/Screenshot-from-2019-11-22-19-48-43.png)](https://youtu.be/l1uFaHDqc-o)

## Technology Stack

 - Node.js
 - Express.js
 - MongoDB
 - Twilio messaging API
 - NodeMailer email API

