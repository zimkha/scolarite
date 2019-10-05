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
        url: 'http://localhost/scolarite/public/statmensuel/1',
        method: "GET",
        success: function (data) {

            var mois = [];
            var montant = [];
            for (var i in data)
            {
                mois.push(data[i].mois);
                montant.push(data[i].montant)
            }

            var chartGraph = {
                labels: mois,
                datasets : [
                    {
                        label : 'Représentation Graphique des Mensualité',
                        borderColor:'rgba(200,200,200,0.75)',
                        hoverBackgroundColor: 'rgba(200,200,200,1)',
                        hoverBorderColor: 'rgba(200,200,200,1)',
                        data:montant
                    }
                ]
            };
            var ctx = $("#graphChar");

            var graph = new Chart(ctx, {
                type: 'line',
                data: chartGraph,

            });
        }, error: function (data) {
            console.log("erreur de server" +data)
        }
    });
    function graphMensualite(){
           $.ajax({
              url: "http://localhost/scolarite/public/statmensuel/1",
              methode: "GET",
              success: function (data) {
                  console.log(data)
                  var mois = [];
                  var montant = [];

                  var cpt = 0;
                  for (var i in data[cpt])
                  {


                  }


              }
           });
    }

    graphMensualite();
});
