# Stake Change Notifier Bot

This is a simple Telegram bot that helps Solana validators monitor stake changes. You give it your vote account address, and it tells you if your stake goes up or down.

---

## 🧰 What This Bot Does

- Sends Telegram alerts if your validator's stake changes (by ±0.5 SOL)
- Lets you track or untrack vote accounts
- Shows you a list of vote accounts you're tracking

---

## ✅ What You Need

1. **Node.js** (v18 or later)
2. **Telegram Bot Token** — [create here](https://core.telegram.org/bots#how-do-i-create-a-bot)
3. **Solana RPC URL** — we recommend [Helius RPC](https://www.helius.xyz/)

---

## 🚀 Getting Started

### 1. Clone This Repo
```
git clone https://github.com/your-username/stake-change-notifier.git
cd stake-change-notifier
```

### 2. Install Packages
```
npm install
```

### 3. Create Your `.env` File
Make a copy of the example:
```
cp .env.example .env
```
Then edit `.env` and paste your:
- Telegram Bot Token
- RPC URL

```
TELEGRAM_BOT_TOKEN=your_bot_token_here
RPC_URL=https://your-helius-url
```

### 4. Start the Bot
```
npm start
```

If everything is working, you will see:
```
✅ Stake Notifier started
```

Now go to Telegram, find your bot, and press `/start`.

---

## 💬 Telegram Commands

```
/add_vote <votePubkey>   → Start tracking a validator
/remove_vote <votePubkey> → Stop tracking
/status or /list          → View your tracked vote accounts
/help                     → Show command list
```

Example:
```
/add_vote Gk4UgbNMeBFS9KZH6cTYE13yZPXzFFsyapBuKwbMJxYf
```

---

## 🛠 Troubleshooting

### ❌ `404 Not Found` or polling_error

- You need to press `/start` in your Telegram bot at least once
- Or the token in `.env` is invalid or missing

**How to fix:**
- Make sure you created `.env` (not `.env.example`)
- Double-check your Telegram token
- Open your bot in Telegram and press `/start`

### ❌ `TOKEN: undefined` in console

- You forgot to create a `.env` file
- Or you didn’t restart after editing it

**How to fix:**
- Copy `.env.example` to `.env`
- Fill in your values
- Restart the bot

---

## 📂 Example `.env` File

```dotenv
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrSTUvwxYZ
RPC_URL=https://mainnet.helius-rpc.com/?api-key=your-api-key
```

---

## 📄 License

MIT — free to use, share, and improve.

---

Need help? Write on email or open an issue on GitHub!
