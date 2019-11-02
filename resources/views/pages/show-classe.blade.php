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
                <a class="btn btn-info" href="#" title="recapitulatif eleve"  data-toggle="modal" data-target="#showForme"><i class="icon-magic-wand"></i> </a>
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
                                            <div class="btn-group" role="group" aria-label="Basic example">
                                                <a class="btn btn-blue white">Details<i class="ft-shopping-cart"></i></a>
                                            </div>
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
                                            <div class="btn-group" role="group" aria-label="Basic example">
                                                <a class="btn btn-blue white">Evaluations <i class="ft-edit"></i></a>
                                            </div>
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
                                        <h3 class="font-large-2 grey darken-1 text-bold-200">{{ $pourcentage }} %</h3>
                                    </div>

                                    <div class="card-content">
                                        <!--
                                        <div style="display:inline;width:150px;height:150px;"><canvas width="150" height="150"></canvas><input type="text" value="75" class="knob hide-value responsive angle-offset" data-angleoffset="0" data-thickness=".15" data-linecap="round" data-width="150" data-height="150" data-inputcolor="#e1e1e1" data-readonly="true" data-fgcolor="#37BC9B" data-knob-icon="ft-trending-up" readonly="readonly" style="width: 79px; height: 50px; position: absolute; vertical-align: middle; margin-top: 50px; border: 0px; background: none; font: bold 30px Arial; text-align: center; color: rgb(225, 225, 225); padding: 0px; -webkit-appearance: none; margin-left: -114px;"></div>
                                       -->
                                        <ul class="list-inline clearfix mt-2 mb-0">
                                            <div class="btn-group" role="group" aria-label="Basic example">
                                                <a class="btn btn-blue white" href="{{ route('facture-classe', ['id' => $classe->id]) }}">facture mensuel <i class="ft-check-square"></i></a>
                                            </div>
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
        
                                            <div id="DataTables_Table_10_wrapper" class="dataTables_wrapper container-fluid dt-bootstrap4">
                                               <div class="col-sm-12"><table class="table table-striped table-bordered comma-decimal-place dataTable" id="DataTables_Table_10" role="grid" aria-describedby="DataTables_Table_10_info">
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
        
                                                        </table></div></div>
                                                     </div>
                                    </div>
        
                                </div>
                            </div>
                        </div>
                    </section>
            </div>
            </div>
        </div>
        <div class="modal fade text-left" id="showForme" tabindex="-1" role="dialog" aria-labelledby="myModalLabel17" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel17">Nouvelle Classe</h4> <a class="btn btn-icon" href="#" title="imprimer"><i class="icon-printer"></i></a>

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" method="post"  action="{{ route('save-classe') }}">        <div class="modal fade text-left" id="showForme" tabindex="-1" role="dialog" aria-labelledby="myModalLabel17" aria-hidden="true">

                        <input type="hidden" value="{{ $classe->id}}">
                            <div class="form-group">
                                <label>Nom classe</label>
                            <input type="text" required name="nom_classe" class="form-control" value="{{ $classe->nom_classe }}">
                            </div>
                            <div class="form-group">
                                <label>Inscription</label>
                                <input type="text" required name="inscription" class="form-control" value="{{ $classe->nom_classe }}" >
                            </div>
                            <div class="form-group">
                                <label>Mensualite</label>
                                <input type="text" required name="mensualite" class="form-control" value="{{ $classe->nom_classe }}">
                            </div>

                            <div class="form-group">
                                <label>Niveau classe</label>
                                <select class="form-control" name="niveau_id">
                                <option value="{{ $classe->niveau_classe->id }}">
                                {{ $classe->niveau_classe->nom_niveau }}
                                </option>
                                </select>
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
