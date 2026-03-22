const WebSocket = require("ws");
const { spawn } = require("child_process");
const os = require("os");
const http = require("http");
const express = require("express");
const path = require("path");

const PORT = 8080;

/* ===== EXPRESS HTTP SETUP ===== */
const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ===== HTTP SERVER FOR WS ===== */
const server = http.createServer(app);

/* ===== GET LOCAL IP ===== */
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

/* ===== WEBSOCKET SERVER ===== */
const wss = new WebSocket.Server({ server });

console.log("=================================");
console.log(" WebSocket Terminal Server");
console.log("=================================");
console.log(`HTTP → http://localhost:${PORT}`);
console.log(`WS   → ws://localhost:${PORT}`);
console.log(`WS   → ws://${localIP}:${PORT}`);
console.log("=================================");

/* ===== CLIENT CONNECTION ===== */
wss.on("connection", (ws, req) => {
    console.log("Client connected:", req.socket.remoteAddress);
    ws.send("Connected to Termux WebSocket Terminal\n");

    /* Start persistent shell */
    const shell = spawn("bash", [], {
        cwd: process.env.HOME,
        env: process.env,
    });

    /* Shell output → WebSocket */
    shell.stdout.on("data", data => ws.send(data.toString()));
    shell.stderr.on("data", data => ws.send(data.toString()));

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

/* ===== START SERVER ===== */
server.listen(PORT, () => {
    console.log(`Server running → http://localhost:${PORT}`);
});
