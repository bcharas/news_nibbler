var reddit = "http://www.reddit.com/.rss";
var digg = "http://www.digg.com/rss/index.xml";
var cnn = "http://rss.cnn.com/rss/cnn_topstories.rss"
var hacker_news = "https://news.ycombinator.com/rss";
window.feed_src = hacker_news;

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
/*
//handles initial load of feed
function load_feed(){
	console.log("loading feed");
    //$("#current_src").text(window.feed_src);
	var feed = new google.feeds.Feed(window.feed_src);
	feed.setNumEntries(window.numEntries);
	feed.load(feedLoaded);
}
*/
		
function load_all_feeds(){
	console.log("loading feeds");
	default_feeds();
	//window.num_feeds = window.feedList.length;
	console.log("num of feeds: " + num_feeds);
	//window.total_num_entries = 4 * num_feeds;
	window.feeds = [];
		
	for (var i = 0; i < num_feeds; i++){
		var new_feed_src = window.feedList[i];
		console.log("loading feed from src: " + new_feed_src);
		var new_feed = new google.feeds.Feed(new_feed_src);
		new_feed.setNumEntries(4);
		
		//race condition
		//new_feed.load();
		
		new_feed.load(load_feed_contents);
	}
	//post_merged_feed();
}	

function load_next_feed(){
	window.this_feed_num++;
	if (window.this_feed_num >= window.numFeeds){
		//post_merged_feed();
		window.all_feeds_loaded = true;
		console.log("window.all_feeds_loaded == true");
		console.log("terminal feed");
		return;
	}
	else{
		console.log("feed num: " + window.this_feed_num);
		var feed_to_load = window.feedList[window.this_feed_num];
		var new_feed = new google.feeds.Feed(feed_to_load);
		new_feed.setNumEntries(4);
		new_feed.load(load_feed_contents);
	return;
	}
}

function load_feed_contents(result){
	console.log("loading feed contents");
	console.log("this feed's num before publish: " + window.this_feed_num);
	if (!result.error){
		var feed_contents = [];
		for (var i = 0; i < result.feed.entries.length; i++) {	
			//console.log("loading feed entry: " + i);
			var entry = result.feed.entries[i];
			feed_contents.push(entry);
		}
		window.feeds.push(feed_contents);
		//window.num_
		console.log("feed loaded");
		//if (window.this_feed_num >= window.numFeeds){
		if ((window.all_feeds_loaded) && (!(window.has_published))){
			window.has_published = true;
			console.log("window.has_published == true");
			console.log("ALL FEEDS SHOULD BE LOADED");
			console.log("\n publishing from end of load feed contents! \n");
			console.log("this feed's num after publish: " + window.this_feed_num);
			post_merged_feed();
		}
		else{
			load_next_feed();
		}
    }
	else{
		$("#current_src").text("ERROR WHILE CONSTRUCTING FEED");
	}
}

/*
function load_ith_feed(){
	window.
*/


function post_merged_feed(){
	//for (var i = 0; i < window.total_num_entries){
	console.log("Merging feeds...");
	var entries_per_feed = 4;
	console.log("num of feeds published: " + (entries_per_feed * window.num_feeds));
	var entry_num = 0;
	for (var i = 0; i < entries_per_feed; i++){	
		for (var j = 0; j < window.num_feeds; j++){
			//console.log(window.feeds);
			var this_feed = window.feeds[j];
			//console.log(this_feed);
			//console.log(this_feed[0]);
			var this_entry = this_feed[i];
			post_feed_entry(this_entry, entry_num);
			entry_num++;
		}
	}
}



/*
function make_feeds(feed_url_list){
	for (var i = 0; i < feed_url_list.length; i++){
		var new_feed = new google.feeds.Feed(window.feed_src);
*/		
/*
//loads a feed, posts to page
function feedLoaded(result){
	if (!result.error){
		var container = $("#feed_container");
		container.innerHTML = "";
		for (var i = 0; i < result.feed.entries.length; i++) {
			
			var entry = result.feed.entries[i];
			var id = i;
			post_feed_entry(entry, id);
		}        
    }
	else{
		$("#current_src").text("ERROR WHILE CONSTRUCTING FEED");
	}
}
*/

//given a feed entry, posts it too page
function post_feed_entry(entry, id){
	//console.log("posting...");
	//console.log(entry.title);
	//console.log(entry);
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
                console.log("opening...");;
                localStorage.link = entry.link;
                closeContainers();
                $("#article").attr("src", entry.link);
                $("#article_container").removeClass("hidden");
                $("#feed_container").addClass("hidden");
			});
}
/*
//allows interaction with feed control buttons
function build_controller(){
	var controller = $("#controller");
	var reddit_button = $("#reddit");
	reddit_button.click(function(){
							build_feed(reddit, 4);
						});
	var cnn_button = $("#cnn");
	cnn_button.click(function(){
							build_feed(cnn, 4);
						});
	var hack_button = $("#hacker_news");
	hack_button.click(function(){
							build_feed(hacker_news, 4);
						});
	$("#generate_feed_button").click(function(){
										generate_feed();
									});
}
*/
/*
//resets and rebuilds the feed
function build_feed(feed_url, numEntries){
	window.numEntries = numEntries;
	window.feed_src = feed_url;
	$("#feed").empty();
	$("#def_feed").val("");
	$("#def_numEntries").val("");
	//$("#current_src").text("Current Feed: " + window.feed_src);
	$("#current_src").text(window.feed_src);
	load_feed();
	//onLoad();
}
*/
/*
//builds user defined feed
function generate_feed(){
	var new_feed_src = $("#def_feed").val();
	var new_numEntries = $("#def_numEntries").val();
	if (new_feed_src !== ""){
		window.feed_src = new_feed_src;
	}
	if (new_numEntries !== ""){
		window.numEntries = new_numEntries;
	}
	build_feed(window.feed_src, window.numEntries);
}
*/
//build_controller();						

google.setOnLoadCallback(load_all_feeds);
