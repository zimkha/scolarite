@extends('layouts.app')

@section('content')


{{ csrf_field() }}
@include('layouts.partials.nav_bar')
@include('layouts.partials.menu_bar')
<body class="vertical-layout vertical-menu 2-columns   menu-expanded fixed-navbar" data-open="click" data-menu="vertical-menu" data-col="2-columns">
<div class="app-content content">
    <div class="content-wrapper">
            <h4 class="card-title">Liste des Paiements de l'eleve</h4>
            @if (\Illuminate\Support\Facades\Session::has('message'))
            <div class="alert alert-info">{{ Session::get('message') }}</div>
        @endif
        @if (\Illuminate\Support\Facades\Session::has('error'))
            <div class="alert alert-info">{{ Session::get('error') }}</div>
        @endif
      <div class="row">
          <div class="col-12">
                <button class="btn btn-blue" data-toggle="modal" data-target="#showFormMatiere">Ajouter</button> <br> <br>
              <div class="card">
                    <div class="card-header">
                            <h4 class="card-title">Liste des Matieres Colleges</h4> 
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
                                <div class="table-responsive">
                                        <table class="table table-hover">
                                            <thead class="bg-blue white" align="center">
                                                <tr>
                                                    <th>code</th>
                                                    <th>libelle</th>
                                                    
                                                    <th>actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                               @foreach($matieres as $item)
                                               <tr align="center">
                                               <td>{{ $item->slug}}</td>
                                               <td>{{ $item->nom_matiere}}</td>
                                               <td>
                                                    <a class="btn btn-icon" href="#"><i class="icon-note"></i> </a>
                                                    <a class="btn btn-icon" href="#"><i class="icon-question"></i> </a>
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

<!-- Modal Ajou matiere -->
<div class="modal animated slideInDown text-left" id="showFormMatiere" tabindex="-1" role="dialog" aria-labelledby="myModalLabel77" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel77">Nouvelle Matière</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
              <form class="form-horizontal" method="post" action="{{ route('matiere-save')}}">
            
                  <div class="form-group">
                      <label for="mosi">Matiere</label>
                      <input type="text" name="matiere" class="form-control">
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
