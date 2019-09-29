<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $anne_sco = App\AnneeScolaire::all();
    
    return view('pages/index', compact('anne_sco'));
})->middleware('auth');

Route::get('/dashboard', 'HomeController@index');

Route::get('/inscription', 'InscriptionController@index');



Route::get('/depenses', 'DepenseController@index')->name('liste-depense');
Route::post('/depense', 'DepenseController@save')->name('save-depense');
Route::get('/depense/show/{id}', 'DepenseController@show')->name('show-depense');
Route::delete('/depense/delete/{id}', 'DepenseController@delete')->name('delete-depense');


Route::post('/classe', 'ClasseController@save');
Route::get('/classe-index', 'ClasseController@index')->name('home-classe');
Route::get('/classes', 'ClasseController@getAll');
Route::get('/classe/{id}', 'ClasseController@show')->name('show-classe');
Route::get('/niveau/{id}', 'NiveauClasseController@show')->name('show-niveau');
Route::post('/eleve-store', 'EleveController@saveUpdate')->name('save-update-eleve');

Route::post('/inscription', 'InscriptionController@save')->name('inscrire');
Route::get('/isncriptions', 'InscriptionController@getAll');
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/profile-eleve/{id}', 'EleveController@show')->name('voir-eleve');
Route::post('/paiement-save', 'PaiementController@save')->name('save-paiement');
Route::get('/paiement-index', 'PaiementController@index')->name('paiement-index');

Route::post('/paiement-dispatch','PaiementController@savePaiementDispatch')->name('savePaiementDispatch');

Route::get('/matieres', 'MatiereController@index')->name('list-matiere');
Route::post('/matiere-save', 'MatiereController@save')->name('matiere-save');
Route::post('/matiere-show/{id}', 'MatiereController@show')->name('matiere-show');

Route::post('/professeur', 'ProfesseurController@save')->name('save-prof');
Route::get('/professeurs', 'ProfesseurController@index')->name('liste-prof');
Route::get('/professeur/detail/{id}', 'ProfesseurController@show')->name('show-prof');
Route::delete('/professeur/delete/{id}', 'ProfesseurController@delete');
Route::post('/professeur-witheclasse', 'ProfesseurController@saveProfWithClasse')->name('save-Prof-With-Classe');
Route::post('/professeur-withe-matiere-enseigne', 'ProfesseurController@saveProfWithMatiere')->name('matier-par-prfesseur');

