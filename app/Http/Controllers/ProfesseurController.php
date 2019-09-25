<?php

namespace App\Http\Controllers;

use App\Professeur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Outil;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class ProfesseurController extends Controller
{
    public function  index()
    {
        $professeurs = Professeur::all();
        return view('pages.liste-professeur', compact('professeurs'));
    }
    public  function  save(Request $request)
    {
        try{
            return DB::transaction(function () use($request){
                  $errors = array();
                  $prof = new Professeur();
                  if (isset($request->id))
                  {
                      $prof = Professeur::find($request->id);
                  }
                  if (empty($request->nom) || empty($request->prenom) || empty($request->telephone) || empty($request->adresse)
                      || empty($request->email))
                  {
                        array_push($errors, 'Ereur veuillez remplire touts le champs dun formulaire');
                  }
                  $prof->matricule = Outil::matricule($request->nom, $request->prenom);
                  if ($errors == null)
                  {
                      $prof->create($request->all());
                      Session::flash('message', "Professeur bien enregistre");
                      return Redirect::back();
                  }
                  else
                  {
                      Session::flash('error', $errors);
                      return Redirect::back();
                  }
            });
        }
        catch (\Exception $e)
        {
            return response()->json($e->getMessage());
        }
    }
}
