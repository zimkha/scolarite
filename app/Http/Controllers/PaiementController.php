<?php

namespace App\Http\Controllers;

use App\Classe;
use App\Mensuel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Paiement;
use App\Inscription;
use App\Eleve;
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
                $item->user_id        = 1;
                $item->save();
                Session::flash('message', "Classe bien enregistre");
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
        $mois = Mensuel::all();
        return view('pages.paiement', compact('mois'));
    }

    public function savePaiementDispatch(Request $request)
    {
        try{
            return DB::transaction(function() use($request){
              $errors = array();
                 $tab = array();

               $inscription = Inscription::find($request->inscription_id);

               if ($inscription->id > 0)
               {


                   $classe    = $inscription->classe;
                   $motant_mensuel = $classe->mensualite;
                   $somme_entre_restant = $request->somme_entre;
                   $eleve = $inscription->eleve;
                 while($somme_entre_restant > 0)
                 {

                     switch ($somme_entre_restant)
                     {
                         case $somme_entre_restant == 0:
                             break;
                         case $somme_entre_restant < 0:
                             break;
                         case $somme_entre_restant > $motant_mensuel:
                             $paiment   = Paiement::where('inscription_id', '=', $inscription->id)->get()->last();
                             if ($paiment->montant < $motant_mensuel)
                             {
                                 $restant                     =  $motant_mensuel - $paiment->montant;
                                 $paiment->montant            = $paiment->montant + $restant;
                                 $somme_entre_restant         = $somme_entre_restant - $restant;
                                 $paiment->save();
                                 array_push($tab, $paiment);

                             }
                             if ($paiment->montant == $motant_mensuel)
                             {
                                 $id_last_month                           = $paiment->mois_id;
                                 $id_new_month                            = $id_last_month +1;
                                 $new_paiement                            = new Paiement();
                                 if ($id_new_month <= 10)
                                 {
                                     $new_paiement->mois_id                   = $id_new_month;
                                     $new_paiement->inscription_id            = $inscription->id;
                                     $new_paiement->user_id                   =1;
                                     $new_paiement->montant                   = $motant_mensuel;
                                     $somme_entre_restant                     = $somme_entre_restant - $motant_mensuel;

                                     $new_paiement->save();
                                     array_push($tab, $new_paiement);
                                 }
                                 if ($somme_entre_restant > $motant_mensuel && ($paiment->montant == $motant_mensuel))
                                 {

                                     $paiment   = Paiement::where('inscription_id', '=', $inscription->id)->get()->last();
                                     $id_last_month                           = $paiment->mois_id;
                                     $id_new_month                            = $id_last_month +1;
                                     $new_paiement                            = new Paiement();
                                     if ($id_new_month <= 10)
                                     {
                                         $new_paiement->mois_id                   = $id_new_month;
                                         $new_paiement->inscription_id            = $inscription->id;
                                         $new_paiement->user_id                   =1;
                                         $new_paiement->montant                   = $motant_mensuel;
                                         $somme_entre_restant                     = $somme_entre_restant - $motant_mensuel;

                                         $new_paiement->save();
                                         //dd($paiment->mois_id, $new_paiement->mois_id);
                                         array_push($tab, $new_paiement);
                                     }



                                 }


                                 break;
                             }

                         case $somme_entre_restant < $motant_mensuel:

                             $paiment   = Paiement::where('inscription_id', '=', $inscription->id)->get()->last();

                             if ($paiment->montant < $motant_mensuel)
                             {
                                 $restant =  $motant_mensuel - $paiment->montant;
                                 if ($restant <= $somme_entre_restant)
                                 {
                                     $paiment->montant            = $motant_mensuel;
                                     $somme_entre_restant         = $somme_entre_restant - $restant;
                                 }
                                 elseif($restant > $somme_entre_restant)
                                 {
                                     $paiment->montant            = $paiment->montant + $somme_entre_restant;
                                     $somme_entre_restant         = 0;
                                 }
                                 $paiment->save();
                                 array_push($tab, $paiment);

                             }
                             if ($paiment->montant == $motant_mensuel)
                             {
                                 $new_paiement                        = new Paiement();
                                 $id_last_month                       = $paiment->mois_id;
                                 $id_new_month                        = $id_last_month +1;
                                 if ($id_new_month <= 10)
                                 {
                                     $new_paiement->mois_id           = $id_new_month;
                                     $new_paiement->inscription_id    = $inscription->id;
                                     $new_paiement->user_id           = 1;
                                     $new_paiement->montant           = $somme_entre_restant;
                                     $new_paiement->save();
                                     array_push($tab, $new_paiement);
                                     $somme_entre_restant = 0;
                                     break;
                                 }
                             }

                     }

                 }


               }
               else
               {
                   $errors = "Erreur: Données Incompletes";
               }
               if ($errors)
               {
                   return response()->json($errors);
                   //Session::flash('error', $errors);
                   //return Redirect::back();
               }
               else
               {
                   //Session::flash('message', "Paiement bien enregistre");
                 //  return Redirect::back();
                  return response()->json(['tab' => $tab, 'somme' => $somme_entre_restant]);
               }

            });
        }catch(\Exception $ex)
        {
              return response()->json($ex->getMessage());
        }
    }
}
