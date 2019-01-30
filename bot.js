const  Twit = require('twit');
const { CronJob } = require('cron');

const MESSAGE_OPTIONS = [
  "The spirits are very happy today! They will do their best to shower everyone with good fortune.",
  "The spirits are in good humor today. I think you'll have a little extra luck.",
  "The spirits feel neutral today. The day is in your hands.",
  "This is rare. The spirits feel absolutely neutral today.",
  "The spirits are somewhat annoyed today. Luck will not be on your side.",
  "The spirits are mildly perturbed today. Luck will not be on your side.",
  "The spirits are very displeased today. They will do their best to make your life difficult."
];

let lastSelection = -1;

const T = new Twit({
  consumer_key: process.env.BOT_CONSUMER_KEY,
  consumer_secret: process.env.BOT_CONSUMER_SECRET,
  access_token: process.env.BOT_ACCESS_TOKEN,
  access_token_secret: process.env.BOT_ACCESS_SECRET,
});

function selectOption() {
  const options = Object.keys(MESSAGE_OPTIONS).filter(idx => idx !== lastSelection);
  const idx = options[Math.floor(Math.random() * options.length)];
  lastSelection = idx;
  return MESSAGE_OPTIONS[idx];
}

function tweet(status) {
  T.post('statuses/update', {status}, function(err, reply) {
    if (err) throw err;
    console.log(`tweeted: ${status}`);
  });
}

const tweetJob = new CronJob('0 0 6 * * *', function() {
  tweet(selectOption());
}, null, true, 'America/New_York');

