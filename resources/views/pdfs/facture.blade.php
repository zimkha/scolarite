<html>
<head>
    <title>Operations</title>
    <style>
        .swal2-container {
            display: flex;
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            padding: 10px;
            background-color: transparent;
            z-index: 1060;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
        }
        .table {
            width: 100%;
            margin-bottom: 1rem;
            background-color: transparent;
        }

        .table th,
        .table td {
            padding: 0.55rem;
            vertical-align: top;
            border-top: 1px solid #e9ecef;
        }

        .table thead th {
            vertical-align: bottom;
            border-bottom: 2px solid #e9ecef;
        }

        .table tbody + tbody {
            border-top: 2px solid #e9ecef;
        }

        .table .table {
            background-color: #fff;
        }

        .table-sm th,
        .table-sm td {
            padding: 0.3rem;
        }

        .table-bordered {
            border: 1px solid #e9ecef;
        }

        .table-bordered th,
        .table-bordered td {
            border: 1px solid #e9ecef;
        }

        .table-bordered thead th,
        .table-bordered thead td {
            border-bottom-width: 2px;
        }

        .table-borderless th,
        .table-borderless td,
        .table-borderless thead th,
        .table-borderless tbody + tbody {
            border: 0;
        }

        .table-striped tbody tr:nth-of-type(odd) {
            background-color: rgba(0, 0, 0, 0.03);
        }

        .card {
            position: relative;
            display: flex;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
            background-color: #fff;
            background-clip: border-box;
            border: 1px solid rgba(26, 54, 126, 0.125);
            border-radius: 0.25rem;
        }


        .card > hr {
            margin-right: 0;
            margin-left: 0;
        }

        .card > .list-group:first-child .list-group-item:first-child {
            border-top-left-radius: 0.25rem;
            border-top-right-radius: 0.25rem;
        }

        .card > .list-group:last-child .list-group-item:last-child {
            border-bottom-right-radius: 0.25rem;
            border-bottom-left-radius: 0.25rem;
        }

        .card-body {
            flex: 1 1 auto;
            padding: 1.25rem;
        }

        .card-title {
            margin-bottom: 0.75rem;
        }

        .card-subtitle {
            margin-top: -0.375rem;
            margin-bottom: 0;
        }

        .card-text:last-child {
            margin-bottom: 0;
        }

        .card-link:hover {
            text-decoration: none;
        }

        .card-link + .card-link {
            margin-left: 1.25rem;
        }

        .card-header {
            padding: 0.75rem 1.25rem;
            margin-bottom: 0;
            color: inherit;
            background-color: #fff;
            border-bottom: 1px solid rgba(26, 54, 126, 0.125);
        }

        .card-header:first-child {
            border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
        }

        .card-header + .list-group .list-group-item:first-child {
            border-top: 0;
        }

        .card-footer {
            padding: 0.75rem 1.25rem;
            background-color: #fff;
            border-top: 1px solid rgba(26, 54, 126, 0.125);
        }

        .card-footer:last-child {
            border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px);
        }

        .card-header-tabs {
            margin-right: -0.625rem;
            margin-bottom: -0.75rem;
            margin-left: -0.625rem;
            border-bottom: 0;
        }

        .card-header-pills {
            margin-right: -0.625rem;
            margin-left: -0.625rem;
        }

        .card-img-overlay {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            padding: 1.25rem;
        }

        .card-img {
            width: 100%;
            border-radius: calc(0.25rem - 1px);
        }

        .card-img-top {
            width: 100%;
            border-top-left-radius: calc(0.25rem - 1px);
            border-top-right-radius: calc(0.25rem - 1px);
        }

        .card-img-bottom {
            width: 100%;
            border-bottom-right-radius: calc(0.25rem - 1px);
            border-bottom-left-radius: calc(0.25rem - 1px);
        }

        .card-deck {
            display: flex;
            flex-direction: column;
        }

        .card-deck .card {
            margin-bottom: 15px;
        }
        .ma-classe-ligne{
            margin-left: 300px;}

        #customers {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        #customers td, #customers th {
            border: 1px solid #ddd;
            padding: 8px;
        }

        #customers tr:nth-child(even){background-color: #f2f2f2;}

        #customers tr:hover {background-color: #ddd;}

        #customers th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #40C1C9;
            color: white;
        }
        .ma-section {
            width: auto;
            height: auto;
            margin-bottom: 10px;
        }
        .my-image{
            width: 100px;
            height: 100px;

        }
        .date-affiche{
            margin-left: 500px;
            display: inline-block;
        }
        .client-section{
            width: 50%;
            height: 100px;
        }
        .pharma-section{
            width: 50%;
            height: 150px;
            margin-left: 500px;
            padding-top: 5cm;
            padding-right: 5cm;
            padding-left: 5cm;
        }
        .panel-primary {
            border-color: #337ab7;
        }
        .panel-primary>.panel-heading {
            color: #fff;
            background-color: #337ab7;
            border-color: #337ab7;
        }
        .panel-danger {
            border-color: #dc3545;
        }
        .panel-danger>.panel-heading {
            color: #fff;
            background-color: #dc3545;
            border-color: #dc3545;
        }
        .panel-group .panel-heading {
            border-bottom: 0;
        }
        .panel-heading {
            padding: 10px 15px;
            border-bottom: 1px solid transparent;
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
        }
        :before, *:after {
            box-sizing: inherit;
        }
        div {
            display: block;
        }
        .panel-body {
            padding: 15px;

        }
        .panel {
            margin-bottom: 20px;
            border: 1px solid #337ab7;
            border-radius: 4px;
            -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
            box-shadow: 0 1px 1px rgba(0,0,0,.05);
            height: 480px;
        }
        .panel50Pourcent {
            width: 48%;
            display: inline-block;
        }
        .panel100Pourcent {
            width: 97%;
            display: inline-block;
        }
        .tables{
            width: 70%;
            margin-left: 400px;

        }
        .tables tr{
            padding-top: 50px;
            padding-bottom: 50px;

            text-align: center;
            color: black;
        }
        .tables tr td{
            padding: 8px;
        }

        .card{
            margin-bottom: 20px;
            border: 1px solid #40C1C9;
            border-radius: 4px;
            -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
            box-shadow: 0 1px 1px rgba(0,0,0,.05);
        }
        .card-body{  padding: 15px
        }
        .card-left{ margin-left: 300px}
        .header{
            margin-left: 0px;
        }
        .header-milieu{
            margin-left: 50px;
        }
         .my-position
         {
          margin-left: 30px;
             line-height: 200px;
             vertical-align: middle;
         }
    </style>
