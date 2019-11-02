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

                                        <a class="btn btn-info" href="#" title="recapitulatif eleve"  data-toggle="modal" data-target="#showForme"><i class="icon-magic-wand"></i> </a>

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


                                        <section id="justified-top-border">
                                            <div class="row match-height">
                                                <div class="col-lg-12">
                                                    <div class="card">
                                                        <div class="card-header">
                                                            <h4 class="card-title">Basic Justified Tab</h4>
                                                        </div>
                                                        <div class="card-content">
                                                            <div class="card-body">
                                                                <p>Use <code>.nav-justified</code> class to set tabs justified.</p>
                                                                <ul class="nav nav-tabs nav-justified">
                                                                    <li class="nav-item">
                                                                        <a class="nav-link active" id="active-tab" data-toggle="tab" href="#active" aria-controls="active" aria-expanded="true">Active</a>
                                                                    </li>
                                                                    <li class="nav-item">
                                                                        <a class="nav-link" id="link-tab" data-toggle="tab" href="#link" aria-controls="link" aria-expanded="false">Link</a>
                                                                    </li>
                                                                    <li class="nav-item">
                                                                        <a class="nav-link" id="dropdownOpt2-tab" data-toggle="tab" href="#dropdownOpt2" aria-controls="dropdownOpt2" aria-expanded="false">dropdownOpt2</a>
                                                                    </li>
                                                                </ul>
                                                                <div class="tab-content px-1 pt-1">
                                                                    <div role="tabpanel" class="tab-pane active" id="active" aria-labelledby="active-tab" aria-expanded="true">
                                                                        <p>Macaroon candy canes tootsie roll wafer lemon drops liquorice jelly-o tootsie roll cake. Marzipan liquorice soufflé cotton candy jelly cake jelly-o sugar plum marshmallow. Dessert cotton candy macaroon chocolate sugar plum cake donut.</p>
                                                                    </div>
                                                                    <div class="tab-pane" id="link" role="tabpanel" aria-labelledby="link-tab" aria-expanded="false">
                                                                        <p>Chocolate bar gummies sesame snaps. Liquorice cake sesame snaps cotton candy cake sweet brownie. Cotton candy candy canes brownie. Biscuit pudding sesame snaps pudding pudding sesame snaps biscuit tiramisu.</p>
                                                                    </div>
                                                                    <div class="tab-pane" id="dropdownOpt2" role="tabpanel" aria-labelledby="dropdownOpt2-tab" aria-expanded="false">
                                                                        <p>Soufflé cake gingerbread apple pie sweet roll pudding. Sweet roll dragée topping cotton candy cake jelly beans. Pie lemon drops sweet pastry candy canes chocolate cake bear claw cotton candy wafer.</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

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
                                                            <a class="btn btn-icon" href="{{ route('delete-classe', ['id' =>$item->id]) }}" onclick="confirm('confirmer la suppression')"><i class="icon-question"></i> </a>
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
                                <form class="form-horizontal" method="post"  action="{{ route('save-classe') }}">
                                    <div class="form-group">
                                        <label>Nom classe</label>
                                        <input type="text" required name="nom_classe" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>Inscription</label>
                                        <input type="text" required name="inscription" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>Mensualite</label>
                                        <input type="text" required name="mensualite" class="form-control">
                                    </div>

                                    <div class="form-group">
                                        <label>Niveau classe</label>
                                        <select class="form-control" name="niveau_id">
                                            @foreach($niveau as $item)
                                                <option value="{{ $item->id }}">
                                                    {{ $item->nom_niveau }}
                                                </option>
                                            @endforeach
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
            </div>
        </div>
    </div>
<script>
  
</script>
</body>
@endsection
