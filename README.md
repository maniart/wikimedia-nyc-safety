# Wikimedia NYC Safety Report System

A simple SMS > Email pipeline to anonymously report harassment or unsafe behavior within Wikimedia NYC community events.

### Synopsis

This repo contains a minimal `express.js` app that serves the following purposes:

- Serves up a simple HTML page, displaying instructions to attendees.
- Listens for incoming reports of unsafe behavior to the `/message` endpoint via `post` requests. These `post` requests are made by Twilio Webhooks, upon receiving text messages from attendees.
- Extracts the message and relays them anonymously to `wikimedia.nyc.organizers@gmail.com`

### Components
Here's a simple diagram of this pipeline:

```
+--------+   +---------+   +----------+    +---------+
|        |   |         |   |          |    |         |
| SMS    +-->+ Twilio  +-->+ express  +--->+ gmail   |
|        |   |         |   |          |    |         |
+--------+   +---------+   +----------+    +---------+

```

This setup uses the following services. All relevant login credentials will be shared securely with the organizers upon request.

- [Twilio](https://www.twilio.com/): Login, and navigate to [this link](https://www.twilio.com/console/sms/services). Then, click on `Safety SMS`. Under `Inbound Settings`, you'll see that the `SEND AN INCOMING_MESSAGE WEBHOOK` option is active. Below there, you'll see a value for the field `REQUEST URL`. That URL is the endpoint in the `express.js` app that will receive the contents of the SMS, sent by users through Twilio Webhook. To manage and monitor your Twilio subscription, Use [this link](https://www.twilio.com/console). As of the time of writing this document, the Twilio account used in this project is a trial account. This means that the confirmation SMS sent automatically to the participants is prepended with "Sent from your Twilio trial account". Upgrade the Twilio account to a paid tier to alleviate this. 
- [Gmail](https://gmail.com): Used to receive incoming harassment reports. All reports submitted by the audience members to the Twilio phone number will be relayed via the `express.js` app in this repo to `wikimedia.nyc.organizers@gmail.com`. 

### Development
Please note that in development mode, you will not be able to send receive SMS content from Twilio.

- Clone this repo
- `> npm install` or `> yarn`
- `> cp .env.example .env`
- Edit the `.env` file with the correct values
- `> npm run dev` or `> yarn dev`
- Open your browser and navigate to `http://localhost:3000`

### Deployment
This app is deployed using [Heroku](https://heroku.com).

- Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
- In production environment, environment variables should be set from Heroku, and the `.env` file is ignored. However, the Heroku environment variables should mirror exactly the same keys and appropriate values as the `.env` file. [Here's how](https://devcenter.heroku.com/articles/config-vars) to set environment variables for Heroku. 
- When development is done: `> git push heroku master` to deploy.
- Take a look at the `Procfile` to see what command Heroku runs to launch the app.




