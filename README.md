# Node-Server-Termux-Terminal

Node-Termux WebSocket Terminal Server

A production-ready WebSocket-based terminal server for Termux that allows remote shell access via WebSocket clients, including Android WebView. This server executes commands in a persistent Bash shell environment and streams output live.

---

Features

- Full Bash shell support ("ls", "cd", "pwd", etc.)
- Real-time terminal output streaming
- WebSocket-based communication for remote clients
- Localhost and LAN support
- Android WebView integration with status and output callbacks

---

Prerequisites

- Termux installed on Android
- Node.js (v18+ recommended)
- Git or wget (for downloading the project)
- Basic knowledge of terminal commands

«Note: Node.js must be installed before running the server. Use the following command in Termux:»

pkg update && pkg upgrade -y
pkg install nodejs-lts

---

Installation Methods

Method 1: Clone the Repository (Recommended)

1. Install Git:

pkg install git

2. Clone the repository:

git clone https://github.com/Rajeshsee7/node-server.git

3. Navigate to the project folder:

cd node-server

4. Install Node.js dependencies:

npm install ws

5. Run the server:

node server.js

Expected console output:

=================================
 WebSocket Terminal Server
=================================
ws://localhost:8080/
ws://127.0.0.1:8080/
ws://192.168.0.104:8080/
=================================

«Use "ws://localhost:8080/" in Android WebView if running locally.
Use the LAN IP ("ws://192.168.x.x:8080/") to connect from other devices on the same network.»

---

Method 2: Download Only "server.js" Using "wget"

1. Install wget:

pkg install wget

2. Download the raw server file:

wget https://raw.githubusercontent.com/Rajeshsee7/node-server/63f253f7cc02be51c78d73ce5fa4a54b4381e007/server.js

3. Install Node.js dependencies:

npm install ws

4. Run the server:

node server.js

«WebSocket URLs are the same as Method 1.»

---

Android WebView Integration

1. Enable JavaScript in WebView:

webview.getSettings().setJavaScriptEnabled(true);

2. Use the "AndroidBridge" interface to:

- Send connection URL from Android to WebView
- Receive connection status ("connected" / "disconnected")
- Send commands from Android to WebView
- Display terminal output in Android "TextView"

3. Connect using the WebSocket URL displayed by the server:

ws://localhost:8080/

---

Security Considerations

- Commands are executed directly in Bash.
- Only run on trusted networks.
- Unauthorized access allows full shell command execution.
- For public exposure, implement authentication or reverse proxy with security rules.

---

License

MIT License

Pro Tip: For production, consider running the server inside a Termux session with "tmux" or "screen", so it stays active after closing the app.
Additionally, a persistent IP or dynamic DNS setup is recommended for remote connections.
