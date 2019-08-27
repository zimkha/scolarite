<?php

namespace App\Http\Controllers;

use App\Inscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Eleve;
use Illuminate\Support\Str;
use \DateTime;

class InscriptionController extends Controller
{
    public  function  save(Request $request)
    {
        try{
            return DB::transaction(function() use($request){
                $errors = null;
                $date = 0;
                $inscription = new Inscription();
                $eleve = new Eleve();
                if($request->eleve_id) $eleve = ELeve::find($request->eleve_id);
                if($request->id) $inscription = Inscription::find($request->id);

                if (empty($request->classe_id) || empty($request->annee_scolaire_id) || empty($request->nom_eleve) || empty($request->prenom_eleve) || empty($request->montant))
                {
                    $errors = "Veuiller renseigner les donnees de classe";
                }
                $eleve->nom = $request->nom_eleve;
                $eleve->prenom = $request->prenom_eleve;
                if(isset($request->naissance))
                {
                    $eleve->naissance =  $request->naissance;
                }
                if(isset($request->nomcompet_tuteur))
                {
                    $eleve->nomcomplet_tuteur =  $request->nomcompet_tuteur;
                }
                if(isset($request->adresse_tuteur))
                {
                    $eleve->adresse_tuteur =  $request->adresse_tuteur;
                }
                if(isset($request->telephone))
                {
                    $eleve->telephone =  $request->telephone;
                }
                if(isset($request->cas_ssocial))
                {
                    $eleve->cas_ssocial = $request->cas_ssocial;
                }
                $matricule                  = strtoupper(substr($request->nom_eleve, 0,1).
                                                substr($request->prenom_eleve, 0,1))."-".rand(10000,99999);
                $eleve->matricule           = $matricule;
              //  dd($eleve);
                $inscription->classe_id     = $request->classe_id;
                $inscription->annee_scolaire_id = $request->annee_scolaire_id;
                $inscription->somme_inscription = $request->montant;
                $inscription->etat_inscription = true;
                $inscription->user_id = 1;
                if ($errors == null)
                {
                    $eleve->save();
                    $inscription->eleve_id = $eleve->id;
                    $inscription->save();
                    return  response()->json($inscription);
                }
                else
                {
                    return response()->json($errors);
                }

            });
        }catch(\Exception $exception)
        {
          return response()->json($exception->getMessage());
        }
    }

    /**
     * @param $id
     */
    public function  delete($id)
    {

    }

    /**
     *
     */
    public function getOnInscription()
    {

    }

    /**
     * @param Request $request
     */
    public function  reinscription(Request $request)
    {

    }

    /**
     * @param $id_anne
     */
    public  function getInscriptionsByAnnee($id_anne)
    {

    }
}
