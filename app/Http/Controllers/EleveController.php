<?php

namespace App\Http\Controllers;

use App\Eleve;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EleveController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|mixed
     */
    public  function  saveUpdate(Request $request)
    {
        try{
            return DB::transaction(function () use($request){
                $errors = null;
                $data = 0;
                if(empty($request->id))
                {
                    $errors ="Les donnees envoye sont manquants";
                }
                 $eleve = Eleve::find($request->id);
                if ($eleve)
                {
                 if (empty($request->adresse) || empty($request->naissance) || empty($request->nomcomplet) || empty($request->adresse_tuteur))
                 {
                     $errors = "Veuillez remplir tout les champs";
                 }
                   $eleve->adresse          = $request->adresse;
                   $eleve->naissance        = $request->naissance;
                   $eleve->nomcomplet       = $request->nomcomplet;
                   $eleve->adresse_tuteur   = $request->adresse_tuteur;
                   if(isset($request->telephone)) $eleve->telephone = $request->telephone;
                   if ($errors == null)
                   {
                       $eleve->save();
                       return response()->json($errors);
                   }
                   else return response()->json($errors);
                }
                else
                {
                    $errors ="L'eleve avec cette id n'existe pas dans la base";
                }
            });
        }catch (\Exception $exception)
        {
            return response()->json($exception->getMessage());
        }
    }

    /**
     * @param $id
     */
    public function delete($id)
    {

    }
}
