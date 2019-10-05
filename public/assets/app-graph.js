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
            console.log(data)
            var caisses = [];
            var sommes = [];
            for (var i in data)
            {
                caisses.push(data[i].caisse);
                sommes.push(data[i].somme)
            }

            var chartGraph = {
                labels: graphique,
                datasets : [
                    {
                        label : 'Graphique',
                        backgroundColor: ['#f7464a', '#46bfbd', '#fdb45c', '#985f0d',  '#985f0d'],
                        borderColor:'rgba(200,200,200,0.75)',
                        hoverBackgroundColor: 'rgba(200,200,200,1)',
                        hoverBorderColor: 'rgba(200,200,200,1)',
                        data:montant
                    }
                ]
            };
            var ctx = $("#graphChar");
            console.log('ok');
            var graph = new Chart(ctx, {
                type: 'bar',
                data: chartGraph
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
                console.log(data)
                var cpt = 0;
                for (var i in data[cpt])
                {
                    console.log(data[cpt])

                }


            }
        });
    }

    graphMensualite();
});
