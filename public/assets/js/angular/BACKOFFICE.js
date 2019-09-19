console.log('bonjour');
var app=angular.module('BackEnd',[ 'ngRoute' , 'ngSanitize' , 'ngLoadScript', 'ui.bootstrap' , 'angular.filter']);

var BASE_URL='http://'+location.host+'/pharmacie/public/';
var imgupload = BASE_URL + '/css/app-assets/images/upload.jpg';
var msg_erreur = 'Une Erreur est survenue sur le serveur, veuillez contacter le support technique';

app.filter('range', function()
{
    return function(input, total)
    {
        total = parseInt(total);
        for (var i=0; i<total; i++)
            input.push(i);
        return input;
    };
});

// Pour mettre les espaces sur les montants
app.filter('convertMontant', [
    function() { // should be altered to suit your needs
        return function(input) {
            input = input + "";
            return input.replace(/,/g," ");
        };
    }]);


app.factory('Init',function ($http, $q)
{
    var factory=
    {
        data:false,
        getElement:function (element,listeattributs, is_graphQL=true, dataget=null)
        {
            var deferred=$q.defer();
            console.log(dataget);
            $http({
                method: 'GET',
                url: BASE_URL + (is_graphQL ? '/graphql?query= {'+element+' {'+listeattributs+'} }' : element),
                headers: {
                    'Content-Type': 'application/json'
                },
                data:dataget
            }).then(function successCallback(response)
            {
                /*lorsque la requete contient des paramètres, il faut decouper pour recupérer le tableau*/
                if (is_graphQL)
                {
                    factory.data = response['data']['data'][!element.indexOf('(')!=-1 ? element.split('(')[0] : element];
                }
                else
                {
                    factory.data = response['data'];
                }
                deferred.resolve(factory.data);
            }, function errorCallback(error) {
                console.log('erreur serveur', error);
                deferred.reject(msg_erreur);
            });
            return deferred.promise;
        },
        getElementPaginated:function (element,listeattributs)
        {
            var deferred=$q.defer();
            $http({
                method: 'GET',
                url: BASE_URL + '/graphql?query= {'+element+'{metadata{total,per_page,current_page,last_page},data{'+listeattributs+'}}}'
            }).then(function successCallback(response) {
                factory.data=response['data']['data'][!element.indexOf('(')!=-1 ? element.split('(')[0] : element];
                deferred.resolve(factory.data);
            }, function errorCallback(error) {
                console.log('erreur serveur', error);
                deferred.reject(msg_erreur);
            });
            return deferred.promise;
        },
        saveElement:function (element,data) {
            var deferred=$q.defer();
            $http({
                method: 'POST',
                url: BASE_URL + '/'+element,
                headers: {
                    'Content-Type': 'application/json'
                },
                data:data
            }).then(function successCallback(response) {
                factory.data=response['data'];
                deferred.resolve(factory.data);
            }, function errorCallback(error) {
                console.log('erreur serveur', error);
                deferred.reject(msg_erreur);
            });
            return deferred.promise;
        },
        changeStatut:function (element,data) {
            var deferred=$q.defer();
            $http({
                method: 'POST',
                url: BASE_URL + '/' + element+'/statut',
                headers: {
                    'Content-Type': 'application/json'
                },
                data:data
            }).then(function successCallback(response) {
                factory.data=response['data'];
                deferred.resolve(factory.data);
            }, function errorCallback(error) {
                console.log('erreur serveur', error);
                deferred.reject(msg_erreur);
            });
            return deferred.promise;
        },
        saveElementAjax:function (element,data,non_abonne=false) {
            var deferred=$q.defer();
            $.ajax
            (
            {
                    url: BASE_URL + element,
                    type:'POST',
                    contentType:false,
                    processData:false,
                    DataType:'text',
                    data:data,
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    },
                    beforeSend: function()
                    {
                        $('#modal_add'+element).blockUI_start();
                    },success:function(response)
                    {
                        $('#modal_add'+element).blockUI_stop();
                        factory.data=response;
                        deferred.resolve(factory.data);
                    },
                    error:function (error)
                    {
                            $('#modal_add' + element).blockUI_stop();
                            console.log('erreur serveur', error);
                            deferred.reject(msg_erreur);

                    }
                }
            );
            return deferred.promise;
        },
        removeElement:function (element,id) {
            var deferred=$q.defer();
            $http({
                method: 'DELETE',
                url: BASE_URL + '/' + element + '/' + id,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function successCallback(response) {
                factory.data=response['data'];
                deferred.resolve(factory.data);
            }, function errorCallback(error) {
                console.log('erreur serveur', error);
                deferred.reject(msg_erreur);
            });
            return deferred.promise;
        }
    };
    return factory;
});


