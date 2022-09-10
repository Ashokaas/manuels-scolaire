
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






var manuels = csv_to_JSON(load_google_sheets("https://docs.google.com/spreadsheets/d/e/2PACX-1vTd1-ZFtLOY49L8MiceYW6Btl0i_5kdSpqWvaor_bxQX9z1QEkcANBX6Qct7aYArBkaYGgPbQ-OtFr8/pub?gid=0&single=true&output=csv"))
var nb_manuels = manuels.length


document.getElementById('info').getElementsByTagName('p')[0].innerHTML = `Il y a actuellement ${nb_manuels} référencés dans la base de données\nVous pouvez y contribuer après avoir consulter le fichier en accédant au Google Sheets en suivant les indications.\n Et le code de l'extension est disponible sur <a href'https://github.com/Ashokaas/manuels-scolaire'>GitHub</a>`


function rechercher() {
    console.log(manuels);
    
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
    console.log(bon_manuel);

    var len_bon_manuel = bon_manuel.length;
    console.log(len_bon_manuel);
    document.getElementById('liens_manuels').innerHTML = '';
    if (len_bon_manuel > 0) {
        for (var e=0; e<len_bon_manuel; e++) {
            
            /*
            var div = document.createElement('div')
            div.id = 'manuel_' + e;
            document.getElementById('liens_manuels').appendChild(div);

            var div_img = document.createElement('div')
            div_img.id = 'manuel_img_' + e
            div_img.style.display = 'none'
            div_img.style.backgroundColor = '#F0F0F0'
            div_img.style.position = 'absolute';
            div_img.style.width = '108'


            document.getElementById('manuel_' + e).appendChild(div_img)

            // Création lien
            var a = document.createElement('a'); 

            var link = document.createTextNode(bon_manuel[e]['titre']);
            a.appendChild(link); 
            
            // Propriétés lien
            a.href = bon_manuel[e]['url']; 
            a.target = "_blank";

            // Création images
            var img = document.createElement('img'); 
            img.src = bon_manuel[e]['img'];
            img.style.width = '100px'
            img.style.position = 'relative'

            document.getElementById('manuel_' + e).addEventListener("mouseover", function(event) {
                div_img.style.display = 'block'
            })


            document.getElementById('manuel_img_' + e).appendChild(img);
            
            // Append the anchor element to the body.
            document.getElementById('manuel_' + e).appendChild(a);*/

            // div contenant le manuel
            var div = document.createElement('div');
            div.id = 'manuel_' + e;
            document.getElementById('liens_manuels').appendChild(div);

                // lien du manuel
            var lien = document.createElement('a');
            lien.href = bon_manuel[e]['url'];
            lien.target = '_blank';
            document.getElementById('manuel_' + e).appendChild(lien);

                    // img du manuel
            var img = document.createElement('img');
            img.src = bon_manuel[e]['img'];
            document.getElementById('manuel_' + e).getElementsByTagName('a')[0].appendChild(img);


                    // label titre du livre
            var titre_manuel = document.createElement('label')
            titre_manuel.innerHTML = bon_manuel[e]['titre']
            titre_manuel.style.alignItems = 'center'
            titre_manuel.style.justifyContent = 'center'
            document.getElementById('manuel_' + e).getElementsByTagName('a')[0].appendChild(titre_manuel)
            

        }
    } else {
        var manuel_introuvable = document.createElement('p');
        manuel_introuvable.innerHTML = "Votre manuel n'a pas encore été ajouté a la base de données ! ";
        manuel_introuvable.style.margin = '7px 5px';
        manuel_introuvable.style.fontSize = '14px';
        document.getElementById('liens_manuels').appendChild(manuel_introuvable);
    
    }

}



function informations() {/*
    #info img:active ~ p, #info img:active ~ #fleche {
        display: inline-block;
        position: absolute;
    
    }*/
    p_info = document.getElementById('info')
    console.log(p_info)
    p_info.style.display = 'inline-block'
    p_info.style.position = 'absolute'
}

// Execute la fonction rechercher() lors du click sur le bouton
document.getElementById("btn_rechercher").addEventListener('click', rechercher);
document.getElementById('info').getElementsByTagName('img')[0].addEventListener('click', informations)





