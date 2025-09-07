module.exports = {
  apps: [{
    name: "react-frontend",
    script: "./server.js",
    env: {
      NODE_ENV: "production",
      PORT: 3000
    },
    instances: 1,
    exec_mode: "fork", 
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
