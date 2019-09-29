@extends('layouts.app')

@section('content')


    {{ csrf_field() }}

    @include('layouts.partials.nav_bar')
    @include('layouts.partials.menu_bar')
    <body class="vertical-layout vertical-menu 2-columns   menu-expanded fixed-navbar" data-open="click" data-menu="vertical-menu" data-col="2-columns">
    <div class="app-content content">
        <div class="content-wrapper">
            <div class="content-header row">
                <div class="col-12">
                    <section id="configuration">
                        <div class="row">
                            <div class="col-12">
                                <button class="btn btn-blue" data-toggle="modal" data-target="#showFormProf">Ajouter</button> <br> <br>
                                <div class="card">
                                    <div class="card-header">
                                        <h4 class="card-title">Liste des Professeur College </h4>
                                        <br>
                                        @if (\Illuminate\Support\Facades\Session::has('message'))
                                            <div class="alert alert-info">{{ Session::get('message') }}</div>
                                        @endif
                                        @if (\Illuminate\Support\Facades\Session::has('error'))
                                            <div class="alert alert-info">{{ Session::get('error') }}</div>
                                        @endif
                                        <a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>
                                        <div class="heading-elements">
                                            <ul class="list-inline mb-0">
                                                <li><a data-action="collapse"><i class="ft-minus"></i></a></li>
                                                <li><a data-action="reload"><i class="ft-rotate-cw"></i></a></li>
                                                <li><a data-action="expand"><i class="ft-maximize"></i></a></li>
                                                <li><a data-action="close"><i class="ft-x"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="card-content collapse show">
                                        <div class="card-body card-dashboard">

                                            <div id="DataTableClasse" class="dataTables_wrapper container-fluid dt-bootstrap4">

                                                <div class="row"><div class="col-sm-12">
                                                        <table class="table table-striped table-bordered zero-configuration dataTable" id="dataInscription" role="grid" aria-describedby="dataInscription">
                                                            <thead class="bg-blue white" >
                                                            <tr role="row" align="center">
                                                                <th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style="width: 235px;">N°</th>
                                                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending" style="width: 354px;">Matrucule</th>
                                                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending" style="width: 188px;">Nom</th>
                                                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style="width: 86px;">Prenom</th>
                                                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending" style="width: 156px;">Adresse</th>
                                                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending" style="width: 156px;">Email</th>
                                                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Salary: activate to sort column ascending" style="width: 157px;">Telephone</th>
                                                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Salary: activate to sort column ascending" style="width: 157px;">Action</th></tr>
                                                            </thead>
                                                            <tbody>

                                                            @foreach($professeurs as $item)
                                                                <tr align="center">
                                                                    <td>{{ $item->id }}</td>
                                                                    <td>{{ $item->matricule }}</td>
                                                                    <td>{{ $item->nom }}</td>
                                                                    <td>{{ $item->prenom}}</td>
                                                                    <td>{{ $item->adresse }}</td>
                                                                    <td>{{ $item->email }}</td>
                                                                    <td>{{ $item->telephone }}</td>

                                                                    <td>
                                                                        <a class="btn btn-icon" href="{{ route('show-prof', ['id' => $item->id]) }}"><i class="icon-note"></i> </a>
                                                                        <a class="btn btn-icon" href="#"><i class="icon-question"></i> </a>
                                                                    </td>
                                                                </tr>
                                                            @endforeach
                                                            </tbody>
                                                            <tfoot>
                                                            <tr align="center"><th rowspan="1" colspan="1">N°</th>
                                                                <th rowspan="1" colspan="1">Matricule</th>
                                                                <th rowspan="1" colspan="1">Nom</th>
                                                                <th rowspan="1" colspan="1">Prenom</th>
                                                                <th rowspan="1" colspan="1">Adresse</th>
                                                                <th rowspan="1" colspan="1">Email</th>
                                                                <th rowspan="1" colspan="1">Telephon</th>
                                                                <th rowspan="1" colspan="1">Telephon</th>
                                                            </tfoot>
                                                        </table></div></div><div class="row"><div class="col-sm-12 col-md-5">
                                                    </div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
    <!-- -->

    <div class="modal fade text-left" id="showFormProf" tabindex="-1" role="dialog" aria-labelledby="myModalLabel77" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel77">Nouveau Professeur</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h4 class="form-section animated fadeInDown mb-3 border-bottom border-alternate">
                        <i class=" icon-user-following "></i>
                        Informations Personnelle
                    </h4>
                    <form class="form-horizontal" method="post" action="{{ route('save-prof')}}">

                       <div class="row">
                           <div class="col-6">
                               <div class="form-group">
                                   <label for="mosi">Nom</label>
                                   <input type="text" name="nom" class="form-control">
                               </div>
                           </div>
                           <div class="col-6">
                               <div class="form-group">
                                   <label for="mosi">Prenom</label>
                                   <input type="text" name="prenom" class="form-control">
                               </div>
                           </div>
                       </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="mosi">Email</label>
                                    <input type="text" name="email" class="form-control">
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="mosi">Telephone</label>
                                    <input type="text" name="telephone" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="adreese">
                                        Adresse
                                    </label>
                                    <textarea rows="2"  name="adresse" class="form-control"></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="reset" class="btn grey btn-outline-secondary" data-dismiss="modal">Annuler</button>
                            <button type="submit" class="btn btn-outline-success">Enregistre</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
    </body>
    @endsection
