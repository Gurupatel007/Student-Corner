<!-- # Student Corner 🎓

Welcome to Student Corner - Your Gateway to Exciting Tech Events! 🚀

## What's Student Corner? 🤔

Student Corner is a cool web app that connects you with awesome hackathons and tech events. Discover, join, and rock these events like a pro! 💻🏆

## Awesome Features 🌟

- 🔍 Find cool hackathons and events
- 🙋‍♂️ Sign up and log in easily
- 🎟️ Join events with just a click
- 🔔 Get real-time updates about new opportunities
- 👑 Admin superpowers for event management
- 👤 Your personal profile and event history

## Let's Get Started! 🏁

Follow these simple steps to set up Student Corner on your computer:

### What You'll Need 📋

- Node.js (v14 or newer) 🟢
- npm (comes with Node.js) 📦
- XAMPP or similar local server with MySQL 🐬
- Twilio account for SMS magic ✨

### Installation Magic 🧙‍♂️

1. Clone the project:
   
   git clone https://github.com/Gurupatel007/student-corner.git
   

2. Jump into the project folder:
   
   cd student-corner
   

3. Install the goodies:
   
   npm install
   

4. Set up your database:
   - Fire up XAMPP and start MySQL
   - Open phpMyAdmin
   - Create a new database called `student_corner`
   - Import the `createaccount.sql` file

5. Connect to your database:
   - Open `config/db.js`
   - Update the connection details if needed

6. Create your secret sauce (environment variables):
   - Make a new file called `.env` in the main folder
   - Add these magical ingredients:
     
     ```
     ACCOUNT_SID=your_twilio_account_sid
     AUTH_TOKEN=your_twilio_auth_token
     EMAIL_USER=your_email@example.com
     EMAIL_PASS=your_email_password
     EMAIL_FROM=noreply@yourdomain.com
     PORT=3000
     ```
   - Replace the placeholders with your real Twilio and email info
   - Remember: You need your own Twilio account for SMS superpowers!

### Launch Time! 🚀

1. Start your local server (like XAMPP)

2. Fire up the app:
   
   node App.js
   

3. Open your browser and go to `http://localhost:3000` (or your chosen port)

## What's in the Box? 📦

- `config/`: Where the magic settings live
- `node_modules/`: Home of the helpful Node.js friends
- `public/`: Your static files hangout spot
- `routes/`: Traffic control for your app
- `services/`: Special helpers for emails and SMS
- `utils/`: Handy tools and functions
- `views/`: What your users will see
- `App.js`: The heart of your app
- `.env`: Your app's secret diary
- `.gitignore`: Tells Git what to ignore
- `package.json` & `package-lock.json`: Your app's ID cards

## Built With Love ❤️

- Node.js - JavaScript's best friend
- Express.js - Web framework extraordinaire
- MySQL - Data's cozy home
- Twilio - SMS wizard
- Ejs Template

## Join the Party! 🎉

We love new friends! Here's how you can join in:

1. Fork the project
2. Create your Feature Branch (`git checkout -b feature/CoolNewThing`)
3. Commit your changes (`git commit -m 'Add some CoolNewThing'`)
4. Push to the Branch (`git push origin feature/CoolNewThing`)
5. Open a Pull Request and let's chat!

## License 📜

Shared under the MIT License. Check out `LICENSE` for the legal stuff.

## Say Hi! 👋

Guru Patel - [gurupatel279@gmail.com](mailto:gurupatel279@gmail.com) or [code.guru@outlook.in](mailto:code.guru@outlook.in)

Project Home: [https://github.com/Gurupatel007/student-corner](https://github.com/Gurupatel007/student-corner)

## High Fives 🙌

- Twilio for the awesome SMS powers

Let's make something awesome together! 💪😎 -->


# Student Corner 🎓

Welcome to Student Corner - Your Gateway to Exciting Tech Events! 🚀

## What's Student Corner? 🤔

Student Corner is a cool web app that connects you with awesome hackathons and tech events. Discover, join, and rock these events like a pro! 💻🏆

## Awesome Features 🌟

- 🔍 Find cool hackathons and events
- 🙋‍♂️ Sign up and log in easily
- 🎟️ Join events with just a click
- 🔔 Get real-time updates about new opportunities
- 👑 Admin superpowers for event management
- 👤 Your personal profile and event history

![Landing](./public/images/readme%20images/landing.png)

## Let's Get Started! 🏁

Follow these simple steps to set up Student Corner on your computer:

### What You'll Need 📋

- Node.js (v14 or newer) 🟢
- npm (comes with Node.js) 📦
- XAMPP or similar local server with MySQL 🐬
- Twilio account for SMS magic ✨

### Installation Magic 🧙‍♂️

1. Clone the project:
   
   ```bash
   git clone https://github.com/Gurupatel007/student-corner.git
   ```

2. Jump into the project folder:
   
   ```bash
   cd student-corner
   ```

3. Install the goodies:
   
   ```bash
   npm install
   ```

4. Set up your database:
   - Fire up XAMPP and start MySQL
   - Open phpMyAdmin
   - Create a new database called `student_corner`
   - Import the `createaccount.sql` file

5. Connect to your database:
   - Open `config/db.js`
   - Update the connection details if needed

6. Create your secret sauce (environment variables):
   - Make a new file called `.env` in the main folder
   - Add these magical ingredients:
     
     ```
     ACCOUNT_SID=your_twilio_account_sid
     AUTH_TOKEN=your_twilio_auth_token
     EMAIL_USER=your_email@example.com
     EMAIL_PASS=your_email_password
     EMAIL_FROM=noreply@yourdomain.com
     PORT=3000
     ```
   - Replace the placeholders with your real Twilio and email info
   - Remember: You need your own Twilio account for SMS superpowers!

### Launch Time! 🚀

1. Start your local server (like XAMPP)

2. Fire up the app:
   
   ```bash
   node App.js
   ```

3. Open your browser and go to `http://localhost:3000` (or your chosen port)

## What's in the Box? 📦

- `config/`: Where the magic settings live
- `node_modules/`: Home of the helpful Node.js friends
- `public/`: Your static files hangout spot
- `routes/`: Traffic control for your app
- `services/`: Special helpers for emails and SMS
- `utils/`: Handy tools and functions
- `views/`: What your users will see
- `App.js`: The heart of your app
- `.env`: Your app's secret diary
- `.gitignore`: Tells Git what to ignore
- `package.json` & `package-lock.json`: Your app's ID cards

![Dashboard](./public/images/readme%20images/dashboard.png)
![Edit Profile](./public/images/readme%20images/edit-profile.png)

## Admin Features 👑

Admins can manage events, approve or reject participation, and more!

![Admin Dashboard](./public/images/readme%20images/adminDashboard.png)

## Join the Party! 🎉

We love new friends! Here's how you can join in:

1. Fork the project
2. Create your Feature Branch (`git checkout -b feature/CoolNewThing`)
3. Commit your changes (`git commit -m 'Add some CoolNewThing'`)
4. Push to the Branch (`git push origin feature/CoolNewThing`)
5. Open a Pull Request and let's chat!

## License 📜

Shared under the MIT License. Check out `LICENSE` for the legal stuff.

## Say Hi! 👋

Guru Patel - [gurupatel279@gmail.com](mailto:gurupatel279@gmail.com) or [code.guru@outlook.in](mailto:code.guru@outlook.in)

Project Home: [https://github.com/Gurupatel007/student-corner](https://github.com/Gurupatel007/student-corner)

## High Fives 🙌

- Twilio for the awesome SMS powers

Let's make something awesome together! 💪😎