</head>
<body onload="window.print()">
  @foreach($tab as $item)
     <div class="panel panel50Pourcent">
         <div class="panel-body ">
             <img src="{{ asset('image/Sans.png') }}">
             <br>
                 @foreach($item as $val)
                 <div style=" text-align: center">
                     <td>
                         LOQMAN SCHOOL<br>
                         Parcelle Assainies Unite 5 N° 118
                         <br>
                       AUT 10079MEN/DEP
                         <br>Telephone : 77 550 49 95
                     </td>
                 </div>

             <h4 align="center"><?php echo "FACTURE DU MOIS DE:  ".strtoupper(substr(date('F'),0,3))?></h4>

                 &nbsp; &nbsp; &nbsp; Nom:<strong>{{$val['inscription']->eleve->prenom}}</strong> <br>
                 &nbsp; &nbsp; &nbsp; Prenom:  <strong>{{$val['inscription']->eleve->nom}}</strong><br>
                 &nbsp; &nbsp; &nbsp; Classe: <strong>{{$val['inscription']->classe->nom_classe}}</strong>
                 <br>

                 &nbsp; &nbsp; &nbsp; Montant a payer et Recouvrement
             <br>
             <br>
                 &nbsp; &nbsp; &nbsp;  Reliquat: @if($val['recouvrement'] > 0)    &nbsp; &nbsp; &nbsp;<strong>{{ number_format($val['recouvrement'], 0,'.',' ') }} Fcfa </strong> @else    &nbsp; &nbsp; &nbsp;0 Fcfa @endif
                 <br>

                 &nbsp; &nbsp; &nbsp; Mois : {{ $val['mensuel'] }} {{ $val['mois'] }}
                 <br>

                  <?php
                  $somme =(int) $val['recouvrement'] + (int)$val['inscription']->classe->mensualite;
                  ?>
                 &nbsp; &nbsp; &nbsp; Net à payer : {{ number_format($somme, 0, '.',' ')}}
                 <p style=" font-style: italic;">Les parents doivent s'acquiter des frais de scolarités au plus tard le 05 du mois; Passé cette date les élèves ne seront reçu a l'école qu'après réglement</p>

                 <div style="float: right">
                     Merci de votre confiance
                 </div>
             @endforeach

         </div>
     </div>
  @endforeach

</body>
</html>
