
function rechercher() {
    var manuels = [
        {
          "url": "https://biblio.nathan.fr/demo/9782091317243/",
          "classe": "term",
          "matiere": "maths",
          "edition": "nathan",
          "titre": "Hyperbole Terminale - Option Maths Expertes"
        }
      ]
    var classe = document.getElementById('classe').value;
    var matiere = document.getElementById('matiere').value;
    var edition = document.getElementById('edition').value;
    
    var num = manuels.length;
    for (var i=0; i<num; i++) {
        console.log('test')
        if (manuels[i]["classe"] === classe && manuels[i]["matiere"] === matiere && manuels[i]["edition"] === edition)  {
            var bon_manuel = manuels[i];
        }
    }
    // Create anchor element.
    var a = document.createElement('a'); 
                  
    // Create the text node for anchor element.
    var link = document.createTextNode(bon_manuel['titre']);
      
    // Append the text node to anchor element.
    a.appendChild(link); 
      
    // Set the href property.
    a.href = bon_manuel['url']; 

    a.target = "_blank"
      
    // Append the anchor element to the body.
    document.body.appendChild(a); 

}

// Execute la fonction rechercher() lors du click sur le bouton
document.getElementById("btn_rechercher").addEventListener('click', rechercher);

