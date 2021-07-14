# A API Rest

### technologies used
- Express
- BcryptJs
- Helmet
- JWToken
- NodeMailer
- Sequelize
 
To upload the project on the air with MySQL / MariaDB, copy the .env_example file to .env.

You will also need to add a secret key to the .env file:

TOKEN_SECRET = 'your_secret_key_here'
Run the commands below:

    npm i
    npx sequelize db:migrate
    npx sequelize db:seed:all
    npm run dev

At this point your API should be running at http://127.0.0.1:3001/.

**Note that the settings starting with process.env. comes from the .env file.**

    use {
    	    "email": "admin@email.com",
    	    "password": "123456"
    	 }
    to receive a token
