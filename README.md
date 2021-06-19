# A API Rest
To upload the project on the air with MySQL / MariaDB, copy the .env_example file to .env.

### technologies used
- Express
- BcryptJs
- Helmet
- JWToken
- NodeMailer
- Sequelize

You will also need to add a secret key to the .env file:

TOKEN_SECRET = 'your_secret_key_here'
Run the commands below:

    npm i
    npx sequelize db: migrate
    npx sequelize db: seed: all
    npm run dev

At this point your API should be running at http://127.0.0.1:3001/.

If you want to migrate to SQLite, edit the database settings in the .env file, also configure src / config / database.js.

For SQLite the settings are:

    require ('dotenv'). config ();

    module.exports = {
      dialect: 'sqlite',
      storage: './db.sqlite',
      define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    };

For MySQL / MariaDB the settings are:

    require ('dotenv'). config ();
    
    module.exports = {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      dialectOptions: {
        timezone: 'America / Sao_Paulo',
      },
      timezone: 'America / Sao_Paulo',
    
      define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    };

**Note that the settings starting with process.env. comes from the .env file.**

    use { 
    	    "email": "admin@email.com", 
    	    "password": "123456"
    	 } 
    to receive a token
