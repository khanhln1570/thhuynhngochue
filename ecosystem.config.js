module.exports = {
    apps: [{
        name: "thhuynhngochue-backend",
        script: "npm",
        args: "run start",
        cwd: "/home/brad/thhuynhngochue",
        watch: ["server", "client"],
        // Delay between restart
        watch_delay: 1000,
        ignore_watch: ["node_modules", "client/img"],
        watch_options: {
            "followSymlinks": false
        },
        env: {
            "NODE_ENV": "development"
        },
    }]
}