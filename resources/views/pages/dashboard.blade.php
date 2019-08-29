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
            <div class="content-body"><!-- CRM stats -->
                <div class="row">
                    <div class="col-xl-4 col-lg-6 col-md-12">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body text-center">
                                    <div class="card-header mb-2">
                                        <span class="success darken-1">Total Budget</span>
                                        <h3 class="font-large-2 grey darken-1 text-bold-200">$24,879</h3>
                                    </div>
                                    <div class="card-content">
                                        <input type="text" value="75" class="knob hide-value responsive angle-offset" data-angleOffset="0" data-thickness=".15" data-linecap="round" data-width="150" data-height="150" data-inputColor="#e1e1e1" data-readOnly="true" data-fgColor="#37BC9B" data-knob-icon="ft-trending-up">
                                        <ul class="list-inline clearfix mt-2 mb-0">
                                            <li class="border-right-grey border-right-lighten-2 pr-2">
                                                <h2 class="grey darken-1 text-bold-400">75%</h2>
                                                <span class="success">Completed</span>
                                            </li>
                                            <li class="pl-2">
                                                <h2 class="grey darken-1 text-bold-400">25%</h2>
                                                <span class="danger">Remaining</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-6 col-md-12">
                        <div class="card">
                            <div class="card-content">
                                <div class="earning-chart position-relative">
                                    <div class="chart-title position-absolute mt-2 ml-2">
                                        <h1 class="font-large-2 grey darken-1 text-bold-200">$9,86M</h1>
                                        <span class="text-muted">Total Earning</span>
                                    </div>
                                    <div class="chartjs">
                                        <canvas id="earning-chart" class="height-400 block"></canvas>
                                    </div>
                                    <div class="chart-stats position-absolute position-bottom-0 position-right-0 mb-2 mr-3">
                                        <a href="#" class="btn bg-info mr-1 white">Statistics <i class="ft-bar-chart"></i></a> <span class="text-muted">for the <a href="#">last year.</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-12 col-md-12">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                    <div class="media">
                                        <div class="media-body text-left">
                                            <h3 class="success">2,780</h3>
                                            <span>Today's Leads</span>
                                        </div>
                                        <div class="media-right media-middle">
                                            <i class="ft-award success font-large-2 float-right"></i>
                                        </div>
                                    </div>
                                    <div class="progress mt-1 mb-0" style="height: 7px;">
                                        <div class="progress-bar bg-success" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                    <div class="media">
                                        <div class="media-body text-left">
                                            <h3 class="deep-orange">2,780</h3>
                                            <span>New Deal</span>
                                        </div>
                                        <div class="media-right media-middle">
                                            <i class="ft-package deep-orange font-large-2 float-right"></i>
                                        </div>
                                    </div>
                                    <div class="progress mt-1 mb-0" style="height: 7px;">
                                        <div class="progress-bar bg-deep-orange" role="progressbar" style="width: 35%" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                    <div class="media">
                                        <div class="media-body text-left">
                                            <h3 class="info">456</h3>
                                            <span>New Customers</span>
                                        </div>
                                        <div class="media-right media-middle">
                                            <i class="ft-users info font-large-2 float-right"></i>
                                        </div>
                                    </div>
                                    <div class="progress mt-1 mb-0" style="height: 7px;">
                                        <div class="progress-bar bg-info" role="progressbar" style="width: 35%" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section id="html">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h2 class="card-title text-bold-700">Liste des eleves inscrits</h2>
                                <a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>
                                <div class="heading-elements">
                                    <ul class="list-inline mb-0">
                                        <li><a data-action="collapse"><i class="ft-minus"></i></a></li>
                                        <li><a data-action="close"><i class="ft-x"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="card-content collpase show">
                                <div class="card-body card-dashboard">
                                    <p></p>
                                    <table class="table table-striped table-bordered sourced-data">
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Position</th>
                                            <th>Office</th>
                                            <th>Age</th>
                                            <th>Start date</th>
                                            <th>Salary</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>Hope Fuentes</td>
                                            <td>Secretary</td>
                                            <td>San Francisco</td>
                                            <td>41</td>
                                            <td>2010/02/12</td>
                                            <td>$109,850</td>
                                        </tr>
                                        <tr>
                                            <td>Vivian Harrell</td>
                                            <td>Financial Controller</td>
                                            <td>San Francisco</td>
                                            <td>62</td>
                                            <td>2009/02/14</td>
                                            <td>$452,500</td>
                                        </tr>
                                        <tr>
                                            <td>Timothy Mooney</td>
                                            <td>Office Manager</td>
                                            <td>London</td>
                                            <td>37</td>
                                            <td>2008/12/11</td>
                                            <td>$136,200</td>
                                        </tr>
                                        <tr>
                                            <td>Jackson Bradshaw</td>
                                            <td>Director</td>
                                            <td>New York</td>
                                            <td>65</td>
                                            <td>2008/09/26</td>
                                            <td>$645,750</td>
                                        </tr>
                                        <tr>
                                            <td>Donna Snider</td>
                                            <td>Customer Support</td>
                                            <td>New York</td>
                                            <td>27</td>
                                            <td>2011/01/25</td>
                                            <td>$112,000</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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

