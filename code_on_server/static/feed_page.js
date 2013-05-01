//handles posting entries of user's feeds to feed page

/*
//moved globals to init.js
//moved google.load call to init.js
//moved default_feeds() to init.js
//moved parse_all_feeds to parse_feed_data.js
//moved load_feed_contents to parse_feed_data.js
//moved load_next_feed to parse_feed_data.js
//moved init_feeds() to init.js
//moved google.setOnLoadCallback(init_feeds) to init.js
//moved publishable_entry_field_data to unused_code.js
*/

//publishes pre-parsed user feed contents
//changed name from post_merged_feed
function post_feeds(){
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
        //console.log(this_entry);
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
	//new_subscription_input();
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
	div.append("<div class='source'>" + "Because you subscribe to: " + entry.feed_src.name + "</div>");
	div.click(function(){
             //   localStorage.link = entry.link;
                closeContainers();
                $("#article_container").removeClass("hidden");
				$("#article").attr("src", entry.link);
      //  window.top.location = './article.html';
			});
}

