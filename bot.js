var Credentials = require('./credentials');
var Twit = require('twit');

var Bot = new Twit(Credentials.credentials);

var shameUser = function(screenName) {
  var tweet = '@' + screenName + ': You should have written \"should have\", not \"should of\".';
  console.log('Tweeting:', tweet);

  Bot.post('statuses/update', { status: tweet }, function(err, data, response) {
    if (err) {
      console.log('Error while sending tweet:', err);
    }
  });
}

var retrieveMatchingTweet = function() {
  Bot.get('search/tweets', { q: '\"should of\"', count: 1, lang: 'en' }, function(err, data, response) {
    if (err) {
      console.log('Error while retrieving tweet:', err);
      return;
    }

    try {
      var screenName = data['statuses'][0]['user']['screen_name'];
      shameUser(screenName);
    } catch(e) {
      console.log('Exception while parsing or tweeting:', e);
    }
  });
}

retrieveMatchingTweet();
setInterval(retrieveMatchingTweet, 15 * 60 * 1000);
