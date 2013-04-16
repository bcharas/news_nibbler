var reddit = "http://www.reddit.com/.rss";
var digg = "http://www.digg.com/rss/index.xml";
var cnn = "http://rss.cnn.com/rss/cnn_topstories.rss"
var hacker_news = "https://news.ycombinator.com/rss";
window.feed_src = hacker_news;

window.numEntries = 4;
//window.numEntries = "blep";

google.load("feeds", "1");

function onLoad(){	
    $("#current_src").text(window.feed_src);
	var feed = new google.feeds.Feed(window.feed_src);
	feed.setNumEntries(window.numEntries);
	feed.load(feedLoaded);
}

/*
function make_feeds(feed_url_list){
	for (var i = 0; i < feed_url_list.length; i++){
		var new_feed = new google.feeds.Feed(window.feed_src);
*/		

	


function feedLoaded(result){
	if (!result.error){
		var container = $("#feed");
		container.innerHTML = "";
		for (var i = 0; i < result.feed.entries.length; i++) {
			
			var entry = result.feed.entries[i];
			var id = i;
			post_feed_entry(entry, id);
			/*
			var div_class = "listing";
			var new_div_html = "<div id=" + i + " class='listing'> </div>";
			container.append(new_div_html);
			var div = $("#" + id);
			div.html("<div class='headline'>" + entry.title + "</div>");
			if ((entry.date !== undefined) && (entry.date !== "")){
				div.append("<br/>" + "<div class='date'>" + entry.publishedDate + "</div>");
			}
			if ((entry.contentSnippet !== undefined) && (entry.contentSnippet !== "")){
				div.append("<br/>" + "<div class='snippet'>" + entry.contentSnippet + "</div>");
			}
			var foo = 	function(){
							window.open(entry.link);
						};
			//div.click(foo());
			//div.append("<br/>" + "<div class='snippet'>" + entry.link + "</div>");			
			div.click(function(){
						console.log(entry.link);
						window.open(entry.link);
					});
			*/
		}        
    }
	else{
		$("#current_src").text("ERROR WHILE CONSTRUCTING FEED");
	}
}

function post_feed_entry(entry, id){
	var div_class = "listing";
	var new_div_html = "<div id=" + i + " class='listing'> </div>";
	container.append(new_div_html);
	var div = $("#" + id);
	div.html("<div class='headline'>" + entry.title + "</div>");
	if ((entry.date !== undefined) && (entry.date !== "")){
		div.append("<br/>" + "<div class='date'>" + entry.publishedDate + "</div>");
	}
	if ((entry.contentSnippet !== undefined) && (entry.contentSnippet !== "")){
		div.append("<br/>" + "<div class='snippet'>" + entry.contentSnippet + "</div>");
	}
	var foo = 	function(){
					window.open(entry.link);
				};		
	div.click(function(){
				console.log(entry.link);
				window.open(entry.link);
			});
}

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

function build_feed(feed_url, numEntries){
	window.numEntries = numEntries;
	window.feed_src = feed_url;
	$("#feed").empty();
	$("#def_feed").val("");
	$("#def_numEntries").val("");
	//$("#current_src").text("Current Feed: " + window.feed_src);
	$("#current_src").text(window.feed_src);
	onLoad();
}

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
build_controller();						
google.setOnLoadCallback(onLoad);
