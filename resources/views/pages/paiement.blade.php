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
                <h3 class="content-header-title mb-0 d-inline-block">Paiement mois: <button class="btn btn-primary" data-toggle="modal" data-target="#showFormPAiment">Nouveau Paiement</button></h3>
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
                            <div class="col-12">
                                    <div class="main-card mb-12 card">
                                            <div class="card-body">
                                                <h5 class="card-title mb-n1">
                                                    <div class="mb-n1" data-toggle="collapse" data-target="#priseencharge" aria-expanded="true">
                                                    
                                                     Mois
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
                                                                                                                                       
                                                                            </select>
                                                                    </div>
                                                                </div>
                                                        
                                                    </div>
                                                </div>
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

<!--MODAL -->
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
                <div class="form-group">
                        <label for="montant">
                            matricule
                        </label>
                      <input type="text" class="form-control" name="matricule" required="required" value="">
                    </div>
                  <div class="form-group">
                      <label for="mosi">Mois</label>
                      <select  name="mois" class="form-control">
                          
                      </select>

                  </div>
                  <div class="form-group">
                      <label for="montant">
                          Montant
                      </label>
                    <input type="number" class="form-control" name="montant" required="required" value="">
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
    <!-- END MODAL -->
</body>
<footer class="footer fixed-bottom  navbar-border">
    <p class="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2 text-center">
        <span class="float-md-left d-block d-md-inline-block">Copyright © 2019 <a class="text-bold-800 grey darken-2" href="" target="_blank">SCOLARITE</a>,
            Tous droits réservés. Designed By
        </span>
    </p>
</footer>
@endsection
