@extends('layouts.app')

@section('content')


{{ csrf_field() }}

@include('layouts.partials.nav_bar')
@include('layouts.partials.menu_bar')
<body class="vertical-layout vertical-menu 2-columns   menu-expanded fixed-navbar" data-open="click" data-menu="vertical-menu" data-col="2-columns">
<div class="app-content content">
    <div class="content-wrapper">
        <div class="content-header row">
            <div class="content-header-left col-md-8 col-12 mb-2 breadcrumb-new">
                <h3 class="content-header-title mb-0 d-inline-block">Formulaire d'inscription</h3>
                @if (\Illuminate\Support\Facades\Session::has('message'))
                    <div class="alert alert-info">{{ Session::get('message') }}</div>
                @endif
                @if (\Illuminate\Support\Facades\Session::has('error'))
                    <div class="alert alert-info">{{ Session::get('error') }}</div>
                @endif
            </div>
        </div>
        <div class="content-body"><!-- Form actions layout section start -->
            <section id="form-action-layouts">
                <div class="match-height">
                    <div class="">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title" id="from-actions-top-left">Informations Elève</h4>
                            </div>
                            <div class="card-content collpase show">
                                <div class="card-body">
                                    <form class="form" action="{{ route('inscrire')}}" method="post" enctype="multipart/form-data">
                                        <input type="hidden" name="annee_scolaire_id" value="{{ $anne->id }}">
                                        <div class="form-body">
                                            <h4 class="form-section"><i class="ft-user"></i>Informations Elève</h4>
                                            <div class="row">
                                                <div class="form-group col-md-4 mb-2">
                                                    <label for="projectinput1">Nom</label>
                                                    <input type="text" required="required"  id="projectinput1" class="form-control" placeholder="nom" name="nom_eleve">
                                                </div>
                                                <div class="form-group col-md-4 mb-2">
                                                    <label for="projectinput2">Prenom</label>
                                                    <input required="required"  type="text" id="projectinput2" class="form-control" placeholder="prenom" name="prenom_eleve">
                                                </div>
                                                <div class="form-group col-md-4 mb-2">
                                                    <label for="projectinput2">Genre</label>
                                                    <select name="genre" class="form-control">
                                                        <option value="1">Masculin</option>
                                                        <option value="0">Feminin</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="form-group col-md-6 mb-2">
                                                    <label for="projectinput3">Adresse</label>
                                                    <input type="text" id="projectinput3" class="form-control" placeholder="adresse" name="adresse">
                                                </div>
                                                <div class="form-group col-md-6 mb-2">
                                                    <label for="projectinput4">date de naissance</label>
                                                    <input type="date" required="required"   class="form-control" placeholder="date naissance" name="date_naissance">
                                                </div>
                                            </div>

                                            <h4 class="form-section"><i class="ft-clipboard"></i>Classe</h4>
                                            <div class="row">
                                                <div class="form-group col-md-12 mb-2">
                                                    <label for="projectinput7">Classe</label>
                                                    <select id="projectinput7" name="classe_id" class="form-control">
                                                      @foreach($classes as $class)
                                                          <option value="{{ $class->id }}">{{ $class->nom_classe }}</option>
                                                          @endforeach
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="row">
                                               
                                                <div class="form-group col-12 mb-2">
                                                        <input type="number" name="montant" placeholder="montant inscription" required="required" class="form-control">
                                                </div>
                                            </div>
                                            <h4 class="form-section"><i class="ft-user"></i>Informations Tuteur & Parents</h4>
                                            <div class="row">
                                                <div class="form-group col-md-6 mb-2">
                                                    <label for="projectinput2">Prenom Père</label>
                                                    <input type="text"  class="form-control" placeholder="prenom père" name="prenom">
                                                </div>
                                                <div class="form-group col-md-6 mb-2">
                                                    <label for="projectinput3">Prenom mère</label>
                                                    <input type="text" class="form-control" placeholder="prenom mère" name="prenom_mere">
                                                </div>

                                            </div>
                                            <div class="row">
                                                <div class="form-group col-md-6 mb-2">
                                                    <label for="projectinput4">Nom mère</label>
                                                    <input type="phone"  class="form-control" placeholder="nom mère" name="nom_mere">
                                                </div>
                                                <div class="form-group col-md-6 mb-2">
                                                    <label for="projectinput1">Nom complet Tuteur</label>
                                                    <input type="text" id="projectinput1" class="form-control" placeholder="nom tuteur" name="nomcomplet_tuteur">
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="form-group col-md-6 mb-2">
                                                    <label for="projectinput3">Adresse Tuteur</label>
                                                    <input type="text" class="form-control" placeholder="adresse" name="adresse_tuteur">
                                                </div>
                                                <div class="form-group col-md-6 mb-2">
                                                    <label for="projectinput4">Contact/phone</label>
                                                    <input type="phone"  class="form-control" placeholder="telephone tuteur" name="telephone">
                                                </div>
                                            </div>

                                            <div class="row">
                                                 &nbsp;&nbsp; &nbsp; <button type="submit" name="binscription" class="btn btn-success float-right">Enregistre</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <!-- // Form actions layout section end -->
        </div>
    </div>
</div>
</div>


</body>
<footer class="footer fixed-bottom  navbar-border">
    <p class="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2 text-center">
        <span class="float-md-left d-block d-md-inline-block">Copyright © 2019 <a class="text-bold-800 grey darken-2" href="" target="_blank">SCOLARITE</a>,
            Tous droits réservés.
        </span>
    </p>
</footer>
@endsection
