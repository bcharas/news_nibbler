
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
		var first_feed = first_feed_info.connection;
		first_feed.setNumEntries(4);
		var load_contents = function(result){
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
		return;
	}
	else{
		var feed_to_load = window.user_feeds[feed_num];
		if (feed_to_load.ignore){
			load_next_feed(feed_num);
			return;
		}
		else{
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
		for (var i = 0; i < result.feed.entries.length; i++) {	
			var entry = result.feed.entries[i];
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
}

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
	div.click(function(){
                //console.log("opening...");;
                localStorage.link = entry.link;
                closeContainers();
                $("#article").attr("src", entry.link);
                $("#article_container").removeClass("hidden");
                $("#feed_container").addClass("hidden");
			});
}				

function init_feeds(){
	//load_from_local_storage();
	var container = $("#browser_container");
	var directory_html = "<div id='directory'></div>";
	container.append(directory_html);
	default_feed_directory();
	publish_feed_directory();
	load_all_feeds();
	custom_new_feed_entry();
	//save_to_local_storage();
}

google.setOnLoadCallback(init_feeds);
