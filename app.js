const { App } = require("@slack/bolt");
const pageSpeed = require("./PageSpeedBot");
require("dotenv").config();


const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode:true,
  appToken: process.env.APP_TOKEN,
});

app.command("/pagespeed", async ({ command, ack, say }) => {
    try {
        await ack();
        say("Checking metrics for URL...");
        var speed = await pageSpeed.checkSpeed(command.text);
        var response = "";
        for (var [key, value] of Object.entries(speed)) {
            const result = key.replace(/([A-Z])/g, " $1");
            key = result.charAt(0).toUpperCase() + result.slice(1);
            response += `${key}: ${value}\n`;
        }
        say(response);
    } catch (error) {
        console.log("err")
        console.error(error);
    }
});

(async () => {
  await app.start();
  console.log(`⚡️ Slack Bolt app is running!`);
})();