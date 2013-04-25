var reddit = "http://www.reddit.com/.rss";
var digg = "http://www.digg.com/rss/index.xml";
var cnn = "http://rss.cnn.com/rss/cnn_topstories.rss"
//var hacker_news = "https://news.ycombinator.com/rss";
var cooking = "http://www.cookingwithfriendsclub.com/index.php?/rss/blog"

window.numFeeds = 4;
window.numEntries = 4;
window.this_feed_num = 0;
window.all_feeds_loaded = false;
window.hasPublished = false;

google.load("feeds", "1");

function default_feeds(){
	var feedList = [];
	feedList.push(reddit);
	feedList.push(digg);
	feedList.push(cnn);
	feedList.push(hacker_news);
	window.feedList = feedList;
	window.num_feeds = window.feedList.length;
}

//loads contents of all user feeds and posts them to feed page	
function load_all_feeds(){
	window.active_feeds = [];
	window.num_feeds = window.user_feeds.length;
	var first_feed_info = window.user_feeds[0];
	if (first_feed_info.ignore){
		load_next_feed(0);
	}
	else{
		//console.log("\nloading: " + first_feed_info.feed_name);
		var first_feed = first_feed_info.connection;
		first_feed.setNumEntries(4);
		var load_contents = function(result){
										load_feed_contents(result, 0);
									};
		first_feed.load(load_contents);
	}
}

//parses contents of a given feed
function load_feed_contents(result, feed_num){
	if (!result.error){
		var feed_contents = [];
		var feed_id = window.user_feeds[feed_num];
		for (var i = 0; i < result.feed.entries.length; i++) {	
			var entry = result.feed.entries[i];
			entry.feed_src = feed_id;
			feed_contents.push(entry);
		}
		window.active_feeds.push(feed_contents);
		if ((window.all_feeds_loaded) && (!(window.has_published))){
			window.has_published = true;
			post_merged_feed();
		}
		else{
			load_next_feed(feed_num);
		}
    }
	else{
		console.log("ERROR");
		$("#current_src").text("ERROR WHILE CONSTRUCTING FEED");
	}
}

//checks if any user feeds remain unparsed
//if so, then it parses them
//otherwise it publishes the feeds
function load_next_feed(feed_num){
	feed_num++;
	//console.log("next feed num: " + feed_num);
	if (feed_num >= window.num_feeds){
		//console.log("\nall feeds loaded");
		window.all_feeds_loaded = true;
		post_merged_feed();
	}
	else{
		var feed_to_load = window.user_feeds[feed_num];
		if (feed_to_load.ignore){
			load_next_feed(feed_num);
			return;
		}
		else{
			//console.log("\nloading: " + feed_to_load.feed_name);
			var new_feed = feed_to_load.connection;
			new_feed.setNumEntries(4);
			var load_contents = function(result){
									load_feed_contents(result, feed_num);
								};
			new_feed.load(load_contents);
			return;
		}
	}
}


//publishes pre-parsed user feed contents
function post_merged_feed(){
	//console.log("posting merged feed");
	var entries_per_feed = 4;
	var entry_num = 0;
	for (var i = 0; i < entries_per_feed; i++){	
		for (var j = 0; j < window.num_feeds; j++){
			var saved_feed = window.user_feeds[j];
			var this_feed = window.active_feeds[j];			
			if (!(saved_feed.ignore)){
				var this_entry = this_feed[i];
				//console.log(this_entry.link);
				post_feed_entry(this_entry, entry_num);
				//console.log("posted entry: " + entry_num);
				entry_num++;
			}
			else{
				console.log("ignored entry: " + entry_num);
				entry_num++;
			}
		}
	}
	console.log("feed loaded");
	//custom_new_feed_entry();
}

//publishes pre-parsed contents of a given feed entry
function post_feed_entry(entry, id){
	
	var div_class = "listing";
	var new_div_html = "<div id=" + id + " class='listing'> </div>";
	var container = $("#feed_box");
	container.append(new_div_html);
	var div = $("#" + id);
	div.html("<div class='headline'>" + entry.title + "</div>");
	
	if ((entry.date !== undefined) && (entry.date !== "")){
		div.append("<br/>" + "<div class='date'>" + entry.publishedDate + "</div>");
	}
	div.append("<div class='seperator'></div>")
	if ((entry.contentSnippet !== undefined) && (entry.contentSnippet !== "")){
		div.append("<br/>" + "<div class='snippet'>" + entry.contentSnippet + "</div>");
	}
	if ((entry.link !== undefined) && (entry.link !== "")){
		div.append("<br/>" + "<div class='date'>" + entry.link + "</div>");
	}
	div.append("<div class='source'>" + "Because you subscribe to: " + entry.feed_src.feed_name + "</div>");
	div.click(function(){
             //   localStorage.link = entry.link;
                closeContainers();
                $("#article_container").removeClass("hidden");
				$("#article").attr("data", entry.link);
      //  window.top.location = './article.html';
			});
}
				
//initializes feed page
function init_feeds(){
	default_feed_directory();
	publish_feed_directory();
	load_all_feeds();
	custom_new_feed_entry();
}

google.setOnLoadCallback(init_feeds);

/*
//work in progress: general case html tags, to make code cleaner
function publishable_entry_field_data(entry, field, css_class){
	var data = entry.field;
	if ((data !== undefined) && (data !== "")){
		var to_publish = "<br/><div class='";
		to_publish += css_clas + "'>";
		to_publish += data;
		to_publish += "</div>";
		return to_publish;
	}
	return null;
}
		//div.append("<br/><div class='" + css_class + "'>" + data +  
*/
