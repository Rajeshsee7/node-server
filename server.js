const WebSocket = require("ws");
const { spawn } = require("child_process");
const os = require("os");

const PORT = 8080;

/* Get Local Network IP */
function getLocalIP() {
    const interfaces = os.networkInterfaces();

    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === "IPv4" && !iface.internal) {
                return iface.address;
            }
        }
    }
    return "127.0.0.1";
}

const localIP = getLocalIP();
/* WebSocket Server */
const wss = new WebSocket.Server({ port: PORT });
console.log("=================================");
console.log(" WebSocket Terminal Server");
console.log("=================================");
console.log(`ws://localhost:${PORT}/`);
console.log(`ws://127.0.0.1:${PORT}/`);
console.log(`ws://${localIP}:${PORT}/`);
console.log("=================================");

/* Client Connection */
wss.on("connection", (ws, req) => {
    console.log("Client connected:", req.socket.remoteAddress);
    ws.send("Connected to Termux WebSocket Terminal\n");
    /* Start persistent shell */
    const shell = spawn("bash", [], {
        cwd: process.env.HOME,
        env: process.env
    });

    /* Shell output → WebSocket */
    shell.stdout.on("data", data => {
        ws.send(data.toString());
    });
    shell.stderr.on("data", data => {
        ws.send(data.toString());
    });

    /* WebSocket command → shell */
    ws.on("message", msg => {
        const cmd = msg.toString();

        if (cmd.trim() === "") return;

        shell.stdin.write(cmd + "\n");
    });

    /* Client disconnect */
    ws.on("close", () => {
        console.log("Client disconnected");

        shell.kill();
    });
});
