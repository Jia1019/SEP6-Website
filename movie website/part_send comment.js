// JavaScript Document
//var username=localStorage.getItem("username");
//var password=localStorage.getItem("password");
var username= "11";//1
var password= "2";
var movieId = 15414;

$(document).ready(function(){
	$("#button_send").click(function(){
		var text=$('#input_comment').val().trim();
		console.log("click button_send");
		$.ajax({
			url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-movie_info_management/addComment',
			type:'post',
			data:{
				Account:username,
				Password:password,
				MovieId:movieId,
				Text:text
			},
			success: function(data){
				document.getElementById("input_comment").value = "";
				if (data.id == undefined)
				{
					console.log(data);
					document.getElementById("error_div").classList.add("error_div_show");
					document.getElementById("error_div").classList.remove("error_div_no");
					document.getElementById("error_div").textContent = data;
				}
				else
				{
					document.getElementById("error_div").classList.add("error_div_no");
					document.getElementById("error_div").classList.remove("error_div_show");
					document.getElementById("error_div").textContent = "";
				}
				
			},
			error: function()
			{
				console.log("post fail");
			}		
		});
	});
})