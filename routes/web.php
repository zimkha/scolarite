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
    return view('pages/index');
});


Route::get('/dashboard', 'HomeController@index');

Route::get('/inscription', 'InscriptionController@index');




Route::post('/classe', 'ClasseController@save');
Route::get('/classes', 'ClasseController@getAll');

Route::post('/inscription', 'InscriptionController@save');
Route::get('/isncriptions', 'InscriptionController@getAll');
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
