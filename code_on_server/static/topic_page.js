//all of this code was originally in custom_feeds.js
window.user_feeds = [];
//default_feed_directory();

//constructor for  feed object
function Feed(name, url){
	this.feed_name = name;
	this.feed_src = url;
	this.connection = new google.feeds.Feed(url);
	window.user_feeds.push(this);
}

//loads all of the feeds for the default case
function default_feed_directory(){
	window.user_feeds = [];
	//console.log("getting default directory...");
	var reddit = new Feed("Reddit", "http://www.reddit.com/.rss");	
	var digg = new Feed("Digg", "http://www.digg.com/rss/index.xml");
	var cnn = new Feed("CNN", "http://rss.cnn.com/rss/cnn_topstories.rss");
//	var hacker_news = new Feed("Hacker_News", "https://news.ycombinator.com/rss");
    var cooking = new Feed("Cooking_with_Friends", "http://www.cookingwithfriendsclub.com/index.php?/rss/blog");
}

//publishes the topic box for a given feed
function publish_feed_listing(feed, container){
	var div = "<div class='topic' ";
	div += "id='" + feed.feed_name + "'></div>"
	container.append(div);
	var to_publish = "<div class='headline'";
	to_publish += ">";
	to_publish += feed.feed_name;
	to_publish += "</div>";
    to_publish += "<div class = 'date topic_link'>";
    to_publish += feed.feed_src;
    to_publish += "</div>";
	var published_div = $("#" + feed.feed_name);
	published_div.selected = true;
	published_div.append(to_publish);
	feed.ignore = false;
}

//loops through user feeds and publishes topic entry for each
function publish_feed_directory(){	
	var directory = $("#feed_subs");
	directory.empty();
	////console.log("user feeds length: " + window.user_feeds.length);
	for (var i = 0; i < window.user_feeds.length; i++){
		var feed = window.user_feeds[i];
		publish_feed_listing(feed, directory);
	}
	//console.log("directory complete");
}