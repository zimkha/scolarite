<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\AnneeScolaire;
class AnneeScolaireController extends Controller
{
    public function save(Request $request)
    {
        try{
          return DB::transaction(function() use($request){
            $erreur = null;
            $data = 0;
            $annee_scolaire = new AnneeScolaire();
            if(isset($request->id))  $annee_scolaire = AnneeScolaire::find($id);
            if(!empty($request->date_debut) || !empty($request->date_fin))
            {
              $erreur =" Veuillez remplire tout les champs";
            }
            if($erreur == null)
            {
                $annee_scolaire->date_debut = $request->date_debut;
                $annee_scolaire->date_fin = $request->date_fin;
                $annee_scolaire->save();
                return $annee_scolaire;
            }
        
          });
        }catch(\Exception $e)
        {
          return response()->json($e);
        }
       
    }

    public function delete($id)
    {
        try{
                return DB::transaction(function() use($id){
                $erreurs = null;
                 if($id)
                 {
                  $annee_scolaire = AnneeScolaire::find($id);
                  if($annee_scolaire)
                  {
                   // Verifier si l'annee scolaire est lie a des donnes du system

                  }else $erreurs = "Erreur les données sont indisponible";
                 }else
                    $erreurs = "Erreur de donnée l'id n'existe pas";
                });
        }catch(\Exception $e)
        {
            return response()->json($e); 
        }
    }
     
}
