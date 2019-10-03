@extends('layouts.app')

@section('content')


    {{ csrf_field() }}
    @include('layouts.partials.nav_bar')
    @include('layouts.partials.menu_bar')
    <body class="vertical-layout vertical-menu 2-columns   menu-expanded fixed-navbar" data-open="click" data-menu="vertical-menu" data-col="2-columns">
    <div class="app-content content">
        <div class="content-wrapper">
            @if (\Illuminate\Support\Facades\Session::has('message'))
                <div class="alert alert-success">{{ Session::get('message') }}</div>
            @endif
            @if (\Illuminate\Support\Facades\Session::has('error'))
                <div class="alert alert-success">{{ Session::get('error') }}</div>
            @endif
            <div class="row">
                <div class="col-12">
                    <button class="btn btn-blue" data-toggle="modal" data-target="#showFormMatiere">Ajouter</button> <br> <br>
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Depenses Durant deux date</h4>
                            <a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>
                        </div>
                        <div class="card-body">
                        <form class="form-horizontal" action="{{ route('depense-date') }}" method="post">
                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                    <label for="date_debut" >Date de debut</label>
                                        <input type="date" name="date_debut" class="form-control">
                                    </div>

                                </div>
                                <div class="col-6 ">
                                    <div class="form-group">
                                        <label for="date_fin" >Date de fin</label>
                                        <input type="date" name="date_fin" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group">
                                        <button type="submit" name="dep-show" value="dep-show" class="btn btn-block btn-blue">valider</button> &nbsp;
                                    </div>
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Liste des Depenses</h4>
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

                                <div id="dashboard" class="dataTables_wrapper container-fluid dt-bootstrap4">

                                    <div class="row">
                                        <div class="col-sm-12"><table class="table table-hover table-bordered comma-decimal-place dataTable" id="DataTables_Table_10" role="grid" aria-describedby="DataTables_Table_10_info">
                                                <thead class="bg-blue white" >
                                                <tr role="row" align="center">
                                                    <th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_10" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style="width: 238px;">Date</th>
                                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_10" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending" style="width: 359px;">Montant</th>
                                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_10" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending" style="width: 184px;">Motif</th>
                                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_10" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style="width: 82px;">User</th>
                                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_10" rowspan="1" colspan="1" aria-label="Salary: activate to sort column ascending" style="width: 153px;">Action</th></tr>
                                                </thead>
                                                <tbody>
                                                  @foreach($depenses as $item)
                                                    <tr align="center">
                                                        <td>{{ date_format($item->created_at, 'm-d-y') }}</td>
                                                        <td>{{ $item->montant }}</td>
                                                        <td>{{ $item->motif }}</td>
                                                        <td>{{ $item->user->name }}</td>
                                                        <td>
                                                            <a  href="" class="btn btn-icon " data-toggle="dropdown"aria-haspopup="true" title="consulter" aria-expanded="false"><i class="icon-action-redo"></i> </a>
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
        </div>


    </div>

    </div>

    <!-- Modal Ajou matiere -->
    <div class="modal animated slideInDown text-left" id="showFormMatiere" tabindex="-1" role="dialog" aria-labelledby="myModalLabel77" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel77">Nouvelle Depense</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" method="post" action="{{ route('save-depense')}}">

                        <div class="form-group">
                            <label for="depense">Montant</label>
                            <input type="number" name="montant" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="depense">Motif de la depense</label>
                            <input type="text" name="motif" class="form-control">
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
    <!-- END -->
    </body>
@endsection
