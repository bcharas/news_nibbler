//var reddit = "http://www.reddit.com/.rss";
//var digg = "http://www.digg.com/rss/index.xml";
//var cnn = "http://rss.cnn.com/rss/cnn_topstories.rss"



window.numFeeds = 3;
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
										//console.log("first feed name: " + first_feed.name);
										load_feed_contents(result, 0);
									};
		first_feed.load(load_contents);
	}
}	

function load_next_feed(feed_num){
	feed_num++;
	if (feed_num >= window.numFeeds){
		window.all_feeds_loaded = true;
		post_merged_feed();
	}
	else{
		var feed_to_load = window.user_feeds[feed_num];
		//console.log("test");
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
		console.log("Error while loading feed contents");
		return null;
	}
}

function post_merged_feed(){
	var entries_per_feed = 4;
	var entry_num = 0;
	for (var i = 0; i < entries_per_feed; i++){	
		for (var j = 0; j < window.num_feeds; j++){
			var saved_feed = window.user_feeds[j];
			var this_feed = window.active_feeds[j];			
			if (!(saved_feed.ignore)){
				var this_entry = this_feed[i];
				post_feed_entry(this_entry, entry_num);
				entry_num++;
			}
			else{
				entry_num++;
			}
		}
	}
	custom_new_feed_entry();
}


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


//given a feed entry, posts it too page
function post_feed_entry(entry, id){
	
	var div_class = "listing";
	var new_div_html = "<div id=" + id + " class='listing'> </div>";
	var container = $("#feed_container");
	container.append(new_div_html);
	var div = $("#" + id);
	div.html("<div class='headline'>" + entry.title + "</div>");
	
	if ((entry.date !== undefined) && (entry.date !== "")){
		div.append("<br/>" + "<div class='date'>" + entry.publishedDate + "</div>");
	}
	
	if ((entry.contentSnippet !== undefined) && (entry.contentSnippet !== "")){
		div.append("<br/>" + "<div class='snippet'>" + entry.contentSnippet + "</div>");
	}
	if ((entry.link !== undefined) && (entry.link !== "")){
		div.append("<br/>" + "<div class='date'>" + entry.link + "</div>");
	}
	div.append("<br/>" + "<div class='date'>" + "Because you subscribe to: " + entry.feed_src.feed_name + "</div>");
	div.click(function(){
                closeContainers();
                $("#article_container").removeClass("hidden");
				$("#article").attr("src", entry.link);
			});
}
				

function init_feeds(){
	//console.log("initializing");
	//load_from_local_storage();
	var container = $("#browser_container");
	var directory_html = "<div id='directory'></div>";
	container.append(directory_html);
	default_feed_directory();
	publish_feed_directory();
	load_all_feeds();
	//save_to_local_storage();
}

google.setOnLoadCallback(init_feeds);
