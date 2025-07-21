import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import fs from 'fs';
import fetch from 'node-fetch';

dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const RPC_URL = process.env.RPC_URL;
const DB_PATH = './database.json';

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

let db = [];

function loadDB() {
  if (fs.existsSync(DB_PATH)) {
    db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  }
}

function saveDB() {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

async function getStake(votePubkey) {
  const body = {
    jsonrpc: '2.0',
    id: 1,
    method: 'getVoteAccounts'
  };
  const res = await fetch(RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  const account = data.result.current.find(v => v.votePubkey === votePubkey);
  return account ? Number(account.activatedStake) / 1e9 : null;
}

function sendMessage(chatId, message) {
  bot.sendMessage(chatId, message).catch(console.error);
}

bot.onText(/\/add_vote (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const votePubkey = match[1];

  if (db.find(e => e.votePubkey === votePubkey && e.chatId === chatId)) {
    return sendMessage(chatId, '❗️This votePubkey is already being tracked.');
  }

  const stake = await getStake(votePubkey);
  if (stake === null) {
    return sendMessage(chatId, '❌ Unable to find active stake for this votePubkey.');
  }

  db.push({ votePubkey, chatId, lastStake: stake });
  saveDB();

  sendMessage(chatId, `✅ Added votePubkey ${votePubkey} with current stake ${stake.toFixed(2)} SOL.`);
});

bot.onText(/\/remove_vote (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const votePubkey = match[1];
  db = db.filter(e => !(e.votePubkey === votePubkey && e.chatId === chatId));
  saveDB();
  sendMessage(chatId, `✅ Removed votePubkey ${votePubkey}.`);
});

async function checkAll() {
  loadDB();
  for (const entry of db) {
    const currentStake = await getStake(entry.votePubkey);
    if (currentStake === null) continue;

    const delta = currentStake - entry.lastStake;
    if (Math.abs(delta) >= 0.5) {
      const emoji = delta > 0 ? '📈' : '📉';
      const msg = `${emoji} Stake ${delta > 0 ? 'increased' : 'decreased'}: ${delta.toFixed(2)} SOL\
