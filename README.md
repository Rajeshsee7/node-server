Node-Server-Termux-Terminal

A WebSocket-based terminal server for Termux that allows remote Bash shell access using WebSocket clients such as Android WebView.
The server runs a persistent Bash shell and streams command output in real time.

---

Features

- Full Bash shell support ("ls", "cd", "pwd", etc.)
- Real-time terminal output streaming
- WebSocket communication
- Works on localhost and LAN network
- Android WebView integration supported

---

Prerequisites

Before starting, make sure Node.js is installed in Termux.

Install Node.js

pkg update && pkg upgrade -y
pkg install nodejs-lts

---

Step 1 — Download the Server Files

Choose one of the following download methods.

---

Method 1.1 — Clone the Full GitHub Repository (Recommended)

Install Git

pkg install git

Clone Repository

git clone https://github.com/Rajeshsee7/node-server.git

Open the Project Folder

cd node-server

---

Method 1.2 — Download Only "server.js" Using wget

Install wget

pkg install wget

Download server.js

wget https://raw.githubusercontent.com/Rajeshsee7/node-server/63f253f7cc02be51c78d73ce5fa4a54b4381e007/server.js

---

Step 2 — Install Dependencies

The server requires the ws WebSocket library.

Run the following command:

npm install ws

---

Step 3 — Start the Server

Run the server using Node.js:

node server.js

---

Server Output

After starting the server you will see output similar to this:

=================================
 WebSocket Terminal Server
=================================
ws://localhost:8080/
ws://127.0.0.1:8080/
ws://192.168.0.104:8080/
=================================

---

Which WebSocket URL Should Be Used

If the client is running inside the same Android device (for example Android WebView):

ws://localhost:8080/

If another device on the same WiFi network wants to connect:

ws://192.168.x.x:8080/

Use the LAN IP address displayed in the server output.

---

Android WebView Integration

Enable JavaScript

webview.getSettings().setJavaScriptEnabled(true);

AndroidBridge Responsibilities

The Android interface should handle:

- Sending WebSocket connection URL to WebView
- Receiving connection status ("connected" / "disconnected")
- Sending commands from Android
- Displaying terminal output inside a "TextView"

---

Security Notice

This server executes real Bash commands.

Anyone who connects can run system commands.

Recommended practices:

- Use only on trusted networks
- Do not expose directly to the public internet
- Add authentication if using remotely

---

License

MIT License

---

Operational Tip

For long running sessions use tmux so the server keeps running even if Termux closes.

pkg install tmux
tmux
node server.js
