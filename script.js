
// https://stackoverflow.com/questions/17749681/get-xmlhttprequest-not-working
function load_google_sheets(url) {
    if (window.XMLHttpRequest) {
      var xmlhttp=new XMLHttpRequest();
    }
    else {
      var xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET",url,false);
    xmlhttp.send(null);
    console.log(xmlhttp.responseText)
    return xmlhttp.responseText;
}



// https://stackoverflow.com/questions/27979002/convert-csv-data-into-json-format-using-javascript
function csv_to_JSON(csv) {
  const lines = csv.split('\r\n')
  const result = []
  const headers = lines[0].split(',')

  for (let i = 1; i < lines.length; i++) {        
      if (!lines[i])
          continue
      const obj = {}
      const currentline = lines[i].split(',')

      for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j]
      }
      result.push(obj)
  }
  return result
}




function rechercher() {
    var manuels = csv_to_JSON(load_google_sheets("https://docs.google.com/spreadsheets/d/e/2PACX-1vTd1-ZFtLOY49L8MiceYW6Btl0i_5kdSpqWvaor_bxQX9z1QEkcANBX6Qct7aYArBkaYGgPbQ-OtFr8/pub?gid=0&single=true&output=csv"))
    console.log(manuels)
    
    var classe = document.getElementById('classe').value;
    var matiere = document.getElementById('matiere').value;
    var edition = document.getElementById('edition').value;
    
    var num = manuels.length;
    var bon_manuel = []
    for (var i=0; i<num; i++) {
        console.log('test')
        if (manuels[i]["classe"] === classe && manuels[i]["matiere"] === matiere && manuels[i]["edition"] === edition)  {
            bon_manuel.push(manuels[i]);
        }
    }
    console.log(bon_manuel)
    console.log(getCurrentURL())

    var len_bon_manuel = bon_manuel.length
    console.log(len_bon_manuel)
    for (var e=0; e<len_bon_manuel; e++) {
        console.log("oui")
        // Create anchor element.
        var a = document.createElement('a'); 
                    
        // Create the text node for anchor element.
        var link = document.createTextNode(bon_manuel[e]['titre']);
        
        // Append the text node to anchor element.
        a.appendChild(link); 
        
        // Set the href property.
        a.href = bon_manuel[e]['url']; 

        a.target = "_blank"
        
        // Append the anchor element to the body.
        document.getElementById('liens_manuels').appendChild(a);
    }

}

// Execute la fonction rechercher() lors du click sur le bouton
document.getElementById("btn_rechercher").addEventListener('click', rechercher);





