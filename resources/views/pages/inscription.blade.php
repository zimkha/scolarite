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
            </div>
        </div>
        <div class="content-body"><!-- Form actions layout section start -->
            <section id="form-action-layouts">
                <div class="match-height">
                    <div class="">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title" id="from-actions-top-left">Project Info</h4>
                            </div>
                            <div class="card-content collpase show">
                                <div class="card-body">
                                    <form class="form">
                                        <div class="form-body">
                                            <h4 class="form-section"><i class="ft-user"></i> Personal Info</h4>
                                            <div class="row">
                                                <div class="form-group col-md-6 mb-2">
                                                    <label for="projectinput1">First Name</label>
                                                    <input type="text" id="projectinput1" class="form-control" placeholder="First Name" name="fname">
                                                </div>
                                                <div class="form-group col-md-6 mb-2">
                                                    <label for="projectinput2">Last Name</label>
                                                    <input type="text" id="projectinput2" class="form-control" placeholder="Last Name" name="lname">
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="form-group col-md-6 mb-2">
                                                    <label for="projectinput3">E-mail</label>
                                                    <input type="text" id="projectinput3" class="form-control" placeholder="E-mail" name="email">
                                                </div>
                                                <div class="form-group col-md-6 mb-2">
                                                    <label for="projectinput4">Contact Number</label>
                                                    <input type="text" id="projectinput4" class="form-control" placeholder="Phone" name="phone">
                                                </div>
                                            </div>

                                            <h4 class="form-section"><i class="ft-clipboard"></i> Requirements</h4>

                                            <div class="row">
                                                <div class="form-group col-12 mb-2">
                                                    <label for="projectinput5">Company</label>
                                                    <input type="text" id="projectinput5" class="form-control" placeholder="Company Name" name="company">
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="form-group col-md-6 mb-2">
                                                    <label for="projectinput6">Interested in</label>
                                                    <select id="projectinput6" name="interested" class="form-control">
                                                        <option value="none" selected="" disabled="">Interested in</option>
                                                        <option value="design">design</option>
                                                        <option value="development">development</option>
                                                        <option value="illustration">illustration</option>
                                                        <option value="branding">branding</option>
                                                        <option value="video">video</option>
                                                    </select>
                                                </div>

                                                <div class="form-group col-md-6 mb-2">
                                                    <label for="projectinput7">Budget</label>
                                                    <select id="projectinput7" name="budget" class="form-control">
                                                        <option value="0" selected="" disabled="">Budget</option>
                                                        <option value="less than 5000$">less than 5000$</option>
                                                        <option value="5000$ - 10000$">5000$ - 10000$</option>
                                                        <option value="10000$ - 20000$">10000$ - 20000$</option>
                                                        <option value="more than 20000$">more than 20000$</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="form-group col-12 mb-2">
                                                    <label>Select File</label>
                                                    <label id="projectinput8" class="file center-block">
                                                        <input type="file" id="file">
                                                        <span class="file-custom"></span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="form-group col-12 mb-2">
                                                    <label for="projectinput9">About Project</label>
                                                    <textarea id="projectinput9" rows="5" class="form-control" name="comment" placeholder="About Project"></textarea>
                                                </div>
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
            Tous droits réservés. Designed By
        </span>
    </p>
</footer>
