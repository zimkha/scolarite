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
                    <div class="main-card mb-12 card">
                            <div class="card-body">
                                <h5 class="card-title mb-n1">
                                    <div class="mb-n1" data-toggle="collapse" data-target="#priseencharge" aria-expanded="true">
                                    
                                     Filre par Niveau de classe
                                    </div>
                                    <button type="button" data-toggle="collapse" data-target="#priseencharge" class="btn btn-secondary pull-right mt-n3" aria-expanded="true">
                                        <i class="fa fa-chevron-down"></i>
                                    </button>
                                </h5>
                                <div id="priseencharge" class="collapse show" style="">
                                    <div class="form-row mt-12">
                                            <div class="col-md-12">
                                                    <div class="position-relative form-group">
                                                        <select class="form-control">
                                                            <option>Choisir un niveau de classe</option>
                                                          @foreach($niveau as $item)
                                                              <option value="{{ $item->id }}">{{ $item->nom_niveau }}</option>
                                                              @endforeach
                                                        </select>
                                                    </div>
                                                </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <!-- END Filter -->
                <section id="configuration">
                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h4 class="card-title">Liste des classes </h4>
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
                                                <thead>
                                                    <tr role="row" align="center">
                                                        <th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style="width: 235px;">N°</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending" style="width: 354px;">Code Classe</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending" style="width: 188px;">Classe</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style="width: 86px;">Niveau</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending" style="width: 156px;">Inscription</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Salary: activate to sort column ascending" style="width: 157px;">Action</th></tr>
                                                </thead>
                                                <tbody>

                                                @foreach($classes as $item)
                                                <tr align="center">
                                                    <td>{{ $item->id }}</td>
                                                    <td>{{ $item->code_classe }}</td>
                                                    <td>{{ $item->nom_classe }}</td>
                                                    <td>{{ $item->niveau_classe->nom_niveau }}</td>
                                                    <td>{{ $item->somme_inscription }}</td>
                                                    <td>
                                                            <a class="btn btn-icon" href="{{ route('show-classe', ['id' =>$item->id]) }}"><i class="icon-note"></i> </a>
                                                            <a class="btn btn-icon" href="#"><i class="icon-question"></i> </a>
                                                        </td>
                                                </tr>
                                                @endforeach
                                             </tbody>
                                                <tfoot>
                                                    <tr align="center"><th rowspan="1" colspan="1">N°</th>
                                                        <th rowspan="1" colspan="1">Code Classe</th>
                                                        <th rowspan="1" colspan="1">Classe</th>
                                                        <th rowspan="1" colspan="1">Niveau</th>
                                                        <th rowspan="1" colspan="1">Inscription</th>
                                                        <th rowspan="1" colspan="1">Action</th>
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
<script>
  
</script>
</body>
@endsection