// Configuration du routage au niveau de l'app
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "page/dashboard",
        })
        .when("/list-etatcaisse", {
            templateUrl : "page/list-etatcaisse",
        })
        .when("/stat-caisse", {
            templateUrl : "page/stat-caisse",
        })
        .when("/list-typeclient", {
            templateUrl : "page/list-typeclient",
        })
        .when("/list-client", {
            templateUrl : "page/list-client",
        })
        .when("/listdetail-client", {
            templateUrl : "page/listdetail-client",
        })
        .when("/detail-produit", {
            templateUrl : "page/detail-produit",
        })
        .when("/list-employe", {
            templateUrl : "page/list-employe",
        })
        .when("/listdetail-employe", {
            templateUrl : "page/listdetail-employe",
        })
        .when("/detail-recouvrement", {
            templateUrl : "page/detail-recouvrement",
        })
        .when("/list-assurance", {
            templateUrl : "page/list-assurance",
        })
        .when("/listdetail-assurance", {
            templateUrl : "page/listdetail-assurance",
        })
        .when("/listdetail-recapassurance", {
            templateUrl : "page/listdetail-recapassurance",
        })
        .when("/list-typemedicament", {
            templateUrl : "page/list-typemedicament",
        })
        .when("/list-medicament", {
            templateUrl : "page/list-medicament",
        })
        .when("/list-preference", {
            templateUrl : "page/list-preference",
        })
        .when("/listdetail-commande", {
            templateUrl : "page/listdetail-commande",
        })
        .when("/list-cloture", {
            templateUrl : "page/list-cloture",
        })
        .when("/list-proforma", {
            templateUrl : "page/list-proforma",
        })
        .when("/list-facture-proformat", {
            templateUrl : "page/list-facture-proformat",
        })
        .when("/listdetail-facture-proformat", {
            templateUrl : "page/listdetail-facture-proformat",
        })
        .when("/detail-medicament", {
            templateUrl : "page/detail-medicament",
        })
        .when("/list-regulation", {
            templateUrl : "page/list-regulation",
        })
        .when("/list-inventaire", {
            templateUrl : "page/list-inventaire",
        })
        .when("/list-approvisionnement", {
            templateUrl : "page/list-approvisionnement",
        })
        .when("/list-sortiestock", {
            templateUrl : "page/list-sortiestock",
        })
        .when("/list-vente", {
            templateUrl : "page/list-vente",
        })
        .when("/stat-vente", {
            templateUrl : "page/stat-vente",
        })
        .when("/list-recouvrement", {
            templateUrl : "page/list-recouvrement",
        })
        .when("/analytics-variation", {
            templateUrl : "page/analytics-variation",
        })
        .when("/list-commande", {
            templateUrl : "page/list-commande",
        })
        .when("/list-livraison", {
            templateUrl : "page/list-livraison",
        })
        .when("/list-produit", {
            templateUrl : "page/list-produit",
        })
        .when("/list-utilisateur", {
            templateUrl : "page/list-utilisateur",
        })
        .when("/list-profil", {
            templateUrl : "page/list-profil",
        })
        .when("/statut-commande", {
            templateUrl : "page/statut-commande",
        })
        .when("/apps-chat", {
            templateUrl : "page/apps-chat",
        })
        .when("/apps-faq-section", {
            templateUrl : "page/apps-faq-section",
        })
        .when("/apps-mailbox", {
            templateUrl : "page/apps-mailbox",
        })
        .when("/charts-apexcharts", {
            templateUrl : "page/charts-apexcharts",
        })
        .when("/charts-chartjs", {
            templateUrl : "page/charts-chartjs",
        })
        .when("/charts-sparklines", {
            templateUrl : "page/charts-sparklines",
        })
        .when("/components-accordions", {
            templateUrl : "page/components-accordions",
        })
        .when("/components-calendar", {
            templateUrl : "page/components-calendar",
        })
        .when("/components-carousel", {
            templateUrl : "page/components-carousel",
        })
        .when("/components-count-up", {
            templateUrl : "page/components-count-up",
        })
        .when("/components-guided-tours", {
            templateUrl : "page/components-guided-tours",
        })
        .when("/components-image-crop", {
            templateUrl : "page/components-image-crop",
        })
        .when("/components-loading-blocks", {
            templateUrl : "page/components-loading-blocks",
        })
        .when("/components-maps", {
            templateUrl : "page/components-maps",
        })
        .when("/components-modals", {
            templateUrl : "page/components-modals",
        })
        .when("/components-notifications", {
            templateUrl : "page/components-notifications",
        })
        .when("/components-pagination", {
            templateUrl : "page/components-pagination",
        })
        .when("/components-progress-bar", {
            templateUrl : "page/components-progress-bar",
        })
        .when("/components-tooltips-popovers", {
            templateUrl : "page/components-tooltips-popovers",
        })
        .when("/components-ratings", {
            templateUrl : "page/components-ratings",
        })
        .when("/components-scrollable-elements", {
            templateUrl : "page/components-scrollable-elements",
        })
        .when("/components-tabs", {
            templateUrl : "page/components-tabs",
        })
        .when("/components-tooltps-popovers", {
            templateUrl : "page/components-tooltps-popovers",
        })
        .when("/components-tree-view", {
            templateUrl : "page/components-tree-view",
        })
        .when("/dashboards-commerce", {
            templateUrl : "page/dashboards-commerce",
        })
        .when("/dashboards-commerce-variation", {
            templateUrl : "page/dashboards-commerce-variation",
        })
        .when("/dashboards-crm", {
            templateUrl : "page/dashboards-crm",
        })
        .when("/dashboards-crm-variation", {
            templateUrl : "page/dashboards-crm-variation",
        })
        .when("/dashboards-minimal-1", {
            templateUrl : "page/dashboards-minimal-1",
        })
        .when("/dashboards-minimal-2", {
            templateUrl : "page/dashboards-minimal-2",
        })
        .when("/dashboards-sales", {
            templateUrl : "page/dashboards-sales",
        })
        .when("/elements-badges-labels", {
            templateUrl : "page/elements-badges-labels",
        })
        .when("/elements-buttons-icons", {
            templateUrl : "page/elements-buttons-icons",
        })
        .when("/elements-buttons-pills", {
            templateUrl : "page/elements-buttons-pills",
        })
        .when("/elements-buttons-shadow", {
            templateUrl : "page/elements-buttons-shadow",
        })
        .when("/elements-buttons-square", {
            templateUrl : "page/elements-buttons-square",
        })
        .when("/elements-buttons-standard", {
            templateUrl : "page/elements-buttons-standard",
        })
        .when("/elements-cards", {
            templateUrl : "page/elements-cards",
        })
        .when("/elements-dropdowns", {
            templateUrl : "page/elements-dropdowns",
        })
        .when("/elements-icons", {
            templateUrl : "page/elements-icons",
        })
        .when("/elements-list-group", {
            templateUrl : "page/elements-list-group",
        })
        .when("/elements-loaders", {
            templateUrl : "page/elements-loaders",
        })
        .when("/elements-navigation", {
            templateUrl : "page/elements-navigation",
        })
        .when("/elements-timelines", {
            templateUrl : "page/elements-timelines",
        })
        .when("/elements-utilities", {
            templateUrl : "page/elements-utilities",
        })
        .when("/forms-clipboard", {
            templateUrl : "page/forms-clipboard",
        })
        .when("/forms-controls", {
            templateUrl : "page/forms-controls",
        })
        .when("/forms-datepicker", {
            templateUrl : "page/forms-datepicker",
        })
        .when("/forms-input-mask", {
            templateUrl : "page/forms-input-mask",
        })
        .when("/forms-input-selects", {
            templateUrl : "page/forms-input-selects",
        })
        .when("/forms-layouts", {
            templateUrl : "page/forms-layouts",
        })
        .when("/forms-range-slider", {
            templateUrl : "page/forms-range-slider",
        })
        .when("/forms-textarea-autosize", {
            templateUrl : "page/forms-textarea-autosize",
        })
        .when("/forms-toggle-switch", {
            templateUrl : "page/forms-toggle-switch",
        })
        .when("/forms-validation", {
            templateUrl : "page/forms-validation",
        })
        .when("/forms-wizard", {
            templateUrl : "page/forms-wizard",
        })
        .when("/forms-wysiwyg-editor", {
            templateUrl : "page/forms-wysiwyg-editor",
        })
        .when("/pages-forgot-password", {
            templateUrl : "page/pages-forgot-password",
        })
        .when("/pages-forgot-password-boxed", {
            templateUrl : "page/pages-forgot-password-boxed",
        })
        .when("/pages-login", {
            templateUrl : "page/pages-login",
        })
        .when("/pages-login-boxed", {
            templateUrl : "page/pages-login-boxed",
        })
        .when("/pages-register", {
            templateUrl : "page/pages-register",
        })
        .when("/pages-register-boxed", {
            templateUrl : "page/pages-register-boxed",
        })
        .when("/tables-data-tables", {
            templateUrl : "page/tables-data-tables",
        })
        .when("/tables-grid", {
            templateUrl : "page/tables-grid",
        })
        .when("/tables-regular", {
            templateUrl : "page/tables-regular",
        })
        .when("/widgets-chart-boxes", {
            templateUrl : "page/widgets-chart-boxes",
        })
        .when("/widgets-chart-boxes-2", {
            templateUrl : "page/widgets-chart-boxes-2",
        })
        .when("/widgets-chart-boxes-3", {
            templateUrl : "page/widgets-chart-boxes-3",
        })
        .when("/widgets-profile-boxes", {
            templateUrl : "page/widgets-profile-boxes",
        })
        .when("/fournisseur", {
            templateUrl : "page/fournisseur",
        })
        .when("/detail-fournisseur", {
            templateUrl : "page/detail-fournisseur",
        })
        .when("/import-regularisation", {
            templateUrl : "page/excel-importregularisation",
        })
        .when("/import-commande", {
            templateUrl : "page/excel-boncommande",
        })
        .when("/faire-vente", {
            templateUrl : "page/faire-vente",
        })

});

app.directive('modalDialog', function(){
  return {
      restrict: 'E',
      scope:{
          show: '='
      },
      template: `
        <div class="ng-modal" ng-show="show">
    <div class="ng-modal-overlay" ng-click="hideModal()"></div>
    <div class="ng-modal-dialog" ng-style="dialogStyle">
        <div class="ng-modal-close" ng-click="hideModal()"><i class="pe-7s-close"></i> </div>
        <div class="ng-modal-dialog-content" ng-transclude>
          
        </div>
    </div>
</div>
      `,
      transclude: true,
      link:function(scope, elem, attrs){
          scope.dialogStyle = {};
          if(attrs.width){
              scope.dialogStyle.width = attrs.width;
          }
          if(attrs.height){
              scope.dialogStyle.height = attrs.height;
          }
          scope.hideModal = function(){
              scope.show = false;
          };
      }

  }
});


