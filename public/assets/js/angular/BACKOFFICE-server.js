var app=angular.module('BackEnd',[ 'ngRoute' , 'ngSanitize' , 'ngLoadScript', 'ui.bootstrap' , 'angular.filter']);

var BASE_URL='http://'+location.host+'/oasis_back/public/';
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
        .when("/informations", {
            templateUrl : "page/informations",
        })
        .when("/list-typetarif", {
            templateUrl : "page/list-typetarif",
        })
        .when("/list-typepratique", {
            templateUrl : "page/list-typepratiqu",
        })
        .when("/list-typeplanning", {
            templateUrl : "page/list-typeplanning",
        })
        .when("/list-zone", {
            templateUrl : "page/list-zone",
        })
        .when("/list-zonelivraison", {
            templateUrl : "page/list-zonelivraison",
        })
        .when("/list-langue", {
            templateUrl : "page/list-langue",
        })
        .when("/list-frequence", {
            templateUrl : "page/list-frequence",
        })
        .when("/list-tarif", {
            templateUrl : "page/list-tarif",
        })
        .when("/list-client", {
            templateUrl : "page/list-client",
        })
        .when("/detail-client/:itemId", {
            templateUrl : "page/detail-client",
        })
        .when("/list-abonnement", {
            templateUrl : "page/list-abonnement",
        })
        .when("/list-paiement", {
            templateUrl : "page/list-paiement",
        })
        .when("/detail-abonnement/:itemId", {
            templateUrl : "page/detail-abonnement",
        })
        .when("/list-reservation", {
            templateUrl : "page/list-reservation",
        })
        .when("/list-pratique", {
            templateUrl : "page/list-pratique",
        })
        .when("/list-coach", {
            templateUrl : "page/list-coach",
        })
        .when("/detail-coach/:itemId", {
            templateUrl : "page/detail-coach",
        })
        .when("/list-contrat", {
            templateUrl : "page/list-contrat",
        })
        .when("/detail-contrat/:itemId", {
            templateUrl : "page/detail-contrat",
        })
        .when("/list-salle", {
            templateUrl : "page/list-salle",
        })
        .when("/list-planning", {
            templateUrl : "page/list-planning",
        })
        .when("/detail-planning/:itemId", {
            templateUrl : "page/detail-planning",
        })
        .when("/list-produit", {
            templateUrl : "page/list-produit",
        })
        .when("/list-ingredient", {
            templateUrl : "page/list-ingredient",
        })
        .when("/list-commande", {
            templateUrl : "page/list-commande",
        })
        .when("/list-profil", {
            templateUrl : "page/list-profil",
        })
        .when("/list-utilisateur", {
            templateUrl : "page/list-utilisateur",
        })
        .when("/detail-utilisateur/:itemId", {
            templateUrl : "page/detail-utilisateur",
        });
});



