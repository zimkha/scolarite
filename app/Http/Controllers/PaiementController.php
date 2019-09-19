<?php

namespace App\Http\Controllers;

use App\Mensuel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Paiement;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
class PaiementController extends Controller
{
    /**
     * 
     */
    public function save(Request $request)
    {
      try{
        return DB::transaction(function () use($request){
           
            $errors =  null;
            $item = new Paiement();
            if(isset($request->id))
            {
                $item = Paiement::find($request->id);
            }
            if(empty($request->montant) || empty($request->mois) || empty($request->inscription))
            {
                $errors ="Veuiller renseigne tous les information d'une mensualité";
            }
            if($errors == null)
            {
                $montant     = $request->montant;
                $mois        = $request->mois;
                $inscription = $request->inscription;

                $item->inscription_id = $inscription;
                $item->mois_id        = $mois;
                $item->montant        = $montant;

                $item->save();
                Session::flash('message', "Paiement bien enregistre");
                return Redirect::back();
            }
            else
            {
                Session::flash('error', $errors);
                return Redirect::back();
            }
        });
      }
      catch(\Exception $ex)
      {

      }
    }

    public function  getAllPaiement($id)
    {

    }
    public function delete($id)
    {

    }
    public function index()
    {
        return view('pages.paiement');
    }

    public function savePaiementDispatch(Request $request)
    {
        try{
            return DB::transaction(function() use($request){
              $errors = null;
              $eleve = null;

              $item = new Paiement();
              if(isset($request->id))
              {
                  $item = Paiement::find($request->id);
              }
              if(isset($request->matricule))
              {
                  $eleve = Eleve::where('matricule', $request->matricule)->get();
              }
              if(empty($request->montant))
              {
                $errors ="Erreur: Veuillez préciser le montant";
              }
              if(empty($request->mois_id))
              {
                $errors ="Erreur: Veuillez préciser le mois";
              }
              $inscription = Inscription::where('eleve_id', $eleve->id)->where('annee_scolaire_id', 1)->first();
              $paiements   = Paiement::where('inscription_id', $inscription->id);
              $classe      = $inscription->classe;
              $somme_mensule = $classe->mensualite;
              $montant     = $request->montant;
              if($paiements && $errors == null)
              {
                foreach($paiements as $paiement)
              {
                 if($paiement->montant < $somme_mensule)
                 {
                   $restant                  = $somme_mensule - $paiement->montant;
                  if($restant < $montant)
                  {
                    $paiement->montant       = $paiement->montant + $restant;
                    $montant                 = $montant - $restant; 
                    $paiement->save();
                  }
                 }
              }
              $firstTime = true;
              if($montant > 0)
              {
                   $item->mois_id = $request->mois_id;

                   if($montant > $classe->mensualite)
                   {
                    $item->montant = $classe->mensualite;
                    $montant       = $montant - $classe->mensualite;
                   }
                   if($montant == $classe->mensualite)
                   {
                    $item->montant = $classe->mensualite;
                    $montant       = 0;
                   }
                
                  $item->inscription_id = $inscription->id;
                  $item->save();
                  $firstTime = false; 
              }
              if ($montant > 0 && $firstTime == false)
              {
                  $paiye           = Paiement::where('insciption_id', $inscription->id)->last();
                  $mois_prec       = $paiye->mois;

                  $id_mois_suivant = $mois_prec->id + 1;

                  $mois_suivant    = Mensuel::find($id_mois_suivant);

                  if ($mois_suivant)
                  {
                      $apayer = 0;
                      if ($montant > $somme_mensule)
                      {
                          $apayer = $somme_mensule;
                          $montant = $montant - $somme_mensule;
                      }
                      else
                      {
                          $apayer = $montant;
                      }
                      $newPaiement = new Paiement();
                      $newPaiement->inscription_di = $inscription->id;
                      $newPaiement->mois_id = $id_mois_suivant;
                      $newPaiement->montant = $apayer;
                      $newPaiement->save();
                  }
              }
              }
              // Si c'est le premier paiement de l'eleve
              elseif($errors == null)
              {

              }
            });
        }catch(\Exception $ex)
        {

        }
    }
}
