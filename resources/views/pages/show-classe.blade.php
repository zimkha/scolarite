@extends('layouts.app')

@section('content')


    {{ csrf_field() }}

    @include('layouts.partials.nav_bar')
    @include('layouts.partials.menu_bar')
    <body class="vertical-layout vertical-menu 2-columns   menu-expanded fixed-navbar" data-open="click" data-menu="vertical-menu" data-col="2-columns">
    <div class="app-content content">
        <div class="content-wrapper">
            <div class="content-header row">
                </div>
            <div class="content-body">
                <h1 style="text-transform: capitalize;">{{ $classe->nom_classe }}</h1> <h6>"{{ $classe->niveau_classe->nom_niveau }}"</h6>
                <div class="row">
                    <div class="col-xl-3 col-lg-3 col-md-3">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body text-center">
                                    <div class="card-header mb-2">
                                        <span class="success darken-1">Inscriptions</span>
                                        <h3 class="font-large-2 grey darken-1 text-bold-200">{{ count($inscriptions) }}</h3>
                                    </div>

                                    <div class="card-content">
                                        <!--
                                        <div style="display:inline;width:150px;height:150px;"><canvas width="150" height="150"></canvas><input type="text" value="75" class="knob hide-value responsive angle-offset" data-angleoffset="0" data-thickness=".15" data-linecap="round" data-width="150" data-height="150" data-inputcolor="#e1e1e1" data-readonly="true" data-fgcolor="#37BC9B" data-knob-icon="ft-trending-up" readonly="readonly" style="width: 79px; height: 50px; position: absolute; vertical-align: middle; margin-top: 50px; border: 0px; background: none; font: bold 30px Arial; text-align: center; color: rgb(225, 225, 225); padding: 0px; -webkit-appearance: none; margin-left: -114px;"></div>
                                       -->
                                        <ul class="list-inline clearfix mt-2 mb-0">
                                            <li class="border-right-grey border-right-lighten-2 pr-2">
                                                <h2 class="grey darken-1 text-bold-400">{{$nb_garcon}}</h2>
                                                <span class="success">Garçons</span>
                                            </li>
                                            <li class="pl-2">
                                                <h2 class="grey darken-1 text-bold-400">{{ $nb_fille }}</h2>
                                                <span class="danger">Filles</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body text-center">
                                    <div class="card-header mb-2">
                                        <span class="success darken-1">Evaluations</span>
                                        <h3 class="font-large-2 grey darken-1 text-bold-200">{{ count($inscriptions) }}</h3>
                                    </div>

                                    <div class="card-content">
                                        <!--
                                        <div style="display:inline;width:150px;height:150px;"><canvas width="150" height="150"></canvas><input type="text" value="75" class="knob hide-value responsive angle-offset" data-angleoffset="0" data-thickness=".15" data-linecap="round" data-width="150" data-height="150" data-inputcolor="#e1e1e1" data-readonly="true" data-fgcolor="#37BC9B" data-knob-icon="ft-trending-up" readonly="readonly" style="width: 79px; height: 50px; position: absolute; vertical-align: middle; margin-top: 50px; border: 0px; background: none; font: bold 30px Arial; text-align: center; color: rgb(225, 225, 225); padding: 0px; -webkit-appearance: none; margin-left: -114px;"></div>
                                       -->
                                        <ul class="list-inline clearfix mt-2 mb-0">
                                            <li class="border-right-grey border-right-lighten-2 pr-2">
                                                <h2 class="grey darken-1 text-bold-400">{{$nb_garcon}}</h2>
                                                <span class="success">Garçons</span>
                                            </li>
                                            <li class="pl-2">
                                                <h2 class="grey darken-1 text-bold-400">{{ $nb_fille }}</h2>
                                                <span class="danger">Filles</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body text-center">
                                    <div class="card-header mb-2">
                                        <span class="success darken-1">Mensualite</span>
                                        <h3 class="font-large-2 grey darken-1 text-bold-200">{{ count($inscriptions) }}</h3>
                                    </div>

                                    <div class="card-content">
                                        <!--
                                        <div style="display:inline;width:150px;height:150px;"><canvas width="150" height="150"></canvas><input type="text" value="75" class="knob hide-value responsive angle-offset" data-angleoffset="0" data-thickness=".15" data-linecap="round" data-width="150" data-height="150" data-inputcolor="#e1e1e1" data-readonly="true" data-fgcolor="#37BC9B" data-knob-icon="ft-trending-up" readonly="readonly" style="width: 79px; height: 50px; position: absolute; vertical-align: middle; margin-top: 50px; border: 0px; background: none; font: bold 30px Arial; text-align: center; color: rgb(225, 225, 225); padding: 0px; -webkit-appearance: none; margin-left: -114px;"></div>
                                       -->
                                        <ul class="list-inline clearfix mt-2 mb-0">
                                            <li class="border-right-grey border-right-lighten-2 pr-2">
                                                <h2 class="grey darken-1 text-bold-400">{{$nb_garcon}}</h2>
                                                <span class="success">Garçons</span>
                                            </li>
                                            <li class="pl-2">
                                                <h2 class="grey darken-1 text-bold-400">{{ $nb_fille }}</h2>
                                                <span class="danger">Filles</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body text-center">
                                    <div class="card-header mb-2">
                                        <span class="success darken-1">Inscriptions</span>
                                        <h3 class="font-large-2 grey darken-1 text-bold-200">{{ count($inscriptions) }}</h3>
                                    </div>

                                    <div class="card-content">
                                        <!--
                                        <div style="display:inline;width:150px;height:150px;"><canvas width="150" height="150"></canvas><input type="text" value="75" class="knob hide-value responsive angle-offset" data-angleoffset="0" data-thickness=".15" data-linecap="round" data-width="150" data-height="150" data-inputcolor="#e1e1e1" data-readonly="true" data-fgcolor="#37BC9B" data-knob-icon="ft-trending-up" readonly="readonly" style="width: 79px; height: 50px; position: absolute; vertical-align: middle; margin-top: 50px; border: 0px; background: none; font: bold 30px Arial; text-align: center; color: rgb(225, 225, 225); padding: 0px; -webkit-appearance: none; margin-left: -114px;"></div>
                                       -->
                                        <ul class="list-inline clearfix mt-2 mb-0">
                                            <li class="border-right-grey border-right-lighten-2 pr-2">
                                                <h2 class="grey darken-1 text-bold-400">{{$nb_garcon}}</h2>
                                                <span class="success">Garçons</span>
                                            </li>
                                            <li class="pl-2">
                                                <h2 class="grey darken-1 text-bold-400">{{ $nb_fille }}</h2>
                                                <span class="danger">Filles</span>
                                            </li>
                                        </ul>
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