// Spécification fonctionnelle du controller
app.controller('BackEndCtl',function (Init,$location,$scope,$filter, $log,$q,$route, $routeParams, $timeout)
{

        $scope.modalShow = false;
        $scope.toggleModal = function(type){
            $("#modal_add"+type).modal('show');
            console.log('modal afficher')
};

        $scope.modalClient = false;
        $scope.toggleModalClient = function(type){
            $("#clientmodal_add"+type).modal('show');
            $scope.modalClient = !$scope.modalClient;
        }


    var listofrequests_assoc =
        {
            "clients"                                : "id,nomcomplet,email,telephone,adresse,matricule,zone_livraison, employes{id, nomcomplet,adresse} assurance{id,matricule,nomcomplet} type_client_id,typeclient{id,nom_type},ventes{id,numero_ticket,motif,nom_medecin,telephone,numero_ordonnance,date_prescris,pourcentage_remise,pourcentage_payeur,etat_venten type_vente, created_at, updated_at}, created_at,updated_at",

            "typeclients"                            : "id, nom_type, clients{id,nomcomplet,email,telephone,adresse,matricule,zone_livraison}",

            'employes'                               :"id,nomcomplet, matricule,adresse,telephone,client_id, client{id,nomcomplet,email,telephone,adresse,matricule,zone_livraison}, ventes{id,numero_ticket,motif,nom_medecin,telephone,numero_ordonnance,date_prescris,pourcentage_remise,pourcenrage_payeur,etat_vente}",

            "assurances"                             : "id,matricule,nomcomplet,adresse,telephone,email, clients{id,nomcomplet,email,telephone,adresse,matricule,zone_livraison}, ventes{id,numero_ticket,motif,nom_medecin,telephone,numero_ordonnance,date_prescris,pourcentage_remise,pourcenrage_payeur,etat_vente, mode_paiement_}",

            "medicaments"                            : "id,noart,code,designation,prix_cession,qte_rayon,qte_reserve,qte_seuil_max,qte_seuil_min, tva, famille_medicament_id,famille_medicament{id,libelle},type_medicament_id, type_medicament{id, libelle}, ligne_commandes{id,qte_commande,created_at,updated_at}",

            "famillemedicaments"                     : "id,libelle, medicaments{d,noart,code, code2, designation, prix_cession, pourcentage_rayon, pourcentage_reserve, qte_seuil_max, qte_seuil_min}",

            "typemedicaments"                        : "id,libelle, medicaments{id,noart,code, code2, designation, prix_cession",

            "classeproduits"                         : "id,nom_classe,,rajout, medicaments{id,noart,code, code2, designation, prix_cession}",

            "fournisseurs"                           : "id, nom, adresse, telephone, email bon_commandes{id,code_bc,pourcentage_remise}, facture_proformas{id, code_facture}",

            "factureproforams"                       : "id,code_facture, fournisseur_id, fournisseur{id, nomcomplet, adresse, telephone, email}",

            "lignefactures"                          : "id,qte, prix_achat, remise, tva, created_at, updated_at, medicament_id, facture_proforma_id, medicament{id,noart,code, code2, designation}, facture_proforma{}",

            "boncommandes"                           : "id,code_bc,pourcentage_remise,fournisseur_id, fournisseur{id, nomcomplet, adresse}, ligne_commandes {id,qte_commande,prix_achat, tva, remise} created_at, updated_at ",

            "lignecommandes"                         : "id,qte_commande,prix_achat, tva, remise, bon_commande_id, bon_commande{id, code_bc, created_at}, medicament_id, medicament{id,noart,code, code2, designation, prix_cession},created_at,updated_at",

            "bonlivraisons"                          : "id,code_livraison,bon_commande_id, boncommande{id, code_bc, pourcentage_remise}, ligne_livraison{}",

            "lignelivraisons"                        :"id, numero_lot,date_fabrique,date_peremption, created_at, updated_at, bon_livraison_id, bon_livraison{id, code_livraison}, ligne_commande{id,qte_commande,prix_achat, tva, remise, bon_commande_id, bon_commande{id, code_bc, created_at}, medicament_id, medicament{id,noart,code, code2, designation, prix_cession}}, qte_livre, qte_bonus, prix_vente_fixe, prix_vente_public",

            "clotures"                               : "id,somme_init,somme_final,type_monnaie,user_id,caisse_id, user{id,username} caisse{id,code_caisse}",

            "paiements"                              : "id, montant_verse, mode_paiement_id, mode_paiement{}, bon_commande_id, bon_commande{id,code_bc,pourcentage_remise,fournisseur_id, fournisseur{id, nomcomplet, adresse}, ligne_commandes {id,qte_commande,prix_achat, tva, remise} created_at, updated_at }",

            "modepaiements"                          : "id,libelle_mode, ventes{id,numero_ticket}, paiements{id, montant_verse}",

            "detailsinventaires"                     : "id,medicament_id, medicament{id,noart,code, code2, designation, prix_cession}, inventaire_id, inventaire{id, created_at}, qte_app, qte_inventorie, qte_reel, created_at, updated_at",

            "inventaires"                            : "id,created_at,updated_at",

            "regularisations"                        : "id, created_at, updated_at",

            "detailregularisations"                  : "id,motif,remise,qte_relle, ecart, commentaire,medicament_id,ligne_livraison_id,ligne_livraison{id, qte_livre, qte_bonus,qte_restant} , medicament{id,noart,code, code2, designation, prix_cession, pourcentage_rayon, pourcentage_reserve, qte_seuil_max, qte_seuil_min}, regularisation_id, regularisation{id, created_at}",

            "ventes"                                 : "id,numero_ticket,motif,nom_medecin,telephone,numero_ordonnance,date_prescris,pourcentage_remise,pourcenrage_payeur,etat_vente, mode_paiement_id,employe_id,client_id, employe{id,nomcomplet, matricule,adresse,telephone}, client{id,nomcomplet,email,telephone,adresse,matricule,zone_livraison}, mode_paiment{id, libelle_mode} ",

            "detailventes"                           : "id,qte_vendu, prix_unitaire, remise,vente_id, ligne_livraison_id, vente{id,numero_ticket,motif,nom_medecin,telephone,numero_ordonnance,date_prescris,pourcentage_remise,pourcenrage_payeur,etat_vente, mode_paiement_id}, mode_paiment{id, libelle_mode}, ligne_livraison{id, numero_lot,date_fabrique,date_peremption}",

            "versements"                             : "id,montant_verser, commantaires, created_at, upadted_at, user_id, caisse_id, user{name, emai}, caisse{code_caisse}",

            "recouvrements"                          : "id,code_recouvrement, montant_verser, mode_paiement_id, assurance_id, client_id, cretead_at, updated_at, client{id,nomcomplet,email,telephone,adresse,matricule,zone_livraison}, assurance{id,matricule,nomcomplet,adresse,telephone,email}, mode_paiement {id,libelle_} ",

            "caisses"                                : "id,code_caisse,ventes{id,numero_ticket,motif,nom_medecin,telephone,numero_ordonnance,date_prescris,pourcentage_remise,pourcenrage_payeur,etat_vente}, clotures{}, versement{}",

            "users"                                  : "id,name,email,password"
        };


    // A recupérer depuis le serveur
    var preferences = {
        "allpersons_are_childs" : 0.5,
        "nbtotalChambre" : 49,
    };

    $scope.preferences = {
        "allpersons_are_childs" : 0.5,
        "nbtotalChambre" : 49,
    };

    // les données pour le dashboard
    $scope.dashboards_year_start = 2018;
    $scope.dashboards_years = [];
    for(var p=$scope.dashboards_year_start;p <= new Date().getFullYear();p++)
    {
        $scope.dashboards_years.push(p);
    }




    //
    $scope.imgupload_location = imgupload;
    $scope.typetarifs = [];
    $scope.typepratiqus = [];
    $scope.zones = [];
    $scope.zonelivraisons = [];
    $scope.typelivraisons = [];
    $scope.langues = [];
    $scope.frequences = [];
    $scope.salles = [];
    $scope.tarifs = [];
    $scope.typeclients = [];
    $scope.pratiques = [];
    $scope.abonnements = [];
    $scope.reservations = [];
    $scope.typeproduits = [];
    $scope.produits = [];
    $scope.typeingredients = [];
    $scope.ingredients = [];
    $scope.clients = [];
    $scope.commandes = [];
    $scope.paiements = [];
    $scope.reservations = [];
    $scope.plannings = [];
    $scope.coachpratiques = [];
    $scope.levels = [];
    $scope.clients = [];

    //[{ingredient_designation:'viande',quantite:2,prix:3500'},{ingredient_designation:'poisson',quantite:1,prix:2500'}]


    // for pagination
    $scope.paginationpratique = {
        currentPage: 1,
        maxSize: 10,
        entryLimit: 10,
        totalItems: 0
    };

    $scope.paginationcoach = {
        currentPage: 1,
        maxSize: 10,
        entryLimit: 10,
        totalItems: 0
    };

    $scope.paginationcli = {
        currentPage: 1,
        maxSize: 10,
        entryLimit: 10,
        totalItems: 0
    };

    $scope.paginationprod = {
        currentPage: 1,
        maxSize: 10,
        entryLimit: 10,
        totalItems: 0
    };

    $scope.paginationingredient = {
        currentPage: 1,
        maxSize: 10,
        entryLimit: 10,
        totalItems: 0
    };

    $scope.paginationab = {
        currentPage: 1,
        maxSize: 10,
        entryLimit: 10,
        totalItems: 0
    };

    $scope.paginationcontrat = {
        currentPage: 1,
        maxSize: 10,
        entryLimit: 10,
        totalItems: 0
    };

    $scope.paginationpaiement = {
        currentPage: 1,
        maxSize: 10,
        entryLimit: 10,
        totalItems: 0
    };

    $scope.paginationplanning = {
        currentPage: 1,
        maxSize: 10,
        entryLimit: 10,
        totalItems: 0
    };

    $scope.paginationrsv = {
        currentPage: 1,
        maxSize: 10,
        entryLimit: 18,
        totalItems: 0
    };


    $scope.paginationcmd = {
        currentPage: 1,
        maxSize: 10,
        entryLimit: 10,
        totalItems: 0
    };

    $scope.paginationuser = {
        currentPage: 1,
        maxSize: 10,
        entryLimit: 10,
        totalItems: 0
    };


    $scope.filtreChambreByTypeChambre = function(e, type_chambre_id)
    {
        $scope.occupationByTypeChambre = type_chambre_id;
        console.log('arrive sur le filtre', type_chambre_id);

        $scope.getelements("infoaffiliations");

        var data_id = type_chambre_id==null ? 0: type_chambre_id;
        $('.type_chambre').each(function(key, value)
        {
            $(this).removeClass('bg-dark text-white');
            if (Number($(this).attr('data-id'))== Number(data_id))
            {
                $(this).addClass('bg-dark text-white');
            }
        });

    };


    $scope.getelements = function (type, addData=null)
    {
        rewriteType = type;

        if ($scope.pageCurrent!=null)
        {
            if($scope.pageCurrent.indexOf("list-client")!==-1)
            {
                /*if (type.indexOf('plannings')!==-1)
                {
                    rewriteType = rewriteType + "(etat:1)";
                }*/
            }
            else if ($scope.pageCurrent.indexOf("tarif")!==-1)
            {
                if (type.indexOf('tarifs')!==-1)
                {
                    rewriteType = rewriteType + "(default:true"
                        + ($('#typetarif_listtarif').val() ? ',type_tarif_id:' + $('#typetarif_listtarif').val() : "" )
                        + ")";
                }
            }
            else if ($scope.pageCurrent.indexOf("salle")!==-1)
            {
                if (type.indexOf('salles')!==-1)
                {
                    rewriteType = rewriteType + "(default:true"
                        + ($('#zone_listsalle').val() ? ',zone_id:' + $('#zone_listsalle').val() : "" )
                        + ")";
                }
            }
        }
        if (type.indexOf('dashboards')!==-1)
        {
            // addData = $scope.infosDahboardBy
            rewriteType = rewriteType + "("
                /* = listinfos*/ + ($('#info_' + addData).val() ? ',date_' + addData + ':' + '"' + $('#info_' + addData).val() + '"' : "current_"+(addData)+":true" )
                + ")";
        }

        Init.getElement(rewriteType, listofrequests_assoc[type]).then(function(data)
        {
            if (type.indexOf("typeclients")!==-1)
            {
                $scope.typeclients = data;
            }
            if (type.indexOf("list-client")!==-1)
            {
                $scope.clients = data;
                console.log($scope.clients);
            }
            if (type.indexOf('employes'))
            {
                $scope.employes = data;
            }
        }, function (msg) {
            iziToast.error({
                title: "ERREUR",
                message: "Erreur depuis le serveur, veuillez contactez l'administrateur",
                position: 'topRight'
            });
            console.log('Erreur serveur ici = ' + msg);
        });

    };

    $scope.searchtexte_client = "";
    $scope.pageChanged = function(currentpage)
    {
        if (currentpage.indexOf('pratique')!==-1 )
        {
            rewriteelement = 'pratiquespaginated(page:'+ $scope.paginationpratique.currentPage +',count:'+ $scope.paginationpratique.entryLimit
                + ($('#typepratiqu_listpratique').val() ? ',type_pratiqu_id:' + $('#typepratiqu_listpratique').val() : "" )
                + ($('#coach_listpratique').val() ? ',coach_id:' + $('#coach_listpratique').val() : "")
                +')';
            // blockUI_start_all('#section_listeclients');
            Init.getElementPaginated(rewriteelement, listofrequests_assoc["pratiques"]).then(function (data)
            {
                // blockUI_stop_all('#section_listeclients');
                console.log(data);
                // pagination controls
                $scope.paginationpratique = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationpratique.entryLimit,
                    totalItems: data.metadata.total
                };
                $scope.pratiques = data.data;
            },function (msg)
            {
                toastr.error(msg);
            });
        }
        else if ( currentpage.indexOf('coach')!==-1 )
        {
            rewriteelement = 'coachspaginated(page:'+ $scope.paginationcoach.currentPage +',count:'+ $scope.paginationcoach.entryLimit
                + ($('#searchtexte_coach').val() ? (',' + $('#searchoption_coach').val() + ':"' + $('#searchtexte_coach').val() + '"') : "" )
                + ($('#pratique_listcoach').val() ? ',pratique_id:' + $('#pratique_listcoach').val() : "" )
                + ($('#typepratiqu_listcoach').val() ? ',typepratiqu_id:' + $('#typepratiqu_listcoach').val() : "" )
                +')';
            // blockUI_start_all('#section_listeclients');
            Init.getElementPaginated(rewriteelement, listofrequests_assoc["coachs"]).then(function (data)
            {
                // blockUI_stop_all('#section_listeclients');
                console.log(data);
                // pagination controls
                $scope.paginationcoach = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationcoach.entryLimit,
                    totalItems: data.metadata.total
                };
                // $scope.noOfPages_produit = data.metadata.last_page;
                $scope.coachs = data.data;
            },function (msg)
            {
                // blockUI_stop_all('#section_listeclients');
                toastr.error(msg);
            });
        }
        else if ( currentpage.indexOf('client')!==-1 )
        {
            rewriteelement = 'clientspaginated(page:'+ $scope.paginationcli.currentPage +',count:'+ $scope.paginationcli.entryLimit
                + ($('#searchtexte_client').val() ? (',' + $('#searchoption_client').val() + ':"' + $('#searchtexte_client').val() + '"') : "" )
                /* = listreservation*/ + ($('#typepersonne_listclient').val() ? ',type_personne_id:' + $('#typepersonne_listclient').val() : "" )
                +')';
            // blockUI_start_all('#section_listeclients');
            Init.getElementPaginated(rewriteelement, listofrequests_assoc["clients"]).then(function (data)
            {
                // blockUI_stop_all('#section_listeclients');
                console.log(data);
                // pagination controls
                $scope.paginationcli = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationcli.entryLimit,
                    totalItems: data.metadata.total
                };
                // $scope.noOfPages_produit = data.metadata.last_page;
                $scope.clients = data.data;
            },function (msg)
            {
                // blockUI_stop_all('#section_listeclients');
                toastr.error(msg);
            });
        }
        else if ( currentpage.indexOf('abonnement')!==-1 )
        {
            rewriteelement = 'abonnementspaginated(page:'+ $scope.paginationab.currentPage +',count:'+ $scope.paginationab.entryLimit
                + ($scope.clientview ? ',client_id:' + $scope.clientview.id : "" )
                + ($scope.userview ? ',user_id:' + $scope.userview.id : "" )
                + ($('[name="etat_listabonnement"]:checked').attr('data-value') ? ',etat:' + '"' + $('[name="etat_listabonnement"]:checked').attr('data-value') + '"' : "" )
                /* = listreservation*/ + ($('#moyen_listreservation').val() ? ',moyen:' + '"' + $('#moyen_listreservation').val() + '"' : "" )
                /* = listabonnement*/ + ($('#client_listabonnement').val() ? ',client_id:' + $('#client_listabonnement').val() : "" )
                /* = listabonnement*/ + ($('#tarif_listabonnement').val() ? ',tarif_id:' + $('#tarif_listabonnement').val() : "" )
                /* = listabonnement*/ + ($('#typetarif_listabonnement').val() ? ',type_tarif_id:' + $('#typetarif_listabonnement').val() : "" )
                /* = listabonnement*/ + ($('#date_start_listreservation').val() ? ',date_start:' + '"' + $('#date_start_listreservation').val() + '"' : "" )
                /* = listabonnement*/ + ($('#date_end_listreservation').val() ? ',date_end:' + '"' + $('#date_end_listreservation').val() + '"' : "" )
                /* = listabonnement*/ + ($('#created_at_start_listabonnement').val() ? ',created_at_start:' + '"' + $('#created_at_start_listabonnement').val() + '"' : "" )
                /* = listabonnement*/ + ($('#created_at_end_listabonnement').val() ? ',created_at_end:' + '"' + $('#created_at_end_listabonnement').val() + '"' : "" )
                +')';
            // blockUI_start_all('#section_listeclients');
            Init.getElementPaginated(rewriteelement, listofrequests_assoc["abonnements"]).then(function (data)
            {
                // blockUI_stop_all('#section_listeclients');
                // pagination controls
                $scope.paginationab = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationab.entryLimit,
                    totalItems: data.metadata.total
                };
                $scope.abonnements = data.data;
            },function (msg)
            {
                // blockUI_stop_all('#section_listeclients');
                toastr.error(msg);
            });
        }
        else if ( currentpage.indexOf('contrat')!==-1 )
        {
            rewriteelement = 'contratspaginated(page:'+ $scope.paginationcontrat.currentPage +',count:'+ $scope.paginationcontrat.entryLimit
                + ($scope.coachview ? ',coach_id:' + $scope.coachview.id : "" )
                + ($scope.userview ? ',user_id:' + $scope.userview.id : "" )
                + ($('[name="etat_listcontrat"]:checked').attr('data-value') ? ',etat:' + '"' + $('[name="etat_listcontrat"]:checked').attr('data-value') + '"' : "" )
                /* = listcontrat*/ + ($('#coach_listcontrat').val() ? ',coach_id:' + $('#coach_listcontrat').val() : "" )
                /* = listcontrat*/ + ($('#date_debut_listcontrat').val() ? ',date_debut:' + '"' + $('#date_debut_listcontrat').val() + '"' : "" )
                /* = listcontrat*/ + ($('#date_fin_listcontrat').val() ? ',date_fin:' + '"' + $('#date_fin_listcontrat').val() + '"' : "" )
                /* = listreservation*/ + ($('#created_at_start_listcontrat').val() ? ',created_at_start:' + '"' + $('#created_at_start_listcontrat').val() + '"' : "" )
                /* = listreservation*/ + ($('#created_at_end_listcontrat').val() ? ',created_at_end:' + '"' + $('#created_at_end_listcontrat').val() + '"' : "" )
                +')';
            // blockUI_start_all('#section_listeclients');
            Init.getElementPaginated(rewriteelement, listofrequests_assoc["contrats"]).then(function (data)
            {
                // blockUI_stop_all('#section_listeclients');
                // pagination controls
                $scope.paginationcontrat = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationcontrat.entryLimit,
                    totalItems: data.metadata.total
                };
                $scope.contrats = data.data;
            },function (msg)
            {
                // blockUI_stop_all('#section_listeclients');
                toastr.error(msg);
            });
        }
        else if ( currentpage.indexOf('planning')!==-1 )
        {
            console.log('planningview', $scope.planningview);
            rewriteelement = 'planningspaginated(page:'+ $scope.paginationplanning.currentPage +',count:'+ $scope.paginationplanning.entryLimit
                + ($scope.contratview ? ',contrat_id:' + $scope.contratview.id : "" )
                + ($scope.coachview ? ',coach_id:' + $scope.coachview.id : "" )
                + ($scope.userview ? ',user_id:' + $scope.userview.id : "" )
                + ($('[name="etat_listplanning"]:checked').attr('data-value') ? ',etat:' + '"' + $('[name="etat_listplanning"]:checked').attr('data-value') + '"' : "" )
                /* = listplanning*/ + ($('#zone_listplanning').val() ? ',zone_id:' + $('#zone_listplanning').val() : "" )
                /* = listplanning*/ + ($('#salle_listplanning').val() ? ',salle_id:' + $('#salle_listplanning').val() : "" )
                /* = listplanning*/ + ($('#coach_listplanning').val() ? ',coach_id:' + $('#coach_listplanning').val() : "" )
                /* = listplanning*/ + ($('#pratique_listplanning').val() ? ',pratique_id:' + $('#pratique_listplanning').val() : "" )
                /* = listplanning*/ + ($('#heure_debut_listplanning').val() ? ',heure_debut:' + '"' + $('#heure_debut_listplanning').val() + '"' : "" )
                /* = listplanning*/ + ($('#heure_fin_listplanning').val() ? ',heure_fin:' + '"' + $('#heure_fin_listplanning').val() + '"' : "" )
                /* = listplanning*/ + ($('#date_start_listplanning').val() ? ',date_start:' + '"' + $('#date_start_listplanning').val() + '"' : "" )
                /* = listplanning*/ + ($('#date_end_listplanning').val() ? ',date_end:' + '"' + $('#date_end_listplanning').val() + '"' : "" )
                +')';
            // blockUI_start_all('#section_listeclients');
            Init.getElementPaginated(rewriteelement, listofrequests_assoc["plannings"]).then(function (data)
            {
                // blockUI_stop_all('#section_listeclients');
                // pagination controls
                $scope.paginationplanning = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationplanning.entryLimit,
                    totalItems: data.metadata.total
                };
                $scope.plannings = data.data;
            },function (msg)
            {
                // blockUI_stop_all('#section_listeclients');
                toastr.error(msg);
            });
        }
        else if ( currentpage.indexOf('reservation')!==-1 )
        {
            rewriteelement = 'reservationspaginated(page:'+ $scope.paginationrsv.currentPage +',count:'+ $scope.paginationrsv.entryLimit
                + ($scope.abonnementview ? ',abonnement_id:' + $scope.abonnementview.id : "" )
                + ($scope.planningview ? ',planning_id:' + $scope.planningview.id : "" )
                + ($scope.clientview ? ',client_id:' + $scope.clientview.id : "" )
                + ($scope.userview ? ',user_id:' + $scope.userview.id : "" )
                + ($('[name="etat_listreservation"]:checked').attr('data-value') ? ',etat:' + '"' + $('[name="etat_listreservation"]:checked').attr('data-value') + '"' : "" )
                /* = listreservation*/ + ($('#client_listreservation').val() ? ',client_id:' + $('#client_listreservation').val() : "" )
                /* = listreservation*/ + ($('#coach_listreservation').val() ? ',coach_id:' + $('#coach_listreservation').val() : "" )
                /* = listreservation*/ + ($('#pratique_listreservation').val() ? ',pratique_id:' + $('#pratique_listreservation').val() : "" )
                /* = listreservation*/ + ($('#planning_listreservation').val() ? ',planning_id:' + $('#planning_listreservation').val() : "" )
                /* = listreservation*/ + ($('#created_at_start_listreservation').val() ? ',created_at_start:' + '"' + $('#created_at_start_listreservation').val() + '"' : "" )
                /* = listreservation*/ + ($('#created_at_end_listreservation').val() ? ',created_at_end:' + '"' + $('#created_at_end_listreservation').val() + '"' : "" )
                +')';
            // blockUI_start_all('#section_listeclients');
            Init.getElementPaginated(rewriteelement, listofrequests_assoc["reservations"]).then(function (data)
            {
                // blockUI_stop_all('#section_listeclients');
                console.log('reservationspaginated', data);
                // pagination controls
                $scope.paginationrsv = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationrsv.entryLimit,
                    totalItems: data.metadata.total
                };
                $scope.reservations = data.data;
            },function (msg)
            {
                // blockUI_stop_all('#section_listeclients');
                toastr.error(msg);
            });
        }
        else if ( currentpage.indexOf('ingredient')!==-1 )
        {
            rewriteelement = 'ingredientspaginated(page:'+ $scope.paginationingredient.currentPage +',count:'+ $scope.paginationingredient.entryLimit
                + ($('#type_consommation.filter').val() ? ',type_ingredient_id:' + $('#type_consommation.filter').val() : "" )
                +')';
            // blockUI_start_all('#section_listeclients');
            Init.getElementPaginated(rewriteelement, listofrequests_assoc["ingredients"]).then(function (data)
            {
                // blockUI_stop_all('#section_listeclients');
                console.log(data);
                // pagination controls
                $scope.paginationingredient = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationingredient.entryLimit,
                    totalItems: data.metadata.total
                };
                $scope.ingredients = data.data;
            },function (msg)
            {
                // blockUI_stop_all('#section_listeclients');
                toastr.error(msg);
            });
        }
        else if ( currentpage.indexOf('produit')!==-1 )
        {
            rewriteelement = 'produitspaginated(page:'+ $scope.paginationprod.currentPage +',count:'+ $scope.paginationprod.entryLimit
                + ($('#type_produit.filter').val() ? ',type_consommation_id:' + $('#type_consommation.filter').val() : "" )
                +')';
            // blockUI_start_all('#section_listeclients');
            Init.getElementPaginated(rewriteelement, listofrequests_assoc["produits"]).then(function (data)
            {
                $scope.paginationprod = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationprod.entryLimit,
                    totalItems: data.metadata.total
                };
                $scope.produits = data.data;
            },function (msg)
            {
                toastr.error(msg);
            });
        }
        else if ( currentpage.indexOf('commande')!==-1 )
        {
            rewriteelement = 'commandespaginated(page:'+ $scope.paginationcmd.currentPage +',count:'+ $scope.paginationcmd.entryLimit
                + ($scope.clientview ? ',client_id:' + $scope.clientview.id : "" )
                + ($scope.userview ? ',user_id:' + $scope.userview.id : "" )
                + ($('[name="etat_listcommande"]:checked').attr('data-value') ? ',etat:' + '"' + $('[name="etat_listcommande"]:checked').attr('data-value') + '"' : "" )
                /* = listcommande*/ + ($('#client_listcommande').val() ? ',client_id:' + $('#client_listcommande').val() : "" )
                /* = listcommande*/ + ($('#typelivraison_listcommande').val() ? ',type_livraison_id:' + $('#typelivraison_listcommande').val() : "" )
                /* = listcommande*/ + ($('#zonelivraison_listcommande').val() ? ',zone_livraison_id:' + $('#zonelivraison_listcommande').val() : "" )
                /* = listcommande*/ + ($('#date_debut_listcommande').val() ? ',date_debut:' + '"' + $('#date_debut_listcommande').val() + '"' : "" )
                /* = listcommande*/ + ($('#date_fin_listcommande').val() ? ',date_fin:' + '"' + $('#date_fin_listcommande').val() + '"' : "" )
                /* = listcommande*/ + ($('#created_at_start_listcommande').val() ? ',created_at_start:' + '"' + $('#created_at_start_listcommande').val() + '"' : "" )
                /* = listcommande*/ + ($('#created_at_end_listcommande').val() ? ',created_at_end:' + '"' + $('#created_at_end_listcommande').val() + '"' : "" )
                  +')';
            Init.getElementPaginated(rewriteelement, listofrequests_assoc["commandes"]).then(function (data)
            {
                // blockUI_stop_all('#section_listeclients');
                console.log(data);
                // pagination controls
                $scope.paginationcmd = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationcmd.entryLimit,
                    totalItems: data.metadata.total
                };
                $scope.commandes = data.data;
            },function (msg)
            {
                // blockUI_stop_all('#section_listeclients');
                toastr.error(msg);
            });
        }
        else if ( currentpage.indexOf('paiement')!==-1 )
        {
            rewriteelement = 'paiementspaginated(page:'+ $scope.paginationpaiement.currentPage +',count:'+ $scope.paginationpaiement.entryLimit
                + ($scope.abonnementview!=null ? ',abonnement_id:' + $scope.abonnementview.id : "" )
                + ($scope.userview ? ',user_id:' + $scope.userview.id : "" )
                /* = listpaiement*/ + ($('#mode_paiement_listpaiement').val() ? ',mode_paiement:' + '"' + $('#mode_paiement_listpaiement').val() + '"' : "" )
                /* = listpaiement*/ + ($('#abonnement_listpaiement').val() ? ',abonnement_id:' + $('#abonnement_listpaiement').val() : "" )
                /* = listpaiement*/ + ($('#numab_listpaiement').val() ? ',abonnement_id:' + $('#numab_listpaiement').val() : "" )
                /* = listpaiement*/ + ($('#created_at_start_listpaiement').val() ? ',created_at_start:' + '"' + $('#created_at_start_listpaiement').val() + '"' : "" )
                /* = listpaiement*/ + ($('#created_at_end_listpaiement').val() ? ',created_at_end:' + '"' + $('#created_at_end_listpaiement').val() + '"' : "" )
                +')';
            // blockUI_start_all('#section_listeclients');
            Init.getElementPaginated(rewriteelement, listofrequests_assoc["paiements"]).then(function (data)
            {
                // blockUI_stop_all('#section_listeclients');
                console.log('paiementspaginated', data);
                // pagination controls
                $scope.paginationpaiement = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationpaiement.entryLimit,
                    totalItems: data.metadata.total
                };
                $scope.paiements = data.data;

            },function (msg)
            {
                // blockUI_stop_all('#section_listeclients');
                toastr.error(msg);
            });
        }
        else if ( currentpage.indexOf('depense')!==-1 )
        {
            rewriteelement = 'depensespaginated(page:'+ $scope.paginationdepense.currentPage +',count:'+ $scope.paginationdepense.entryLimit
                + ($scope.userview ? ',user_id:' + $scope.userview.id : "" )
                /* = listdepense*/ + ($('#searchtexte_depense').val() ? (',' + $('#searchoption_depense').val() + ':"' + $('#searchtexte_depense').val() + '"') : "" )
                /* = listdepense*/ + ($('#date_start_listdepense').val() ? ',created_at_start:' + '"' + $('#date_start_listdepense').val() + '"' : "" )
                /* = listdepense*/ + ($('#date_end_listdepense').val() ? ',created_at_end:' + '"' + $('#date_end_listdepense').val() + '"' : "" )
                +')';
            // blockUI_start_all('#section_listeclients');
            Init.getElementPaginated(rewriteelement, listofrequests_assoc["depenses"]).then(function (data)
            {
                // blockUI_stop_all('#section_listeclients');
                console.log('depensespaginated', data);
                // pagination controls
                $scope.paginationdepense = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationdepense.entryLimit,
                    totalItems: data.metadata.total
                };
                $scope.depenses = data.data;
            },function (msg)
            {
                // blockUI_stop_all('#section_listeclients');
                toastr.error(msg);
            });
        }
        else if ( currentpage.indexOf('user')!==-1 )
        {
            rewriteelement = 'userspaginated(page:'+ $scope.paginationuser.currentPage +',count:'+ $scope.paginationuser.entryLimit
                + ($('#searchrole_user').val() ? ',role_id:' + $('#searchrole_user').val() : "" )
                + ($('#searchtexte_user').val() ? (',' + $('#searchoption_user').val() + ':"' + $('#searchtexte_user').val() + '"') : "" )
                +')';
            // blockUI_start_all('#section_listeclients');
            Init.getElementPaginated(rewriteelement, listofrequests_assoc["users"]).then(function (data)
            {
                // blockUI_stop_all('#section_listeclients');
                console.log(data);
                // pagination controls
                $scope.paginationuser = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationuser.entryLimit,
                    totalItems: data.metadata.total
                };
                // $scope.noOfPages_produit = data.metadata.last_page;
                $scope.users = data.data;
            },function (msg)
            {
                // blockUI_stop_all('#section_listeclients');
                toastr.error(msg);
            });
        }
    };



    $scope.reInit = function()
    {
        console.log('arrivera ici');
        setTimeout(function () {
            $('.select2').select2();
        },100);
    };


    $scope.refreshSelect2 = function()
    {
        setTimeout(function ()
        {
            $('.select2').select2();
        },100);
    };

    // Pour detecter le changement des routes avec Angular
    $scope.linknav="/";
    $scope.currenttemplateurl = "";
    $scope.$on('$routeChangeStart', function(next, current)
    {

    });


    $scope.formatDate = function(str)
    {
        date = str.split('/');
        return date[2]+"-"+date[1]+"-"+date[0] ;
    };


    $scope.$on('$routeChangeSuccess', function(next, current)
    {
        setTimeout(function ()
        {
            $('.select2').select2();
        },1000);



    });



    $scope.datatoggle=function (href,addclass)
    {
        $(href).attr('class').match(addclass) ? $(href).removeClass(addclass) : $(href).addClass(addclass);
    };


    $scope.eraseFile = function (idInput)
    {
        $('#' + idInput).val("");
        $('#erase_'+ idInput).val("yes");
        $('#aff' + idInput).attr('src',imgupload);
    };

    function emptyform(type)
    {
        let dfd = $.Deferred();
        $('.ws-number').val("");
        $("input[id$=" + type + "], textarea[id$=" + type + "], select[id$=" + type + "], button[id$=" + type + "]").each(function ()
        {
            $(this).val("");
            $(this).attr($(this).hasClass('btn') ? 'disabled' : 'readonly', false);
        });


        $('#img' + type)
            .val("");
        $('#affimg' + type).attr('src',imgupload);

        if (type.indexOf('coach')!==-1 || type.indexOf('client')!==-1)
        {
            if (!$('#password_' + type).hasClass('required'))
            {
                $('#password_' + type).addClass('required');
                $('#confirmpassword_' + type).addClass('required');
            }
        }

        return dfd.promise();
    }

    // Permet de changer le statut du formulaire a editable ou non
    function changeStatusForm(type, status, disabled=false)
    {
        var doIt = false;

    }

    // Permet d'afficher le formulaire
    $scope.showModalAdd=function (type)
    {

        setTimeout(function ()
        {
            // On fait d'abord un destroy
            if (!$('select').data('select2')) {
                $('select').select2('destroy');
            }
            // Souscription
            $('.select2').select2();
        },500);


        emptyform(type);

        $("#modal_add"+type).modal('show');
    };

    $scope.showModalTransformProforma = function()
    {

        emptyform('transformProforma');
        $("#modal_addtransformProforma").modal('show');
    };

    $scope.chstat = {'id':'', 'statut':'', 'type':'', 'title':''};
    $scope.showModalStatut = function(event,type, statut, obj= null)
    {
        var id = 0;
        id = obj.id;
        $scope.chstat.id = id;
        $scope.chstat.statut = statut;
        $scope.chstat.type = type;
        $scope.chstat.title = $(event.target).attr('title');

        emptyform('chstat');
        $("#modal_addchstat").modal('show');
    };


    $scope.changeStatut = function(e, type)
    {
        var form = $('#form_addchstat');
        var send_data = {id: $scope.chstat.id, etat:$scope.chstat.statut, commentaire: $('#commentaire_chstat').val()};
        form.parent().parent().blockUI_start();
        Init.changeStatut(type, send_data).then(function(data)
        {
            form.parent().parent().blockUI_stop();
            if (data.data!=null && !data.errors)
            {
                if (type.indexOf('reservation')!==-1)
                {
                    var found = false;
                    $.each($scope.reservations, function (keyItem, valueItem)
                    {
                        if (valueItem.id==send_data.id)
                        {
                            $scope.reservations[keyItem].etat = $scope.chstat.statut+'';
                            found = true;
                        }
                        return !found;
                    });
                }
                iziToast.success({
                    title: (!send_data.id ? 'AJOUT' : 'MODIFICATION'),
                    message: "succès",
                    position: 'topRight'
                });
                $("#modal_addchstat").modal('hide');
            }
            else
            {
                iziToast.error({
                    title: "",
                    message: '<span class="h4">' + data.errors + '</span>',
                    position: 'topRight'
                });
            }
        }, function (msg)
        {
            form.parent().parent().blockUI_stop();
            iziToast.error({
                message: '<span class="h4">' + msg + '</span>',
                position: 'topRight'
            });
        });
        console.log(type,'current status', $scope.chstat);
    };


    // Add element in database and in scope
    $scope.addElement = function(e,type,from='modal',sans_abonnement=false)
    {

        console.log('arrive ici');
        e.preventDefault();

        var form = $('#form_add' + type);

        var formdata=(window.FormData) ? ( new FormData(form[0])): null;
        var send_data=(formdata!==null) ? formdata : form.serialize();

        // A ne pas supprimer
        send_dataObj = form.serializeObject();
        console.log('send_dataObj', $('#id_client').val(), send_dataObj, send_data, sans_abonnement);

        continuer = true;
        if (type.indexOf('produit')!==-1)
        {
            //+ ($('[name="etat_listplanning"]:checked').attr('data-value') ? ',etat:' + '"' + $('[name="etat_listplanning"]:checked').attr('data-value') + '"' : "" )
            if ($('[name="is_mixable"]:checked').val()=='true' && $scope.detailProduits.length==0)
            {
                iziToast.error({
                    title: "",
                    message: "Vous devez au moins ajouter une ligne dans la section composition",
                    position: 'topRight'
                });
                return
            }
            else if ($('[name="is_mixable"]:checked').val()=='false')
            {
                $scope.detailProduits = [];
            }
            send_data.append('detailproduits', JSON.stringify($scope.detailProduits));
            console.log("detailproduits", $scope.detailProduits);

        }


        if (form.validate() && continuer)
        {
            form.parent().parent().blockUI_start();
            Init.saveElementAjax(type, send_data, sans_abonnement).then(function(data)
            {
                console.log('data retour', data);
                form.parent().parent().blockUI_stop();
                if (data.data!=null && !data.errors)
                {
                    emptyform(type);
                    getObj = data['data'][type + 's'][0];
                    if (type.indexOf('typetarif')!==-1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.typetarifs.push(getObj);
                        }
                        else
                        {
                            $.each($scope.typetarifs, function (keyItem, oneItem)
                            {
                                if (oneItem.id===getObj.id)
                                {
                                    $scope.typetarifs[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('tarif')!==-1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.tarifs.push(getObj);
                        }
                        else
                        {
                            $.each($scope.tarifs, function (keyItem, oneItem)
                            {
                                if (oneItem.id===getObj.id)
                                {
                                    $scope.tarifs[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('typepratiqu')!==-1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.typepratiqus.push(getObj);
                        }
                        else
                        {
                            $.each($scope.typepratiqus, function (keyItem, oneItem)
                            {
                                if (oneItem.id===getObj.id)
                                {
                                    $scope.typepratiqus[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }

                    iziToast.success({
                        title: (!send_dataObj.id ? 'AJOUT' : 'MODIFICATION'),
                        message: "succès",
                        position: 'topRight'
                    });
                    $("#modal_add" + type).modal('hide');
                }
                else
                {
                    if(data.sans_abonnement){
                        $scope.donneesReservation.clientId = send_dataObj.client;
                        $scope.donneesReservation.planningId = send_dataObj.planning;
                        $scope.donneesReservation.message = data.errors;
                        $scope.donneesReservation.type = type;
                        $("#modal_add" + type).modal('hide');
                        $('#reservation').modal('show');
                    }
                    else{
                        iziToast.error({
                            title: "",
                            message: '<span class="h4">' + data.errors + '</span>',
                            position: 'topRight'
                        });
                    }
                }
            }, function (msg)
            {
                form.parent().parent().blockUI_stop();
                iziToast.error({
                    title: (!send_data.id ? 'AJOUT' : 'MODIFICATION'),
                    message: '<span class="h4">Erreur depuis le serveur, veuillez contactez l\'administrateur</span>',
                    position: 'topRight'
                });
                console.log('Erreur serveur ici = ' + msg);
            });
            $('#reservation').modal('hide');
         }
    };

    $scope.redirectToAbonnement=function (){
    window.location.href = '#!/list-abonnement';
    window.location.reload();
    };

    $scope.showModalUpdate=function (type,itemId, forceChangeForm=false)
    {
        reqwrite = type + "s" + "(id:"+ itemId + ")";

        Init.getElement(reqwrite, listofrequests_assoc[type + "s"]).then(function(data)
        {
            var item = data[0];

            console.log('item ', type, item);

            $scope.updatetype = type;
            $scope.updateelement = item;

            $scope.showModalAdd(type);

            $('#id_' + type).val(item.id);

            if (type.indexOf("typetarif")!==-1)
            {
                $('#designation_' + type).val(item.designation);
                $('#description_' + type).val(item.description);
                $('#duree_' + type).val(item.duree);
                var frequence_id = '';
                if (item.frequence_duree)
                {
                    frequence_id = item.frequence_duree.id;
                }
                $('#frequence_duree_' + type).val(frequence_id);
            }
        }, function (msg) {
            iziToast.error({
                message: "Erreur depuis le serveur, veuillez contactez l'administrateur",
                position: 'topRight'
            });
            console.log('Erreur serveur ici = ' + msg);
        });
    };


    $scope.showModalClonage=function (type,itemId)
    {
        reqwrite = type + "s" + "(id:"+ itemId + ")";

        Init.getElement(reqwrite, listofrequests_assoc[type + "s"]).then(function(data)
        {
            var item = data[0];

            console.log('item ', type, item);

            $scope.updatetype = type;
            $scope.updateelement = item;

            $scope.showModalAdd(type);

            // Pour le clonage, on vide l'id pour permettre l'insertion
            //$('#id_' + type).val(item.id);
            if (type.indexOf("menu")!==-1)
            {
                $('#libelle_' + type).val(item.libelle);
                $('#dateprevue_' + type).val(item.date_prevue);
                $('#tempsjournee_' + type).val(item.temps_journee.id);
                $scope.menuview = item;

                $scope.menu_consommations = [];
                $.each($scope.menuview.menu_consommations, function (key, value) {
                    $scope.menu_consommations.push(value.consommation_id);
                });
                console.log('lancer', $scope.menu_consommations);
            }

        }, function (msg) {
            iziToast.error({
                message: "Erreur depuis le serveur, veuillez contactez l'administrateur",
                position: 'topRight'
            });
            console.log('Erreur serveur ici = ' + msg);
        });
    };

    $scope.deleteElement=function (type,itemId)
    {
        var msg = 'Voulez-vous vraiment effectué cette suppression ?';
        var title = 'SUPPRESSION';
        iziToast.question({
            timeout: 0,
            close: false,
            overlay: true,
            displayMode: 'once',
            id: 'question',
            zindex: 999,
            title: title,
            message: msg,
            position: 'center',
            buttons: [
                ['<button class="font-bold">OUI</button>', function (instance, toast) {

                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

                    Init.removeElement(type, itemId).then(function (data) {

                        console.log('deleted', data);
                        if (data.data && !data.errors)
                        {
                            if (type.indexOf('typetarif')!==-1)
                            {
                                $.each($scope.typetarifs, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===itemId)
                                    {
                                        $scope.typetarifs.splice(keyItem, 1);
                                        return false;
                                    }
                                });
                            }

                            iziToast.success({
                                title: title,
                                message: "succès",
                                position: 'topRight'
                            });
                        }
                        else
                        {
                            iziToast.error({
                                title: title,
                                message: data.errors,
                                position: 'topRight'
                            });
                        }

                    }, function (msg) {
                        iziToast.error({
                            title: title,
                            message: "Erreur depuis le serveur, veuillez contactez l'administrateur",
                            position: 'topRight'
                        });
                    });

                }, true],
                ['<button>NON</button>', function (instance, toast) {

                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

                }],
            ],
            onClosing: function(instance, toast, closedBy){
                console.log('Closing | closedBy: ' + closedBy);
            },
            onClosed: function(instance, toast, closedBy){
                console.log('Closed | closedBy: ' + closedBy);
            }
        });
    };
    /*
    | Charger dynamiquement des colonnes d'ajout
    |
    |
     */

    /*
  |
  |
  |
   */

});


// Vérification de l'extension des elements uploadés
function isValide(fichier)
{
    var Allowedextensionsimg=new Array("jpg","JPG","jpeg","JPEG","gif","GIF","png","PNG");
    var Allowedextensionsvideo=new Array("mp4");
    for (var i = 0; i < Allowedextensionsimg.length; i++)
        if( ( fichier.lastIndexOf(Allowedextensionsimg[i]) ) != -1)
        {
            return 1;
        }
    for (var j = 0; j < Allowedextensionsvideo.length; j++)
        if( ( fichier.lastIndexOf(Allowedextensionsvideo[j]) ) != -1)
        {
            return 2;
        }
    return 0;
}

// FileReader pour la photo
function Chargerphoto(idform)
{
    var fichier = document.getElementById("img"+idform);
    (isValide(fichier.value)!=0) ?
        (
            fileReader=new FileReader(),
                (isValide(fichier.value)==1) ?
                    (
                        fileReader.onload = function (event) { $("#affimg"+idform).attr("src",event.target.result);},
                            fileReader.readAsDataURL(fichier.files[0]),
                            (idform=='produit') ? $("#imgproduit_recup").val("") : ""
                    ):null
        ):(
            alert("L'extension du fichier choisi ne correspond pas aux règles sur les fichiers pouvant être uploader"),
                $('#img'+idform).val(""),
                $('#affimg'+idform).attr("src",""),
                $('.input-modal').val("")
        );
}

app.controller('add-row', function($scope){
    $scope.produits = [
        {id: 1, colId:['col1', 'col4'], dataTypeName: 'Date'},
        {id: 2, colId:['col2', 'col3'], dataTypeName: 'Alpha'},
        {id: 3, colId:['col5', 'col6', 'col7', 'col8'], dataTypeName: 'List Value'}
    ];

    $scope.columns = [{colId: 'col1', name:'', produits:[], dataFormat:'',  excludedChar:'', maxLength:'', isKeyField:false, isKeyRequired:false }];

    $scope.addNewColumn = function() {
        var newItemNo = $scope.columns.length+1;
        $scope.columns.push({'colId':'col'+newItemNo});
    };


    $scope.removeColumn = function(index) {
        // remove the row specified in index
        $scope.columns.splice( index, 1);
        // if no rows left in the array create a blank array
        if ( $scope.columns.length() === 0 || $scope.columns.length() == null){
            alert('no rec');
            $scope.columns.push = [{"colId":"col1"}];
        }


    };
   $scope.ajouterLigne = function () {
       
   }
});
