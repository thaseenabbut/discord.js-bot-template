## Discord.js Bot Template

A powerful and flexible Discord bot template supporting both text and slash commands, with built-in error handling and configurable settings.

## 📌 Features
- **Supports Both Slash & Prefix Commands** – Choose your preferred command style.
- **Error Handling** – Prevents crashes and provides user-friendly error messages.
- **Configurable Settings** – Easily modify bot settings via JSON or environment variables.
- **Structured Command & Event Handling** – Organized and modular file structure.
- **Scalability** – Built with expansion in mind for easy feature additions.

## 📂 Project Structure

```
root/
├── data/                 # Contains all command files
│   ├── slash/            # Slash commands
│   │   ├── moderation/
│   │   │   ├── ban.js
│   │   │   ├── kick.js
│   │   ├── fun/
│   │   │   ├── meme.js
│   │   ├── utility/
│   │   │   ├── ping.js
│   ├── text/             # Prefix (text) commands
│   │   ├── moderation/
│   │   │   ├── ban.js
│   │   │   ├── kick.js
│   │   ├── fun/
│   │   │   ├── meme.js
│   │   ├── utility/
│   │   │   ├── ping.js
├── events/               # Event handlers (message, interaction, etc.)
├── config.json           # Bot configuration file
├── index.js              # Main bot entry point
├── package.json          # Project metadata
```


 ## 🚀 Installation & Setup

## 1. Prerequisites

 - [Node.js 18+](https://nodejs.org/)
 - [Discord.js v14](https://discordjs.guide/additional-info/changes-in-v14.html#before-you-start)

## 2. Clone the Repository

``` 
git clone https://github.com/thaseenabbut/discord.js-bot-template.git 
```
``` 
cd discord.js-bot-template 
```

## 3. Install Dependencies

``` 
npm install 
```

## 4. Configure the Bot

- Rename example.env to .env
- Add your bot token, prefix, and other settings inside .env

## 5. Start the Bot

```
node .
```

``` 
node index.js 
```

## 📜 License

This project is licensed under the MIT License – feel free to use and modify it.

## 🌟 Star the Repo if You Found It Useful!

If this template helped you, consider starring ⭐ the repo to support development.