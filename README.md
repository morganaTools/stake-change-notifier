# Stake Change Notifier Bot

A public Telegram bot that notifies users when the stake of a Solana validator changes significantly.

## Features
- Users can subscribe via `/add_vote <votePubkey>`
- Sends alerts when stake changes by ±0.5 SOL or more
- `/remove_vote <votePubkey>` to unsubscribe
- Automatically checks all subscriptions every 5 minutes

## Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/stake-change-notifier.git
cd stake-change-notifier
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:
```
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
RPC_URL=https://mainnet.helius-rpc.com/?api-key=your_helius_api_key
```

### 4. Run the bot
```bash
npm start
```

## License
MIT
