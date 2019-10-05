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
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Liste des Depenses Entre Le <strong>{{ $date_dep }}</strong>   Et Le  <strong>{{ $date_f}}</strong> Et au montant de {{ number_format($somme_depense, 0, '.', ' ') }} Fcfa</h4>
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
                                                                                                   </thead>
                                                <tbody>
                                                @foreach($depense as $item)
                                                    <tr align="center">
                                                        <td>{{ date_format($item->created_at, 'm-d-y') }}</td>
                                                        <td>{{ number_format($item->montant,0,'.', ' ') }}</td>
                                                        <td>{{ $item->motif }}</td>
                                                        <td>{{ $item->user->name }}</td>

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




    </body>
@endsection
