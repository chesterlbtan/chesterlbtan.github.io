$(document).ready(function () {
    console.log("testing");
    $.ajax({
        type: "GET",
        url: "trynow.csv",
        dataType: "text",
        success: function(response)
        {
        data = $.csv.toArrays(response);
        displayHTMLTable(data);
        }
        })
                    });

    function displayHTMLTable(results){
	var table = "<table>";
	var data = results.data;
	console.log(data);

	for(i=0;i<data.length;i++){
		table+= "<tr>";
		var row = data[i];
		var cells = row.join(",").split(",");

		for(j=0;j<cells.length;j++){
			table+= "<td>";
			table+= cells[j];
			table+= "</th>";
		}
		table+= "</tr>";
	}
	table+= "</table>";
	document.getElementById("parsed_csv_list").innerHTML = table;
}