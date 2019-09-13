<?php

namespace App\Http\Controllers;

use App\Eleve;
use App\Inscription;
use App\Mensuel;
use App\Paiement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;


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
                dd($request->all());
                if(empty($request->id))
                {
                    $errors ="Les donnees envoye sont manquants";
                }
                 $eleve = Eleve::find($request->id);
                if ($eleve)
                {
                   if (isset($request->adresse)){
                       $eleve->adresse          = $request->adresse;
                   }
                   if (isset($request->date_naissance))
                   {
                       $eleve->naissance        = $request->date_aissance;
                   }

                 if (isset($request->nomcomplet))
                 {
                     $eleve->nomcomplet       = $request->nomcomplet;
                 }

                  if (isset($request->adresse_tuteur))
                  {
                      $eleve->adresse_tuteur   = $request->adresse_tuteur;
                  }
                   if(isset($request->telephone)) $eleve->telephone = $request->telephone;
                   if ($errors == null)
                   {
                       $eleve->nom  = $request->nom;
                       $eleve->prenom = $request->prenom;
                       $eleve->adresse  = $request->adresse;
                       $eleve->save();
                       return redirect()->route('voir-eleve', ['id' => $eleve->id]);
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

    public  function show($id)
    {

            $php_errormsg = null;
            if($id)
            {
                 $inscription = Inscription::find($id);
                 
                 $eleve = new Eleve();
                 if($inscription)
                 {
                    $eleve = Eleve::find($inscription->eleve_id);
                    $paiements = Paiement::where('inscription_id', $inscription->id)->get();
                  
                     
                    $classe = [];
                    $single = null;
                    $image = null;
                    $mois = Mensuel::all();
                    $directory = '/public/uploads/imgs/';
                    $classe = $inscription->classe;
                    $filename = $inscription->image;

                   if (File::exists(base_path().$directory, $filename))
                   {
  
                       $path = base_path().$directory.$filename;
                       $chemin = 'uploads/imgs/'.$filename;
                       $image = File::get($path);
                   }
                 }
               
            }
            return view('pages/profile-eleve', compact('eleve', 'inscription', 'classe', 'mois', 'image', 'path', 'chemin', 'paiements'));

    }
}
