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
        }
        .panel50Pourcent {
            width: 38%;
            display: inline-block;
        }
        .panel30Pourcent {
            width: 35%;
            display: inline-block;
            border: 1px solid #40C1C9;
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

    </style>
</head>
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
        border-color: #40C1C9;
    }
    .panel-primary>.panel-heading {
        color: #fff;
        background-color: #40C1C9;
        border-color: #40C1C9;
    }
    .panel-danger {
        border-color: #40C1C9;
    }
    .panel-danger>.panel-heading {
        color: #fff;
        background-color: #40C1C9;
        border-color: #40C1C9;
    }
    .panel-group .panel-heading {
        border-bottom: 0;
    }
    .panel-heading {
        padding: 5px 10px;
        border-bottom: 1px solid transparent;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }
    *,* :before, *:after {
        box-sizing: inherit;
    }
    div {
        display: block;
    }
    .panel-body {
        padding: 15px;
    }
    .panel {
        margin-bottom: 10px;
        border: 1px solid #40C1C9;
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
        box-shadow: 0 1px 1px rgba(0,0,0,.05);
    }
    .panel50Pourcent {
        width: 48%;
        display: inline-block;
    }
    .panel30Pourcent {
        width: 38%;
        display: inline-block;
        border: 1px solid #40C1C9;
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
    .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col,
    .col-auto, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm,
    .col-sm-auto, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md,
    .col-md-auto, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg,
    .col-lg-auto, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl,
    .col-xl-auto {
        position: relative;
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
    }

    .col {
        flex-basis: 0;
        flex-grow: 1;
        max-width: 100%;
    }

    .col-auto {
        flex: 0 0 auto;
        width: auto;
        max-width: 100%;
    }

    .col-1 {
        flex: 0 0 8.33333%;
        max-width: 8.33333%;
    }

    .col-2 {
        flex: 0 0 16.66667%;
        max-width: 16.66667%;
    }

    .col-3 {
        flex: 0 0 25%;
        max-width: 25%;
    }

    .col-4 {
        flex: 0 0 33.33333%;
        max-width: 33.33333%;
    }

    .col-5 {
        flex: 0 0 41.66667%;
        max-width: 41.66667%;
    }

    .col-6 {
        flex: 0 0 50%;
        max-width: 50%;
    }

    .col-7 {
        flex: 0 0 58.33333%;
        max-width: 58.33333%;
    }

    .col-8 {
        flex: 0 0 66.66667%;
        max-width: 66.66667%;
    }

    .col-9 {
        flex: 0 0 75%;
        max-width: 75%;
    }

    .col-10 {
        flex: 0 0 83.33333%;
        max-width: 83.33333%;
    }

    .col-11 {
        flex: 0 0 91.66667%;
        max-width: 91.66667%;
    }

    .col-12 {
        flex: 0 0 100%;
        max-width: 100%;
    }
    .align-self-center {
        align-self: center !important;
    }
    #myRow{
        position: relative;

    }
    td,
    th {
        border: 1px solid rgb(190, 190, 190);
        padding: 10px;
    }

    td {
        text-align: center;
    }

    tr:nth-child(even) {

    }

    th[scope="col"] {
        background-color: #696969;
        color: #fff;
    }

    th[scope="row"] {
        background-color: #d7d9f2;
    }

    caption {
        padding: 10px;
        caption-side: bottom;
    }

    table {
        border-collapse: collapse;
        border: 1px solid rgb(200, 200, 200);
        letter-spacing: 1px;
        font-family: sans-serif;
        font-size: .8rem;
    }
    .droite
    {
        float: right;
    }
    .client
    {
        float: left;
    }


</style>
<body >
<div class="my-image header">
   <!-- <img src="" width="100%" height="100%">-->
</div>
<div class="header">
    <h5>Adresse: Adresse de la pharmacie</h5>
    <h5>Tel: 00 000 00 00 / emaile pharmacie@gmail.com</h5>
    Dakar le {{ date('d-m-y') }}

    <br>

    <div class="panel100Pourcent panel-primary">
        <div class="panel-heading" align="center">
            Operations des  Paiements {{ date('Y-m-d') }}
        </div>

    </div>
    <br>
    <br>

    <div class="row">
        <div class="panel100Pourcent">
            <table class="table table-striped" align="center" width="100%">
                <thead align="center">
                <th>date</th>
                <th>operateur</th>
                <th>montant</th>
                </th>
                </thead>
                <tbody>
               @foreach($paiement as $item)
                   <tr align="center">
              <td>{{ $item->created_at }}</td>
              <td>{{  $item->user->name}}</td>
              <td>{{ $item->montant }}</td>
                   </tr>
                   @endforeach
                </tbody>
            </table>
           <div class="panel50Pourcent" style="float: right">
               <table class="table ">
                   <tr>
                       <td>Total</td>
                       <td>{{ number_format($somme_paiement,0,'.',' ') }}</td>
                   </tr>
               </table>
           </div>
            <br>
            <br>
            <br>
            <br>
            <div class="panel-heading" align="center">
                Operations  Inscriptions{{ date('Y-m-d') }}
            </div>
            <table  class="table table-striped" align="center" width="100%">

                <thead align="center">
                <th>date</th>
                <th>operateur</th>
                <th>montant</th>
                </th>
                </thead>
            </table>
        </div>
    </div>
</div>

</body>
</html>
