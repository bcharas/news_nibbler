//handles reading/parsing the entries from all user feeds

//parses current entries of user feeds, then calls to post them to feed page
//changed name from load_all_feeds
function parse_all_feeds(){
	window.active_feeds = [];
	window.num_feeds = window.user_feeds.length;
	var first_feed_info = window.user_feeds[0];
	if (first_feed_info.ignore){
		parse_remaining_feeds(0);
	}
	else{
		//console.log("\nloading: " + first_feed_info.feed_name);
		var first_feed = first_feed_info.connection;
		first_feed.setNumEntries(4);
		var load_contents = function(result){
										parse_feed_entries(result, 0);
									};
		first_feed.load(load_contents);
	}
}

//parses contents of a given feed
//changed name from load_feed_contents
function parse_feed_entries(result, feed_num){
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
			post_feeds();
		}
		else{
			parse_remaining_feeds(feed_num);
		}
    }
	else{
		console.log("ERROR");
		$("#current_src").text("ERROR WHILE CONSTRUCTING FEED");
	}
}

//parses any remaining unparsed feeds
//changed name from load_next_feed
function parse_remaining_feeds(feed_num){
	feed_num++;
	//console.log("next feed num: " + feed_num);
	if (feed_num >= window.num_feeds){
		//console.log("\nall feeds loaded");
		window.all_feeds_loaded = true;
		post_feeds();
	}
	else{
		var feed_to_load = window.user_feeds[feed_num];
		if (feed_to_load.ignore){
			parse_remaining_feeds(feed_num);
			return;
		}
		else{
			//console.log("\nloading: " + feed_to_load.feed_name);
			var new_feed = feed_to_load.connection;
			new_feed.setNumEntries(4);
			var load_contents = function(result){
									parse_feed_entries(result, feed_num);
								};
			new_feed.load(load_contents);
			return;
		}
	}
}

//reloads feeds (more recent articles, updates for any changes in feeds)
//changed name from rebuild_feeds
function refresh_feeds(){
	//console.log("\n\nRESETING FEEDS...");
	//window.this_feed_num = 0;
	window.all_feeds_loaded = false;
	window.has_published = false;
	$("#feed_box").empty();
	parse_all_feeds();
}