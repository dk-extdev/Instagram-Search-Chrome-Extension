jQuery(document).ready(function () {
	var default_email_contents = "We have been following your user profile on Instagram. It is quite impressive the following you have built. Are you currently accepting any advertising on your page? The products we sell would be a perfect fit for your follower base. If so, would you kindly provide pricing details and any instructions you may require from us. We look forward to your response."
	if(localStorage.getItem("emailTmp")){
		$("#emailtmp").val("");
		$("#emailtmp").val(localStorage.getItem("emailTmp"));	
	}else{
		$("#emailtmp").val("");
		$("#emailtmp").val(default_email_contents);
	}
	$("#btn_emailtmp").click(function() { 
		$(".email-area").toggle();
		localStorage.setItem("emailTmp",$("#emailtmp").val());
	});
	function sortTable(n) {
	  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	  table = document.getElementById("tbl_results");
	  switching = true;
	  //Set the sorting direction to ascending:
	  dir = "asc"; 
	  /*Make a loop that will continue until
	  no switching has been done:*/
	  while (switching) {
	    //start by saying: no switching is done:
	    switching = false;
	    rows = table.getElementsByTagName("TR");
	    /*Loop through all table rows (except the
	    first, which contains table headers):*/
	    for (i = 1; i < (rows.length - 1); i++) {
	      //start by saying there should be no switching:
	      shouldSwitch = false;
	      /*Get the two elements you want to compare,
	      one from current row and one from the next:*/
	      x = rows[i].getElementsByTagName("TD")[n];
	      y = rows[i + 1].getElementsByTagName("TD")[n];
	      /*check if the two rows should switch place,
	      based on the direction, asc or desc:*/
	      if (dir == "asc") {
	        if (parseInt(x.innerHTML.toLowerCase()) > parseInt(y.innerHTML.toLowerCase())) {
	          //if so, mark as a switch and break the loop:
	          shouldSwitch= true;
	          break;
	        }
	      } else if (dir == "desc") {
	        if (parseInt(x.innerHTML.toLowerCase()) < parseInt(y.innerHTML.toLowerCase())) {
	          //if so, mark as a switch and break the loop:
	          shouldSwitch= true;
	          break;
	        }
	      }
	    }
	    if (shouldSwitch) {
	      /*If a switch has been marked, make the switch
	      and mark that a switch has been done:*/
	      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
	      switching = true;
	      //Each time a switch is done, increase this count by 1:
	      switchcount ++;      
	    } else {
	      /*If no switching has been done AND the direction is "asc",
	      set the direction to "desc" and run the while loop again.*/
	      if (switchcount == 0 && dir == "asc") {
	        dir = "desc";
	        switching = true;
	      }
	    }
	  }
	}

	// JSON to CSV Converter
	function ConvertToCSV(objArray) {
	    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
	    var str = '';

	    for (var i = 0; i < array.length; i++) {
	        var line = '';
	        for (var index in array[i]) {
	            if (line != '') line += ','

	            line += array[i][index];
	        }

	        str += line + '\r\n';
	    }

	    return str;
	}
	
	var filter_data = JSON.parse(localStorage.getItem("filter_data"));
	if(filter_data){
		if(filter_data.length){
			$("#tbl_results tbody").empty();
			$("div.panel-heading h4").text(filter_data.length + " Results Found");
			for(var i in filter_data){
				if(filter_data[i].user.email==""){
					filter_data[i].user.email = "NoEmail";	
				}
				if(filter_data[i].user.external_url==""){
					filter_data[i].user.external_url = "NoURL";	
				}
				if(!filter_data[i].user.comments){
					filter_data[i].user.comments = 0;	
				}
				if(!filter_data[i].user.likes){
					filter_data[i].user.likes = 0;	
				}
				var url_ext_str = "";
				if(filter_data[i].user.external_url=="NoURL"){
					url_ext_str = '<td class="w-1">'+filter_data[i].user.external_url+'</td>';
				}else{
					url_ext_str = '<td class="w-1"><a class="site-page" href="'+filter_data[i].user.external_url+'">'+filter_data[i].user.external_url+'</a></td>';
				}
				if(filter_data[i].user.email=="NoEmail"){
					var row = $('<tr><td class="w-1"><input style="margin-top: 18px;vertical-align:middle;" type="checkbox"/></td><td class="w-1"><img class="embed-img" src="'+filter_data[i].user.profile_pic_url+'"></td><td class="w-1"><a class="instagram-page" href="https://www.instagram.com/'+filter_data[i].user.username+'">'+filter_data[i].user.username+'</a></td><td class="w-3">'+filter_data[i].user.biography+'</td><td class="w-1">'+filter_data[i].user.follower_count+'</td><td class="w-1">'+filter_data[i].user.email+'</td>'+url_ext_str+'<td class="w-1">'+filter_data[i].user.likes+'</td><td class="w-1">'+filter_data[i].user.comments+'</td><td class="w-1">'+parseInt(filter_data[i].user.likes/10)+'</td></tr>');
				}else{
					var row = $('<tr><td class="w-1"><input style="margin-top: 18px;vertical-align:middle;" type="checkbox"/></td><td class="w-1"><img class="embed-img" src="'+filter_data[i].user.profile_pic_url+'"></td><td class="w-1"><a class="instagram-page" href="https://www.instagram.com/'+filter_data[i].user.username+'">'+filter_data[i].user.username+'</a></td><td class="w-3">'+filter_data[i].user.biography+'</td><td class="w-1">'+filter_data[i].user.follower_count+'</td><td class="w-1"><a class="mailtolink" href="mailto:'+filter_data[i].user.email+'?body=Hello('+filter_data[i].user.username+')%0D%0A%0D%0A'+$("#emailtmp").val()+'">'+filter_data[i].user.email+'</a></td>'+url_ext_str+'<td class="w-1">'+filter_data[i].user.likes+'</td><td class="w-1">'+filter_data[i].user.comments+'</td><td class="w-1">'+parseInt(filter_data[i].user.likes/10)+'</td></tr>');
				}
				$("#tbl_results tbody").append(row);		
			}
			var newTableObject = document.getElementById("tbl_results");
			sorttable.makeSortable(newTableObject);
			$("#btn_search").button('reset');
			$("div.container").show();
		}else {
			$("#tbl_results tbody").empty();
			var row = $('<span style="text-align:center">There is no results.</span>');
			$("#tbl_results tbody").append(row);
			$("#btn_search").button('reset');
			$("div.container").show();
		}	
	}
	
	
	//#####################

	$("#btn_search").click(function() {
		if(!$("#keyword").val()){
			$( "#keyword" ).focus();
			return false;
		}else{
			$("div.container").hide();
			var $btn = $(this);
		    $btn.button('loading');
		    $("#tbl_results tbody").empty();
		    localStorage.removeItem("filter_data");
		    chrome.extension.sendMessage({message: "GetInfo", keyword:$("#keyword").val(), follow:$("#followers_filter").val()},function (response) {
	        });
		    // Then whatever you actually want to do i.e. submit form
		    // After that has finished, reset the button state using
		    /*function getURL() {
			    
			}*/
		}
	});
	$("#btn_csv").click(function(){
		var filter_data = JSON.parse(localStorage.getItem("filter_data"));
		if(filter_data){
			window.total = [];
			total.push({
				userid: "UserID",
				username: "UserName",
				fullname: "FullName",
				follow: "Follower Count",
				email: "Email",
				website: "WebSite",
				picture : "Profile Picture",
				media : "Media Count",
				biography: "Biography"
			});
			if ($('#only-email').is(':checked')){
				for(var i=0;i<filter_data.length;i++) {
					if(filter_data[i].user.email){
						total.push({
							userid: filter_data[i].user.pk,
							username: filter_data[i].user.username,
							fullname: filter_data[i].user.full_name,
							follow: filter_data[i].user.follower_count,
							email: filter_data[i].user.email,
							website: filter_data[i].user.external_url,
							picture: filter_data[i].user.profile_pic_url,
							media: filter_data[i].user.media,
							biography: filter_data[i].user.biography
						});
					}
				}
			}else{
				for(var i=0;i<filter_data.length;i++) {
					total.push({
						userid: filter_data[i].user.pk,
						username: filter_data[i].user.username,
						fullname: filter_data[i].user.full_name,
						follow: filter_data[i].user.follower_count,
						email: filter_data[i].user.email,
						website: filter_data[i].user.external_url,
						picture: filter_data[i].user.profile_pic_url,
						media: filter_data[i].user.media,
						biography: filter_data[i].user.biography
					});
				}
			}
			var csv = (ConvertToCSV(total));
			var date = (new Date()).toString().split('(')[0].split(' ');
			var dateX = date[1]+' '+date[2]+' '+date[3]+' '+date[4];
			var link = '<a href="data:text/csv;charset=utf-8,\uFEFF'+encodeURI(csv)+'" download="'+dateX+'.csv">Download CSV</a>';
			downloadLink=document.createElement('a');
			downloadLink.download=dateX+".csv";
			downloadLink.href='data:text/csv;charset=utf-8,\uFEFF'+encodeURI(csv);
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
			//localStorage.removeItem("filter_data");
		}
	});
	chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
		if(message.status=="success" && message.data){
			/*localStorage.setItem("filter_data", JSON.stringify(message.data));
			if(message.data.length){
				$("#tbl_results tbody").empty();
				for(var i in message.data){
					if(message.data[i].user.email==""){
						message.data[i].user.email = "NoEmail";	
					}
					if(message.data[i].user.external_url==""){
						message.data[i].user.external_url = "NoURL";	
					}
					if(!message.data[i].user.comments){
						message.data[i].user.comments = 0;	
					}
					if(!message.data[i].user.likes){
						message.data[i].user.likes = 0;	
					}
					var row = $('<tr><td class="w-1"><img class="embed-img" src="'+message.data[i].user.profile_pic_url+'"></td><td class="w-1"><a class="instagram-page" href="https://www.instagram.com/'+message.data[i].user.username+'">'+message.data[i].user.username+'</a></td><td class="w-3">'+message.data[i].user.biography+'</td><td class="w-1">'+message.data[i].user.follower_count+'</td><td class="w-1"><a class="mailtolink" href="mailto:'+message.data[i].user.email+'">'+message.data[i].user.email+'</td><td class="w-1"><a class="site-page" href="'+message.data[i].user.external_url+'">'+message.data[i].user.external_url+'</a></td><td class="w-1">'+message.data[i].user.likes+'</td><td class="w-1">'+message.data[i].user.comments+'</td></tr>');
					$("#tbl_results tbody").append(row);
				}	
				$("#btn_search").button('reset');
				$("div.container").show();
			}else {
				$("#tbl_results tbody").empty();
				var row = $('<span style="text-align:center">There is no results.</span>');
				$("#tbl_results tbody").append(row);
				$("#btn_search").button('reset');
				$("div.container").show();
			}*/
			if(localStorage.getItem("filter_data")){
				var original_filter_data = JSON.parse(localStorage.getItem("filter_data"));
				original_filter_data.push(message.data);
				localStorage.setItem("filter_data",JSON.stringify(original_filter_data));
				$("div.panel-heading h4").text(filter_data.length + " Results Found");
				if(message.data.user.email==""){
					message.data.user.email = "NoEmail";	
				}
				if(message.data.user.external_url==""){
					message.data.user.external_url = "NoURL";	
				}
				if(!message.data.user.comments){
					message.data.user.comments = 0;	
				}
				if(!message.data.user.likes){
					message.data.user.likes = 0;	
				}
				var url_ext_str = "";
				if(message.data.user.external_url=="NoURL"){
					url_ext_str = '<td class="w-1">'+message.data.user.external_url+'</td>';
				}else{
					url_ext_str = '<td class="w-1"><a class="site-page" href="'+message.data.user.external_url+'">'+message.data.user.external_url+'</a></td>';
				}
				if(filter_data[i].user.email=="NoEmail"){
					var row = $('<tr><td class="w-1"><input style="margin-top: 18px;vertical-align:middle;" type="checkbox"/></td><td class="w-1"><img class="embed-img" src="'+message.data.user.profile_pic_url+'"></td><td class="w-1"><a class="instagram-page" href="https://www.instagram.com/'+message.data.user.username+'">'+message.data.user.username+'</a></td><td class="w-3">'+message.data.user.biography+'</td><td class="w-1">'+message.data.user.follower_count+'</td><td class="w-1">'+message.data.user.email+'</td>'+url_ext_str+'<td class="w-1">'+message.data.user.likes+'</td><td class="w-1">'+message.data.user.comments+'</td><td class="w-1">'+parseInt(message.data.user.likes/10)+'</td></tr>');
				}else{
					var row = $('<tr><td class="w-1"><input style="margin-top: 18px;vertical-align:middle;" type="checkbox"/></td><td class="w-1"><img class="embed-img" src="'+message.data.user.profile_pic_url+'"></td><td class="w-1"><a class="instagram-page" href="https://www.instagram.com/'+message.data.user.username+'">'+message.data.user.username+'</a></td><td class="w-3">'+message.data.user.biography+'</td><td class="w-1">'+message.data.user.follower_count+'</td><td class="w-1"><a class="mailtolink" href="mailto:'+message.data.user.email+'?body=Hello('+message.data.user.username+')%0D%0A%0D%0A'+$("#emailtmp").val()+'">'+message.data.user.email+'</a></td>'+url_ext_str+'<td class="w-1">'+message.data.user.likes+'</td><td class="w-1">'+message.data.user.comments+'</td><td class="w-1">'+parseInt(message.data.user.likes/10)+'</td></tr>');
				}
				$("#tbl_results tbody").append(row);
			}else {
				var new_filter_data = [];
				new_filter_data.push(message.data);
				localStorage.setItem("filter_data",JSON.stringify(new_filter_data));
				if(message.data.user.email==""){
					message.data.user.email = "NoEmail";	
				}
				if(message.data.user.external_url==""){
					message.data.user.external_url = "NoURL";	
				}
				if(!message.data.user.comments){
					message.data.user.comments = 0;	
				}
				if(!message.data.user.likes){
					message.data.user.likes = 0;	
				}
				var url_ext_str = "";
				if(message.data.user.external_url=="NoURL"){
					url_ext_str = '<td class="w-1">'+message.data.user.external_url+'</td>';
				}else{
					url_ext_str = '<td class="w-1"><a class="site-page" href="'+message.data.user.external_url+'">'+message.data.user.external_url+'</a></td>';
				}
				$("div.panel-heading h4").text(filter_data.length + " Results Found");
				if(filter_data[i].user.email=="NoEmail"){
					var row = $('<tr><td class="w-1"><input style="margin-top: 18px;vertical-align:middle;" type="checkbox"/></td><td class="w-1"><img class="embed-img" src="'+message.data.user.profile_pic_url+'"></td><td class="w-1"><a class="instagram-page" href="https://www.instagram.com/'+message.data.user.username+'">'+message.data.user.username+'</a></td><td class="w-3">'+message.data.user.biography+'</td><td class="w-1">'+message.data.user.follower_count+'</td><td class="w-1">'+message.data.user.email+'</td>'+url_ext_str+'<td class="w-1">'+message.data.user.likes+'</td><td class="w-1">'+message.data.user.comments+'</td><td class="w-1">'+parseInt(message.data.user.likes/10)+'</td></tr>');
				}else{
					var row = $('<tr><td class="w-1"><input style="margin-top: 18px;vertical-align:middle;" type="checkbox"/></td><td class="w-1"><img class="embed-img" src="'+message.data.user.profile_pic_url+'"></td><td class="w-1"><a class="instagram-page" href="https://www.instagram.com/'+message.data.user.username+'">'+message.data.user.username+'</a></td><td class="w-3">'+message.data.user.biography+'</td><td class="w-1">'+message.data.user.follower_count+'</td><td class="w-1"><a class="mailtolink" href="mailto:'+message.data.user.email+'?body=Hello('+message.data.user.username+')%0D%0A%0D%0A'+$("#emailtmp").val()+'">'+message.data.user.email+'</a></td>'+url_ext_str+'<td class="w-1">'+message.data.user.likes+'</td><td class="w-1">'+message.data.user.comments+'</td><td class="w-1">'+parseInt(message.data.user.likes/10)+'</td></tr>');
				}
				$("#tbl_results tbody").append(row);
				$("div.container").show();
			}
			
		}else if(message.status=="end"){
			$("#btn_search").button('reset');
			//setTimeout(function(){ 
				/*var newTableObject = document.getElementById("tbl_results");
				console.log(newTableObject);
				sorttable.makeSortable(newTableObject);*/
				location.reload();
			//}, 3000);
			
		}
		$(".instagram-page").click(function(){
			chrome.tabs.create({url: $(this).attr('href')});
	     	return false;
		});
		$(".site-page").click(function(){
			chrome.tabs.create({url: $(this).attr('href')});
	     	return false;
		});
	});
	$(".instagram-page").click(function(){
		chrome.tabs.create({url: $(this).attr('href')});
     	return false;
	});
	$(".site-page").click(function(){
		chrome.tabs.create({url: $(this).attr('href')});
     	return false;
	});
	$(".mailtolink").click(function(){
		$(this).css('color', 'black');
		var new_maito = $(this).attr('href').split("%0D%0A%0D%0A");
		//console.log(new_maito);
		$(this).attr('href',new_maito[0]+'%0D%0A%0D%0A'+$("#emailtmp").val());
		//$(this).
	});
	$("#btn_emailto").click(function(){
		$("#tbl_results tr").each(function(i){
			if($(this).find("input[type='checkbox']").is(':checked')){
				//console.log($(this).find("a.mailtolink"))
				if($(this).find("a.mailtolink")[0]){
					var mailto_link = 'mailto:'+$(this).find('td:nth-child(6) a').text().trim()+'?body=Hello('+$(this).find('td:nth-child(3) a').text().trim+')%0D%0A%0D%0A'+$("#emailtmp").val()+'"';
					$(this).find("a.mailtolink").attr('href',mailto_link);
					$(this).find("a.mailtolink")[0].click();
				}
			}
		});
	});
});


 
