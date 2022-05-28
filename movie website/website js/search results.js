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
				//dataType:'JSON',
					/**beforeSend: function(request)
					{
					  request.setRequestHeader("Access-Control-Allow-Origin", "*");
						request.setRequestHeader('Access-Control-Allow-Credentials','true');
					
				},**/
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
					alert("LOGIN SUCCESSFULLY！");
						sessionStorage.setItem("username",username);
						sessionStorage.setItem("password",password);
					$("#myLoginModal").modal('hide');
					$(".logout").css('display','block');
		         $(".logReg").css('display','none');
						$(".error").text("");
						$("#LoginPwd").text("");
						$("#LoginUsername").text("");
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
	var searchContentFromLastPage = sessionStorage.getItem("searchContent");
	console.log(searchContentFromLastPage);
	if(searchContentFromLastPage==""||searchContentFromLastPage==null)
		{
			 $('.searchResult').text("WHAT DO YOU WANT TO SEARCH ? ");
		}
	else{
		$('#searchContent').text(searchContentFromLastPage);
		var searchContent=$('#searchContent').val().trim();
		$.ajax({
				url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-key_word_search/moviesByKeyword',
				type:'post',
				data:{
					Title:searchContent,
					Limit:'[0,5]',
				},
			   dataType: 'json',
				success: function(data){
					console.log("search successfully!");
					console.log("all movies results"+JSON.stringify(data));
	            	showResults(data);
				},
				error: function()
				{
					console.log("search failed");
				}		
			});
	}
	
	
	 $("#searchBtn").click(function(){
		 sessionStorage.removeItem("searchContent");
		
		
		
	 });
});


function showResults(Rdata){
	var str = "";
	
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
					var text = document.createElement("a");
					var div = document.createElement("div");
					var img = document.createElement("img");
					div.appendChild(img);
					textBox.appendChild(text);
					var poster_path = "no";
					
					try{
						poster_path = JSON.stringify(Mdata.results[0].poster_path);
					}
					catch(e){
						console.log("error"+e);
					}
					if(poster_path=="no")
						{	
						   img.src = "img/moviePhoto.png";
						   text.textContent = Rdata[i].title;
                           //str ="<div>"+ Rdata[i].title+"</div>";
						   
						}
					else{
						var imgSrc = "https://image.tmdb.org/t/p/w500"+poster_path;
						var imgS = imgSrc.replaceAll('"','');
						img.src = imgS;
						console.log(">>IMGSRC<<"+imgSrc);
						console.log(">>IMGSRC_RE<<"+imgS);
                        text.textContent = Rdata[i].title;
					}
		  
            
              $(".searchResult").append(div,textBox);
				},
				error: function()
				{
					console.log("search image failed");
				}		
			});
			  }
			  
			      
};








