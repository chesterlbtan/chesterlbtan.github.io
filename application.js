
$(document).ready(function () {
    var data_url = document.getElementById("data_url").innerHTML
    console.log("prior ajax or json");
    $.ajax({
        type: "GET",
        url: data_url,
        dataType: "json",
        success: function(response) {
            displayHTMLTable(response);
        }
    });
    document.getElementById("gametab").click();
});

function displayHTMLTable(data) {
    // Process Team
    console.log("Processing Team data");
    processTeamTables(data["Team"]);

    eve = new Event("update", {bubbles: true});
    document.getElementById("team_avg_stats").dispatchEvent(eve);
}

function processTeamTables(team_data) {
    // Process averages
    var avg_data = team_data["average"];
	var table = "<tbody>";
	for(i=0;i<avg_data.length;i++){
		table+= "<tr>";
		row = avg_data[i];
		for(var j in row) {
		    table += "<td>";
		    if(j=="Logo"){
			    table += "<img src=\"https://cdn.datdota.com/images/" + row[j] + ".png\" width=\"45\" height=\"27\">";
		    }
			else if(["WinRate", "Kills", "Deaths"].includes(j)){
			    // table += String.format("%.2f", cells[j]);
			    table += parseFloat(row[j]).toFixed(2);
			}
			else if(j=="Duration"){
			    minutes = Math.floor(row[j] / 60);
			    seconds = row[j] % 60;
			    table += minutes + ":" + String(seconds.toFixed(0)).padStart(2, '0');
			}
			else{
			    table+= row[j];
			}
			table+= "</td>";
		}
		table+= "</tr>";
	}
	table += "</tbody>";
	temp = document.getElementById("team_avg_stats").innerHTML;
	document.getElementById("team_avg_stats").innerHTML += table;

    // Process Top Kills
    var avg_data = team_data["kills"];
	var table = "<tbody>";
	for(i=0;i<avg_data.length;i++){
		table+= "<tr>";
		row = avg_data[i];
		for(var j in row) {
		    table += "<td>";
		    if(j=="Logo"){
			    table += "<img src=\"https://cdn.datdota.com/images/" + row[j] + ".png\" width=\"45\" height=\"27\">";
		    }
			else{
			    table+= row[j];
			}
			table+= "</td>";
		}
		table+= "</tr>";
	}
	table += "</tbody>";
	temp = document.getElementById("team_kills").innerHTML;
	document.getElementById("team_kills").innerHTML += table;

    // Process game duration
    var avg_data = team_data["duration"];
	var table = "<tbody>";
	for(i=0;i<avg_data.length;i++){
		table+= "<tr>";
		row = avg_data[i];
		for(var j in row) {
		    table += "<td>";
		    if(["Logo_R", "Logo_D"].includes(j)){
			    table += "<img src=\"https://cdn.datdota.com/images/" + row[j] + ".png\" width=\"45\" height=\"27\">";
		    }
			else{
			    table+= row[j];
			}
			table+= "</td>";
		}
		table+= "</tr>";
	}
	table += "</tbody>";
	temp = document.getElementById("team_duration").innerHTML;
	document.getElementById("team_duration").innerHTML += table;
}

function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}