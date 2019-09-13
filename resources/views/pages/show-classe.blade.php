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
            <div class="content-body">
                <h1 style="text-transform: capitalize;">{{ $classe->nom_classe }}</h1> <h6>"{{ $classe->niveau_classe->nom_niveau }}"</h6>
                <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-4">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body text-center">
                                    <div class="card-header mb-2">
                                        <span class="success darken-1">Inscriptions</span>
                                        <h3 class="font-large-2 grey darken-1 text-bold-200">{{ count($inscriptions) }}</h3>
                                    </div>

                                    <div class="card-content">
                                        <!--
                                        <div style="display:inline;width:150px;height:150px;"><canvas width="150" height="150"></canvas><input type="text" value="75" class="knob hide-value responsive angle-offset" data-angleoffset="0" data-thickness=".15" data-linecap="round" data-width="150" data-height="150" data-inputcolor="#e1e1e1" data-readonly="true" data-fgcolor="#37BC9B" data-knob-icon="ft-trending-up" readonly="readonly" style="width: 79px; height: 50px; position: absolute; vertical-align: middle; margin-top: 50px; border: 0px; background: none; font: bold 30px Arial; text-align: center; color: rgb(225, 225, 225); padding: 0px; -webkit-appearance: none; margin-left: -114px;"></div>
                                       -->
                                        <ul class="list-inline clearfix mt-2 mb-0">
                                            <li class="border-right-grey border-right-lighten-2 pr-2">
                                                <h2 class="grey darken-1 text-bold-400">{{$nb_garcon}}</h2>
                                                <span class="success">Garçons</span>
                                            </li>
                                            <li class="pl-2">
                                                <h2 class="grey darken-1 text-bold-400">{{ $nb_fille }}</h2>
                                                <span class="danger">Filles</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body text-center">
                                    <div class="card-header mb-2">
                                        <span class="success darken-1">Evaluations</span>
                                        <h3 class="font-large-2 grey darken-1 text-bold-200">{{ count($inscriptions) }}</h3>
                                    </div>

                                    <div class="card-content">
                                        <!--
                                        <div style="display:inline;width:150px;height:150px;"><canvas width="150" height="150"></canvas><input type="text" value="75" class="knob hide-value responsive angle-offset" data-angleoffset="0" data-thickness=".15" data-linecap="round" data-width="150" data-height="150" data-inputcolor="#e1e1e1" data-readonly="true" data-fgcolor="#37BC9B" data-knob-icon="ft-trending-up" readonly="readonly" style="width: 79px; height: 50px; position: absolute; vertical-align: middle; margin-top: 50px; border: 0px; background: none; font: bold 30px Arial; text-align: center; color: rgb(225, 225, 225); padding: 0px; -webkit-appearance: none; margin-left: -114px;"></div>
                                       -->
                                        <ul class="list-inline clearfix mt-2 mb-0">
                                            <li class="border-right-grey border-right-lighten-2 pr-2">
                                                <h2 class="grey darken-1 text-bold-400">{{$nb_garcon}}</h2>
                                                <span class="success">Attente</span>
                                            </li>
                                            <li class="pl-2">
                                                <h2 class="grey darken-1 text-bold-400">{{ $nb_fille }}</h2>
                                                <span class="danger">Faite</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body text-center">
                                    <div class="card-header mb-2">
                                        <span class="success darken-1">Mensualite</span>
                                        <h3 class="font-large-2 grey darken-1 text-bold-200">{{ count($inscriptions) }}</h3>
                                    </div>

                                    <div class="card-content">
                                        <!--
                                        <div style="display:inline;width:150px;height:150px;"><canvas width="150" height="150"></canvas><input type="text" value="75" class="knob hide-value responsive angle-offset" data-angleoffset="0" data-thickness=".15" data-linecap="round" data-width="150" data-height="150" data-inputcolor="#e1e1e1" data-readonly="true" data-fgcolor="#37BC9B" data-knob-icon="ft-trending-up" readonly="readonly" style="width: 79px; height: 50px; position: absolute; vertical-align: middle; margin-top: 50px; border: 0px; background: none; font: bold 30px Arial; text-align: center; color: rgb(225, 225, 225); padding: 0px; -webkit-appearance: none; margin-left: -114px;"></div>
                                       -->
                                        <ul class="list-inline clearfix mt-2 mb-0">
                                            <li class="border-right-grey border-right-lighten-2 pr-2">
                                                <h2 class="grey darken-1 text-bold-400">{{$nb_garcon}}</h2>
                                                <span class="success">Garçons</span>
                                            </li>
                                            <li class="pl-2">
                                                <h2 class="grey darken-1 text-bold-400">{{ $nb_fille }}</h2>
                                                <span class="danger">Filles</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
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
        
                                            <div id="DataTables_Table_10_wrapper" class="dataTables_wrapper container-fluid dt-bootstrap4"><div class="row"><div class="col-sm-12 col-md-6"><div class="dataTables_length" id="DataTables_Table_10_length">
                                                            <label>Show <select name="DataTables_Table_10_length" aria-controls="DataTables_Table_10" class="form-control form-control-sm"><option value="10">10</option>
                                                                    <option value="25">25</option><option value="50">50</option><option value="100">100</option>
                                                                </select> entries</label></div></div><div class="col-sm-12 col-md-6">
                                                        <div id="DataTables_Table_10_filter" class="dataTables_filter"><label>Search:<input type="search" class="form-control form-control-sm" placeholder="" aria-controls="DataTables_Table_10"></label>
                                                        </div></div></div><div class="row"><div class="col-sm-12"><table class="table table-striped table-bordered comma-decimal-place dataTable" id="DataTables_Table_10" role="grid" aria-describedby="DataTables_Table_10_info">
                                                            <thead>
                                                            <tr role="row">
                                                                <th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_10" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style="width: 238px;">Matricule</th>
                                                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_10" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending" style="width: 359px;">Nom</th>
                                                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_10" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending" style="width: 184px;">Prenom</th>
                                                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_10" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style="width: 82px;">Date naissance</th>
                                                        
                                                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_10" rowspan="1" colspan="1" aria-label="Salary: activate to sort column ascending" style="width: 153px;">Action</th></tr>
                                                            </thead>
                                                            <tbody>
                                                                 @foreach($inscriptions as $item)
                                                                 <tr align="center">
                                                                 <td>{{$item->eleve->matricule}}</td>
                                                                 <td>{{ $item->eleve->nom}}</td>
                                                                 <td>{{$item->eleve->prenom}}</td>
                                                                 <td>{{$item->eleve->naissance}}</td>
                                                                 <td>
                                                                        <a class="btn btn-icon" href="{{ route('voir-eleve', ['id' => $item->eleve->id])}}"><i class="icon-note"></i> </a>
                                                                        <a class="btn btn-icon"><i class="icon-question"></i> </a>
                                                                    </td>
                                                                 </tr>  
                                                                 @endforeach                                               
                                                                </tbody>
        
                                                        </table></div></div><div class="row">
                                                    <div class="col-sm-12 col-md-5"><div class="dataTables_info" id="DataTables_Table_10_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div>
                                                    </div><div class="col-sm-12 col-md-7"><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_10_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="DataTables_Table_10_previous"><a href="#" aria-controls="DataTables_Table_10" data-dt-idx="0" tabindex="0" class="page-link">Previous</a>
                                                                </li><li class="paginate_button page-item active"><a href="#" aria-controls="DataTables_Table_10" data-dt-idx="1" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_10" data-dt-idx="2" tabindex="0" class="page-link">2</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_10" data-dt-idx="3" tabindex="0" class="page-link">3</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_10" data-dt-idx="4" tabindex="0" class="page-link">4</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_10" data-dt-idx="5" tabindex="0" class="page-link">5</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_10" data-dt-idx="6" tabindex="0" class="page-link">6</a></li><li class="paginate_button page-item next" id="DataTables_Table_10_next"><a href="#" aria-controls="DataTables_Table_10" data-dt-idx="7" tabindex="0" class="page-link">Next</a></li></ul></div></div></div></div>
                                        </div>
                                    </div>
        
                                </div>
                            </div>
                        </div>
                    </section>
            </div>
            </div>
        </div>
    </body>
@endsection
