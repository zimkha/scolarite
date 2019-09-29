@extends('layouts.app')

@section('content')


    {{ csrf_field() }}

    @include('layouts.partials.nav_bar')
    @include('layouts.partials.menu_bar')
    <body class="vertical-layout vertical-menu 2-columns   menu-expanded fixed-navbar" data-open="click" data-menu="vertical-menu" data-col="2-columns">

    <div class="app-content content">
        <div class="content-wrapper">
            <div class="content-body"><section class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-head">
                                <div class="card-header">
                                    <h4 class="card-title">Professeur : {{ $prof->prenom }} - {{ $prof->nom }}</h4>
                                    <a class="btn btn-blue" href="#" title="Ajouter Une matiere" data-toggle="modal" data-target="#showModalMatiereAjout"><i class=" icon-magic-wand"></i></a>
                                    <a class="btn btn-blue" href="#" title="Ajouter Une classe"  data-toggle="modal" data-target="#showModalClasse"><i class="icon-graduation"></i> </a>
                                    <a class="btn btn-blue" href="#" title="Ajouter Une classe"  data-toggle="modal" data-target="#showModalCours"><i class="icon-grid"></i> </a>

                                </div>
                                <div class="px-1">
                                    @if (\Illuminate\Support\Facades\Session::has('message_flash'))
                                        <div class="alert alert-blue">{{ Session::get('message_flash') }}</div>
                                    @endif
                                    @if (\Illuminate\Support\Facades\Session::has('error_flash'))
                                        <div class="alert alert-blue">{{ Session::get('error_flash') }}</div>
                                    @endif
                                </div>
                            </div>
                            <!-- project-info -->
                            <div id="project-info" class="card-body row">
                                <div class="project-info-count col-lg-6 col-md-12" align="center">
                                    <div class="project-info-icon">
                                        <h2>{{ count($enseigne) }}</h2>
                                        <div class="project-info-sub-icon">
                                            <span class="fa fa-user"></span>
                                        </div>
                                    </div>
                                    <div class="project-info-text pt-1">
                                        <h5>Classes</h5>
                                    </div>
                                </div>
                                <div class="project-info-count col-lg-6 col-md-12" align="center">
                                    <div class="project-info-icon">
                                        <h2>{{ $nb_matiere_enseigne }}</h2>
                                        <div class="project-info-sub-icon">
                                            <span class="fa fa-calendar"></span>
                                        </div>
                                    </div>
                                    <div class="project-info-text pt-1">
                                        <h5>Matieres</h5>
                                    </div>
                                </div>

                            </div>
                            <!-- project-info -->
                            <div class="card-body">
                                <div class="card-subtitle line-on-side text-muted text-center font-small-3 mx-2 my-1">
                                    <span>Egal's Eye View Of Project Status</span>
                                </div>
                                <div class="row py-2">
                                    <div class="col-lg-6 col-md-12">
                                        <div class="insights px-2">
                                            <div><span class="text-info h3">82%</span> <span class="float-right">Tasks</span></div>
                                            <div class="progress progress-md mt-1 mb-0">
                                                <div class="progress-bar bg-info" role="progressbar" style="width: 82%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-12">
                                        <div class="insights px-2">
                                            <div><span class="text-success h3">78%</span> <span class="float-right">TaskLists</span></div>
                                            <div class="progress progress-md mt-1 mb-0">
                                                <div class="progress-bar bg-success" role="progressbar" style="width: 78%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <div class="col-lg-6 col-md-12">
                                        <div class="insights px-2">
                                            <div><span class="text-warning h3">68%</span> <span class="float-right">Milestones</span></div>
                                            <div class="progress progress-md mt-1 mb-0">
                                                <div class="progress-bar bg-warning" role="progressbar" style="width: 68%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-12">
                                        <div class="insights px-2">
                                            <div><span class="text-danger h3">62%</span> <span class="float-right">Bugs</span></div>
                                            <div class="progress progress-md mt-1 mb-0">
                                                <div class="progress-bar bg-danger" role="progressbar" style="width: 62%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- Task Progress -->


        </div>
        </div>
    </div>

    <!-- Modal-->
    <div class="modal animated slideInDown text-left" id="showModalClasse" tabindex="-1" role="dialog" aria-labelledby="myModalLabel77" aria-hidden="true">

        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel77">Ajouter une classe Pour professeur</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" method="post" action="{{ route('save-Prof-With-Classe')}}">
                        <input type="hidden" name="inscription" value="">
                        <input  type="hidden" name="professeur_id" value="{{ $prof->id }}">
                        <div class="form-group">
                            <label for="montant">
                                Classe
                            </label>
                            <select name="classe_id" class="form-control">
                                <option>Selectonner une classe</option>
                                @foreach($classes as $item)
                                    <option value="{{ $item->id }}">
                                        {{ $item->nom_classe }}
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
    <div class="modal animated slideInDown text-left" id="showModalMatiereAjout" tabindex="-1" role="dialog" aria-labelledby="myModalLabel77" aria-hidden="true">

        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header ">
                    <h4 class="modal-title" id="myModalLabel77" align="center">Ajouter une Matiere a enseigne</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" method="post" action="{{ route('matier-par-prfesseur')}}">
                        <input type="hidden" name="inscription" value="">
                        <input  type="hidden" name="professeur_id" value="{{ $prof->id }}">
                        <div class="form-group">
                            <label for="montant">
                                Classe
                            </label>
                            <select name="enseigne_id" class="form-control">
                                <option>Selectonner une classe</option>
                                @foreach($pro_classe as $item)
                                    <option value="{{ $item->id }}">
                                        {{ $item->classe->nom_classe }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="montant">
                                Matiere
                            </label>
                            <select name="matiere_id" class="form-control">
                                <option>Selectonner une Matiere</option>
                                @foreach($matieres as $item)
                                    <option value="{{ $item->id }}">
                                        {{ $item->nom_matiere }}
                                    </option>
                                @endforeach
                            </select>
                            <br>
                            <div class="form-group">
                                <label>Montant par heure</label>
                                <input type="number" name="montant_heure" class="form-control" placeholder="preciser le montant a payer par heure">
                            </div>
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

    <div class="modal animated slideInDown text-left" id="showModalCours" tabindex="-1" role="dialog" aria-labelledby="myModalLabel77" aria-hidden="true">

        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel77">Pointage Cours</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" method="post" action="{{ route('save-Prof-With-Classe')}}">
                        <input type="hidden" name="inscription" value="">
                        <input  type="hidden" name="professeur_id" value="{{ $prof->id }}">
                        <div class="form-group">
                            <label for="montant">
                                Classe
                            </label>
                            <select name="classe_id" class="form-control">
                                <option>Selectonner une classe</option>
                                @foreach($classes as $item)
                                    <option value="{{ $item->id }}">
                                        {{ $item->nom_classe }}
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

    </body>
    @endsection
