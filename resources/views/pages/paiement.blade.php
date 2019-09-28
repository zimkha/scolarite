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
                                        <div class="col-lg-3 col-sm-12 border-right-blue-grey border-right-lighten-5">
                                            <div class="pb-1">
                                                <div class="clearfix mb-1">
                                                    <i class="icon-star font-large-1 blue-grey float-left mt-1"></i>
                                                    <span class="font-large-2 text-bold-300 info float-right">5,879</span>
                                                </div>
                                                <div class="clearfix">
                                                    <span class="text-muted">Jardin</span>
                                                    <span class="info float-right"><i class="ft-arrow-up info"></i> 16.89%</span>
                                                </div>
                                            </div>
                                            <div class="progress mb-0" style="height: 7px;">
                                                <div class="progress-bar bg-info" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-sm-12 border-right-blue-grey border-right-lighten-5">
                                            <div class="pb-1">
                                                <div class="clearfix mb-1">
                                                    <i class="icon-user font-large-1 blue-grey float-left mt-1"></i>
                                                    <span class="font-large-2 text-bold-300 danger float-right">423</span>
                                                </div>
                                                <div class="clearfix">
                                                    <span class="text-muted">Primaire</span>
                                                    <span class="danger float-right"><i class="ft-arrow-up danger"></i> 5.14%</span>
                                                </div>
                                            </div>
                                            <div class="progress mb-0" style="height: 7px;">
                                                <div class="progress-bar bg-danger" role="progressbar" style="width: 45%" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-sm-12 border-right-blue-grey border-right-lighten-5">
                                            <div class="pb-1">
                                                <div class="clearfix mb-1">
                                                    <i class="icon-shuffle font-large-1 blue-grey float-left mt-1"></i>
                                                    <span class="font-large-2 text-bold-300 success float-right">61%</span>
                                                </div>
                                                <div class="clearfix">
                                                    <span class="text-muted">College</span>
                                                    <span class="success float-right"><i class="ft-arrow-down success"></i> 2.24%</span>
                                                </div>
                                            </div>
                                            <div class="progress mb-0" style="height: 7px;">
                                                <div class="progress-bar bg-success" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-sm-12">
                                            <div class="pb-1">
                                                <div class="clearfix mb-1">
                                                    <i class="icon-wallet font-large-1 blue-grey float-left mt-1"></i>
                                                    <span class="font-large-2 text-bold-300 warning float-right">$6,87M</span>
                                                </div>
                                                <div class="clearfix">
                                                    <span class="text-muted">Total</span>
                                                    <span class="warning float-right"><i class="ft-arrow-up warning"></i> 43.84%</span>
                                                </div>
                                            </div>
                                            <div class="progress mb-0" style="height: 7px;">
                                                <div class="progress-bar bg-warning" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
            Tous droits réservés.
        </span>
    </p>
</footer>
@endsection
