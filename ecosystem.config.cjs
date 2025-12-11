module.exports = {
  apps: [
    {
      name: 'wtwr-api',
      script: 'app.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'development',
        PORT: 3001,
        DB_URL: 'mongodb://127.0.0.1:27017/wtwr_db',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
        DB_URL: process.env.DB_URL,
      },
    },
  ],
};
