@extends('layouts.app')

@section('content')


{{ csrf_field() }}

@include('layouts.partials.nav_bar')
@include('layouts.partials.menu_bar')


 <body class="vertical-layout vertical-menu 2-columns   menu-expanded fixed-navbar" data-open="click" data-menu="vertical-menu" data-col="2-columns">

    <div class="app-content content">
        <div class="content-wrapper">
            <div class="content-header row">
            </div>
            <div class="content-body"><!-- CRM stats -->
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-3 col-sm-12 border-right-blue-grey border-right-lighten-5">
                                            <div class="pb-1">
                                                <div class="clearfix mb-1">
                                                    <i class="icon-star font-large-1 blue-grey float-left mt-1"></i>
                                                    <span class="font-large-2 text-bold-300 info float-right">{{ number_format($somme,0,'.',' ')}} </span>
                                                </div>
                                                <div class="clearfix">
                                                    <span class="text-muted">Inscriptions</span>
                                                    <span class="info float-right"><i class="ft-arrow-up info"></i> 16.89%</span>
                                                </div>
                                            </div>
                                            <div class="progress mb-0" style="height: 7px;">
                                                <div class="progress-bar bg-info" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-sm-12 border-right-blue-grey border-right-lighten-5">
                                            <div class="pb-1">
                                                <div class="clearfix mb-1">
                                                    <i class="icon-user font-large-1 blue-grey float-left mt-1"></i>
                                                <span class="font-large-2 text-bold-300 danger float-right">{{ number_format($somme_mensualite,0,'.',' ')}}</span>
                                                </div>
                                                <div class="clearfix">
                                                    <span class="text-muted">Mensualite</span>
                                                    <span class="danger float-right"><i class="ft-arrow-up danger"></i> 5.14%</span>
                                                </div>
                                            </div>
                                            <div class="progress mb-0" style="height: 7px;">
                                                <div class="progress-bar bg-danger" role="progressbar" style="width: 100%" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-sm-12 border-right-blue-grey border-right-lighten-5">
                                            <div class="pb-1">
                                                <div class="clearfix mb-1">
                                                    <i class="icon-shuffle font-large-1 blue-grey float-left mt-1"></i>
                                                    <span class="font-large-2 text-bold-300 success float-right">61%</span>
                                                </div>
                                                <div class="clearfix">
                                                    <span class="text-muted">Depenses</span>
                                                    <span class="success float-right"><i class="ft-arrow-down success"></i> 2.24%</span>
                                                </div>
                                            </div>
                                            <div class="progress mb-0" style="height: 7px;">
                                                <div class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-sm-12">
                                            <div class="pb-1">
                                                <div class="clearfix mb-1">
                                                    <i class="icon-wallet font-large-1 blue-grey float-left mt-1"></i>
                                                    <span class="font-large-2 text-bold-300 warning float-right">$6,87M</span>
                                                </div>
                                                <div class="clearfix">
                                                    <span class="text-muted">Autres</span>
                                                    <span class="warning float-right"><i class="ft-arrow-up warning"></i> 43.84%</span>
                                                </div>
                                            </div>
                                            <div class="progress mb-0" style="height: 7px;">
                                                <div class="progress-bar bg-warning" role="progressbar" style="width: 100%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-12">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body text-center">
                                    <div class="card-header mb-2">
                                        <span class="success darken-1">Inscriptions</span>
                                        <h3 class="font-large-2 grey darken-1 text-bold-200">{{ count($inscriptions) }}</h3>
                                    </div>

                                    <div class="card-content">
                                        <input type="text" value="75" class="knob hide-value responsive angle-offset" data-angleOffset="0" data-thickness=".15" data-linecap="round" data-width="150" data-height="150" data-inputColor="#e1e1e1" data-readOnly="true" data-fgColor="#37BC9B" data-knob-icon="ft-trending-up">
                                        <ul class="list-inline clearfix mt-2 mb-0">
                                            <li class="border-right-grey border-right-lighten-2 pr-2">
                                                <h2 class="grey darken-1 text-bold-400">{{ $garcon }}</h2>
                                                <span class="success">Garçons</span>
                                            </li>
                                            <li class="pl-2">
                                                <h2 class="grey darken-1 text-bold-400">{{ $filles }}</h2>
                                                <span class="danger">Filles</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-12 col-md-12">
                       @foreach($niveaus as $item)
                            <div class="card">
                                <div class="card-content">
                                    <div class="card-body">
                                        <div class="media">
                                            <div class="media-body text-left">
                                                <h3 class="success">{{ $item->nom_niveau }}</h3>
                                                <span>classes: </span>
                                            </div>
                                            <div class="media-right media-middle">
                                                <i class=" success font-large-2 float-right"> {{ count($item->classes) }}</i>
                                            </div>
                                        </div>
                                        <div class="progress mt-1 mb-0" style="height: 7px;">
                                            <div class="progress-bar bg-success" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach

                    </div>
                </div>
            </div>

            <section id="html">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h2 class="card-title text-bold-700">Liste des eleves inscrits</h2>
                                <a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>
                                <div class="heading-elements">
                                    <ul class="list-inline mb-0">
                                        <li><a data-action="collapse"><i class="ft-minus"></i></a></li>
                                        <li><a data-action="close"><i class="ft-x"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="card-content collapse show">
                                <div class="card-body card-dashboard">

                                    <div id="dashboard" class="dataTables_wrapper container-fluid dt-bootstrap4">
                                       
                                                <div class="row">
                                                    <div class="col-sm-12"><table class="table table-hover table-bordered comma-decimal-place dataTable" id="DataTables_Table_10" role="grid" aria-describedby="DataTables_Table_10_info">
                                                    <thead>
                                                    <tr role="row">
                                                        <th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_10" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style="width: 238px;">Matricule</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_10" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending" style="width: 359px;">Nom</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_10" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending" style="width: 184px;">Prenom</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_10" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style="width: 82px;">Date naissance</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_10" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending" style="width: 160px;">classe</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_10" rowspan="1" colspan="1" aria-label="Salary: activate to sort column ascending" style="width: 153px;">Action</th></tr>
                                                    </thead>
                                                    <tbody>
                                                    @foreach($inscriptions as $item)
                                                        <tr align="center">
                                                            <td>{{ $item->eleve->matricule }}</td>
                                                            <td>{{ $item->eleve->nom }}</td>
                                                            <td>{{ $item->eleve->prenom }}</td>
                                                            <td>{{ $item->eleve->naissance }}</td>
                                                            <td>{{ $item->classe->nom_classe}}</td>
                                                            <td>
                                                                <a class="btn btn-icon" href="{{ route('voir-eleve', ['id' =>$item->id]) }}"><i class="icon-note"></i> </a>
                                                                <a class="btn btn-icon"><i class="icon-question"></i> </a>
                                                            </td>

                                                        </tr>
                                                    @endforeach
                                                    </tbody>

                                                </table>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </div>


    </div>
</body>
<footer class="footer fixed-bottom  navbar-border">
    <p class="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2 text-center">
        <span class="float-md-left d-block d-md-inline-block">Copyright © 2019 <a class="text-bold-800 grey darken-2" href="" target="_blank">SCOLARITE</a>,
            Tous droits réservés.
        </span>
    </p>
</footer>

@endsection
