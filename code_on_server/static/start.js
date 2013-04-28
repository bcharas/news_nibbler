function clearMenu(){
    $("#search_cont").removeClass("selected");
    if(($("#prof_cont").hasClass("selected"))){
        $("#prof_cont").removeClass("selected");
        $("#profile_menu").addClass("hidden");
    }
    if($("#rss_cont").hasClass("selected")){
        $("#rss_cont").removeClass("selected");
        $("#rss_menu").addClass("hidden");
    }
    $("#sett_cont").removeClass("selected");
    $("#menus").css("height", "0");
}

function closeContainers(){
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
    if(!($("article_container").hasClass("hidden"))){
		$("#article_container").addClass("hidden");
	}
}

function footer_interactions(){
	$("#prof_cont").onButtonTap(function(){
        if(!($("#prof_cont").hasClass("selected"))){
            clearMenu();
    		$("#profile_menu").removeClass("hidden");
            $("#prof_cont").addClass("selected");
    		$("#menus").css("height", "50px");
        }
        else{
            clearMenu();
        }
	});
    $("#search_cont").onButtonTap(function(){
        clearMenu();
        $("#search_cont").addClass("selected");
        closeContainers();
        $("#browser_container").removeClass("hidden");
    });
    
    $("#rss_cont").onButtonTap(function(){
        if($("#rss_cont").hasClass("selected")){
            clearMenu();
        }
        else{
            clearMenu();
            $("#rss_menu").removeClass("hidden");
            $("#rss_cont").addClass("selected");
            $("#menus").css("height", "50px");
        }
    });
   
   $("#sett_cont").onButtonTap(function(){
        clearMenu();
        $("#sett_cont").addClass("selected");
    });
}

function footer_sub_menu_interactions(){
    $("#to_user_profile").onButtonTap(function(){
        $("#menus").css("height", "0");
        closeContainers();
        $("#user_container").removeClass("hidden");
        //profile page
    });
    $(".logout").onButtonTap(function(){
        facebookLogout(); 
        $("#menus").css("height", "0");
        closeContainers();
        $("#footer_container").addClass("hidden");
        $("#login_container").removeClass("hidden");
        
        //go to logout screen
    });
    
    $("#to_topics").onButtonTap(function(){
        $("#menus").css("height", "0");
        closeContainers();
        $("#browser_container").removeClass("hidden");
        //to topics page
    });
    
    $("#to_rss_feed").onButtonTap(function(){
        $("#menus").css("height", "0");
        closeContainers();
		//load_feed();
        $("#feed_container").removeClass("hidden");
        
    });
    
    $("#sett_cont").onButtonTap(function(){
        closeContainers();
        $("#settings_container").removeClass("hidden");
    });
    
    $("#back").onButtonTap(function(event){
        console.log("Back event:", event);
        $("#article").attr("src", ("load.html"));
        $("#article_container").addClass("hidden");
        $("#feed_container").removeClass("hidden");
    })
}
	
function login_handler(){
	$("#login").onButtonTap(function(){
    loginUser();
		/*$("#login_container").addClass("hidden");
		$("#footer_container").removeClass("hidden");            
		$("#feed_container").removeClass("hidden");
    $("#user_container").removeClass("hidden");*/
        //call login check function, go to homepage
    });
    
    $("#to_create").onButtonTap(function(){
        $("#login_container").addClass("hidden");
        $("#create_container").removeClass("hidden");
    })
    $("#create").onButtonTap(function(){
        $("#create_container").addClass("hidden");
        $("#feed_container").removeClass("hidden");
        $("#footer_container").removeClass("hidden");
    });
}
	
        window.addEventListener('load', function(){
    
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


