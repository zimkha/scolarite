var app = angular.module('BackEnd', ['ngRoute', 'ngSanitize', 'ngLoadScript', 'ui.bootstrap', 'angular.filter']);

var BASE_URL = '//' + location.host + '/lidjenti_back/public/';
var imgupload = BASE_URL + '/app-assets/images/upload.jpg';

var msg_erreur = 'Une Erreur est survenue sur le serveur, veuillez contacter le support technique';

var listofrequests_assoc =
    {
        'motcles': 'id,libelle,secteur_activites{id}',
        'secteuractivites': 'id,libelle,description,mot_cles{id}',
    };




app.factory('Init', function ($http, $q) {

    var factory = {};

    factory.data = false;
    factory.getElement = function (element, listeattributs, is_graphQL = true, dataget = null) {
        console.log('pour le serveur', dataget);
        var deferred = $q.defer();
        $http({
            method: dataget == null ? 'GET' : 'POST',
            url: BASE_URL + (is_graphQL ? '/graphql?query= {' + element + ' {' + listeattributs + '} }' : element),
            headers: {
                'Content-Type': 'application/json'
            },
            data: dataget
        }).then(function successCallback(response) {

            /*lorsque la requete contient des paramètres, il faut decouper pour recupérer le tableau*/
            if (is_graphQL) {
                factory.data = response['data']['data'][!element.indexOf('(') != -1 ? element.split('(')[0] : element];
            }
            else {
                factory.data = response['data'];
            }
            deferred.resolve(factory.data);
        }, function errorCallback(error) {
            console.log('erreur serveur', error);
            deferred.reject(msg_erreur);
        });
        return deferred.promise;
    };
    factory.getElementPaginated = function (element, listeattributs) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: BASE_URL + '/graphql?query= {' + element + '{metadata{total,per_page,current_page,last_page},data{' + listeattributs + '}}}'
        }).then(function successCallback(response) {
            console.log(response)
            factory.data = response['data']['data'][!element.indexOf('(') != -1 ? element.split('(')[0] : element];
            deferred.resolve(factory.data);
        }, function errorCallback(error) {
            console.log('erreur serveur', error);
            deferred.reject(msg_erreur);
        });
        return deferred.promise;
    },
        factory.saveElement = function (element, data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: BASE_URL + '/' + element,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            }).then(function successCallback(response) {
                factory.data = response['data'];
                deferred.resolve(factory.data);
            }, function errorCallback(error) {
                console.log('erreur serveur', error);
                deferred.reject(msg_erreur);
            });
            return deferred.promise;
        };
    factory.changeStatut = function (element, data) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: BASE_URL + '/' + element + '/statut',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }).then(function successCallback(response) {
            factory.data = response['data'];
            deferred.resolve(factory.data);
        }, function errorCallback(error) {
            console.log('erreur serveur', error);
            deferred.reject(msg_erreur);
        });
        return deferred.promise;
    };
    factory.sendMail = function (element, data) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: BASE_URL + '/' + element + '/sendmail',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }).then(function successCallback(response) {
            factory.data = response['data'];
            deferred.resolve(factory.data);
        }, function errorCallback(error) {
            console.log('erreur serveur', error);
            deferred.reject(msg_erreur);
        });
        return deferred.promise;
    }
    factory.saveElementAjax = function (element, data) {
        var deferred = $q.defer();

        $.ajax
        (
            {
                url: BASE_URL + element,
                type: 'POST',
                contentType: false,
                processData: false,
                DataType: 'text',
                data: data,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                },
                beforeSend: function () {
                    $('#modal_add' + element).blockUI_start();
                }, success: function (response) {
                    $('#modal_add' + element).blockUI_stop();
                    factory.data = response;
                    deferred.resolve(factory.data);
                },
                error: function (error) {
                    $('#modal_add' + element).blockUI_stop();
                    console.log('erreur serveur', error);
                    deferred.reject(msg_erreur);
                }
            }
        );
        return deferred.promise;
    };

    factory.removeElement = function (element, id) {
        var deferred = $q.defer();
        $http({
            method: 'DELETE',
            url: BASE_URL + element + '/' + id,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            factory.data = response['data'];
            deferred.resolve(factory.data);
        }, function errorCallback(error) {
            console.log('erreur serveur', error);
            deferred.reject(msg_erreur);
        });
        return deferred.promise;
    };

    return factory;
});

/*
// Routing
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "page/dashboard"
        })
        .when("/informations", {
            templateUrl: "page/informations"
        })
        .when("/entreprises", {
            templateUrl: "page/entreprises",
        })
        .when("/detail-entreprise/:itemId", {
            templateUrl: "page/detail-entreprise",
        })
        .when("/abonnements", {
            templateUrl: "page/abonnements",
        })
        .when("/souscriptions", {
            templateUrl: "page/souscriptions",
        })
        .when("/detail-abonnement/:itemId", {
            templateUrl: "page/detail-abonnement",
        })
        .when("/detail-souscription/:itemId", {
            templateUrl: "page/detail-souscription",
        })
        .when("/fonctionnalites", {
            templateUrl: "page/fonctionnalites",
        })
        .when("/secteur-activite", {
            templateUrl: "page/secteur-activite",
        })
        .when("/mot-cle", {
            templateUrl: "page/mot-cle",
        })
        .when("/roles-permissions", {
            templateUrl: "page/role",
        })
        .when("/users", {
            templateUrl: "page/users",
        })
        .when("/upload", {
            templateUrl: "page/upload",
        })
        .otherwise({
            redirectTo: '/'
        })
}]);

*/




