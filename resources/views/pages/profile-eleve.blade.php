@extends('layouts.app')

@section('content')


    {{ csrf_field() }}

    @include('layouts.partials.nav_bar')
    @include('layouts.partials.menu_bar')
    <body class="vertical-layout vertical-menu 2-columns   menu-expanded fixed-navbar" data-open="click" data-menu="vertical-menu" data-col="2-columns">

    <div class="app-content content">
        <div class="content-wrapper">

    <section id="simple-user-cards" class="row">
          
        <div class="col-12">
            <h4 class="text-uppercase">{{ $eleve->prenom }} {{ $eleve->nom }}</h4>
            <p>{{ $classe->nom_classe }}</p>     <button class="btn btn-bitbucket" data-toggle="modal" data-target="#showUpdateForm">Modfier Eleve</button>
            <br>
            <br>


        </div>

        <div class="col-xl-3 col-md-6 col-12">

            <div class="card">
                <div class="text-center">
                    <div class="card-body">
                        <img  src="{{ asset($chemin) }}" class="rounded-circle  height-150 width-150" alt="Card image">
                    </div>
                    <div class="card-body">
                        <h4 class="card-title">{{ $eleve->matricule }}</h4>
                        <h6 class="card-subtitle text-muted">{{ $eleve->naissance }}</h6>
                    </div>

                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 col-12">
            <div class="card">
                <div class="text-center">

                    <div class="card-body">

                     <table class="table table-striped">
                        <tr>
                            <td>Nom complet</td> <td>Ndiaye Amathe</td>
                        </tr>
                         <tr>
                             <td>Adresse</td> <td>Parcellles</td>
                         </tr>
                         <tr>
                             <td>Contact</td> <td>771897865</td>
                         </tr>
                         <tr>
                             <td>Contact</td> <td>771897865</td>
                         </tr>
                         <tr>
                             <td>Contact</td> <td>771897865</td>
                         </tr>
                     </table>
                    </div>


                </div>
            </div>
        </div>
        <div class="col-xl-6 col-md-6 col-12">
            <div class="card">
                <div class="text-center">
                    <div class="card-body">
                        <img src="{{asset('app-assets/images/portrait/medium/avatar-m-1.png')}}" class="rounded-circle  height-150" alt="Card image">
                    </div>
                    <div class="card-body">
                        <h4 class="card-title">Joseph Ryan</h4>
                        <h6 class="card-subtitle text-muted">Marketing Head</h6>
                    </div>

                </div>
            </div>
        </div>

    </section>
            <div class="row">
                <div class="col-6">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Liste des Paiements de l'eleve</h4>
                            @if (\Illuminate\Support\Facades\Session::has('message'))
                            <div class="alert alert-info">{{ Session::get('message') }}</div>
                        @endif
                        @if (\Illuminate\Support\Facades\Session::has('error'))
                            <div class="alert alert-info">{{ Session::get('error') }}</div>
                        @endif
                            <a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>
                            <div class="heading-elements">
                                <ul class="list-inline mb-0">
                                    <li><a data-action="collapse"><i class="ft-plus"></i></a></li>
                                    <li><a data-action="reload"><i class="ft-rotate-cw"></i></a></li>
                                    <li><a data-action="expand"><i class="ft-maximize"></i></a></li>

                                </ul>
                            </div>
                        </div>
                        <div class="card-content collapse show" style="">
                            <div class="card-body card-dashboard">
                               <button class="btn btn-bitbucket" data-toggle="modal" data-target="#showFormPAiment">Paiement</button>
                            </div>
                            <div class="table-responsive">
                                <table class="table mb-0">
                                    <thead>
                                    <tr>
                                        <th>Mois</th>
                                        <th>Montant</th>
                                        <th>Etat</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        @foreach($paiements as $item)
                                        <tr>
                                        <td>{{ $item->mois->mois}}</td>
                                        <td>{{ $item->montant}} Fcfa</td>
                                        <td>{{ $item->mois->mois}}</td>
    
                                        <td>
                                            <a  href="" class="btn btn-success " data-toggle="dropdown"aria-haspopup="true" aria-expanded="false">voir</a>
                                        </td>

                                    </tr>
                                    @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Liste des Paiements de l'eleve</h4>
                            <a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>
                            <div class="heading-elements">
                                <ul class="list-inline mb-0">
                                    <li><a data-action="collapse"><i class="ft-plus"></i></a></li>
                                    <li><a data-action="reload"><i class="ft-rotate-cw"></i></a></li>
                                    <li><a data-action="expand"><i class="ft-maximize"></i></a></li>

                                </ul>
                            </div>
                        </div>
                        <div class="card-content collapse show" style="">
                            <div class="card-body card-dashboard">
                                <button class="btn btn-bitbucket" data-toggle="modal" data-target="#showFormPAiment">Paiement</button>
                            </div>
                            <div class="table-responsive">
                                <table class="table mb-0">
                                    <thead>
                                    <tr>
                                        <th>Mois</th>
                                        <th>Montant</th>
                                        <th>Etat</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Janvier</td>
                                        <td>250000</td>
                                        <td>Etat</td>
                                        <td>
                                            <a href="" class="btn btn-success" data-toggle="dropdown"aria-haspopup="true" aria-expanded="false">voir</a>
                                        </td>

                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
    <div class="modal animated slideInDown text-left" id="showFormPAiment" tabindex="-1" role="dialog" aria-labelledby="myModalLabel77" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel77">Formualire paiement</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
              <form class="form-horizontal" method="post" action="{{ route('save-paiement')}}">
                <input type="hidden" name="inscription" value="">
                  <input  type="hidden" name="inscription" value="{{ $inscription->id }}">
                  <div class="form-group">
                      <label for="mosi">Mois</label>
                      <select  name="mois" class="form-control">
                          @foreach($mois as $item)
                              <option value="{{$item->id}}">{{ $item->mois }}</option>
                              @endforeach
                      </select>

                  </div>
                  <div class="form-group">
                      <label for="montant">
                          Montant
                      </label>
                    <input type="number" class="form-control" name="montant" required="required" value="{{ $classe->mensualite }}">
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

    <div class="col-lg-4 col-md-6 col-sm-12">

        {{ $image }}
            <div class="modal fade text-left" id="showUpdateForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel17" aria-hidden="true">
                <div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="myModalLabel17">Modifier infos Eleve</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" method="post" action="{{ route('save-update-eleve') }}">
                                <input type="hidden" name="id" value="{{ $eleve->id }}">
                                <div class="row">
                                <div class="form-group col-md-4 mb-2">
                                    <label for="nom">nom</label>
                                    <input type="texte" name="nom" value="{{ $eleve->nom }}" class="form-control">
                                </div>
                                    <div class="form-group col-md-4 mb-2">
                                        <label for="nom">prnom</label>
                                        <input type="texte" name="prenom" value="{{ $eleve->prenom }}" class="form-control">
                                    </div>
                                    <div class="form-group col-md-4 mb-2">
                                        <label for="nom">adresse</label>
                                        <input type="texte" name="adresse" value="{{ $eleve->adresse }}" class="form-control">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-md-3 mb-2">
                                        <label for="nom">date naissance</label>
                                        <input type="date" name="date_naissance" value="{{ $eleve->naissance }}" class="form-control">
                                    </div>
                                    <div class="form-group col-md-3 mb-2">
                                        <label for="nom">nom complet tuteur</label>
                                        <input type="texte" name="nomcomplet" value="{{ $eleve->nomcomplet_tuteur }}" class="form-control">
                                    </div>
                                    <div class="form-group col-md-3 mb-2">
                                        <label for="nom">Adresse Tuteur</label>
                                        <input type="texte" name="adresse_tuteur" value="{{ $eleve->adresse_tuteur }}" class="form-control">
                                    </div>
                                    <div class="form-group col-md-3 mb-2">
                                        <label for="nom">Telephone Contact</label>
                                        <input type="phone" name="telephone" value="{{ $eleve->telephone }}" class="form-control">
                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button type="reset" class="btn grey btn-outline-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit"  name="updateEleve" class="btn btn-outline-primary">Save changes</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

    </div>
    </div>
    </div>
    </body>
    @endsection

