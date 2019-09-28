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
                return redirect()->route('voir-eleve', ['id' => $inscription]);
            }
            else
            {
                Session::flash('error', $errors);
                return redirect()->route('voir-eleve', ['id' => $inscription]);
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

                   $paiment   = Paiement::where('inscription_id', '=', $inscription->id)->get()->last();
                   $id_last   = $paiment->id;

                   $classe    = $inscription->classe;
                   $motant_mensuel = $classe->mensualite;

                   $somme_entre_restant = $request->somme_entre;
                   $eleve = $inscription->eleve;

                   if ($paiment->montant == $classe->mensualite)
                   {
                       dd("okk");
                       $new = new Paiement();
                       if ($classe->mensualite <= $somme_entre_restant)
                       {
                           $new->montant = $classe->mensualite;
                           $new->inscription_id = $inscription->id;
                           $month_courant = $paiment->mois_id;
                            $new_mont = $month_courant + 1;
                            if ($new_mont <= 10)
                            {
                                $new->mois_id = $new_mont;
                               // $new->save();
                                array_push($tab, $new);
                                $somme_entre_restant = $somme_entre_restant - $classe->mensualite;
                            }
                           if ($somme_entre_restant > 0)
                           {

                               $new = new Paiement();
                               $pai = Paiement::where('inscription_id', '=', $inscription->id)->get()->last();

                               $id = $paiment->mois_id;
                               $id = $id + 1;
                               if ($id <= 10)
                               {
                                   $new->mois_id = $id;
                                   if ($somme_entre_restant > $classe->mensualite)
                                   {
                                       $new->montant =$classe->mensualite;
                                       $somme_entre_restant = $somme_entre_restant - $classe->mensualite;
                                   }
                                   if ($somme_entre_restant < $classe->mensualite)
                                   {
                                       $new->montant = $somme_entre_restant;
                                       $somme_entre_restant = 0;
                                   }
                                   $new->inscription_id = $inscription->id;
                                  // $new->save();
                                   array_push($tab, $new);
                               }
                           }
                       }
                   }
                   if ($paiment->montant < $classe->mensualite)
                   {
                       //dd('jes la');
                       $new = new Paiement();
                       $last_paiement = Paiement::where('inscription_id', '=', $inscription->id)->get()->last();
                       $restant_apayer = $classe->mensualite - $last_paiement->montant;

                       if ($somme_entre_restant > $restant_apayer)
                       {
                           $last_paiement->montant = $last_paiement->montant + $restant_apayer;
                           $last_paiement->save();
                           array_push($last_paiement, $new);
                           $somme_entre_restant = $somme_entre_restant - $restant_apayer;
                           if ($somme_entre_restant > 0)
                           {
                               dd('jes suiii');
                               $new = new Paiement();
                               $pai = Paiement::where('inscription_id', '=', $inscription->id)->get()->last();

                               $id = $paiment->mois_id;
                               $id = $id + 1;
                               if ($id <= 10)
                               {
                                   $new->mois_id = $id;
                                   if ($somme_entre_restant > $classe->mensualite)
                                   {
                                       $new->montant =$classe->mensualite;
                                       $somme_entre_restant = $somme_entre_restant - $classe->mensualite;
                                   }
                                   if ($somme_entre_restant < $classe->mensualite)
                                   {
                                       $new->montant = $somme_entre_restant;
                                       $somme_entre_restant = 0;
                                   }
                                   $new->inscription_id = $inscription->id;
                                   // $new->save();
                                   array_push($tab, $new);
                               }
                           }

                       }
                       if ($somme_entre_restant < $restant_apayer)
                       {
                           $last_paiement->montant = $last_paiement->montant + $somme_entre_restant;
                          // $last_paiement->save();
                           array_push($tab, $last_paiement);
                       }
                       if ($somme_entre_restant == $restant_apayer)
                       {

                           $last_paiement->montant = $last_paiement->montant + $somme_entre_restant;
                           $somme_entre_restant = 0;
                        $last_paiement->save();
                           array_push($tab, $last_paiement);
                       }

                   }
                   //dd($tab, $somme_entre_restant);

               }
               else
               {
                   array_push($errors, 'Erreur: Veuillez contacter le service technique');
               }
                  $tab_ = array();
                if ($errors == null)
                {
                    $i = 0;
                    foreach ($tab as $item)
                    {
                        $item->inscription_id = $inscription->id;
                        $item->user_id = 1;
                        $item->save();

                       array_push($tab_ , $item);
                    }
                }
                return $tab_;
            });
        }catch(\Exception $ex)
        {
              return response()->json($ex->getMessage());
        }
    }
}
