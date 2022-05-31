var user=sessionStorage.getItem("username");
var psw=sessionStorage.getItem("password");


$(document).ready(function(){
	$(".error").css({"padding":"10px","color":"#f24144","font-size":"20px"});
	if (typeof(Storage) !== "undefined") {
	if(user==""||psw==""||user==null||psw==null)
	   {
	    $(".logout").css('display','none');
		   $(".logReg").css('display','block');
	   }
	   else{
		   $(".logout").css('display','block');
		   $(".logReg").css('display','none');
	   }
		showLikeMovies(user,psw);
	}
	else{
		console.log("check browser support failed");
	}
});

$(document).ready(function(){
	
		$("#RegisterConfirm").click(function(){
			var username=$('#RegisterUsername').val().trim();
			var password=$('#RegisterPwd').val().trim();
			
			if(username==null||username==""){
				console.log("null username");
				$(".error").text("Please insert username");
			}
			else if(password==null||password==""){
				console.log("null password");
				$(".error").text("Please insert password");
			}
			else{
				$.ajax({
				url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-user_account_management/register',
				type:'post',
				data:{
					Account:username,
					Password:password
				},
				success: function(data){
					
					if(data=="OK"){
						alert("REGISTER SUCCESSFULLY！");
					$("#myRegisterModal").modal('hide');
					$("#myLoginModal").modal('show');
						$("#RegisterPwd").text("");
						$("#RegisterUsername").text("");
						$(".error").text("");
					}
					else
						{
							$(".error").text(data);
							$("#RegisterPwd").text("");
						$("#RegisterUsername").text("");
						}
					
				},
				error: function()
				{
					console.log("post fail");
				}		
			});
			}
			
	});
	
	
	});
	
	$(document).ready(function(){
	
	 $("#LoginConfirm").click(function(){
			var username=$('#LoginUsername').val().trim();
			var password=$('#LoginPwd').val().trim();
			
		 if(username==null||username==""){
				console.log("null username or password");
			  $(".error").text("Please insert username or password");
			}
		 else if(password==null||password==""){
				console.log("null password");
				$(".error").text("Please insert password");
			}
		 else{
			 $.ajax({
				url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-user_account_management/login',
				type:'post',
				data:{
					Account:username,
					Password:password
				},
				success: function(data){
					if(data=="OK"){
						$("#myLoginModal").modal('hide');
						sessionStorage.setItem("username",username);
						sessionStorage.setItem("password",password);
						$(".logout").css('display','block');
		         $(".logReg").css('display','none');
						$(".error").text("");
						$("#LoginPwd").text("");
						$("#LoginUsername").text("");
						showLikeMovies(username,password);
					alert("LOGIN SUCCESSFULLY！");
					
					}
					else
						{
							$(".error").text(data);
							$("#LoginPwd").text("");
						$("#LoginUsername").text("");
						}
				},
				error: function(errorMsg)
				{
					console.log("Login failed")
				}		
			});
		 }		
	});	
	});


$(document).ready(function(){
	$(".btn-close").click(function(){
		$("#LoginPwd").text("");
		$("#LoginUsername").text("");
		$(".error").text("");
		$("#RegisterPwd").text("");
		$("#RegisterUsername").text("");
	});
});

$(document).ready(function(){
	$("#LoginCancel").click(function(){
		$("#LoginPwd").text("");
		$("#LoginUsername").text("");
		$(".error").text("");
		$("#RegisterPwd").text("");
		$("#RegisterUsername").text("");
	});
});

$(document).ready(function(){
	$("#RegisterCancel").click(function(){
		$("#LoginPwd").text("");
		$("#LoginUsername").text("");
		$(".error").text("");
		$("#RegisterPwd").text("");
		$("#RegisterUsername").text("");
	});
});

$(document).ready(function(){
	
	 $(".logout").click(function(){
		 console.log("click logout");
		 sessionStorage.clear();
		 $(".logout").css('display','none');
		$(".logReg").css('display','block');
	 });
});

$(document).ready(function(){
	 $("#searchBtn").click(function(){
		 var searchContent=$('#searchContent').val().trim();
		 setSession("searchContent",searchContent);
		 console.log(">>MS_RS_R<<"+searchContent);
		 setSession("typeBtn","movie");
		 $('#searchContent').val("");
	 });
});


