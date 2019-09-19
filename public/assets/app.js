$(document).ready(function(){

    $.ajax({
        url: 'http://localhost/pharmacie/public/teste',
        method: "GET",
        success: function (data) {
            console.log(data)
            var product = [];
            var nbr_fois = [];
            for (var i in data )
            {
                product.push('' + data[i].id);
               nbr_fois.push(data[i].cpt)
            }
            var chardata = {
                labels: product,
                datasets : [
                    {
                        label : 'Statistiques sur les produits les plus vendu ',
                        backgroundColor: ['#f7464a', '#46bfbd', '#fdb45c', '#985f0d'],
                        borderColor:'rgba(200,200,200,0.75)',
                        hoverBackgroundColor: 'rgba(200,200,200,1)',
                        hoverBorderColor: 'rgba(200,200,200,1)',
                        data:nbr_fois
                    }
                ]
            };
            var ctx = $("#mycharjs");
            var  barGraph = new Chart(ctx, {
               type: 'bar',
               data : chardata
            });
        }, error: function (data) {
            console.log(data)
        }
    });



});