// Spécification fonctionnelle du controller
app.controller('BackEndCtl',function (Init,$location,$scope,$filter, $log,$q,$route, $routeParams, $timeout)
{

    /*window.Echo.channel('chan-demo')
        .listen('ClientEvent', (e) => {
            console.log('arrive sur le client');
            iziToast.info({
                progressBar: false,
                title: "Notification",
                message: "Depuis angularjs",
                position: 'topRight'
            });
        });*/

    var listofrequests_assoc =
        {
            "typetarifs"                           : "id,designation,description,tarifs{id},frequence_duree{id,designation,nb_jour},duree",
            "typepratiqus"                         : "id,designation,pratiques{id}",
            "typeplannings"                        : "id,designation,plannings{id}",
            "zones"                                : "id,designation,adresse,salles{id}",
            "zonelivraisons"                       : "id,designation,tarif,commandes{id}",
            "typelivraisons"                       : "id,designation",
            "langues"                              : "id,designation,planning_langues{id}",
            "frequences"                           : "id,designation,nb_jour",
            "tarifs"                               : "id,designation,prix,type_tarif{id,designation,frequence_duree{id,designation,nb_jour},duree},frequence_seance{id,designation},nb_seance,abonnements{id}",
            "pratiques"                            : "id,designation,image,description,type_pratiqu_id,type_pratiqu{id,designation},coach_pratiques{id}",
            "salles"                               : "id,designation,nb_personne,zone_id,zone{id,designation},plannings{id}",
            "coachs"                               : "id,description,telephone,user_id,user{id,name,email,image},coach_pratiques{id,pratique_id},contrats{id,date_debut,date_fin},nb_contrat,nb_planning,created_at_fr",
            "clients"                              : "id,nom,prenom,email,image,telephone,etat,abonnee,type_personne_id,type_personne{id,designation},abonnements{id},nb_abonnement,nb_commande,nb_reservation,ca_abonnement,ca_commande,created_at_fr",
            "typepersonnes"                        : "id,designation",
            "abonnements"                          : "id,date,date_fr,date_expiration,tarif_id,tarif{id},commentaire,client_id,client{id,nom,prenom,telephone,email,abonnee},reservations{id},total_amount,left_to_pay,displayetat,displaycoloretat,user{name,image}",
            "paiements"                            : "id,abonnement_id,abonnement{tarif{prix},client{nom,prenom,email,telephone}},montant,remise,restant,mode_paiement,fichier,commentaire,user{name,image},created_at_fr",
            "coachpratiques"                       : "id,coach_id,coach{id,user{name}},pratique_id,pratique{designation}",
            "levels"                               : "id,designation",
            "plannings"                            : "id,date,date_fr,heure_debut,heure_fin,etat,gratuite,salle{id,designation},coach_pratique{id,coach_id,pratique{designation},coach{id,user{name}},pratique_id},contrat{id},type_planning{id,designation},planning_langues{id,langue_id,langue{id,designation}},type_personne{id},level{id,designation},reservations{id},displayetat,displaycoloretat,user{name,image}",
            "contrats"                             : "id,date_debut,date_fin,coach_id,coach{id,user{id,name,email}},plannings{id},displayetat,displaycoloretat,user{name,image}",
            "reservations"                         : "id,etat,decomptee,created_at_fr,planning{id,date_fr,heure_debut,heure_fin,coach_pratique{id,coach_id,pratique{designation},coach{id,user{name}},pratique_id}},abonnement{id,client{id,nom,prenom,abonnee}}",
            "typeproduits"                         : "id,designation,produits{id}",
            "produits"                             : "id,designation,image,is_mixable,prix,type_produit_id,type_produit{id,designation},produit_type_ingredients{id,has_supplement,prix,quantite,type_ingredient{id}},nb_commande",
            "typeingredients"                      : "id,designation,ingredients{id}",
            "ingredients"                          : "id,designation,prix,image,type_ingredient_id,type_ingredient{id,designation}",


            "commandes"                            : "id,total,client_id,client{id,nom,prenom},commande_produits{id,prix,quantite,produit_id,produit{id,designation,type_produit{designation}},liste_ingredient},type_livraison_id,type_livraison{id,designation},zone_livraison_id,zone_livraison{id,designation},adresse_livraison,receveur_livraison,etat,displayetat,displaycoloretat,created_at_fr,updated_at",
            "dashboards"                           : "reservations,commandes,abonnements",


            "permissions"                          : "id,name,display_name,guard_name",
            "roles"                                : "id,name,guard_name,permissions{id,name,display_name,guard_name}",
            "users"                                : "id,name,email,password,image,roles{id,name,guard_name,permissions{id,name,display_name,guard_name}},nb_abonnement,nb_contrat,nb_planning,nb_reservation,nb_paiement,pourcentage_abonnement,pourcentage_contrat,pourcentage_planning,pourcentage_reservation,pourcentage_paiement,last_login,last_login_ip,created_at_fr"
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
    $scope.contrats = [];

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
            if($scope.pageCurrent.indexOf("reservation")!==-1)
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
            if (type.indexOf("typetarifs")!==-1)
            {
                $scope.typetarifs = data;
            }
            else if (type.indexOf("tarifs")!==-1)
            {
                $scope.tarifs = data;
            }
            else if (type.indexOf("typepratiqus")!==-1)
            {
                $scope.typepratiqus = data;
            }
            else if (type.indexOf("coachpratiques")!==-1)
            {
                $scope.coachpratiques = data;
            }
            else if (type.indexOf("pratiques")!==-1)
            {
                $scope.pratiques = data;
            }
            else if (type.indexOf("typeplannings")!==-1)
            {
                $scope.typeplannings = data;
            }
            else if (type.indexOf("zonelivraisons")!==-1)
            {
                $scope.zonelivraisons = data;
            }
            else if (type.indexOf("typelivraisons")!==-1)
            {
                $scope.typelivraisons = data;
            }
            else if (type.indexOf("zones")!==-1)
            {
                $scope.zones = data;
            }
            else if (type.indexOf("langues")!==-1)
            {
                $scope.langues = data;
            }
            else if (type.indexOf("frequences")!==-1)
            {
                $scope.frequences = data;
            }
            else if (type.indexOf("salles")!==-1)
            {
                $scope.salles = data;
            }
            else if (type.indexOf("clients")!==-1)
            {
                $scope.clients = data;
            }
            else if (type.indexOf("coachs")!==-1)
            {
                $scope.coachs = data;
            }
            else if (type.indexOf("typepersonnes")!==-1)
            {
                $scope.typepersonnes = data;
            }
            else if (type.indexOf("levels")!==-1)
            {
                $scope.levels = data;
            }
            else if (type.indexOf("plannings")!==-1)
            {
                $scope.plannings = data;
            }
            else if (type.indexOf("abonnements")!==-1)
            {
                $scope.abonnements = data;
            }
            else if (type.indexOf("paiements")!==-1)
            {
                $scope.paiements = data;
            }
            else if (type.indexOf("typeproduits")!==-1)
            {
                $scope.typeproduits = data;
            }
            else if (type.indexOf("produits")!==-1)
            {
                $scope.produits = data;
            }
            else if (type.indexOf("typeingredients")!==-1)
            {
                $scope.typeingredients = data;
            }
            else if (type.indexOf("ingredients")!==-1)
            {
                $scope.produits = data;
            }
            else if (type.indexOf("permissions")!==-1)
            {
                $scope.permissions = data;
            }
            else if (type.indexOf("roles")!==-1)
            {
                $scope.roles = data;
            }
            else if (type.indexOf("users")!==-1)
            {
                $scope.users = data;
            }
            else if (type.indexOf("dashboards")!==-1)
            {
                if (addData.indexOf("day")!==-1)
                {
                    $scope.dashboards_day = data;
                    $scope.dashboards_day[0].reservations = JSON.parse(data[0].reservations);
                    $scope.dashboards_day[0].commandes = JSON.parse(data[0].commandes);
                    $scope.dashboards_day[0].abonnements = JSON.parse(data[0].abonnements);
                }
                else if (addData.indexOf("month")!==-1)
                {
                    $scope.dashboards_month = data;
                    $scope.dashboards_month[0].reservations = JSON.parse(data[0].reservations);
                    $scope.dashboards_month[0].commandes = JSON.parse(data[0].commandes);
                    $scope.dashboards_month[0].abonnements = JSON.parse(data[0].abonnements);
                }
                else if (addData.indexOf("year")!==-1)
                {
                    $scope.dashboards_year = data;
                    $scope.dashboards_year[0].reservations = JSON.parse(data[0].reservations);
                    $scope.dashboards_year[0].commandes = JSON.parse(data[0].commandes);
                    $scope.dashboards_year[0].abonnements = JSON.parse(data[0].abonnements);
                }
                console.log('infos du dashboards', addData);

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
        if ( currentpage.indexOf('pratique')!==-1 )
        {
            rewriteelement = 'pratiquespaginated(page:'+ $scope.paginationpratique.currentPage +',count:'+ $scope.paginationpratique.entryLimit
                + ($('#typepratiqu_listpratique').val() ? ',type_pratiqu_id:' + $('#typepratiqu_listpratique').val() : "" )
                + ($('#coach_listpratique').val() ? ',coach_id:' + $('#coach_listpratique').val() : "" )
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


    $scope.OneBuffetAlReadySelected = true;
    // Permet d'ajouter une reservation à la liste des reservation d'une facture
    $scope.menu_consommations = [];
    $scope.addToMenu = function (event, itemId)
    {
        $scope.OneBuffetAlReadySelected = true;
        $scope.consommation_buffet_id = null;
        $scope.menu_consommations = [];
        $("[id^=consommation_menu]").each(function (key,value)
        {
            if ($(this).prop('checked'))
            {
                var consommation_id = Number($(this).attr('data-consommation-id'));
                $.each($scope.consommations, function (key, value) {
                    if (consommation_id==value.id && value.is_buffet)
                    {
                        $scope.OneBuffetAlReadySelected = false;
                        $scope.consommation_buffet_id = consommation_id;
                        /*$("[id^=consommation_menu]").each(function (keyUn,valueUn)
                        {
                            if(consommation_id!=Number($(this).attr('data-consommation-id')))
                            {
                                console.log('checked', $(this).prop('checked'));
                                $(this).prop('checked', false);
                                console.log('checked', $(this).prop('checked'));

                            }
                        })*/;
                        $scope.menu_consommations.push(consommation_id);
                    }
                });
                if ($scope.OneBuffetAlReadySelected)
                {
                    console.log($scope.OneBuffetAlReadySelected);
                    $scope.menu_consommations.push(consommation_id);
                }
            }
        });

        console.log('arrive menu', $scope.menu_consommations);
    };



    // Permet d'ajouter une permission à la liste des permissions d'un role
    $scope.role_permissions = [];
    $scope.addToRole = function (event, itemId)
    {
        $scope.role_permissions = [];
        $("[id^=permission_role]").each(function (key,value)
        {
            if ($(this).prop('checked'))
            {
                var permission_id = $(this).attr('data-permission-id');
                $scope.role_permissions.push(permission_id);
            }
        });
        console.log('arrive', $scope.role_permissions);
    };


    $scope.reInit = function()
    {
        console.log('arrivera ici');
        setTimeout(function () {
            $('.select2').select2();
        },100);
    };

    $scope.panier = [];
    $scope.addToCart = function(event, item, action=1, goodprix, for_location=false)
    {
        if (for_location)
        {
            if ($scope.locationview && !$scope.locationview.can_updated)
            {
                iziToast.info({
                    message: "Cette location n'est plus modifiable",
                    position: 'topRight'
                });
                return ;
            }
            else
            {
                var add = true;
                $.each($scope.panier, function (key, value)
                {
                    if (Number(value.activite_id) === Number(item.id))
                    {
                        console.log('value', value);
                        if (action==0)
                        {
                            $scope.panier.splice(key,1);
                        }
                        else
                        {
                            $scope.panier[key].quantite+=action;
                            if ($scope.panier[key].quantite==0)
                            {
                                $scope.panier.splice(key,1);
                            }
                        }
                        add = false;
                        //}
                    }
                    return add;
                });

                if (add)
                {
                    $scope.panier.push({"id":item.id, "activite_id":item.id, "libelle": item.libelle, "quantite" : 1, "image": item.image, "prix":goodprix})
                }
            }
        }
        else
        {
            if ($scope.commandeview && !$scope.commandeview.can_updated)
            {
                iziToast.info({
                    message: "Cette commande n'est plus modifiable",
                    position: 'topRight'
                });
                return ;
            }
            else
            {

                var add = true;
                $.each($scope.panier, function (key, value)
                {
                    console.log('ici adorand', goodprix);

                    if (Number(value.menu_consommation_id) === Number(item.id) && Number(value.prix) === Number(goodprix))
                    {
                        /*if (goodprix)
                        {
                            if (value.prix==goodprix)
                            {
                                if (action==0)
                                {
                                    $scope.panier.splice(key,1);
                                }
                                else
                                {
                                    $scope.panier[key].quantite+=action;
                                    if ($scope.panier[key].quantite==0)
                                    {
                                        $scope.panier.splice(key,1);
                                    }
                                }
                                add = false;
                            }
                        }
                        else
                        {*/
                        console.log('value', value);
                        if (action==0)
                        {
                            $scope.panier.splice(key,1);
                        }
                        else
                        {
                            $scope.panier[key].quantite+=action;
                            if ($scope.panier[key].quantite==0)
                            {
                                $scope.panier.splice(key,1);
                            }
                        }
                        add = false;
                        //}
                    }
                    return add;
                });

                if (add)
                {
                    $scope.panier.push({"id":item.id, "menu_consommation_id":item.id, "libelle": item.consommation.libelle, "quantite" : 1, "image": item.consommation.image, "prix":goodprix})
                }
            }
        }

    };

    $scope.seeChange = function()
    {
        console.log('categoriereservation_reservation', $scope.categoriereservation_reservation);
    };

    $scope.seeGratuite = function()
    {
        console.log('gratuite_planning', $scope.gratuite_planning);
    };

    $scope.seeDecompte = function()
    {
        console.log('decomptee_reservation', $scope.decomptee_reservation);
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
        $scope.currenttemplateurl = current.templateUrl;
        /******* Réintialisation de certaines valeurs *******/

        $scope.pageRecette = false;
        $scope.pageOccupation = false;
        $scope.pageInfos = false;
        $scope.pageDashboard = false;
        $scope.pageCurrent = null;
        $scope.clientview = null;
        $scope.coachview = null;
        $scope.userview = null;
        $scope.abonnementview = null;


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
        /******* /Réintialisation de certaines valeurs *******/


        // Pour donner la posssiblité à un utilisateur connecté de modifier son profil
        $scope.getelements('roles');


        // blockUI_start_all("#content");
        $scope.linknav =$location.path();
        if(angular.lowercase(current.templateUrl).indexOf('dashboard')!==-1)
        {
            $scope.pageDashboard = true;
            $scope.getelements('dashboards', 'day');
            $scope.getelements('dashboards', 'month');
            $scope.getelements('dashboards', 'year');
        }
        else if(angular.lowercase(current.templateUrl).indexOf('informations')!==-1)
        {
            $scope.pageInfos = true;
            $scope.getelements("typechambres");
            $scope.getelements("tempsjournees");
            $scope.getelements("activites");
        }
        else if(angular.lowercase(current.templateUrl).indexOf('list-typetarif')!==-1)
        {
            $scope.getelements("frequences");
            $scope.getelements("typetarifs");
        }
        else if(angular.lowercase(current.templateUrl).indexOf('list-tarif')!==-1)
        {
            $scope.pageCurrent = "tarif";
            $scope.getelements("frequences");
            $scope.getelements("typetarifs");
            $scope.getelements("tarifs");
        }
        else if(angular.lowercase(current.templateUrl).indexOf('list-typepratiqu')!==-1)
        {
            $scope.getelements("typepratiqus");
        }
        else if(angular.lowercase(current.templateUrl).indexOf('list-pratique')!==-1)
        {
            $scope.getelements("coachs");
            $scope.getelements("typepratiqus");
            $scope.pageChanged("pratique");
        }
        else if(angular.lowercase(current.templateUrl).indexOf('list-typeplanning')!==-1)
        {
            $scope.getelements("typeplannings");
        }
        else if(angular.lowercase(current.templateUrl).indexOf('list-zonelivraison')!==-1)
        {
            $scope.getelements("zonelivraisons");
        }
        else if(angular.lowercase(current.templateUrl).indexOf('list-zone')!==-1)
        {
            $scope.getelements("zones");
        }
        else if(angular.lowercase(current.templateUrl).indexOf('list-langue')!==-1)
        {
            $scope.getelements("langues");
        }
        else if(angular.lowercase(current.templateUrl).indexOf('list-frequence')!==-1)
        {
            $scope.getelements("frequences");
        }
        else if(angular.lowercase(current.templateUrl).indexOf('list-salle')!==-1)
        {
            $scope.pageCurrent = "salle";
            $scope.getelements("zones");
            $scope.getelements("salles");
        }
        else if(angular.lowercase(current.templateUrl).indexOf('coach')!==-1)
        {
            $scope.coachview = null;
            if(current.params.itemId)
            {
                var req = "coachs";
                $scope.coachview = {};
                rewriteReq = req + "(id:" + current.params.itemId + ")";
                Init.getElement(rewriteReq, listofrequests_assoc[req]).then(function (data)
                {
                    $scope.coachview = data[0];


                    $scope.getelements("zones");
                    $scope.getelements("salles");
                    $scope.getelements("pratiques");

                    $scope.pageChanged('contrats');
                    $scope.pageChanged('plannings');

                    console.log($scope.coachview );
                    console.log('coachId', current.params.itemId);
                },function (msg)
                {
                    toastr.error(msg);
                });
            }
            else
            {
                $scope.getelements("typepratiqus");
                $scope.getelements("pratiques");
                $scope.pageChanged("coach");
            }
        }
        else if(angular.lowercase(current.templateUrl).indexOf('contrat')!==-1)
        {

            $scope.contratview = null;
            if(current.params.itemId)
            {
                var req = "contrats";
                $scope.contratview = {};
                rewriteReq = req + "(id:" + current.params.itemId + ")";
                Init.getElement(rewriteReq, listofrequests_assoc[req]).then(function (data)
                {
                    $scope.contratview = data[0];


                    $scope.getelements("zones");
                    $scope.getelements("salles");
                    $scope.getelements("pratiques");
                    $scope.pageChanged("planning");

                },function (msg)
                {
                    console.log('error', msg)
                });
            }
            else
            {
                $scope.getelements("coachs");
                $scope.pageChanged("contrat");
            }
        }
        else if(angular.lowercase(current.templateUrl).indexOf('abonnement')!==-1)
        {
            $scope.getelements("clients");
            $scope.getelements("typetarifs");
            $scope.getelements("tarifs");

            if(current.params.itemId)
            {
                var req = "abonnements";
                $scope.abonnementview = {};
                rewriteReq = req + "(id:" + current.params.itemId + ")";
                Init.getElement(rewriteReq, listofrequests_assoc[req]).then(function (data)
                {
                    $scope.abonnementview = data[0];

                    $scope.pageChanged("paiement");
                    $scope.pageChanged("reservation");

                    console.log('detailsabonnement', $scope.abonnementview);

                },function (msg)
                {
                    console.log('error', msg)
                });
            }
            else
            {
                $scope.pageChanged("abonnement");
            }
        }
        else if(angular.lowercase(current.templateUrl).indexOf('planning')!==-1)
        {
            $scope.getelements("coachs");
            $scope.getelements("langues");
            $scope.getelements("typeplannings");
            $scope.getelements("typepersonnes");
            $scope.getelements("levels");
            $scope.getelements("zones");
            $scope.getelements("salles");
            $scope.getelements("pratiques");
            $scope.getelements("coachpratiques");

            $scope.coach_selected = null;
            $scope.gratuite_planning = null;

            $scope.planningview = null;
            if(current.params.itemId)
            {
                var req = "plannings";
                $scope.planningview = {};
                rewriteReq = req + "(id:" + current.params.itemId + ")";
                Init.getElement(rewriteReq, listofrequests_assoc[req]).then(function (data)
                {
                    $scope.planningview = data[0];
                    $scope.pageChanged("reservation");

                },function (msg)
                {
                    console.log('error', msg)
                });
            }
            else
            {
                $scope.getelements("clients");
                $scope.pageChanged("planning");
            }
        }
        else if(angular.lowercase(current.templateUrl).indexOf('reservation')!==-1)
        {
            $scope.pageCurrent = "reservation";
            $scope.getelements("clients");
            $scope.pageChanged("reservation");

            $scope.getelements("coachs");
            $scope.getelements("coachpratiques");
            $scope.getelements("plannings");
            $scope.getelements("pratiques");

        }
        else if(angular.lowercase(current.templateUrl).indexOf('client')!==-1)
        {
            $scope.getelements("typepersonnes");

            $scope.clientview = null;
            if(current.params.itemId)
            {
                var req = "clients";
                $scope.clientview = {};
                rewriteReq = req + "(id:" + current.params.itemId + ")";
                Init.getElement(rewriteReq, listofrequests_assoc[req]).then(function (data)
                {
                    $scope.clientview = data[0];

                    $scope.pageChanged('reservation');
                    $scope.pageChanged('abonnement');

                    // pour les filtres section reservation
                    $scope.getelements("typetarifs");
                    $scope.getelements("tarifs");

                    // pour les filtres section abonnement
                    $scope.getelements("typelivraisons");
                    $scope.getelements("zonelivraisons");
                    $scope.getelements("typeproduits");
                    $scope.getelements("typeingredients");
                    $scope.getelements("produits");

                },function (msg)
                {
                    toastr.error(msg);
                });
            }
            else
            {
                $scope.pageChanged('client');
            }
        }
        else if(angular.lowercase(current.templateUrl).indexOf('list-ingredient')!==-1)
        {
            $scope.getelements("typeingredients");
            $scope.pageChanged('ingredient');
        }
        else if(angular.lowercase(current.templateUrl).indexOf('list-produit')!==-1)
        {
            $scope.getelements("typeproduits");
            $scope.getelements("typeingredients");
            $scope.pageChanged('produit');
        }
        else if(angular.lowercase(current.templateUrl).indexOf('list-commande')!==-1)
        {
            $scope.getelements("clients");
            $scope.getelements("typelivraisons");
            $scope.getelements("zonelivraisons");
            $scope.getelements("typeproduits");
            $scope.getelements("typeingredients");
            $scope.getelements("produits");
            $scope.pageChanged('commande');
        }
        else if(angular.lowercase(current.templateUrl).indexOf('list-paiement')!==-1)
        {
            $scope.pageChanged('paiement');
            $scope.getelements("abonnements");
        }
        else if(angular.lowercase(current.templateUrl).indexOf('list-profil')!==-1)
        {
            $scope.getelements('permissions');
            $scope.getelements('roles');
        }
        else if(angular.lowercase(current.templateUrl).indexOf('utilisateur')!==-1)
        {
            $scope.userview = null;
            if(current.params.itemId)
            {
                var req = "users";
                $scope.userview = {};
                rewriteReq = req + "(id:" + current.params.itemId + ")";
                Init.getElement(rewriteReq, listofrequests_assoc[req]).then(function (data)
                {
                    $scope.userview = data[0];
                    changeStatusForm('detailuser',true);

                    console.log($scope.userview );
                    console.log('userId', current.params.itemId);

                    $scope.pageChanged('abonnement');
                    $scope.pageChanged('contrat');
                    $scope.pageChanged('planning');

                },function (msg)
                {
                    toastr.error(msg);
                });
            }
            else
            {
                $scope.getelements('roles');
                $scope.pageChanged('user');
            }
        }
    });


    $scope.infosDahboardBy = null;
    $scope.getInfosDahboard = function(byType)
    {
        $scope.infosDahboardBy = byType;
        $scope.getelements('dashboards');
    };

    $scope.getRecettes = function(forType)
    {
        $scope.getelements('recettes');
        $scope.getelements(forType);
    };


    $scope.formatDate = function(str)
    {
        date = str.split('/');
        return date[2]+"-"+date[1]+"-"+date[0] ;
    };

    /*
    A SUPP
    $scope.changeTab = function()
    {
        // Demande à angularjs de rafraichir les elements concernés
        $('body').updatePolyfill();

    };*/


    $scope.$on('$routeChangeSuccess', function(next, current)
    {
        setTimeout(function ()
        {
            $('.select2').select2();
        },1000);

        if (angular.lowercase(current.templateUrl).indexOf('-reservation')!==-1)
        {
            setTimeout(function ()
            {
                $('.select2').select2();
            },1000);
            if(angular.lowercase(current.templateUrl).indexOf('add-')!==-1)
            {
                //console.log('routechangé');

                // $('#email_' + type).val(item.email);
                // $('#telephone_' + type).val(item.telephone);
                // $('#type_client_' + type).val(item.type_client.id);
                // $('#adresse_' + type).val(item.adresse);
                // $('#commentaire_' + type).val(item.commentaire);

            }

        }


        // Pour détecter les changements
        $scope.client_reservation = null;
        setTimeout(function ()
        {
            // Pour désactiver tous les events sur le select
            $(".select2.coach").off('change');

            $(".select2.coach").on("change", function (e)
            {
                console.log('coach click detecté');

                if($(this).attr('id')==="coach_planning")
                {
                    $scope.item_id = $(this).val();
                    $scope.coachSelected = null;
                    $.each($scope.coachs, function (key, value)
                    {
                        if (value.id === $scope.item_id)
                        {
                            $scope.coachSelected = value;
                            return false;
                        }
                    });
                    $scope.$apply();
                }
            });
        }, 500);

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
        // Pour mettre tous les chamnps en lecture seule
        $("input[id$=_" + type + "], textarea[id$=_" + type + "], select[id$=_" + type + "], button[id$=_" + type + "]").each(function ()
        {
            doIt = ($(this).attr('id').indexOf('detailnumCH')===-1);
            if (doIt)
            {
                console.log($(this).hasClass('btn'));

                $(this).attr($(this).hasClass('btn') || disabled ? 'disabled' : 'readonly', status);

                if ($scope.reservationview && $(this).hasClass('staydisabled'))
                {
                    $(this).attr('readonly', true);
                }

            }
            else
            {
                if (type.indexOf('paiement')!==-1)
                {
                    $(this).attr($(this).hasClass('btn') || disabled ? 'disabled' : 'readonly', !$scope.reservationview.can_updated_numch);
                }
                else
                {
                    $(this).attr('readonly', !$scope.reservationview.can_updated_numch);
                }
            }
        });
    }

    // Permet d'afficher le formulaire
    $scope.showModalAdd=function (type)
    {

        $scope.detailProduits = [{'quantite':1, 'has_supplement':1, 'type_ingredient':0}];


        $scope.addcommandeview = false;
        setTimeout(function ()
        {
            // On fait d'abord un destroy
            if (!$('select').data('select2')) {
                $('select').select2('destroy');
            }
            // Souscription

            $('.select2.modal').select2({
                dropdownParent: $("#modal_add"+type)
            });

            $('.select2').select2();

            console.log('on doit affecter');
        },500);




        emptyform(type);
        if (type.indexOf('produit')!==-1)
        {
            $scope.detailProduits = [];
            $scope.is_mixable_produit = 'false';
            console.log('is_mixable_produit', $scope.is_mixable_produit);
        }
        else if (type.indexOf('planning')!==-1)
        {
            var interval_refresh_planning = setInterval(function ()
            {
                console.log("etat du dom");
                if ($('.select2.modal').length)
                {
                    console.log("dom: ok");

                    // On fait d'abord un destroy
                    if (!$('select').data('select2')) {
                        $('select').select2('destroy');
                    }

                    // Souscription

                    $('.select2.modal').select2({
                        dropdownParent: $("#modal_add"+type)
                    });
                    $('.select2').select2();

                    clearInterval(interval_refresh_planning);
                }
            },500);
        }
        else if (type.indexOf('paiement')!==-1)
        {
            changeStatusForm('paiement', false, true);
        }
        if (type.indexOf('role')!==-1)
        {
            $scope.roleview = null;
        }
        $("#modal_add"+type).modal('show');
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



    //TODO: définir l\'etat d'une reservation
    // implémenter toutes les variations du formulaire

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
                else if (type.indexOf('planning')!==-1)
                {
                    var found = false;
                    $.each($scope.plannings, function (keyItem, valueItem)
                    {
                        if (valueItem.id==send_data.id)
                        {
                            $scope.plannings[keyItem].etat = $scope.chstat.statut+'';
                            found = true;
                        }
                        return !found;
                    });
                }
                else if (type.indexOf('commande')!==-1)
                {
                    var found = false;
                    var req = "commandes";
                    $scope.contratview = {};
                    rewriteReq = req + "(id:" + send_data.id + ")";
                    Init.getElement(rewriteReq, listofrequests_assoc[req]).then(function (data)
                    {
                        getCmd = data[0];
                        $.each($scope.commandes, function (keyItem, valueItem)
                        {
                            if (valueItem.id==send_data.id)
                            {
                                $scope.commandes[keyItem] = getCmd;
                                found = true;
                            }
                            return !found;
                        });
                    },function (msg)
                    {
                        console.log('error', msg)
                    });
                }
                else if (type.indexOf('client')!==-1)
                {
                    var found = false;
                    $.each($scope.clients, function (keyItem, valueItem)
                    {
                        if (valueItem.id==send_data.id)
                        {
                            $scope.clients[keyItem].etat = $scope.chstat.statut==0 ? false : true;
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


    $scope.donneesReservation = {'message':'', 'clientId':null, 'planningId':'', 'type':''};

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
        else if (type.indexOf('paiement')!==-1)
        {
            if ($scope.abonnementview)
            {
                send_data.append("abonnement", $scope.abonnementview.id);
            }
        }
        else if (type.indexOf('planning')!==-1)
        {
            console.log($scope.gratuite_planning);
            send_data.set("gratuite", $scope.gratuite_planning);
        }
        else if (type.indexOf('reservation')!==-1)
        {
            if ($scope.planningview)
            {
                send_data.set("planning", $scope.planningview.id);
            }

            if ($scope.donneesReservation.clientId != null){
                send_data.append("sans_abonnement", true);
            }

            $scope.donneesReservation.clientId = null;


            console.log($scope.decomptee_resservation);
            send_data.set("decomptee", $scope.decomptee_resservation);

        }
        else if (type.indexOf('role')!==-1)
        {
            send_data.append("permissions", $scope.role_permissions);
            console.log('role_permissions', $scope.role_permissions, '...', send_data.get('role_permissions') );
            if ($scope.role_permissions.length==0)
            {
                iziToast.error({
                    title: "",
                    message: "Vous devez ajouter au moins une permission au présent role",
                    position: 'topRight'
                });
                continuer = false;
            }
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
                    else if (type.indexOf('typeplanning')!==-1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.typeplannings.push(getObj);
                        }
                        else
                        {
                            $.each($scope.typeplannings, function (keyItem, oneItem)
                            {
                                if (oneItem.id===getObj.id)
                                {
                                    $scope.typeplannings[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('zonelivraison')!==-1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.zonelivraisons.push(getObj);
                        }
                        else
                        {
                            $.each($scope.zonelivraisons, function (keyItem, oneItem)
                            {
                                if (oneItem.id===getObj.id)
                                {
                                    $scope.zonelivraisons[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('zone')!==-1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.zones.push(getObj);
                        }
                        else
                        {
                            $.each($scope.zones, function (keyItem, oneItem)
                            {
                                if (oneItem.id===getObj.id)
                                {
                                    $scope.zones[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('langue')!==-1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.langues.push(getObj);
                        }
                        else
                        {
                            $.each($scope.langues, function (keyItem, oneItem)
                            {
                                if (oneItem.id===getObj.id)
                                {
                                    $scope.langues[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('frequence')!==-1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.frequences.push(getObj);
                        }
                        else
                        {
                            $.each($scope.frequences, function (keyItem, oneItem)
                            {
                                if (oneItem.id===getObj.id)
                                {
                                    $scope.frequences[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('salle')!==-1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.salles.push(getObj);
                        }
                        else
                        {
                            $.each($scope.salles, function (keyItem, oneItem)
                            {
                                if (oneItem.id===getObj.id)
                                {
                                    $scope.salles[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('pratique')!==-1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.pratiques.push(getObj);
                            $scope.paginationpratique.totalItems++;
                            if($scope.pratiques.length > $scope.paginationpratique.entryLimit)
                            {
                                $scope.pageChanged('pratique');
                            }
                        }
                        else
                        {
                            $.each($scope.pratiques, function (keyItem, oneItem)
                            {
                                if (oneItem.id===getObj.id)
                                {
                                    $scope.pratiques[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('coach')!==-1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.coachs.push(getObj);
                            $scope.paginationcoach.totalItems++;
                            if($scope.coachs.length > $scope.paginationcoach.entryLimit)
                            {
                                $scope.pageChanged('coach');
                            }
                        }
                        else
                        {
                            if ($scope.coachview && $scope.coachview.id===getObj.id)
                            {
                                $scope.coachview = getObj;
                                location.reload();
                            }

                            $.each($scope.coachs, function (keyItem, oneItem)
                            {
                                if (oneItem.id===getObj.id)
                                {
                                    $scope.coachs[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('client')!==-1)
                    {
                        console.log('from', from);
                        if (from.indexOf('modal')===-1)
                        {
                            $location.path('list-client');
                        }
                        else
                        {
                            if (!send_dataObj.id)
                            {
                                $scope.clients.push(getObj);
                                $scope.paginationcli.totalItems++;
                                if($scope.clients.length > $scope.paginationcli.entryLimit)
                                {
                                    $scope.pageChanged('client');
                                }
                            }
                            else
                            {
                                if ($scope.clientview && $scope.clientview.id===getObj.id)
                                {
                                    $scope.clientview = getObj;
                                }

                                $.each($scope.clients, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===getObj.id)
                                    {
                                        $scope.clients[keyItem] = getObj;
                                        return false;
                                    }
                                });
                            }
                        }
                    }
                    else if (type.indexOf('abonnement')!==-1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.abonnements.push(getObj);
                            $scope.paginationab.totalItems++;
                            if($scope.abonnements.length > $scope.paginationab.entryLimit)
                            {
                                $scope.pageChanged('abonnement');
                            }
                        }
                        else
                        {
                            if ($scope.abonnementview && $scope.abonnementview.id===getObj.id)
                            {
                                $scope.abonnementview = getObj;
                            }

                            $.each($scope.abonnements, function (keyItem, oneItem)
                            {
                                if (oneItem.id===getObj.id)
                                {
                                    $scope.abonnements[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('contrat')!==-1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.contrats.push(getObj);
                            $scope.paginationcontrat.totalItems++;
                            if($scope.contrats.length > $scope.paginationcontrat.entryLimit)
                            {
                                $scope.pageChanged('contrat');
                            }
                        }
                        else
                        {
                            if ($scope.contratview && $scope.contratview.id===getObj.id)
                            {
                                $scope.contratview = getObj;
                            }

                            $.each($scope.contrats, function (keyItem, oneItem)
                            {
                                if (oneItem.id===getObj.id)
                                {
                                    $scope.contrats[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('planning')!==-1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.plannings.push(getObj);
                            $scope.paginationplanning.totalItems++;
                            if($scope.plannings.length > $scope.paginationplanning.entryLimit)
                            {
                                $scope.pageChanged('planning');
                            }
                        }
                        else
                        {
                            if ($scope.planningview && $scope.planningview.id===getObj.id)
                            {
                                $scope.planningview = getObj;
                            }

                            $.each($scope.plannings, function (keyItem, oneItem)
                            {
                                if (oneItem.id===getObj.id)
                                {
                                    $scope.plannings[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('reservation')!==-1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.reservations.push(getObj);
                            $scope.paginationrsv.totalItems++;
                            if($scope.reservations.length > $scope.paginationrsv.entryLimit)
                            {
                                $scope.pageChanged('reservation');
                            }
                        }
                        else
                        {
                            if ($scope.reservationview && $scope.reservationview.id===getObj.id)
                            {
                                $scope.reservationview = getObj;
                            }

                            $.each($scope.reservations, function (keyItem, oneItem)
                            {
                                if (oneItem.id===getObj.id)
                                {
                                    $scope.reservations[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('paiement')!==-1)
                    {
                        if ($scope.abonnementview)
                        {
                            $scope.abonnementview.left_to_pay = getObj.restant;
                        }
                        $scope.pageChanged('paiement');
                    }
                    else if (type.indexOf('typeingredient')!==-1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.typeingredients.push(getObj);
                        }
                        else
                        {
                            $.each($scope.typeingredients, function (keyItem, oneItem)
                            {
                                if (oneItem.id===getObj.id)
                                {
                                    $scope.typeingredients[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('ingredient')!==-1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.ingredients.push(getObj);
                            $scope.paginationingredient.totalItems++;
                            if($scope.ingredients.length > $scope.paginationingredient.entryLimit)
                            {
                                $scope.pageChanged('ingredient');
                            }
                        }
                        else
                        {
                            $.each($scope.ingredients, function (keyItem, oneItem)
                            {
                                if (oneItem.id===getObj.id)
                                {
                                    $scope.ingredients[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('typeproduit')!==-1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.typeproduits.push(getObj);
                        }
                        else
                        {
                            $.each($scope.typeproduits, function (keyItem, oneItem)
                            {
                                if (oneItem.id===getObj.id)
                                {
                                    $scope.typeproduits[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('produit')!==-1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.produits.push(getObj);
                            $scope.paginationprod.totalItems++;
                            if($scope.produits.length > $scope.paginationprod.entryLimit)
                            {
                                $scope.pageChanged('produit');
                            }
                        }
                        else
                        {
                            $.each($scope.produits, function (keyItem, oneItem)
                            {
                                if (oneItem.id===getObj.id)
                                {
                                    $scope.produits[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('commande')!==-1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.commandes.push(getObj);
                            $scope.paginationcmd.totalItems++;
                            if($scope.commandes.length > $scope.paginationcmd.entryLimit)
                            {
                                $scope.pageChanged('commande');
                            }
                        }
                        else
                        {
                            $.each($scope.commandes, function (keyItem, oneItem)
                            {
                                if (oneItem.id===getObj.id)
                                {
                                    $scope.commandes[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('role')!==-1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.roles.push(getObj);
                        }
                        else
                        {
                            $.each($scope.roles, function (keyItem, oneItem)
                            {
                                if (oneItem.id===getObj.id)
                                {
                                    $scope.roles[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('user')!==-1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.users.push(getObj);
                            $scope.paginationuser.totalItems++;
                            if($scope.users.length > $scope.paginationuser.entryLimit)
                            {
                                $scope.pageChanged('user');
                            }
                        }
                        else
                        {
                            location.reload();
                            $.each($scope.users, function (keyItem, oneItem)
                            {
                                if (oneItem.id===getObj.id)
                                {
                                    $scope.users[keyItem] = getObj;
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
            else if (type.indexOf("tarif")!==-1)
            {
                $('#designation_' + type).val(item.designation);
                $('#prix_' + type).val(item.prix);
                $('#type_tarif_' + type).val(item.type_tarif.id);
                $('#nb_seance_' + type).val(item.nb_seance);
                var frequence_id = '';
                if (item.frequence_seance)
                {
                    frequence_id = item.frequence_seance.id;
                }
                $('#frequence_seance_' + type).val(frequence_id);
            }
            else if (type.indexOf("typepratiqu")!==-1)
            {
                $('#designation_' + type).val(item.designation);
            }
            else if (type.indexOf("pratique")!==-1)
            {
                $('#designation_' + type).val(item.designation);
                $('#description_' + type).val(item.description);
                $('#type_pratiqu_' + type).val(item.type_pratiqu.id);
                $('#img' + type)
                    .val("")
                    .attr('required',false).removeClass('required');
                $('#affimg' + type).attr('src',(item.image ? item.image : imgupload));
            }
            else if (type.indexOf("typeplanning")!==-1)
            {
                $('#designation_' + type).val(item.designation);
            }
            else if (type.indexOf("zonelivraison")!==-1)
            {
                $('#designation_' + type).val(item.designation);
                $('#tarif_' + type).val(item.tarif);
            }
            else if (type.indexOf("zone")!==-1)
            {
                $('#designation_' + type).val(item.designation);
                $('#adresse_' + type).val(item.adresse);
            }
            else if (type.indexOf("langue")!==-1)
            {
                $('#designation_' + type).val(item.designation);
            }
            else if (type.indexOf("frequence")!==-1)
            {
                $('#designation_' + type).val(item.designation);
                $('#nb_jour_' + type).val(item.nb_jour);
            }
            else if (type.indexOf("salle")!==-1)
            {
                $('#designation_' + type).val(item.designation);
                $('#nb_personne_' + type).val(item.nb_personne);
                $('#zone_' + type).val(item.zone.id);
            }
            else if (type.indexOf("contrat")!==-1)
            {
                $('#coach_' + type).val(item.coach.id);
                $('#date_debut_' + type).val(item.date_debut);
                $('#date_fin_' + type).val(item.date_fin);
            }
            else if (type.indexOf("coach")!==-1)
            {
                $('#nom_' + type).val(item.user.name);
                $('#description_' + type).val(item.description);
                if (item.contrats.length > 0)
                {
                    $('#date_debut_' + type).attr('readonly', true).val(item.contrats[0].date_debut);
                    $('#date_fin_' + type).attr('readonly', true).val(item.contrats[0].date_fin);
                }
                var liste_pratiques = [];
                $.each(item.coach_pratiques, function (keyItem, valueItem) {
                    liste_pratiques.push(valueItem.pratique_id);
                });
                $('#coach_pratiques_coach').val(liste_pratiques).trigger("change");
                $('#telephone_' + type).val(item.telephone);
                $('#email_' + type).val(item.user.email);
                $('#img' + type)
                    .val("")
                    .attr('required',false).removeClass('required');
                $('#affimg' + type).attr('src',(item.user.image ? item.user.image : imgupload));
                $('#password_' + type).removeClass('required');
                $('#confirmpassword_' + type).removeClass('required');
            }
            else if (type.indexOf("client")!==-1)
            {
                $('#nom_' + type).val(item.nom);
                $('#prenom_' + type).val(item.prenom);
                $('#telephone_' + type).val(item.telephone);
                $('#genre_' + type).val(item.type_personne.id);
                $('#email_' + type).val(item.email);
                $('#img' + type)
                    .val("")
                    .attr('required',false).removeClass('required');
                $('#affimg' + type).attr('src',(item.image ? item.image : imgupload));
                $('#password_' + type).val("").removeClass('required');
                $('#confirmpassword_' + type).val("").removeClass('required');
            }
            else if (type.indexOf("abonnement")!==-1)
            {
                $('#client_' + type).val(item.client.id);
                $('#tarif_' + type).val(item.tarif.id);
                $('#date_' + type).val(item.date);
                $('#commentaire_' + type).val(item.commentaire);
            }
            else if (type.indexOf("paiement")!==-1)
            {
                $('#commentaire_' + type).val(item.commentaire);
                $('#remise_' + type).val(item.remise);
                $('#montant_' + type).val(item.montant);
                $('#mode_paiement_' + type).val(item.mode_paiement);
            }
            else if (type.indexOf("planning")!==-1)
            {

                $('#date_' + type).val(item.date);
                $('#type_planning_' + type).val(item.type_planning.id);
                $('#heure_debut_' + type).val(item.heure_debut);
                $('#heure_fin_' + type).val(item.heure_fin);
                $('#salle_' + type).val(item.salle.id);

                var liste_langues = [];
                $.each(item.planning_langues, function (keyItem, valueItem) {
                    liste_langues.push(valueItem.langue.id);
                });
                $('#planning_langues_' + type).val(liste_langues).trigger("change");

                if (item.level!=null)
                {
                    $('#level_' + type).val(item.level.id);
                }
                if (item.type_personne!=null)
                {
                    $('#genre_' + type).val(item.type_personne.id);
                }

                var interval_refresh_client = setInterval(function ()
                {
                    if ($('#coach_planning').length)
                    {
                        $scope.coach_planning = item.coach_pratique.coach.id;
                        $('#coach_' + type).val(item.coach_pratique.coach.id).trigger("change");
                        setTimeout(function(){
                            $('#coach_pratique_' + type).val(item.coach_pratique.id).trigger("change");
                            clearInterval(interval_refresh_client);
                        },1000);
                    }


                },500);

            }
            else if (type.indexOf("typeingredient")!==-1)
            {
                $('#designation_' + type).val(item.designation);
            }
            else if (type.indexOf("ingredient")!==-1)
            {
                //$('#is_buffet_' + type).val('true');
                $('#designation_' + type).val(item.designation);
                $('#type_ingredient_' + type).val(item.type_ingredient.id);
                $('#prix_' + type).val(item.prix);
                $('#img' + type)
                    .val("")
                    .attr('required',false).removeClass('required');
                $('#affimg' + type).attr('src',(item.image ? item.image : imgupload));
            }
            else if (type.indexOf("typeproduit")!==-1)
            {
                $('#designation_' + type).val(item.designation);
            }
            else if (type.indexOf("produit")!==-1)
            {
                $scope.is_mixable_produit = item.is_mixable + '';
                //$('#is_buffet_' + type).val('true');
                $('#designation_' + type).val(item.designation);
                $('#type_produit_' + type).val(item.type_produit.id);
                $('#prix_' + type).val(item.prix);
                $('#img' + type)
                    .val("")
                    .attr('required',false).removeClass('required');
                $('#affimg' + type).attr('src',(item.image ? item.image : imgupload));


                $scope.detailProduits = [];
                $.each(item.produit_type_ingredients, function(key, value)
                {
                    $scope.detailProduits.push({'quantite':value.quantite, 'has_supplement':value.has_supplement+'', 'type_ingredient':value.type_ingredient.id});
                });
                console.log('details', $scope.detailProduits);


                $scope.typeingredient_detail = [];
                $scope.quantite_detail = [];
                $.each($scope.detailProduits, function(keyItem, oneItem)
                {
                    $('#typeingredient_detail' + keyItem + '_' + type).val(oneItem.type_ingredient);
                    $('#quantite_detail' + keyItem + '_' + type).val(oneItem.quantite);
                    var setSelectedTarification = setInterval(function ()
                    {
                        setTimeout(function ()
                        {
                            if ($('#typeingredient_detail' + keyItem + '_' + type).val()!=null)
                            {
                                $scope.typeingredient_detail[keyItem] = oneItem.type_ingredient;
                                $scope.quantite_detail[keyItem] = oneItem.quantite;
                                $('#typeingredient_detail' + keyItem + '_' + type).val(oneItem.type_ingredient).trigger('change');
                                $('#quantite_detail' + keyItem + '_' + type).val(oneItem.quantite);
                                clearInterval(setSelectedTarification);
                            }
                        },500);

                        $scope.$apply();
                    }, 1000);
                });
            }
            else if (type.indexOf("commande")!==-1)
            {
                $scope.client_lambda_commande = '';
                $scope.commandeview = item;

                $scope.voir = [
                    {ingredient_designation:"viande",quantite:2,prix:3500},
                    {ingredient_designation:"poisson",quantite:1,prix:2500}
                ];

                //console.log('voir commande', JSON.parse('[{\"ingredient_designation\":\"viande\",\"quantite\":2,\"prix\":3500},{\"ingredient_designation\":\"poisson\",\"quantite\":1,\"prix\":2500}]'));




                $.each($scope.commandeview.commande_produits, function (key, value)
                {
                    $scope.commandeview.commande_produits[key].liste_ingredient = JSON.parse(value.liste_ingredient);

                });
                console.log('commandeview', $scope.commandeview);


                //$scope.$apply();
            }
            else if (type.indexOf("role")!==-1)
            {
                $('#name_' + type).val(item.name);
                $scope.roleview = item;

                $scope.role_permissions = [];
                $.each($scope.roleview.permissions, function (key, value) {
                    $scope.role_permissions.push(value.id);
                });
                console.log('lancer', $scope.role_permissions);
            }
            else if (type.indexOf("user")!==-1)
            {
                $('#name_' + type).val(item.name);
                $('#role_' + type).val(item.roles[0].id).attr('disabled', forceChangeForm);
                $('#email_' + type).val(item.email).attr('readonly', forceChangeForm);
                $('#password_' + type).val("");
                $('#confirmpassword_' + type).val("");
                $('#img' + type)
                    .val("")
                    .attr('required',false).removeClass('required');
                $('#affimg' + type).attr('src',(item.image ? item.image : imgupload));
                $scope.userview = item;
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


    // Permet de vérifier si un id est dans un tableau
    $scope.isInArrayData = function(e,idItem,data, typeItem="menu") {
        response = false;
        $.each(data, function (key, value) {
            if (typeItem.indexOf('menu')!==-1)
            {
                if (value.consommation_id == idItem)
                {
                    response = true;
                }
            }
            else if (typeItem.indexOf('role')!==-1)
            {
                if (value.id == idItem)
                {
                    response = true ;
                }
            }
            //return response;
        });
        //console.log('ici', response);

        return response;
    };


    // Permet soit d'ajouter ou de supprimer une ligne au niveau de la reservation
    $scope.forligne = function(e,type,action,idItem=0,parent=0)
    {
        e.preventDefault();
        if ($scope.reservationview && !$scope.reservationview.can_updated)
        {
            iziToast.info({
                message: "Cette réservation n'est plus modifiable",
                position: 'topRight'
            });
        }
        else
        {
            if (type.indexOf("detailingredient")!==-1)
            {
                if (angular.isNumber(action) && action > 0)
                {
                    $scope.detailProduits.push({'quantite':1, 'has_supplement':1, 'type_ingredient':0});
                    console.log('voir = ', $scope.detailProduits);
                }
                else
                {
                    console.log('action', action, 'idItem', idItem, "parent", parent);

                    $scope.detailProduits.splice(idItem,1);
                    // $('.detailreservation[data-ligne='+(idItem)+']').remove();

                    $timeout(function(){
                        console.log('attend---------------');

                        $.each($scope.detailProduits, function (keyItem, oneItem) {
                            $('.detailingredient[data-ligne='+(keyItem)+']').find('[name^="nb_detail"]').val(oneItem.nbpiece);
                            $('.detailingredient[data-ligne='+(keyItem)+']').find('[name^="typeingredient_detail"]').val(oneItem.type_chambre);
                        });

                        // $scope.calculateTotal('reservation');
                    });
                }
            }
        }



    };

    $scope.itemChange_detailingredient = function(parent,forItem, child=0)
    {
        if (forItem.indexOf('typeingredient')!==-1)
        {
            $('[name^="typeingredient_detail"]').each(function (keyNum, valueNum) {
                var verif_occurence = 0;
                that = $(this);
                $('[name^="typeingredient_detail"]').each(function (keyNumOc, valueNumOc) {
                    if (Number($(this).val())==Number(that.val()))
                    {
                        verif_occurence++;
                    }
                    return !(verif_occurence>1);
                });
                if (verif_occurence>1)
                {
                    iziToast.error({
                        title: "",
                        message: "Vous ne pouvez pas selectionner le même type d'ingredients deux fois<br><br>",
                        position: 'topRight'
                    });
                    setTimeout(function () {
                        that.val('');
                    },500);
                }
                return !(verif_occurence>1);
            });
        }
    };

    $scope.calculateTotal = function(type)
    {
        if (type.indexOf('reservation')!==-1)
        {
            $scope.total_reservation = 0;

            // Si on est sur une vue d'edition de la réservation
            if (!$scope.reservationview)
            {
                $('#amount_paid_reservation').val("");
            }

            $('.detailreservation').each(function (keyItem, oneItem)
            {
                recup_typeCh = $scope.tarifications[($(this).find('[name^="typechambre_detail"]').val() - 1)];

                if (recup_typeCh)
                {
                    console.log('pour le calcul');

                    nbLigneDetails = $(this).find('.detail_detailreservation').length;
                    /*$.each($scope.clients, function (key, value)
                    {
                       if (value.id === $('#client_reservation').val())
                       {
                           console.log('categ client', value);
                           nbLigneDetails = 0;
                           return false;
                       }
                    });*/

                    var nb_jour = $(this).find('[name^="nbjour_detail"]').val();
                    $scope.total_reservation += ( ( ($(this).find('[name^="nbpiece_detail"]').val() - nbLigneDetails) * (recup_typeCh.tarif_par_pers * recup_typeCh.type_chambre.nombre_de_personnes) ) * nb_jour );

                    console.log('nbre de ligne',nbLigneDetails ,'total before = ', $scope.total_reservation);


                    // console.log("rafraichir = ", ($(this).find('[name^="nbpiece_detail"]').val() - $(this).find('.detail_detailreservation').length));

                    // $(this).find('detail_detailreservation').length

                    if (nbLigneDetails > 0)
                    {
                        $(this).find('.detail_detailreservation').each(function ()
                        {
                            totalLigne = 0;


                            if ( $(this).find('[name^="detailNbreEnft"]').val()!==0)
                            {
                                if (Number($(this).find('[name^="detailNbrePers"]').val()) >= Number($(this).find('[name^="detailNbreEnft"]').val()))
                                {
                                    console.log('detailNbreEnft', $(this).find('[name^="detailNbreEnft"]').val(),'detailNbrePers',$(this).find('[name^="detailNbrePers"]').val() );

                                    /*
                                    if ($(this).find('[name^="detailNbrePers"]').val() === $(this).find('[name^="detailNbreEnft"]').val())
                                    {
                                        // Dans le cas où tous ce sont des enfants
                                        totalLigne += ( $(this).find('[name^="detailNbrePers"]').val() * (recup_typeCh.tarif - recup_typeCh.tarif * preferences.allpersons_are_childs) );
                                    }

                                    else
                                    {
                                    */
                                    // On calcule d'abord pour les adultes
                                    totalLigne += ( ( ($(this).find('[name^="detailNbrePers"]').val() - $(this).find('[name^="detailNbreEnft"]').val()) * recup_typeCh.tarif_par_pers ) * nb_jour );

                                    //console.log('dans ce cas', ( $(this).find('[name^="detailNbreEnft"]').val() * (recup_typeCh.tarif_par_pers - recup_typeCh.tarif_par_pers * preferences.allpersons_are_childs)) );

                                    // On calcule ensuite pour les enfants
                                    totalLigne += ( ( $(this).find('[name^="detailNbreEnft"]').val() * (recup_typeCh.tarif_par_pers - (recup_typeCh.tarif_par_pers * preferences.allpersons_are_childs) ) ) * nb_jour );
                                    // console.log('dans le cas = ', recup_typeCh.tarif_par_pers);
                                    //}
                                }
                                else
                                {
                                    totalLigne += ((recup_typeCh.type_chambre.nombre_de_personnes * recup_typeCh.tarif_par_pers) * nb_jour);

                                }
                            }
                            else
                            {
                                console.log('Dans le cas où tous ce sont des adultes, on ne fait aucun calcul de remise');
                                // Dans le cas où tous ce sont des adultes, on ne fait aucun calcul de remise
                                totalLigne += ($(this).find('[name^="detailNbrePers"]').val() * recup_typeCh.tarif_par_pers);
                            }

                            //console.log('totalLigne',totalLigne);

                            //console.log('entre ici jacques', totalLigne);


                            $scope.total_reservation += Math.round(totalLigne);
                        });
                    }

                    console.log('total after = ', $scope.total_reservation, ' details =', nbLigneDetails);

                }

            });

            $scope.total_amountss_reservation = $scope.total_reservation /** $('#nb_jour_reservation').val()*/;

            if (!$.isNumeric($scope.total_amountss_reservation))
            {
                iziToast.error({
                    title: "Montant total hors remise",
                    message: "Vérifier les valeurs renseignées",
                    position: 'topRight'
                });
                $scope.total_amountss_reservation = 0;
            }
            // On ajoute ça à la jQuery
            // $('#total_amountss_reservation').val($scope.total_amountss_reservation);

            // Chaque fois que l'on recalcule le prix total, on recalcule pour remise

            $scope.remise_amount_reservation=($scope.total_amountss_reservation*$scope.remise_reservation)/100;

            console.log('total_amountss_reservation = ', $scope.total_amountss_reservation);
            console.log('remise_reservation = ', $scope.remise_reservation);
            console.log('remise_amount_reservation = ', $scope.remise_amount_reservation);
            console.log('remisesupp_reservation = ', $scope.remisesupp_reservation);

        }

        // try {
        //     $scope.$apply();
        // }
        // catch (e) {
        //     console.log('MAJ effectuée avec succès');
        // }

    };


    $scope.searchsurfacecategorie="";
    $scope.trierElement=function (type,element,propriete="")
    {
        console.log('trierElement');

        if (type.indexOf('coach')!==-1)
        {
            if (propriete.match('planning'))
            {
                $.each($scope.coachs, function (key, value) {
                    if (value.id === element)
                    {
                        $scope.coachSelected=element;
                        console.log('coachSelected', $scope.coachSelected);
                        return false;
                    }
                });
            }
        }
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
                            else if (type.indexOf('tarif')!==-1)
                            {
                                $.each($scope.tarifs, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===itemId)
                                    {
                                        $scope.tarifs.splice(keyItem, 1);
                                        return false;
                                    }
                                });
                            }
                            else if (type.indexOf('typepratiqu')!==-1)
                            {
                                $.each($scope.typepratiqus, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===itemId)
                                    {
                                        $scope.typepratiqus.splice(keyItem, 1);
                                        return false;
                                    }
                                });
                            }
                            else if (type.indexOf('pratique')!==-1)
                            {
                                if ($scope.pratiqueview && $scope.pratiqueview.id)
                                {
                                    $location.path('list-pratique');
                                }

                                $.each($scope.pratiques, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===itemId)
                                    {
                                        $scope.pratiques.splice(keyItem, 1);
                                        return false;
                                    }
                                });

                                $scope.paginationpratique.totalItems--;
                                if($scope.pratiques.length < $scope.paginationpratique.entryLimit)
                                {
                                    $scope.pageChanged('pratique');
                                }
                            }
                            else if (type.indexOf('typeplanning')!==-1)
                            {
                                $.each($scope.typeplannings, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===itemId)
                                    {
                                        $scope.typeplannings.splice(keyItem, 1);
                                        return false;
                                    }
                                });
                            }
                            else if (type.indexOf('zonelivraison')!==-1)
                            {
                                $.each($scope.zonelivraisons, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===itemId)
                                    {
                                        $scope.zonelivraisons.splice(keyItem, 1);
                                        return false;
                                    }
                                });
                            }
                            else if (type.indexOf('zone')!==-1)
                            {
                                $.each($scope.zones, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===itemId)
                                    {
                                        $scope.zones.splice(keyItem, 1);
                                        return false;
                                    }
                                });
                            }
                            else if (type.indexOf('langue')!==-1)
                            {
                                $.each($scope.langues, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===itemId)
                                    {
                                        $scope.langues.splice(keyItem, 1);
                                        return false;
                                    }
                                });
                            }
                            else if (type.indexOf('frequence')!==-1)
                            {
                                $.each($scope.frequences, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===itemId)
                                    {
                                        $scope.frequences.splice(keyItem, 1);
                                        return false;
                                    }
                                });
                            }
                            else if (type.indexOf('salle')!==-1)
                            {
                                $.each($scope.salles, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===itemId)
                                    {
                                        $scope.salles.splice(keyItem, 1);
                                        return false;
                                    }
                                });
                            }
                            else if (type.indexOf('client')!==-1)
                            {
                                if ($scope.clientview && $scope.clientview.id)
                                {
                                    $location.path('list-client');
                                }

                                $.each($scope.clients, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===itemId)
                                    {
                                        $scope.clients.splice(keyItem, 1);
                                        return false;
                                    }
                                });

                                $scope.paginationcli.totalItems--;
                                if($scope.clients.length < $scope.paginationcli.entryLimit)
                                {
                                    $scope.pageChanged('client');
                                }
                            }
                            else if (type.indexOf('coach')!==-1)
                            {
                                if ($scope.coachview && $scope.coachview.id)
                                {
                                    $location.path('list-coach');
                                }

                                $.each($scope.coachs, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===itemId)
                                    {
                                        $scope.coachs.splice(keyItem, 1);
                                        return false;
                                    }
                                });

                                $scope.paginationcoach.totalItems--;
                                if($scope.coachs.length < $scope.paginationcoach.entryLimit)
                                {
                                    $scope.pageChanged('coach');
                                }
                            }
                            else if (type.indexOf('abonnement')!==-1)
                            {
                                if ($scope.abonnementview && $scope.abonnementview.id)
                                {
                                    $location.path('list-abonnement');
                                }

                                $.each($scope.abonnements, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===itemId)
                                    {
                                        $scope.abonnements.splice(keyItem, 1);
                                        return false;
                                    }
                                });

                                $scope.paginationab.totalItems--;
                                if($scope.abonnements.length < $scope.paginationab.entryLimit)
                                {
                                    $scope.pageChanged('abonnement');
                                }
                            }
                            else if (type.indexOf('contrat')!==-1)
                            {
                                if ($scope.contratview && $scope.contratview.id)
                                {
                                    $location.path('list-contrat');
                                }

                                $.each($scope.contrats, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===itemId)
                                    {
                                        $scope.contrats.splice(keyItem, 1);
                                        return false;
                                    }
                                });

                                $scope.paginationcontrat.totalItems--;
                                if($scope.contrats.length < $scope.paginationcontrat.entryLimit)
                                {
                                    $scope.pageChanged('contrat');
                                }
                            }
                            else if (type.indexOf('planning')!==-1)
                            {
                                if ($scope.planningview && $scope.planningview.id)
                                {
                                    $location.path('list-planning');
                                }

                                $.each($scope.plannings, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===itemId)
                                    {
                                        $scope.plannings.splice(keyItem, 1);
                                        return false;
                                    }
                                });

                                $scope.paginationplanning.totalItems--;
                                if($scope.plannings.length < $scope.paginationplanning.entryLimit)
                                {
                                    $scope.pageChanged('planning');
                                }
                            }
                            else if (type.indexOf('reservation')!==-1)
                            {
                                if ($scope.reservationview && $scope.reservationview.id)
                                {
                                    $location.path('list-reservation');
                                }

                                $.each($scope.reservations, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===itemId)
                                    {
                                        $scope.reservations.splice(keyItem, 1);
                                        return false;
                                    }
                                });

                                $scope.paginationrsv.totalItems--;
                                if($scope.reservations.length < $scope.paginationrsv.entryLimit)
                                {
                                    $scope.pageChanged('reservation');
                                }
                            }
                            else if (type.indexOf('typeingredient')!==-1)
                            {
                                $.each($scope.typeingredients, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===itemId)
                                    {
                                        $scope.typeingredients.splice(keyItem, 1);
                                        return false;
                                    }
                                });
                            }
                            else if (type.indexOf('ingredient')!==-1)
                            {
                                $.each($scope.ingredients, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===itemId)
                                    {
                                        $scope.ingredients.splice(keyItem, 1);
                                        return false;
                                    }
                                });

                                $scope.paginationingredient.totalItems--;
                                if($scope.ingredients.length < $scope.paginationingredient.entryLimit)
                                {
                                    $scope.pageChanged('ingredient');
                                }
                            }
                            else if (type.indexOf('typeproduit')!==-1)
                            {
                                $.each($scope.typeproduits, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===itemId)
                                    {
                                        $scope.typeproduits.splice(keyItem, 1);
                                        return false;
                                    }
                                });
                            }
                            else if (type.indexOf('produit')!==-1)
                            {
                                $.each($scope.produits, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===itemId)
                                    {
                                        $scope.produits.splice(keyItem, 1);
                                        return false;
                                    }
                                });

                                $scope.paginationprod.totalItems--;
                                if($scope.produits.length < $scope.paginationprod.entryLimit)
                                {
                                    $scope.pageChanged('produit');
                                }
                            }
                            else if (type.indexOf('commande')!==-1)
                            {
                                $.each($scope.commandes, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===itemId)
                                    {
                                        $scope.commandes.splice(keyItem, 1);
                                        return false;
                                    }
                                });

                                $scope.paginationcmd.totalItems--;
                                if($scope.commandes.length < $scope.paginationcmd.entryLimit)
                                {
                                    $scope.pageChanged('commande');
                                }
                            }
                            else if (type.indexOf('paiement')!==-1)
                            {
                                $scope.pageChanged('paiement');
                            }
                            else if (type.indexOf('role')!==-1)
                            {
                                $.each($scope.roles, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===itemId)
                                    {
                                        $scope.roles.splice(keyItem, 1);
                                        return false;
                                    }
                                });
                            }
                            else if (type.indexOf('user')!==-1)
                            {
                                $.each($scope.users, function (keyItem, oneItem)
                                {
                                    if (oneItem.id===itemId)
                                    {
                                        $scope.users.splice(keyItem, 1);
                                        return false;
                                    }
                                });

                                $scope.paginationuser.totalItems--;
                                if($scope.users.length < $scope.paginationuser.entryLimit)
                                {
                                    $scope.pageChanged('user');
                                }
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

function reCompile(element)
{
    var el = angular.element(element);
    $scope = el.scope();
    $injector = el.injector();
    $injector.invoke(function($compile)
    {
        $compile(el)($scope)
    })
    console.log('arrive dans la liaison');
}


