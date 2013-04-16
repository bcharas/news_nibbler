function clearMenu(){
	//console.log("trace1");
	if(!($("#search_menu").hasClass("hidden"))){
		$("#search_menu").addClass("hidden");
	}
	if(!($("#profile_menu").hasClass("hidden"))){
		$("#profile_menu").addClass("hidden");
	}
	if(!($("#rss_menu").hasClass("hidden"))){
		$("#rss_menu").addClass("hidden");
	}
}

function closeContainers(){
	//console.log("trace2");
	if(!($("#login_container").hasClass("hidden"))){
		$("#login_container").addClass("hidden");
	}
	if(!($("#create_container").hasClass("hidden"))){
		$("#create_container").addClass("hidden");
	}
	if(!($("#user_container").hasClass("hidden"))){
		$("#user_container").addClass("hidden");
	}
	if(!($("#browser_container").hasClass("hidden"))){
		$("#browser_container").addClass("hidden");
	}
	if(!($("settings_container").hasClass("hidden"))){
		$("#settings_container").addClass("hidden");
	}
	if(!($("feed_container").hasClass("hidden"))){
		$("#feed_container").addClass("hidden");
	}
}

function footer_interactions(){
	$("#prof_cont").click(function(){
		clearMenu()
		$("#profile_menu").removeClass("hidden");
		$("#menus").css("height", "50px");
	});

    $("#search_cont").click(function(){
        clearMenu()
        $("#search_menu").removeClass("hidden");
        $("#menus").css("height", "50px");
    });
    
    $("#rss_cont").click(function(){
        clearMenu()
        $("#rss_menu").removeClass("hidden");
        $("#menus").css("height", "50px");
    });
   
   $("#sett_cont").click(function(){
        clearMenu()
        $("#menus").css("height", "0");
    });
}

function footer_sub_menu_interactions(){
    $("#to_user_profile").click(function(){
        $("#menus").css("height", "0");
        $("#profile_menu").addClass("hidden");
        closeContainers();
        $("#user_container").removeClass("hidden");
        //profile page
    });
    $(".logout").click(function(){
        $("#menus").css("height", "0");
        $("#profile_menu").addClass("hidden");
        closeContainers();
        $("#footer_container").addClass("hidden");
        $("#login_container").removeClass("hidden");
        
        //go to logout screen
    });
    
    $("#to_search").click(function(){
        $("#menus").css("height", "0");
        $("#search_menu").addClass("hidden");
        closeContainers();
        $("#browser_container").removeClass("hidden");
        // go to search screen
    });
    
    $("#to_topics").click(function(){
        $("#menus").css("height", "0");
        $("#rss_menu").addClass("hidden");
        closeContainers();
        $("#browser_container").removeClass("hidden");
        //to topics page
    });
    
    $("#to_rss_feed").click(function(){
        $("#menus").css("height", "0");
        $("#rss_menu").addClass("hidden");
        closeContainers();
		//load_feed();
        $("#feed_container").removeClass("hidden");
        
    });
    
    $("#sett_cont").click(function(){
        closeContainers();
        $("#settings_container").removeClass("hidden");
    });
}
	
function login_handler(){
	$("#login").click(function(){
    if( checkUser()) {
		$("#login_container").addClass("hidden");
		$("#footer_container").removeClass("hidden");            
		$("#feed_container").removeClass("hidden");
        }
        //call login check function, go to homepage
    });
    
    $("#to_create").click(function(){
        $("#login_container").addClass("hidden");
        $("#create_container").removeClass("hidden");
    })
    $("#create").click(function(){
        $("#create_container").addClass("hidden");
        $("#footer_container").removeClass("hidden");
    });
}
	
$(document).ready(function(){
    
    //======================
    //  Footer Interactions
    //======================
	
	footer_interactions();
	
    //=========================
    // Footer Sub-Menus
    //=========================
    
	footer_sub_menu_interactions();
    
	login_handler();

    /*

	*/
	
})


