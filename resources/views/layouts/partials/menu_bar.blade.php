<div class="main-menu menu-fixed menu-dark menu-accordion    menu-shadow " data-scroll-to-active="true">
    <div class="main-menu-content">
        <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">

            <li class=" nav-item"><a href="{{ url('dashboard') }}"><i class="icon-home"></i>Dashboard</a></li>
        <li class=" nav-item"><a href="{{ url('inscription')}}"><i class="icon-info"></i>Inscription</a></li>
            <li class=" nav-item"><a href="{{ route('home-classe')}}"><i class="icon-note"></i>Classe</a></li>
            <li class=" nav-item"><a href="#"><i class="icon-graduation"></i>Evaluation</a></li>
            <li class=" nav-item"><a href="{{ route('list-matiere')}}"><i class="icon-notebook"></i>Matiere</a></li>
            <li class=" nav-item"><a href="{{ route('paiement-index')}}"><i class="icon-paypal"></i>Mensualite</a></li>
            <li class=" nav-item"><a href="{{ route('get-operations')}}"><i class="icon-paypal"></i>Opérations - Jour</a></li>

            <li class=" nav-item"><a href="#"><i class="icon-settings"></i>Parametre</a>
                <ul>
                    <li><a href="#">Permissions</a> </li>
                    <li><a href="#">Utilisateurs</a> </li>
                </ul>
            </li>
            <li class="navigation-header"><span data-i18n="nav.category.forms">Gestions Administration</span><i class="ft-more-horizontal ft-minus" data-toggle="tooltip" data-placement="right" data-original-title="Forms"></i>
            </li>
            <li class=" nav-item"><a href="{{ route('liste-prof') }}"><i class="icon-notebook"></i>Professeur</a></li>
            <li class=" nav-item"><a href="{{ route('liste-depense') }}"><i class="icon-paypal"></i>Depenses</a></li>
            <li class=" nav-item"><a href="{{ route('liste-depense') }}"><i class="icon-paypal"></i>Stats Depenses</a></li>
            <li class=" nav-item"><a href="{{ route('graph') }}"><i class="icon-chart"></i>Stats Graphiques</a></li>
        </ul>
        
    </div>
</div>