/* to show like movies*/
function showLikeMovies(u,p){
	if(u==""||p==""||u==null||p==null)
		{
			$("#notLoginAInfo").css('display','block');
			$("#notLoginAInfo").text("Please log in to see your list");
			console.log("not login");
		}
	else{
		console.log("login to show like movies");
		postLikeMovies(u,p);
	}
};
	


function postLikeMovies(u,p){
	$.ajax({
				url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-movie_info_management/getLikeMovies',
				type:'post',
				data:{
					Account: u,
					Password: p,
				},
			   dataType: 'json',
				success: function(data){
					console.log("show all like movies successfully!");
	            	if(data.length>0)
					{
						$("#notLoginAInfo").css('display','none');
						showLikeMoviesImg(data);
						clickMovieItem(data);
					}
					else{
						$("#notLoginAInfo").css('display','block');
						$("#notLoginAInfo").text("No movies added now...");
					}
				},
				error: function(e)
				{
					console.log("show like movies failed"+JSON.stringify(e));
				}		
			});
};


function showLikeMoviesImg(Rdata){
          for (var i = 0; i < Rdata.length; i++) { 
			  $.ajax({
				url:'https://api.themoviedb.org/3/search/movie?api_key=12aa6fa5f9d0e956ea2a1c6bf00f24c8&query='+Rdata[i].title,
				type:'get',
			   dataType: 'json',
				  async: false,
				success: function(Mdata){
					console.log("search image successfully!");
					console.log("search image successfully!!!!"+JSON.stringify(Mdata));
					var textBox = document.createElement("div");
					var text = document.createElement("Label");
					var label = document.createElement("Label");
					var div = document.createElement("div");
					var img = document.createElement("img");
					var div2 = document.createElement("div");
					div.appendChild(img);
					textBox.appendChild(text);
					textBox.appendChild(label);
					img.setAttribute("class","BasicMoviesImg");
					text.setAttribute("class","BasicMoviesTitle");
					label.setAttribute("class","BasicMoviesRate");
					div2.appendChild(div);
					div2.appendChild(textBox);
					div2.setAttribute("class","grid-item");
					var poster_path = "no";
					
					try{
						poster_path = JSON.stringify(Mdata.results[0].poster_path);
					}
					catch(e){
						console.log("error"+e);
					}
					if(poster_path=="no"||poster_path==null)
						{	
							console.log("show all movies without movie photo");
						   img.src = "img/moviePhoto.png";
						   text.textContent = Rdata[i].title;
							label.textContent = Rdata[i].rating;
						   
						}
					else{
						var imgSrc = "https://image.tmdb.org/t/p/w500"+poster_path;
						var imgS = imgSrc.replaceAll('"','');
						img.src = imgS;
						console.log(">>IMGSRC<<"+imgSrc);
						console.log(">>IMGSRC_RE<<"+imgS);
                        text.textContent = Rdata[i].title;
						label.textContent = Rdata[i].rating;
					}
 
						$(".grid-container").append(div2);
					clickMovieItem(Rdata[i]);
              
				},
				error: function()
				{
					console.log("search image failed");
				}		
			});
			  }
			  
			      
};

$(document).ready(function(){
	$("#toAllMovies").click(function(){
		 setSession("ClickTypeBtn","Popularity");
		 
	 });
	
	
});

function clickMovieItem(data){
	$(".grid-item").click(function(){
		sessionStorage.setItem("showMovieBasicInfo",JSON.stringify(data));
		window.open("movie info page.html");
	});
};


function setSession(name, value) {
	if (window.opener && Object.getOwnPropertyNames(window.opener).length > 0) {
	  window.opener.sessionStorage.setItem(name, value)
	} else {
	  sessionStorage.setItem(name, value)
	}
  };
  function getSession(name) {
	if (window.opener && Object.getOwnPropertyNames(window.opener).length > 0) {
	  return window.opener.sessionStorage.getItem(name)
	} else {
	  return sessionStorage.getItem(name)
	}
  };



