@extends('layouts.app')

@section('content')


    {{ csrf_field() }}

    @include('layouts.partials.nav_bar')
    @include('layouts.partials.menu_bar')
    <body class="vertical-layout vertical-menu 2-columns   menu-expanded fixed-navbar" data-open="click" data-menu="vertical-menu" data-col="2-columns">
    <div class="app-content content">
        <div class="content-wrapper">
            <div class="content-header row">
                <div class="col-12">
                    <div class="main-card mb-12 card">
                      <div class="card-body">

                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>

    </script>
    </body>
@endsection
