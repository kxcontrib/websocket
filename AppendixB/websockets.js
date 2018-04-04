/* initialise variable */
var ws, syms = document.getElementById("selectSyms"),
    quotes = document.getElementById("tblQuote"),
    trades = document.getElementById("tblTrade");

function connect() {
    if ("WebSocket" in window) {
        ws = new WebSocket("ws://localhost:5001");
        ws.onopen = function(e) {
            /* on successful connection, we want to create an
             initial subscription to load all the data into the page*/
            ws.send("loadPage[]");
        };

        ws.onmessage = function(e) {
            /*parse message from JSON String into Object*/
            var d = JSON.parse(e.data);

            /*depending on the messages func value, pass the result
            to the appropriate handler function*/
            switch(d.func){
            	case 'getSyms'   : setSyms(d.result); break;
            	case 'getQuotes' : setQuotes(d.result); break;
            	case 'getTrades' : setTrades(d.result); 
            }
        };

        ws.onclose = function(e){ console.log("disconnected")};
        ws.onerror = function(e){ console.log(e.data)};
    } else alert("WebSockets not supported on your browser.");
}

function filterSyms() {
    /* get the values of checkboxes that are ticked and 
    convert into an array of strings */
    var t = [], s = syms.children;
    for (var i = 0; i < s.length; i++) {
        if (s[i].checked) {
            t.push(s[i].value);
        };
    };
    t = t.join("`");
    /*call the filterSyms function over the WebSocket*/
    ws.send('filterSyms[`'+ t +']');
}

function setSyms(data) {
    /* parse an array of strings into checkboxes */
    syms.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
        syms.innerHTML += '<input type="checkbox" name="sym" value="' +
            data[i] + '">' + data[i] + '</input>';
    };
}

function setQuotes(data) { quotes.innerHTML = generateTableHTML(data) }

function setTrades(data) { trades.innerHTML = generateTableHTML(data) }

function generateTableHTML(data){
    /* we will iterate through the object wrapping it in the HTML table tags */
    var tableHTML = '<table border="1"><tr>';          
    for (var x in data[0]) { 
        /* loop through the keys to create the table headers */
        tableHTML += '<th>' + x + '</th>'; 
    } 
    tableHTML += '</tr>'; 
    
    for (var i = 0; i < data.length; i++) { 
        /* loop through the rows, putting tags around each col value */
        tableHTML += '<tr>';             
        for (var x in data[0]) {  
            /* Instead of pumping out the raw data to the table, lets
            format it depending on if its a date, number or string*/
            var cellData; 
            if("time" === x)
                cellData = data[i][x].substring(2,10);
            else if("number" == typeof data[i][x])
                cellData = data[i][x].toFixed(2);
            else cellData = data[i][x];               
            tableHTML += '<td>' + cellData + '</td>'; 
        } 
        tableHTML += '</tr>'; 
    } 
   
    tableHTML += '</table>'; 
    return tableHTML;
}
