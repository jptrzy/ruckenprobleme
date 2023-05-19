module.exports = {
  apps : [{
    script: '.dist/src/main.js',
    watch: '.',
    instances: '2',
    env_production: {
      NODE_ENV: "production"
   },
  }]
};
