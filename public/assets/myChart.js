$(document).ready(function () {
    function $_GET(param) {
        var vars = {};
        window.location.href.replace( location.hash, '' ).replace(
            /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
            function( m, key, value ) { // callback
                vars[key] = value !== undefined ? value : '';
            }
        );

        if ( param ) {
            return vars[param] ? vars[param] : null;
        }
        return vars;
    }

    $.ajax({
        url: 'http://localhost/pharmacie/public/caisse/1',
        method: "GET",
        success: function (data) {
           // console.log(data)
            var caisses = [];
            var sommes = [];
            for (var i in data)
            {
                caisses.push(data[i].caisse);
                sommes.push(data[i].somme)
            }

            var chartCaisse = {
                labels: caisses,
                datasets : [
                    {
                        label : 'Statistiques Caisse N° ',
                        backgroundColor: ['#f7464a', '#46bfbd', '#fdb45c', '#985f0d',  '#985f0d'],
                        borderColor:'rgba(200,200,200,0.75)',
                        hoverBackgroundColor: 'rgba(200,200,200,1)',
                        hoverBorderColor: 'rgba(200,200,200,1)',
                        data:sommes
                    }
                ]
            };
            var ctx = $("#ChartiCaisse");
            var graph = new Chart(ctx, {
                type: 'bar',
                data: chartCaisse
            });
        }, error: function (data) {
            console.log("erreur de server" +data)
        }
    });
    function caisseMensuelle(){
           $.ajax({
              url: "http://localhost/pharmacie/public/stat_caisse/mensuelle",
              methode: "GET",
              success: function (data) {
                 // console.log(data)
                  var mois = [];
                  var somme = [];
                  var titre = data.caisse;
                  console.log(titre)
                  console.log(data)
                  var cpt = 0;
                  for (var i in data[cpt])
                  {
                    console.log(data[cpt])

                  }


              }
           });
    }

    caisseMensuelle();
});
