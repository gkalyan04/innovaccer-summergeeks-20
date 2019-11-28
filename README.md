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

3. Make sure, MongoDB is running. If not installed, then install from [here](https://docs.mongodb.com/manual/installation/).

4. Setup <strong>NodeMailer</strong> and <strong>Twilio SMS Api</strong> configuration. Just go to `routes.js` , then simply enter your configuration.

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

6. Navigate to `http://localhost:5000`

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

## Approach
Event Management Service is based on an idea which stores data of a visitor and host in the database and as the data is saved timestamp is also stored as well. SMS and E-mail is sent to the host consisting the details of visitor. When a session is ended, the timestamp is also stored and then mail is send to the visitor via node-mailer and sms via twilio. Once a session has ended user is not allowed to change the timestamp.

**Database 'user'** and it's **Collections** are designed as following:
* **Visitor:** Contains details specific to the visitors.
```bash
─── visitor
    ├── name
    ├── email
    ├── phone
    ├── check_in_time
    └── check_out_time
```
* **Hosts:** Contains details specific to the hosts.
```bash
─── host
    ├── name
    ├── email
    └── phone
```
    

## Technology Stack

* Front-End : [EJS](https://ejs.co/), [HTML](https://html.com/), [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS), [Bootstrap](https://getbootstrap.com/).
* Back-End : [NodeJS](https://nodejs.org/en/), [ExpressJS](https://expressjs.com/), [Nodemailer](https://nodemailer.com/about/)(Mail service), [twilio](https://www.twilio.com/docs/sms/api)(Message Service).
* Database: [MongoDB](https://www.mongodb.com/).

## Screenshots

* Check-in Portal
![Check-in Portal](https://i.ibb.co/1Kr1v7z/Screenshot-from-2019-11-28-14-47-59.png)

* Check-out Portal
![Check-out Portal](https://i.ibb.co/TLHRHf0/Screenshot-from-2019-11-28-14-48-46.png)

* SMS & Email sent to Host when new visitor checks in.
![SMS-host](https://i.ibb.co/BKW2mtV/combine-images.jpg)

* SMS & Email sent to Visitor once he/she check out.
![SMS-visitor](https://i.ibb.co/QdPcHzX/Whats-App-Image-2019-11-28-at-3-31-33-PM.jpg)

* Database
![database](https://i.ibb.co/MRzFh9G/Screenshot-from-2019-11-28-14-47-16.png)