var factories = {};
// Spécification fonctionnelle du controller
app.controller('BackEndCtl', function (Init, $location, $scope, $filter, $log, $q, $route, $routeParams, $timeout, $compile) {




    window.Echo.channel('laravel_database_notification')
        .listen('NotificationEvent', (e) => {
            console.log('event page', e);
        });

    // Data containers
    $scope.entreprises = [];
    $scope.secteuractivites = [];
    $scope.abonnements = [];
    $scope.entrepriseabonnements = [];
    $scope.fonctionnalites = [];
    $scope.motcles = [];
    $scope.roles = [];
    $scope.permissions = [];
    $scope.users = [];
    $scope.errors = [];
    $scope.dashboards = [];
    $scope.dashboards_year_start = 2019;
    $scope.produits = [];
    $scope.famille_produits = [];
    $scope.affiliations = [];

    $scope.demande_devis = [];
    $scope.bon_commandes = [];
    $scope.bon_livraisons = [];



    $scope.formatPrice = function (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    // $scope.checkIfEnterKeyWasPressed = function ($event, type) {
    //     var keyCode = $event.which || $event.keyCode;
    //     console.log(keyCode);
    //     if (keyCode === 13) {
    //         // Do that thing you finally wanted to do
    //         $scope.pageChanged(type);
    //     }

    // };


    $scope.editFonctionnalite = (num) => {

        $("#fonctionnalite_list table tbody tr#" + num + " td input[type=number]").removeAttr("disabled");
    };

    $scope.saveFonctionnalite = (num) => {

        $("#fonctionnalite_list table tbody tr#" + num + " td input[type=number]").attr("disabled", "");
    };


    $scope.deleteFonctionnalite = (num) => {

        $("#fonctionnalite_list table tbody tr#" + num).remove();
    };

    $scope.fonctionnalite = [];
    $scope.selectionlistefonctionnalites = $scope.fonctionnalites;
    $scope.addFonctionnality = () => {

        let fonc = $("#fonctionnalite").val();
        let num = fonc - 1;
        let arr = $scope.fonctionnalites;
        $scope.fonctionnalite.push({ id: arr[num].id, fonctionnalite_id: arr[num].id, designation: arr[num].libelle, nombre: 0, code: arr[num].code });
        let markup = `
                 <tr id="${num}" class="fonc">
                        <td>${arr[num].libelle}</td>
                        <td class="text-center"><input type="number" disabled class="form-control text-center border-0 form-control-sm" value="1"/></td>
                        <td class="d-flex border-bottom border-light justify-content-center">
                        <i class="fa fa-save btn btn-sm bg-lidjenti mr-2 " ng-click="saveFonctionnalite(${num})" ></i>
                         <i class="fa fa-pencil btn btn-sm btn-warning mr-2" ng-click="editFonctionnalite(${num})"  ></i> 
                         <i class="fa fa-trash btn btn-sm btn-danger " ng-click="deleteFonctionnalite(${num})"></i>
                         </td>
                </tr>
                    `;
        $("#fonctionnalite_list table tbody").prepend($compile(markup)($scope));
        let option = `#fonctionnalite option[value="${fonc}"]`;
        $(option).remove();

    };


    $scope.ajoutFoctionnalites = function () {

        //Ajouter dans le tableau des fonctionnalités

        if ($("#fonctionnalite").val() != '') {
            let fonc = $("#fonctionnalite").val();
            let num = fonc - 1;
            let arr = $scope.fonctionnalites;

            $scope.fonctionnalite.push({ 'id': arr[num].id, 'fonctionnalite_id': arr[num].id, 'designation': arr[num].libelle, 'nombre': 0, 'code': arr[num].code });
            //Supprimer dans le select des fonctionnalités
            /*
                        let option = `#fonctionnalite option[value="${fonc}"]`;
                        $(option).remove();
            */
            $.each($scope.selectionlistefonctionnalites, function (keyItem, oneItem) {
                if (oneItem.id === arr[num].id) {
                    $scope.selectionlistefonctionnalites.splice(keyItem, 1);
                    return false;
                }
            });

            console.log('Liste de selection', $scope.selectionlistefonctionnalites);
            console.log('Nos foctionnalités', $scope.fonctionnalite);
        } else {
            iziToast.error({
                message: "Sélectionnez une fonctionnalité",
                position: 'topRight'
            });
        }
    };

    $scope.retirerFoctionnalites = function (selectedItem = null) {
        //  console.log('Je suis dans delete');
        $.each($scope.fonctionnalite, function (keyItem, oneItem) {
            if (oneItem.id == selectedItem.id) {
                $scope.fonctionnalite.splice(keyItem, 1);
                return false;
            }
        });

        //Ajouter dans le select des fonctionnalités
        let foncr = selectedItem.fonctionnalite_id;
        let numr = foncr - 1;
        let arrr = $scope.fonctionnalites;
        $scope.selectionlistefonctionnalites.push(arrr[numr]);

        console.log('Liste de selection', $scope.selectionlistefonctionnalites);
        console.log('Nos foctionnalités', $scope.fonctionnalite);

    };

    $scope.modifierNombre = function (selectedItem = null, model) {
        // console.log('Je suis dans modifier nombre');
        $.each($scope.fonctionnalite, function (keyItem, oneItem) {
            if (oneItem.id == selectedItem.id) {
                oneItem.nombre = model;
                return false;
            }
        });
        //Ajouter dans le select des fonctionnalités
        // console.log($scope.fonctionnalite);

    };

    $scope.pageReload = () => {


        var req = "abonnements";

        rewriteReq = req + "(id:" + $scope.abonnementview.id
            + ($('#searchtexte_entreprise').val() ? (',' + $('#searchoption_entreprise').val() + ':"' + $('#searchtexte_entreprise').val() + '"') : "")
            + ($('#searchentreprise_secteur_activite').val() ? (',' + 'secteur_activite_id' + ':' + $('#searchentreprise_secteur_activite').val() + '') : "")
            + ")";
        Init.getElement(rewriteReq, listofrequests_assoc[req]).then(function (data) {
            // console.log(data[0]);

            if (data[0] != undefined) {
                $scope.abonnementview = data[0];
            } else {
                $scope.abonnementview.entreprise_abonnements = [];
            }

        }, function (msg) {
            toastr.error(msg);
        });

        $scope.getelements('secteuractivites');

    };



    $scope.showToastForRT = function (msg, type) {
        if (type.indexOf("success") !== -1) {
            iziToast.success({
                progressBar: false,
                timeout: false,
                title: "",
                message: msg,
                position: 'topRight'
            });
        }
        else if (type.indexOf("warning") !== -1) {
            iziToast.warning({
                progressBar: false,
                timeout: false,
                title: "",
                message: msg,
                position: 'topRight'
            });
        }
        else if (type.indexOf("error") !== -1) {
            iziToast.error({
                progressBar: false,
                timeout: false,
                title: "",
                message: msg,
                position: 'topRight'
            });
        }
    };

    // Permet d'afficher le formulaire
    $scope.showModalAdd = function (type, fromUpdate = false, ) {

        $scope.fromUpdate = false;
        $scope.selectionlistefonctionnalites = $scope.fonctionnalites;
        $scope.fonctionnalite = [];

        setTimeout(function () {
            // On fait d'abord un destroy
            if (!$('select').data('select2')) {
                $('.select').select2('destroy');
            }
            // entrepriseabonnement
            $('.select2').select2();
        }, 500);


        emptyform(type);

        if (type == 'abonnement') {
            let trs = $("#fonctionnalite_list table tbody tr");

            for (let i = 0; i < trs.length; i++) {
                $(trs[i]).empty();
            }

            $scope.getelements("fonctionnalites");
        }

        $scope.errors = null;
        if (type.indexOf('secteur_activite') !== -1) {
            $scope.getelements('motcles');
        }

        $("#modal_add" + type).modal('show');



    };


    $scope.chstat = { 'id': '', 'statut': '', 'type': '', 'title': '' };
    $scope.showModalStatut = function (event, type, statut, obj = null, title = null) {
        var id = 0;
        id = obj.id;
        $scope.chstat.id = id;
        $scope.chstat.statut = statut;
        $scope.chstat.type = type;
        $scope.chstat.title = title;

        emptyform('chstat');
        $("#modal_addchstat").modal('show');
    };


    // for items that can change status
    $scope.changeStatut = function (e, type) {
        var form = $('#form_addchstat');
        var send_data = { id: $scope.chstat.id, etat: $scope.chstat.statut };
        form.parent().parent().blockUI_start();
        Init.changeStatut(type, send_data).then(function (data) {
            form.parent().parent().blockUI_stop();
            if (data.data != null && !data.errors) {
                if (type.indexOf('user') !== -1) {
                    var found = false;
                    $.each($scope.users, function (keyItem, valueItem) {
                        if (valueItem.id == send_data.id) {
                            $scope.users[keyItem].active = $scope.chstat.statut == 0 ? false : true;
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
            else {
                iziToast.error({
                    title: "",
                    message: '<span class="h4">' + data.errors + '</span>',
                    position: 'topRight'
                });
            }
        }, function (msg) {
            form.parent().parent().blockUI_stop();
            iziToast.error({
                message: '<span class="h4">' + msg + '</span>',
                position: 'topRight'
            });
        });
        // console.log(type, 'current status', $scope.chstat);
    };

    // Add element in database and in scope
    $scope.addElement = function (e, type, from = 'modal') {

        e.preventDefault();

        var form = $('#form_add' + type);

        var formdata = (window.FormData) ? (new FormData(form[0])) : null;
        var send_data = (formdata !== null) ? formdata : form.serialize();



        // A ne pas supprimer
        send_dataObj = form.serializeObject();
        continuer = true;

        if (type.indexOf('role') !== -1) {
            send_data.append("permissions", $scope.role_permissions);
            if ($scope.role_permissions.length == 0) {
                iziToast.error({
                    title: "",

                    message: "Vous devez ajouter au moins une permission au présent role",
                    position: 'topRight'
                });
                continuer = false;
            }
        }
        else if (type.indexOf('entrepriseabonnement') === -1 && type.indexOf('abonnement') !== -1) {

            // Modifier le nombre associer au fonctionnalite
            let ct = $scope.fonctionnalite.length;

            let tab = [];
            let dt = 0;
            let obj = {};

            send_data.append("fonctionnalites", JSON.stringify($scope.fonctionnalite));
            if ($scope.fonctionnalite.length == 0) {
                iziToast.error({
                    title: "",
                    message: "Les fonctionnalités ne peuvent pas être vides",
                    position: 'topRight'
                });
                continuer = false;
            }
            // console.log('fonctionnalites', JSON.stringify($scope.fonctionnalite))
        }



        if (form.validate() && continuer) {
            form.parent().parent().blockUI_start();
            Init.saveElementAjax(type, send_data).then(function (data) {

               console.log(data);
                form.parent().parent().blockUI_stop();
                if (data.errors) {
                    $scope.errors = data.errors;

                    var msg = "";
                    $.each($scope.errors, function (key, value) {
                        msg = msg + "\n" + value;
                    });

                    iziToast.error({
                        title: "",
                        message: '<span class="h4">' + msg + '</span>',
                        position: 'topRight'
                    });
                }
                else {
                    // console.log(data.data);

                    $scope.errors = null;

                    let d = data;

                    $("body").data("data", d);

                    emptyform(type);

                    getObj = data['data'][type + 's'][0];

                    if (type.indexOf('motcle') !== -1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.motcles.splice(0, 0, getObj);
                            $scope.paginationmotcle.totalItems++;
                            if ($scope.motcles.length > $scope.paginationmotcle.entryLimit)
                            {
                                $scope.pageChanged('motcle');
                            }
                        }
                        else
                        {
                            $.each($scope.motcles, function (keyItem, oneItem)
                            {
                                if (oneItem.id === getObj.id) {
                                    $scope.motcles[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('secteuractivite') !== -1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.secteuractivites.splice(0, 0, getObj);
                            $scope.paginationsecteuractivite.totalItems++;
                            if ($scope.secteuractivites.length > $scope.paginationsecteuractivite.entryLimit)
                            {
                                $scope.pageChanged('secteuractivite');
                            }
                        }
                        else
                        {
                            $.each($scope.secteuractivites, function (keyItem, oneItem) {
                                if (oneItem.id === getObj.id) {
                                    $scope.secteuractivites[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('role')!==-1)
                    {
                        if (!send_dataObj.id)
                        {
                            $scope.roles.splice(0, 0, getObj);
                            $scope.paginationroles.totalItems++;
                            if ($scope.roles.length > $scope.paginationroles.entryLimit)
                            {
                                $scope.pageChanged('role');
                            }
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
                    else if (type.indexOf('user') !== -1) {
                        if (!send_dataObj.id) {
                            $scope.users.splice(0, 0, getObj);
                            $scope.paginationusers.totalItems++;
                            if ($scope.users.length > $scope.paginationusers.entryLimit) {
                                $scope.pageChanged('user');
                            }
                        }
                        else {
                            location.reload();
                            $.each($scope.users, function (keyItem, oneItem) {
                                if (oneItem.id === getObj.id) {
                                    $scope.users[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('entrepriseabonnement') !== -1) {

                        if (!send_dataObj.id) {
                            $scope.entrepriseabonnements.splice(0, 0, getObj);
                            $scope.paginationentrepriseabonnements.totalItems++;
                            if ($scope.entrepriseabonnements.length > $scope.paginationentrepriseabonnements.entryLimit) {
                                $scope.pageChanged('entrepriseabonnement');
                            }
                        }
                        else {
                            if ($scope.entrepriseabonnementview && $scope.entrepriseabonnementview.id===getObj.id)
                            {
                                $scope.entrepriseabonnementview = getObj;
                                location.reload();
                            }

                            $.each($scope.entrepriseabonnements, function (keyItem, oneItem)
                            {
                                if (oneItem.id===getObj.id)
                                {
                                    $scope.entrepriseabonnements[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('entreprise') !== -1) {
                        if (!send_dataObj.id) {
                            $scope.entreprises.splice(0, 0, getObj);
                            $scope.paginationentreprise.totalItems++;
                            if ($scope.entreprises.length > $scope.paginationentreprise.entryLimit) {
                                $scope.pageChanged('entreprise');
                            }
                        }
                        else
                        {
                            if ($scope.entrepriseview && $scope.entrepriseview.id===getObj.id)
                            {
                                $scope.entrepriseview = getObj;
                                location.reload();
                            }
                            $.each($scope.entreprises, function (keyItem, oneItem) {
                                if (oneItem.id === getObj.id) {
                                    $scope.entreprises[keyItem] = getObj;
                                    return false;
                                }
                            });
                        }
                    }
                    else if (type.indexOf('abonnement') !== -1) {

                        if (!send_dataObj.id) {
                            $scope.abonnements.splice(0, 0, getObj);
                            $scope.paginationabonnements.totalItems++;
                            if ($scope.abonnements.length > $scope.paginationabonnements.entryLimit) {
                                $scope.pageChanged('abonnement');
                            }
                        }
                        else {
                            if ($scope.abonnementview && $scope.abonnementview.id===getObj.id)
                            {
                                $scope.abonnementview = getObj;
                                location.reload();
                            }
                            $.each($scope.abonnements, function (keyItem, oneItem) {
                                if (oneItem.id === getObj.id) {
                                    $scope.abonnements[keyItem] = getObj;
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


            }, function (msg) {
                form.parent().parent().blockUI_stop();
                iziToast.error({
                    title: (!send_data.id ? 'AJOUT' : 'MODIFICATION'),
                    message: '<span class="h4">Erreur depuis le serveur, veuillez contactez l\'administrateur</span>',
                    position: 'topRight'
                });
                
            });

        }
    };



    $scope.getelements = function (type, addData = null) {
        rewriteType = type;

        if (type.indexOf('familleproduit') !== -1 && $scope.entrepriseview)
        {
            rewriteType = type + "(entreprise_id:"+ $scope.entrepriseview.id +")";
        }

        Init.getElement(rewriteType, listofrequests_assoc[type]).then(function (data) {

            if (type.indexOf("secteuractivites") !== -1) {
                $scope.secteuractivites = data;
            }
            else if (type.indexOf("entreprises") !== -1) {
                $scope.entreprises = data;
            }
            else if (type.indexOf("abonnements") !== -1) {
                $scope.abonnements = data;
            }
            else if (type.indexOf("entrepriseabonnements") !== -1) {
                $scope.entrepriseabonnements = data;
            }
            else if (type.indexOf("fonctionnalites") !== -1) {
                $scope.fonctionnalites = data;

            }
            else if (type.indexOf("motcles") !== -1) {
                $scope.motcles = data;
            }
            else if (type.indexOf("roles") !== -1) {
                $scope.roles = data;
            }
            else if (type.indexOf("permissions") !== -1) {
                $scope.permissions = data;
            }
            else if (type.indexOf("users") !== -1) {
                $scope.users = data;
            }
            else if (type.indexOf("familleproduits") !== -1) {
                $scope.famille_produits = data;
            } else if (type.indexOf("dashboards") !== -1) {
                $scope.dashboards = data;
            }
        }, function (msg) {
            iziToast.error({
                title: "ERREUR",
                message: "Erreur depuis le serveur, veuillez contactez l'administrateur",
                position: 'topRight'
            });
            // console.log('Erreur serveur ici = ' + msg);
        });

    };



    $scope.pageChanged = function (type, second_req = true) {

        // console.log(type);
        if (type.indexOf('motcle') !== -1) {

            // console.log('filtre', $('#searchoption_' + type).val());
            rewriteelement = (type + 's') + 'paginated(page:' + $scope.paginationmotcle.currentPage + ',count:' + $scope.paginationmotcle.entryLimit
                + ($('#libelle_list' + type).val() ? (',libelle:"' + $('#libelle_' + type).val() + '"') : "")
                + ')';

            Init.getElementPaginated(rewriteelement, listofrequests_assoc[(type + 's')]).then(function (data) {

               
                $scope.paginationmotcle = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationmotcle.entryLimit,
                    totalItems: data.metadata.total
                };
                $scope.motcles = data.data;

            }, function (msg) {
                iziToast.error(msg);
            });

        }
        else if (type.indexOf('secteuractivite') !== -1) {
            rewriteelement = (type + 's') + 'paginated(page:' + $scope.paginationsecteuractivite.currentPage + ',count:' + $scope.paginationsecteuractivite.entryLimit
                + ($('#searchoption_' + type).val() ? (',' + $('#searchoption_' + type).val() + ':"' + $('#searchtexte_' + type).val() + '"') : "")
                + ')';
            Init.getElementPaginated(rewriteelement, listofrequests_assoc[(type + 's')]).then(function (data) {

                // console.log(data);
                // pagination controls
                $scope.paginationsecteuractivite = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationsecteuractivite.entryLimit,
                    totalItems: data.metadata.total
                };
                $scope.secteuractivites = data.data;

            }, function (msg) {

                iziToast.error(msg);
            });
        }
        else if (type.indexOf('entrepriseabonnement') !== -1) {
            rewriteelement = (type + 's') + 'paginated(page:' + $scope.paginationentrepriseabonnements.currentPage + ',count:' + $scope.paginationentrepriseabonnements.entryLimit
                + ($scope.entrepriseview ? ',entreprise_id:' + $scope.entrepriseview.id : "")
                + ($('#entreprise_listentrepriseabonnement').val() ? ',entreprise_id:' + $('#entreprise_listentrepriseabonnement').val() : "")
                + ($('#abonnement_listsentrepriseabonnement').val() ? ',abonnement_id:' + $('#abonnement_listentrepriseabonnement').val() : "")
                + ')';

            // blockUI_start_all('#section_listeclients');
            Init.getElementPaginated(rewriteelement, listofrequests_assoc[(type + 's')]).then(function (data) {

                console.log(data);
                // pagination controls
                $scope.paginationentrepriseabonnements = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationentrepriseabonnements.entryLimit,
                    totalItems: data.metadata.total
                };
                $scope.entrepriseabonnements = data.data;

                $scope.getelements("entreprises");
                $scope.getelements("abonnements");


            }, function (msg) {

                toastr.error(msg);
            });
        }
        else if (type.indexOf('entreprise') !== -1) {
            rewriteelement = (type + 's') + 'paginated(page:' + $scope.paginationentreprise.currentPage + ',count:' + $scope.paginationentreprise.entryLimit
                + ($('#searchentreprise_secteur_activite').val() ? ',secteur_activite_id:' + $('#searchentreprise_secteur_activite').val() : "")
                + ($('#searchtexte_entreprise').val() ? (',' + $('#searchoption_entreprise').val() + ':"' + $('#searchtexte_entreprise').val() + '"') : "")
                + ')';
            Init.getElementPaginated(rewriteelement, listofrequests_assoc[(type + 's')]).then(function (data) {
                // console.log(data);
                // pagination controls
                $scope.paginationentreprise = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationentreprise.entryLimit,
                    totalItems: data.metadata.total
                };
                $scope.entreprises = data.data;
                $scope.getelements('secteuractivites');

            }, function (msg) {

                iziToast.error(msg);
            });

        } else if (type.indexOf('abonnement') !== -1) {

            rewriteelement = (type + 's') + 'paginated(page:' + $scope.paginationabonnements.currentPage + ',count:' + $scope.paginationabonnements.entryLimit
                + ($('#searchtexte_abonnement').val() ? (',' + $('#searchoption_abonnement').val() + ':"' + $('#searchtexte_abonnement').val() + '"') : "")
                + ')';

            Init.getElementPaginated(rewriteelement, listofrequests_assoc[(type + 's')]).then(function (data) {

                // console.log(data);
                // pagination controls
                $scope.paginationabonnements = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationabonnements.entryLimit,
                    totalItems: data.metadata.total
                };
                $scope.abonnements = data.data;


            }, function (msg) {

                toastr.error(msg);
            });

            $scope.getelements("fonctionnalites")

        }
        else if (type.indexOf('fonctionnalite') !== -1) {

            rewriteelement = (type + 's') + 'paginated(page:' + $scope.paginationfonctionnalites.currentPage + ',count:' + $scope.paginationfonctionnalites.entryLimit
                + ($('#libelle_' + type).val() ? (',libelle:"' + $('#libelle_' + type).val() + '"') : "")
                + ')';

            Init.getElementPaginated(rewriteelement, listofrequests_assoc[(type + 's')]).then(function (data) {

                // pagination controls
                $scope.paginationfonctionnalites = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationfonctionnalites.entryLimit,
                    totalItems: data.metadata.total
                };

                $scope.fonctionnalites = data.data;

            }, function (msg) {

                toastr.error(msg);
            });



        }
        else if (type.indexOf('user') !== -1) {

            rewriteelement = (type + 's') + 'paginated(page:' + $scope.paginationusers.currentPage + ',count:' + $scope.paginationusers.entryLimit
                + ($('#searchoption_user').val() ? (',' + $('#searchoption_user').val() + ':"' + $('#searchtexte_user').val() + '"') : "")
                + ')';

            Init.getElementPaginated(rewriteelement, listofrequests_assoc[(type + 's')]).then(function (data) {


                // console.log(data);
                // pagination controls
                $scope.paginationusers = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationusers.entryLimit,
                    totalItems: data.metadata.total
                };

                $scope.users = data.data;

            }, function (msg) {

                toastr.error(msg);
            });



        } else if (type.indexOf('role') !== -1) {

            rewriteelement = (type + 's') + 'paginated(page:' + $scope.paginationroles.currentPage + ',count:' + $scope.paginationroles.entryLimit
                + ($('#searchoption_role').val() ? (',' + $('#searchoption_role').val() + ':"' + $('#searchtexte_role').val() + '"') : "")
                + ')';

            Init.getElementPaginated(rewriteelement, listofrequests_assoc[(type + 's')]).then(function (data) {


                // console.log(data);
                // pagination controls
                $scope.paginationroles = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationroles.entryLimit,
                    totalItems: data.metadata.total
                };

                $scope.roles = data.data;

            }, function (msg) {

                toastr.error(msg);
            });

        } else if (type.indexOf('produit') !== -1) {
            rewriteelement = 'produitspaginated(page:' + $scope.paginationproduits.currentPage + ',count:' + $scope.paginationproduits.entryLimit
                + ($('input#entreprise_id').val() ? (',' + 'entreprise_id:' + Number($('input#entreprise_id').val()) + '') : "")
                + ($('#reference_produit').val() ? (',' + 'reference:"' + $('#reference_produit').val() + '"') : "")
                + ($('#designation_produit').val() ? (',' + 'designation:"' + $('#designation_produit').val() + '"') : "")
                + ($('select#produit').val() ? (',' + 'famille_produit_id:' + Number($('select#produit').val() + '')) : "")

                + ')';

            Init.getElementPaginated(rewriteelement, listofrequests_assoc["produits"]).then(function (data) {

                // console.log(data);

                // pagination controls
                $scope.paginationproduits = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationproduits.entryLimit,
                    totalItems: data.metadata.total
                };

                $scope.produits = data.data;

                if (second_req)
                {
                    $scope.getelements("familleproduits")
                }

            }, function (msg) {

                toastr.error(msg);
            });
        } else if (type.indexOf('affiliation') !== -1) {


            rewriteelement = 'affiliationspaginated(page:' + $scope.paginationaffiliations.currentPage + ',count:' + $scope.paginationaffiliations.entryLimit
                + ($('input#entreprise_emet_id').val() ? (',' + 'entreprise_emet_id:' + Number($('input#entreprise_emet_id').val()) + '') : "")
                + ($('#affiliation').val() ? (',' + 'affiliation_entreprise:' + $('#affiliation').val() + '') : "")
                + ($('#affiliation_statut').val() ? (',' + 'affiliation_statut:' + $('#affiliation_statut').val() + '') : "")


                + ')';

            Init.getElementPaginated(rewriteelement, listofrequests_assoc["affiliations"]).then(function (data) {

                // console.log(data);

                // pagination controls
                $scope.paginationaffiliations = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationaffiliations.entryLimit,
                    totalItems: data.metadata.total
                };

                $scope.affiliations = data.data;

                $scope.getelements('entreprises');

            }, function (msg) {

                toastr.error(msg);
            });

            let select = localStorage.getItem('select');



        } else if (type.indexOf('fournisseur') !== -1) {

            $scope.demande_devis = [];
            $scope.bon_commandes = [];
            $scope.bon_livraisons = [];
            $scope.paginationdemande_devis = {
                currentPage: 1,
                maxSize: 10,
                entryLimit: 10,
                totalItems: 0
            };


            $scope.paginationbon_commandes = {
                currentPage: 1,
                maxSize: 10,
                entryLimit: 10,
                totalItems: 0
            };

            $scope.paginationbon_livraisons = {
                currentPage: 1,
                maxSize: 10,
                entryLimit: 10,
                totalItems: 0
            };

            $scope.select = 'founrnisseur';

            rewriteelement = 'demandedevispaginated(page:' + $scope.paginationdemande_devis.currentPage + ',count:' + $scope.paginationdemande_devis.entryLimit
                + ($('input#entreprise_fournisseur_id').val() ? (',' + 'entreprise_fournisseur_id:' + Number($('input#entreprise_fournisseur_id').val()) + '') : "")
                + ($('#fournisseur').val() ? (',' + 'entreprise_client_id:' + $('#fournisseur').val() + '') : "")
                + ($('#dd_statut').val() ? (',' + 'dd_statut:' + $('#dd_statut').val() + '') : "")
                + ')';

            Init.getElementPaginated(rewriteelement, listofrequests_assoc["demandedevis"]).then(function (data) {

                // console.log(data);

                // pagination controls
                $scope.paginationdemande_devis = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationdemande_devis.entryLimit,
                    totalItems: data.metadata.total
                };

                $scope.demande_devis = data.data;
                $scope.getelements('entreprises');

            }, function (msg) {

                toastr.error(msg);
            });
        } else if (type.indexOf('bon_commande_four') !== -1) {

            rewriteelement = 'boncommandespaginated(page:' + $scope.paginationbon_commandes.currentPage + ',count:' + $scope.paginationbon_commandes.entryLimit
                + ($('input#entreprise_fournisseur_id').val() ? (',' + 'entreprise_fournisseur_id:' + Number($('input#entreprise_fournisseur_id').val()) + '') : "")
                + ($('select#bon_commande_four').val() ? (',' + 'entreprise_client_id:' + $('select#bon_commande_four').val() + '') : "")
                + ($('#bc_statut').val() ? (',' + 'bc_statut:' + $('#bc_statut').val() + '') : "")
                + ')';

            Init.getElementPaginated(rewriteelement, listofrequests_assoc["boncommandes"]).then(function (data) {

                // console.log(data);

                // pagination controls
                $scope.paginationbon_commandes = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationbon_commandes.entryLimit,
                    totalItems: data.metadata.total
                };

                $scope.bon_commandes = data.data;


            }, function (msg) {

                toastr.error(msg);
            });
        } else if (type.indexOf('bon_livraison_four') !== -1) {

            rewriteelement = 'bonlivraisonspaginated(page:' + $scope.paginationbon_livraisons.currentPage + ',count:' + $scope.paginationbon_livraisons.entryLimit
                + ($('input#entreprise_fournisseur_id').val() ? (',' + 'entreprise_fournisseur_id:' + Number($('input#entreprise_fournisseur_id').val()) + '') : "")
                + ($('select#bon_livraison_four').val() ? (',' + 'entreprise_client_id:' + $('select#bon_livraison_four').val() + '') : "")
                + ($('#code_livraison').val() ? (',' + 'code_livraison:"' + $('#code_livraison').val() + '"') : "")

                + ')';

            Init.getElementPaginated(rewriteelement, listofrequests_assoc["bonlivraisons"]).then(function (data) {

                // console.log(data);

                // pagination controls
                $scope.paginationbon_livraisons = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationbon_livraisons.entryLimit,
                    totalItems: data.metadata.total
                };

                $scope.bon_livraisons = data.data;

            }, function (msg) {

                toastr.error(msg);
            });
        } else if (type.indexOf('bon_commande_client') !== -1) {

            rewriteelement = 'boncommandespaginated(page:' + $scope.paginationbon_commandes.currentPage + ',count:' + $scope.paginationbon_commandes.entryLimit
                + ($('input#entreprise_client_id').val() ? (',' + 'entreprise_client_id:' + Number($('input#entreprise_client_id').val()) + '') : "")
                + ($('select#bon_commande_client').val() ? (',' + 'entreprise_fournisseur_id:' + $('select#bon_commande_client').val() + '') : "")
                + ($('#bc_client_statut').val() ? (',' + 'bc_statut:' + $('#bc_client_statut').val() + '') : "")

                + ')';

            Init.getElementPaginated(rewriteelement, listofrequests_assoc["boncommandes"]).then(function (data) {

                // console.log(data);

                // pagination controls
                $scope.paginationbon_commandes = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationbon_commandes.entryLimit,
                    totalItems: data.metadata.total
                };

                $scope.bon_commandes = data.data;

            }, function (msg) {

                toastr.error(msg);
            });
        } else if (type.indexOf('bon_livraison_client') !== -1) {

            rewriteelement = 'bonlivraisonspaginated(page:' + $scope.paginationbon_livraisons.currentPage + ',count:' + $scope.paginationbon_livraisons.entryLimit
                + ($('input#entreprise_client_id').val() ? (',' + 'entreprise_client_id:' + Number($('input#entreprise_client_id').val()) + '') : "")
                + ($('select#bon_livraison_client').val() ? (',' + 'entreprise_fournisseur_id:' + $('select#bon_livraison_client').val() + '') : "")
                + ($('#code_livraison_cl').val() ? (',' + 'code_livraison:"' + $('#code_livraison_cl').val() + '"') : "")

                + ')';

            Init.getElementPaginated(rewriteelement, listofrequests_assoc["bonlivraisons"]).then(function (data) {

                // console.log(data);

                // pagination controls
                $scope.paginationbon_livraisons = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationbon_livraisons.entryLimit,
                    totalItems: data.metadata.total
                };

                $scope.bon_livraisons = data.data;

            }, function (msg) {

                toastr.error(msg);
            });
        } else if (type.indexOf('client') !== -1) {
            $scope.demande_devis = [];
            $scope.bon_commandes = [];
            $scope.bon_livraisons = [];

            $scope.paginationdemande_devis = {
                currentPage: 1,
                maxSize: 10,
                entryLimit: 10,
                totalItems: 0
            };


            $scope.paginationbon_commandes = {
                currentPage: 1,
                maxSize: 10,
                entryLimit: 10,
                totalItems: 0
            };

            $scope.paginationbon_livraisons = {
                currentPage: 1,
                maxSize: 10,
                entryLimit: 10,
                totalItems: 0
            };

            $scope.select = 'client';



            rewriteelement = 'demandedevispaginated(page:' + $scope.paginationdemande_devis.currentPage + ',count:' + $scope.paginationdemande_devis.entryLimit
                + ($('input#entreprise_client_id').val() ? (',' + 'entreprise_client_id:' + Number($('input#entreprise_client_id').val()) + '') : "")
                + ($('#client').val() ? (',' + 'entreprise_fournisseur_id:' + $('#client').val() + '') : "")
                + ($('#dd_client_statut').val() ? (',' + 'dd_statut:' + $('#dd_client_statut').val() + '') : "")
                + ')';






            Init.getElementPaginated(rewriteelement, listofrequests_assoc["demandedevis"]).then(function (data) {

                // console.log(data);

                // pagination controls
                $scope.paginationdemande_devis = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationdemande_devis.entryLimit,
                    totalItems: data.metadata.total
                };

                $scope.demande_devis = data.data;

                $scope.getelements('entreprises');

            }, function (msg) {

                toastr.error(msg);
            });
        }
    };



    // Permet d'ajouter une permission à la liste des permissions d'un role
    $scope.role_permissions = [];
    $scope.addToRole = function (event, itemId) {
        $scope.role_permissions = [];
        $("[id^=permission_role]").each(function (key, value) {
            if ($(this).prop('checked')) {
                var permission_id = $(this).attr('data-permission-id');
                $scope.role_permissions.push(permission_id);
            }
        });
        // console.log('arrive', $scope.role_permissions);
    };


    // Pour detecter le changement des routes avec Angular
    $scope.linknav = "/";
    $scope.$on('$routeChangeStart', function (next, current) {
        /******* Réintialisation de certaines valeurs *******/



        $scope.entrepriseview = null;
        $scope.entrepriseabonnementview = null;
        $scope.abonnementview = null;
        $scope.fonctionnaliteview = null;
        $scope.secteur_activiteview = null;
        $scope.roleview = null;
        $scope.permissionview = null;
        $scope.userview = null;


        $scope.paginationentreprise = {
            currentPage: 1,
            maxSize: 10,
            entryLimit: 10,
            totalItems: 0
        };

        $scope.paginationabonnements = {
            currentPage: 1,
            maxSize: 10,
            entryLimit: 10,
            totalItems: 0
        };

        $scope.paginationentrepriseabonnements = {
            currentPage: 1,
            maxSize: 10,
            entryLimit: 10,
            totalItems: 0
        };

        $scope.paginationfonctionnalites = {
            currentPage: 1,
            maxSize: 10,
            entryLimit: 10,
            totalItems: 0
        };


        $scope.paginationsecteuractivite = {
            currentPage: 1,
            maxSize: 10,
            entryLimit: 10,
            totalItems: 0
        };

        $scope.paginationroles = {
            currentPage: 1,
            maxSize: 10,
            entryLimit: 10,
            totalItems: 0
        };


        $scope.paginationpermissions = {
            currentPage: 1,
            maxSize: 10,
            entryLimit: 10,
            totalItems: 0
        };

        $scope.paginationmotcle = {
            currentPage: 1,
            maxSize: 10,
            entryLimit: 10,
            totalItems: 0
        };

        $scope.paginationusers = {
            currentPage: 1,
            maxSize: 10,
            entryLimit: 10,
            totalItems: 0
        };


        $scope.paginationproduits = {
            currentPage: 1,
            maxSize: 10,
            entryLimit: 10,
            totalItems: 0
        };
        $scope.paginationaffiliations = {
            currentPage: 1,
            maxSize: 10,
            entryLimit: 10,
            totalItems: 0
        };
        $scope.paginationdemande_devis = {
            currentPage: 1,
            maxSize: 10,
            entryLimit: 10,
            totalItems: 0
        };


        $scope.paginationbon_commandes = {
            currentPage: 1,
            maxSize: 10,
            entryLimit: 10,
            totalItems: 0
        };

        $scope.paginationbon_livraisons = {
            currentPage: 1,
            maxSize: 10,
            entryLimit: 10,
            totalItems: 0
        };

        /******* /Réintialisation de certaines valeurs *******/

        $scope.getelements('roles');

        // console.log("page new");


        let link = $location.path();


        $scope.linknav = $location.path();
        $scope.whereAreWe = angular.lowercase(current.templateUrl);


        if (angular.lowercase(current.templateUrl).indexOf('secteur-activite') !== -1) {
            $scope.secteur_activiteview = null;
            if (current.params.itemId) {
                var req = "secteuractivite";
                $scope.secteur_activiteview = {};
                rewriteReq = req + "(id:" + current.params.itemId + ")";
                Init.getElement(rewriteReq, listofrequests_assoc[req]).then(function (data) {
                    $scope.secteur_activiteview = data[0];

                }, function (msg) {
                    toastr.error(msg);
                });
            }
            else {
                $scope.getelements("motcles");
                $scope.pageChanged('secteuractivite');
            }
        }
        else if (angular.lowercase(current.templateUrl).indexOf('entreprise') !== -1) {
            $scope.entrepriseview = null;
            if (current.params.itemId) {
                var req = "entreprises";
                $scope.entrepriseview = {};
                rewriteReq = req + "(id:" + current.params.itemId + ")";
                Init.getElement(rewriteReq, listofrequests_assoc[req]).then(function (data) {
                    $scope.entrepriseview = data[0];

                    $scope.pageChanged('entrepriseabonnement');

                    //pour les filtres
                    $scope.getelements("abonnements");

                }, function (msg) {
                    toastr.error(msg);
                });
            }
            else {
                $scope.getelements('secteuractivites');
                $scope.pageChanged('entreprise');
            }
        } else if (angular.lowercase(current.templateUrl).indexOf('abonnement') !== -1) {
            $scope.abonnementview = null;
            if (current.params.itemId) {
                var req = "abonnements";
                $scope.abonnementview = {};
                rewriteReq = req + "(id:" + current.params.itemId
                    + ($('#searchtexte_entreprise').val() ? (',' + $('#searchoption_entreprise').val() + ':"' + $('#searchtexte_entreprise').val() + '"') : "")
                    + ($('#searchentreprise_secteur_activite').val() ? (',' + 'secteur_activite_id' + ':' + $('#searchentreprise_secteur_activite').val() + '') : "")
                    + ")";
                Init.getElement(rewriteReq, listofrequests_assoc[req]).then(function (data) {
                    $scope.abonnementview = data[0];

                }, function (msg) {
                    toastr.error(msg);
                });

                $scope.getelements('secteuractivites');
            }
            else {

                $scope.pageChanged('abonnement');

            }
        } else if (angular.lowercase(current.templateUrl).indexOf('souscription') !== -1) {
            $scope.entrepriseabonnementview = null;
            if (current.params.itemId) {
                var req = "entrepriseabonnements";
                $scope.entrepriseabonnementview = {};
                rewriteReq = req + "(id:" + current.params.itemId + ")";
                Init.getElement(rewriteReq, listofrequests_assoc[req]).then(function (data) {
                    $scope.entrepriseabonnementview = data[0];
                    $scope.getelements("abonnements");
                    $scope.getelements('entreprises');

                }, function (msg) {
                    toastr.error(msg);
                });

            }
            else {

                $scope.pageChanged('entrepriseabonnement');
                $scope.getelements("abonnements");
                $scope.getelements('entreprises');
            }
        } else if (angular.lowercase(current.templateUrl).indexOf('fonctionnalite') !== -1) {
            $scope.fonctionnaliteview = null;
            if (current.params.itemId) {
                var req = "fonctionnalite";
                $scope.fonctionnaliteview = {};
                rewriteReq = req + "(id:" + current.params.itemId + ")";
                Init.getElement(rewriteReq, listofrequests_assoc[req]).then(function (data) {
                    $scope.fonctionnaliteview = data[0];

                }, function (msg) {
                    toastr.error(msg);
                });

            }
            else {

                $scope.pageChanged('fonctionnalite');

            }
        } else if (angular.lowercase(current.templateUrl).indexOf('roles-permissions') !== -1) {
            $scope.roleview = null;
            if (current.params.itemId) {
                var req = "role";
                $scope.roleview = {};
                rewriteReq = req + "(id:" + current.params.itemId + ")";
                Init.getElement(rewriteReq, listofrequests_assoc[req]).then(function (data) {
                    $scope.roleview = data[0];

                }, function (msg) {
                    etE
                    toastr.error(msg);
                });

            }
            else {

                $scope.pageChanged('role');

            }
        } else if (angular.lowercase(current.templateUrl).indexOf('user') !== -1) {
            $scope.userview = null;
            if (current.params.itemId) {
                var req = "user";
                $scope.userview = {};
                rewriteReq = req + "(id:" + current.params.itemId + ")";
                Init.getElement(rewriteReq, listofrequests_assoc[req]).then(function (data) {
                    $scope.userview = data[0];

                }, function (msg) {
                    toastr.error(msg);
                });

            }
            else {

                $scope.pageChanged('user');

            }
        } else if (angular.lowercase(current.templateUrl).indexOf('dashboard') !== -1) {
            $scope.pageDashboard = true;
            $scope.getelements("dashboards");
            $scope.getelements('secteuractivites');
            $scope.pageChanged('entreprise');
        }
    });

    $scope.$on('$routeChangeSuccess', function (next, current) {

        setTimeout(function ()
        {
            $('.select2').select2();

            // Format options
            $('.datedropper').pickadate({
                format: 'dd/mm/yyyy',
                formatSubmit: 'dd/mm/yyyy',
                monthsFull: [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ],
                monthsShort: [ 'Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec' ],
                weekdaysShort: [ 'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam' ],
                today: 'aujourd\'hui',
                clear: 'clair',
                close: 'Fermer'
            });

        },1000);

        let link = $location.path();

        if (link == "/roles-permissions") {



            rewriteelement = 'rolespaginated(page:' + $scope.paginationroles.currentPage + ',count:' + $scope.paginationroles.entryLimit
                + ($('#searchoption_role').val() ? (',' + $('#searchoption_role').val() + ':"' + $('#searchtexte_role').val() + '"') : "")
                + ')';

            Init.getElementPaginated(rewriteelement, listofrequests_assoc["roles"]).then(function (data) {

                // console.log(data);

                // pagination controls
                $scope.paginationroles = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationroles.entryLimit,
                    totalItems: data.metadata.total
                };

                $scope.roles = data.data;


            }, function (msg) {

                toastr.error(msg);
            });

            $scope.getelements('permissions');
        }

        setTimeout(function () {


            $('select.select2').select2(
                {
                    width: 'resolve',
                    tags: true
                }
            );
            var set = 0;
            $('.select2.produit').on('change', function (e) {
                let type = $(e.target).attr("id");
                $scope.pageChanged(type, false);
                //console.log('value select2', type, $(this).val())
            });


            // Format options
            $('.datedropper').pickadate({
                format: 'dd/mm/yyyy',
                formatSubmit: 'dd/mm/yyyy',
                monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                monthsShort: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
                weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
                today: 'aujourd\'hui',
                clear: 'clair',
                close: 'Fermer'
            });

        }, 1000);

        $("#token").val(window.Laravel);

        // console.log('chargement de la page, récupération du token', window.Laravel);



    });


    function emptyform(type) {
        let dfd = $.Deferred();
        $('.ws-number').val("");
        $("input[id$=" + type + "], textarea[id$=" + type + "], select[id$=" + type + "], button[id$=" + type + "]").each(function () {
            $(this).val("");
            $(this).attr($(this).hasClass('btn') ? 'disabled' : 'readonly', false);
        });

        $('#img' + type)
            .val("");
        $('#affimg' + type).attr('src', imgupload);


        // Pour les dates sur tout ce qui est modal
        // $('.datedropper').attr('readonly', true);

        return dfd.promise();
    }



    $scope.deleteElement = function (type, itemId) {
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

                        // console.log('deleted', data);
                        if (data.data && !data.errors) {
                            // console.log('deleted', data);

                            if (type.indexOf('motcle') !== -1) {
                                $.each($scope.motcles, function (keyItem, oneItem) {
                                    if (oneItem.id === itemId) {
                                        $scope.motcles.splice(keyItem, 1);
                                        return false;
                                    }
                                });

                                $scope.paginationmotcle.totalItems--;
                                if ($scope.motcles.length < $scope.paginationmotcle.entryLimit) {
                                    $scope.pageChanged('motcle');
                                }
                            }
                            else if (type.indexOf('secteuractivite') !== -1) {
                                $.each($scope.secteuractivites, function (keyItem, oneItem) {
                                    if (oneItem.id === itemId) {
                                        $scope.secteuractivites.splice(keyItem, 1);
                                        return false;
                                    }
                                });

                                $scope.paginationsecteuractivite.totalItems--;
                                if ($scope.secteuractivites.length < $scope.paginationsecteuractivite.entryLimit) {
                                    $scope.pageChanged('secteuractivite');
                                }
                            }
                            else if (type.indexOf('entrepriseabonnement') !== -1) {
                                $.each($scope.entrepriseabonnements, function (keyItem, oneItem) {
                                    if (oneItem.id === itemId) {
                                        $scope.entrepriseabonnements.splice(keyItem, 1);
                                        return false;
                                    }
                                });
                                $scope.paginationentrepriseabonnements.totalItems--;
                                if ($scope.entrepriseabonnements.length < $scope.paginationentrepriseabonnements.entryLimit) {
                                    $scope.pageChanged('entrepriseabonnement');
                                }

                            }
                            else if (type.indexOf('entreprise') !== -1) {
                                $.each($scope.entreprises, function (keyItem, oneItem) {
                                    if (oneItem.id === itemId) {
                                        $scope.entreprises.splice(keyItem, 1);
                                        return false;
                                    }
                                });

                                $scope.paginationentreprises.totalItems--;
                                if ($scope.entreprises.length < $scope.paginationentreprises.entryLimit) {
                                    $scope.pageChanged('entreprise');
                                }
                            } else if (type.indexOf('abonnement') !== -1) {
                                $.each($scope.abonnements, function (keyItem, oneItem) {
                                    if (oneItem.id === itemId) {
                                        $scope.abonnements.splice(keyItem, 1);
                                        return false;
                                    }
                                });
                                $scope.paginationabonnements.totalItems--;
                                if ($scope.abonnements.length < $scope.paginationabonnements.entryLimit) {
                                    $scope.pageChanged('entreprise');
                                }
                            } else if (type.indexOf('fonctionnalite') !== -1) {
                                $.each($scope.fonctionnalites, function (keyItem, oneItem) {
                                    if (oneItem.id === itemId) {
                                        $scope.fonctionnalites.splice(keyItem, 1);
                                        return false;
                                    }
                                });
                            } else if (type.indexOf('role') !== -1) {
                                $.each($scope.roles, function (keyItem, oneItem) {
                                    if (oneItem.id === itemId) {
                                        $scope.roles.splice(keyItem, 1);
                                        return false;
                                    }
                                });

                                $scope.paginationroles.totalItems--;
                                if ($scope.roles.length < $scope.paginationroles.entryLimit) {
                                    $scope.pageChanged('entrepriseabonnement');
                                }
                            } else if (type.indexOf('permission') !== -1) {
                                $.each($scope.permissions, function (keyItem, oneItem) {
                                    if (oneItem.id === itemId) {
                                        $scope.permissions.splice(keyItem, 1);
                                        return false;
                                    }
                                });
                            } else if (type.indexOf('user') !== -1) {
                                $.each($scope.users, function (keyItem, oneItem) {
                                    if (oneItem.id === itemId) {
                                        $scope.users.splice(keyItem, 1);
                                        return false;
                                    }
                                });

                                $scope.paginationusers.totalItems--;
                                if ($scope.users.length < $scope.paginationusers.entryLimit) {
                                    $scope.pageChanged('user');
                                }
                            }


                            iziToast.success({
                                title: title,
                                message: "succès",
                                position: 'topRight'
                            });
                        }
                        else {
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
            onClosing: function (instance, toast, closedBy) {
                console.log('Closing | closedBy: ' + closedBy);
            },
            onClosed: function (instance, toast, closedBy) {
                console.log('Closed | closedBy: ' + closedBy);
            }
        });
    };

    $scope.itemUpdated = null;
    $scope.typeUpdated = null;

    $scope.showModalUpdate = function (type, itemId, forceChangeForm = false) {
        reqwrite = type + "s" + "(id:" + itemId + ")";

        Init.getElement(reqwrite, listofrequests_assoc[type + "s"]).then(function (data) {
            var item = data[0];
            $scope.itemUpdated = data[0];
            $scope.typeUpdated = type;

            console.log('item ', type, item);


            $scope.updatetype = type;
            $scope.updateelement = item;

            $scope.showModalAdd(type, true);

            $scope.fromUpdate = true;

            $('#id_' + type).val(item.id);
            if (type.indexOf("motcle") !== -1) {
                $('#libelle_' + type).val(item.libelle);
            }
            else if (type.indexOf("secteuractivite") !== -1) {
                $('#libelle_' + type).val(item.libelle);
                $('#description_' + type).val(item.description);
                let itemList = [];
                $.each(item.mot_cles, function (keyItem, valueItem) {
                    itemList.push(valueItem.id);
                });

                // console.log(itemList);
                $('#secteuractivite_mot_cles_' + type).val(itemList).trigger("change");
            }
            else if (type.indexOf("entrepriseabonnement") !== -1) {

                $('#entreprise_' + type).val(item.entreprise.id).trigger('change');
                $('#abonnement_' + type).val(item.abonnement.id).trigger('change');
                $('#date_' + type).val(item.date);

            }
            else if (type.indexOf("entreprise") !== -1) {

                $('#raison_social_' + type).val(item.raison_social);
                $('#email_' + type).val(item.email);

                $("#secteur_activite_entreprise").val(item.secteur_activite_id).trigger('change');

                $('#numero_telephone_' + type).val(item.numero_telephone);
                $("#affimgentreprise").attr("src", item.logo);

            } else if (type.indexOf("abonnement") !== -1) {

                $('#libelle_abonnement').val(item.libelle);
                $('#montant_abonnement').val(item.montant);
                $('#nombre_abonnement').val(item.nombre);

                var liste_fonctionnalites = [];
                var selection_fs = $scope.fonctionnalites;
                console.log(selection_fs);
                $.each(item.abonnement_fonctionnalites, function (keyItem, valueItem) {
                    liste_fonctionnalites.push({ 'id': valueItem.id, 'fonctionnalite_id': valueItem.fonctionnalite_id, 'designation': valueItem.designation, 'nombre': valueItem.nombre, 'code': valueItem.code });
                });

                $scope.fonctionnalite = liste_fonctionnalites;

                $.each($scope.fonctionnalite, function (keyItemSelect, oneItemSelect) {

                    $.each(selection_fs, function (keyItemS, oneItemS) {
                        if (oneItemS.id == oneItemSelect.fonctionnalite_id) {
                            selection_fs.splice(keyItemS, 1);
                            return false;
                        }
                    });
                });

                $scope.selectionlistefonctionnalites = selection_fs;


            }
            else if (type.indexOf("role") !== -1) {
                $('#name_' + type).val(item.name);
                $scope.roleview = item;

                $scope.role_permissions = [];
                $.each($scope.roleview.permissions, function (key, value) {
                    $scope.role_permissions.push(value.id);
                });
                // console.log('lancer', $scope.role_permissions);
            }
            else if (type.indexOf("user") !== -1) {
                $('#name_' + type).val(item.name);
                $('#role_' + type).val(item.roles[0].id).attr('disabled', forceChangeForm);
                $('#email_' + type).val(item.email).attr('readonly', forceChangeForm);
                $('#password_' + type).val("");
                $('#confirmpassword_' + type).val("");
                $('#img' + type)
                    .val("")
                    .attr('required', false).removeClass('required');
                $('#affimg' + type).attr('src', (item.image ? item.image : imgupload));
                $scope.userview = item;
            }
            else if (type.indexOf("role") !== -1) {
                $('#name_' + type).val(item.name);
                $scope.roleview = item;

                $scope.role_permissions = [];
                $.each($scope.roleview.permissions, function (key, value) {
                    $scope.role_permissions.push(value.id);
                });
                // console.log('lancer', $scope.role_permissions);
            }



        }, function (msg) {
            iziToast.error({
                title: "Modification",
                message: "Erreur depuis le serveur, veuillez contactez l'administrateur",
                position: 'topRight'
            });
            console.log('Erreur serveur ici = ' + msg);
        });
    };

    // Permet de vérifier si un id est dans un tableau
    $scope.isInArrayData = function (e, idItem, data, typeItem = "menu") {
        response = false;
        $.each(data, function (key, value) {
            if (typeItem.indexOf('menu') !== -1) {
                if (value.consommation_id == idItem) {
                    response = true;
                }
            }
            else if (typeItem.indexOf('role') !== -1) {
                if (value.id == idItem) {
                    response = true;
                }
            }
            //return response;
        });
        //console.log('ici', response);

        return response;
    };

    //Cocher tous les checkbox / Décocher tous les checkbox
    $scope.checkAllOruncheckAll = function () {
        var cocherOuNon = $scope.cocherTout;
        if (cocherOuNon == true) {
            //Tout doit etre coché
            $("#labelCocherTout").html('Tout décocher');
        } else {
            //Tout doit etre décoché
            $("#labelCocherTout").html('Tout cocher');
        }
        $('.mycheckbox').prop('checked', cocherOuNon);
        $scope.addToRole();
        console.log("Je suis dans check all ===>" + cocherOuNon);
    };


    $scope.eraseFile = function (idInput) {

        $('#' + idInput).val("");
        $('#erase_' + idInput).val("yes");
        $('#aff' + idInput).attr('src', imgupload);
    };


    // to reset some elements associated with plugins
    $scope.reInit = function(type="select2")
    {
        setTimeout(function () {

            if (type.indexOf("select2")!==-1)
            {
                $('.select2').select2();
            }
            else if (type.indexOf("datedropper")!==-1)
            {
                $('.datedropper').pickadate({
                    format: 'dd/mm/yyyy',
                    formatSubmit: 'dd/mm/yyyy',
                    monthsFull: [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ],
                    monthsShort: [ 'Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec' ],
                    weekdaysShort: [ 'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam' ],
                    today: 'aujourd\'hui',
                    clear: 'clair',
                    close: 'Fermer'
                });
            }
        },100);
    };

    //Compter le nombre d'éléments d'un tableau
    $scope.compterNbreElement = function (tableau) {
        var nbre = 0;
        $.each(tableau, function (keyItem, oneItem) {
            nbre++;
        });
        return nbre;
    };

});


// Vérification de l'extension des elements uploadés
function isValide(fichier) {
    var Allowedextensionsimg = new Array("jpg", "JPG", "jpeg", "JPEG", "gif", "GIF", "png", "PNG");
    var Allowedextensionsvideo = new Array("mp4");
    for (var i = 0; i < Allowedextensionsimg.length; i++)
        if ((fichier.lastIndexOf(Allowedextensionsimg[i])) != -1) {
            return 1;
        }
    for (var j = 0; j < Allowedextensionsvideo.length; j++)
        if ((fichier.lastIndexOf(Allowedextensionsvideo[j])) != -1) {
            return 2;
        }
    return 0;
}

// FileReader pour la photo
function Chargerphoto(idform) {
    var fichier = document.getElementById("img" + idform);
    (isValide(fichier.value) != 0) ?
        (
            fileReader = new FileReader(),
                (isValide(fichier.value) == 1) ?
                    (
                        fileReader.onload = function (event) { $("#affimg" + idform).attr("src", event.target.result); },
                            fileReader.readAsDataURL(fichier.files[0]),
                            (idform == 'produit') ? $("#imgproduit_recup").val("") : ""
                    ) : null
        ) : (
            alert("L'extension du fichier choisi ne correspond pas aux règles sur les fichiers pouvant être uploader"),
                $('#img' + idform).val(""),
                $('#affimg' + idform).attr("src", ""),
                $('.input-modal').val("")
        );
}

function reCompile(element) {
    var el = angular.element(element);
    $scope = el.scope();
    $injector = el.injector();
    $injector.invoke(function ($compile) {
        $compile(el)($scope)
    })
    // console.log('arrive dans la liaison');
}





