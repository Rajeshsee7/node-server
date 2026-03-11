Node-Server-Termux-Terminal

A WebSocket-based terminal server for Termux that allows remote Bash shell access through WebSocket clients such as Android WebView.
The server runs a persistent Bash shell and streams terminal output in real time.

---

Features

- Full Bash shell support ("ls", "cd", "pwd", etc.)
- Real-time terminal output streaming
- WebSocket communication
- Works on localhost and LAN network
- Android WebView integration supported

---

Prerequisites

Before starting, install Node.js in Termux.

Install Node.js

pkg update && pkg upgrade -y
pkg install nodejs-lts

---

Step 1 — Download Server Files

Choose one of the following download methods.

---

Method 1 — Clone the Full Repository (Recommended)

Install Git:

pkg install git

Clone the GitHub repository:

git clone https://github.com/Rajeshsee7/node-server.git

Open the project folder:

cd node-server

---

Method 2 — Download Only "server.js" Using wget

Install wget:

pkg install wget

Download the server file:

wget https://raw.githubusercontent.com/Rajeshsee7/node-server/63f253f7cc02be51c78d73ce5fa4a54b4381e007/server.js

---

Step 2 — Install Dependencies

Install the required WebSocket library:

npm install ws

---

Step 3 — Start the Server

Run the server using Node.js:

node server.js

---

Example Server Output

After starting the server you should see output similar to this:

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

Use the LAN IP address shown in the server output.

---

Android WebView Integration

Enable JavaScript inside the WebView:

webview.getSettings().setJavaScriptEnabled(true);

AndroidBridge Responsibilities

The Android interface layer should handle:

- Sending the WebSocket connection URL to WebView
- Receiving connection status ("connected" / "disconnected")
- Sending terminal commands from Android
- Displaying terminal output inside a "TextView"

---

Security Notice

This server executes real Bash commands.

Anyone connected to the WebSocket can run system commands.

Recommended usage:

- Run only on trusted networks
- Avoid exposing the server directly to the public internet
- Add authentication for remote access

---

License

MIT License

---

Tip

For long-running usage, run the server inside tmux so it continues running even if Termux is closed.

pkg install tmux
tmux
node server.js
