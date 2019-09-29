@extends('layouts.app')

@section('content')


    {{ csrf_field() }}

    @include('layouts.partials.nav_bar')
    @include('layouts.partials.menu_bar')
    <body class="vertical-layout vertical-menu 2-columns   menu-expanded fixed-navbar" data-open="click" data-menu="vertical-menu" data-col="2-columns">

    <div class="app-content content">
        <div class="content-wrapper">
                <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-content">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-xl-3 col-lg-6 col-md-12 border-right-grey border-right-lighten-3 clearfix">
                                                <div class="float-left pl-2">
                                                    <span class="grey darken-1 block">Age</span>
                                                    <span class="font-large-3 line-height-1 text-bold-300">{{ $age }}</span>
                                                </div>
                                                <div class="float-left mt-2">
                                                    <span class="grey darken-1 block">Years</span>
                                                </div>
                                            </div>
                                            <div class="col-xl-3 col-lg-6 col-md-12 border-right-grey border-right-lighten-3 clearfix">
                                                <div class="float-left pl-2">
                                                   <span class="grey darken-1 block"> Genre</span>
                                                    @if($eleve->genre == 1)
                                                        <span class="font-large-3 line-height-1 text-bold-300">Masulin</span>
                                                    @else
                                                        <span class="font-large-3 line-height-1 text-bold-300">Feminin</span>
                                                    @endif
                                                </div>

                                            </div>
                                            <div class="col-xl-3 col-lg-6 col-md-12 border-right-grey border-right-lighten-3 clearfix">
                                                <div class="float-left pl-2">
                                                    <span class="grey darken-1 block">Mensualite</span>
                                                    <span class="font-large-3 line-height-1 text-bold-300">{{ $etat }}</span>
                                                </div>
                                                <div class="float-left mt-2">
                                                    <span class="grey darken-1 block"></span>
                                                    <span class="block"><i class="ft-arrow-down deep-orange accent-3"></i></span>
                                                </div>
                                            </div>
                                            <div class="col-xl-3 col-lg-6 col-md-12 clearfix">
                                                <div class="float-left pl-2">
                                                    <span class="grey darken-1 block">Type Eleve</span>
                                                    <span class="font-large-3 line-height-1 text-bold-300">moyen</span>
                                                </div>
                                                <div class="float-left mt-2">
                                                    <span class="grey darken-1 block"></span>
                                                    <span class="block"><i class="ft-arrow-up success"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


    <section id="simple-user-cards" class="row">
          
        <div class="col-12">
            <h4 class="text-uppercase">{{ $eleve->prenom }} {{ $eleve->nom }}</h4>
            <p>{{ $classe->nom_classe }}</p>     <button class="btn btn-blue" data-toggle="modal" data-target="#showUpdateForm">Modfier Eleve</button>
            <a class="btn btn-icon" href="#" title="certificat d'inscription"><i class="icon-graduation"></i></a>
            <a class="btn btn-icon" href="#" title="recapitulatif eleve"  data-toggle="modal" data-target="#showRecap"><i class="icon-magic-wand"></i> </a>

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
                        <td>Nom complet</td> <td>{{ $eleve->nomcomplet_tuteur }}</td>
                        </tr>
                         <tr>
                             <td>Adresse</td> <td>{{ $eleve->adresse_tuteur }}</td>
                         </tr>
                         <tr>
                             <td>Contact</td> <td>{{ $eleve->telephone }}</td>
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
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Liste des Paiements de l'eleve</h4>
                            @if (\Illuminate\Support\Facades\Session::has('message'))
                            <div class="alert alert-blue">{{ Session::get('message') }}</div>
                        @endif
                        @if (\Illuminate\Support\Facades\Session::has('error'))
                            <div class="alert alert-blue">{{ Session::get('error') }}</div>
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
                               <button class="btn btn-blue" data-toggle="modal" data-target="#showFormPAiment">Paiement</button>
                               <button class="btn btn-blue" data-toggle="modal" data-target="#showPaiemenGroup">Paiement Groupe</button>


                            </div>
                            <div class="table-responsive">
                                <table class="table mb-0">
                                    <thead>
                                    <tr>
                                        <th>Mois</th>
                                        <th>Montant</th>
                                        <th>Date paiement</th>
                                        <th>Etat</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        @foreach($paiements as $item)
                                        <tr>
                                        <td>{{ $item->mois->mois}}</td>
                                        <td>{{ $item->montant}} Fcfa</td>
                                            <td>{{ date_format($item->created_at, 'd-m-y') }}</td>
                                            <?php
                                            if ($item->montant == $classe->mensualite)
                                            {
                                            ?>
                                            <td><div class="badge badge-success">Complet</div></td>
                                            <?php
                                            }
                                            ?>
                                            <?php
                                            if ($item->montant < $classe->mensualite)
                                            {
                                            ?>
                                            <td><div class="badge badge-danger">Incomplet</div></td>
                                            <?php
                                            }
                                            ?>
    
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
    <div class="modal animated slideInDown text-left" id="showFormPAiment" tabindex="-1" role="dialog" aria-labelledby="myModalLabel77" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel77">Formualaire paiement</h4>
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
    <div class="modal animated slideInDown text-left" id="showPaiemenGroup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel77" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel77">Formualaire paiement</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" method="post" action="{{ route('savePaiementDispatch')}}">
                        <input type="hidden" name="inscription" value="">
                        <input  type="hidden" name="inscription_id" value="{{ $inscription->id }}">
                        <div class="form-group">
                            <label for="montant">
                                Montant
                            </label>
                            <input type="number" class="form-control" name="somme_entre" placeholder="entreb la somme" required="required">
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
                                    <button type="submit"  name="updateEleve" class="btn btn-success">Enregistre</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        <div class="modal fade text-left" id="showRecap" tabindex="-1" role="dialog" aria-labelledby="myModalLabel17" aria-hidden="true">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel17">Recapitulatif Eleve</h4> <a class="btn btn-icon" href="#" title="imprimer"><i class="icon-printer"></i></a>

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-6">
                                <div class="card">
                                    <div class="card-header">
                                        <h4 class="card-title"> Paiements</h4>
                                        <a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>

                                    </div>
                                    <div class="card-content collapse show" style="">

                                        <div class="table-responsive">
                                            <table class="table mb-0 table-bordered table-hover">
                                                <thead>
                                                <tr align="center">
                                                    <th>Mois</th>
                                                    <th>Montant</th>
                                                    <th>Etat</th>

                                                </tr>
                                                </thead>
                                                <tbody>
                                                @foreach($paiements as $item)
                                                    <tr align="center">
                                                        <td>{{ $item->mois->mois}}</td>
                                                        <td>{{ $item->montant}} Fcfa</td>
                                                        <?php
                                                        if ($item->montant == $classe->mensualite)
                                                            {
                                                            ?>
                                                        <td><div class="badge badge-success">Complet</div></td>
                                                        <?php
                                                        }
                                                        ?>
                                                        <?php
                                                        if ($item->montant < $classe->mensualite)
                                                        {
                                                        ?>
                                                        <td><div class="badge badge-danger">Incomplet</div></td>
                                                        <?php
                                                        }
                                                        ?>

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
    </div>
    </body>
    @endsection

