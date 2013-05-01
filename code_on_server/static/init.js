var reddit = "http://www.reddit.com/.rss";
var digg = "http://www.digg.com/rss/index.xml";
var cnn = "http://rss.cnn.com/rss/cnn_topstories.rss"
//var hacker_news = "https://news.ycombinator.com/rss";
var cooking = "http://www.cookingwithfriendsclub.com/index.php?/rss/blog"

//window.this_feed_num = 0;
window.all_feeds_loaded = false;
window.hasPublished = false;
window.user_feeds = [];

google.load("feeds", "1");

//loads all of the feeds for the default case
//changed name from default_feed_directory
function default_feed_directory(){
	window.user_feeds = [];
	//console.log("getting default directory...");
	var reddit = new Feed("Reddit", "http://www.reddit.com/.rss");	
	var digg = new Feed("Digg", "http://www.digg.com/rss/index.xml");
	var cnn = new Feed("CNN", "http://rss.cnn.com/rss/cnn_topstories.rss");
//	var hacker_news = new Feed("Hacker_News", "https://news.ycombinator.com/rss");
    var cooking = new Feed("Cooking_with_Friends", "http://www.cookingwithfriendsclub.com/index.php?/rss/blog");
}

//initializes feed page
//changed name from init_feeds
function init(){
	//default_feed_directory();
	post_subscriptions();
	parse_all_feeds();
	new_subscription_input();
}

//google.setOnLoadCallback(init);
