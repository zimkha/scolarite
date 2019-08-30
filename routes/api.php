<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::resource('inscription', 'Api\InscriptionController');
Route::resource('classe', 'Api\ClasseController');
Route::resource('eleve', 'Api\EleveController');
Route::resource('evaluation', 'Api\EvaluationController');
Route::resource('niveau', 'Api\NiveauController');
