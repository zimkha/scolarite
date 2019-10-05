<?php

namespace App\Http\Controllers;

use App\AnneeScolaire;
use App\Depense;
use App\Inscription;
use App\Mensuel;
use App\Paiement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OperationController extends Controller
{
    public function getAllOpeertaionByDay()
    {
        try{
            return DB::transaction(function (){
               $errors = null;
                $date_daye = date('Y-m-d 00:00:00');
                $date      = date('Y-m-d 23:59:59');
                $paiements = Paiement::whereBetween('created_at', [$date_daye, $date])->get();
                $depenses = Depense::whereBetween('created_at', [$date_daye, $date])->get();
                $inscrptions= Inscription::whereBetween('created_at', [$date_daye, $date])->get();

                return view('pages.statistique-jour', compact('paiements', 'depenses', 'inscrptions'));
            });
        } catch (\Exception $e)
        {
           return response()->json($e->getMessage());
        }
    }
    public  function  getOperationByUser($id)
    {
        try{
            return DB::transaction(function () use($id){

                $errors = null;

                if ($id)
                {
                   $user = User::find($id);
                   if ($user)
                   {
                       $date_daye = date('Y-m-d 00:00:00');
                       $date      = date('Y-m-d 23:59:59');
                       $paiements = Paiement::whereBetween('created_at', [$date_daye, $date])->where('user_id', $id)->get();
                       $depenses = Depense::whereBetween('created_at', [$date_daye, $date])->where('user_id', $id)->get();
                       $inscrptions= Inscription::whereBetween('created_at', [$date_daye, $date])->where('user_id', $id)->get();

                       return view('pages.statistique-user', compact('paiements', 'depenses', 'inscrptions', 'somme_paiement', 'somme_incription'));
                   }
                   else
                   {
                       $errors ="Erreur Contacter le service technique";
                   }
                }
                else
                {
                    $errors ="Donnee manquant";
                }

            });
        } catch (\Exception $e)
        {
            return response()->json($e->getMessage());
        }
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getOperationByDaye()
    {

        $date                   =  date('Y-m-d 00:00:');
        $date_fin               =  date('y-m-d 23:59:59');
        $paiement               =  Paiement::where('user_id', 1)->whereBetween('created_at', [$date, $date_fin])->get();
        $inscriptions           =  Inscription::where('user_id',1)->whereBetween('created_at', [$date, $date_fin])->get();

        return view('pdfs.operation', compact('paiement', 'inscriptions'));
    }

    /**
     * @return array
     */
    public  function getstatsmensuel($id)
    {
       try
       {
           return DB::transaction(function () use($id){
               $anne = AnneeScolaire::find($id);
               $all_month = Mensuel::all();
               $tab_paiement = array();
               foreach ($all_month as $item)
               {
                   $somme = Paiement::getSommeTotalMois($item->id, 1);
                   array_push($tab_paiement, [
                       'mois'     => $item->mois,
                       'montant'   => $somme,
                   ]);
               }

               return $tab_paiement;
           });
       }
       catch (\Exception $exception)
       {
           return response()->json($exception->getMessage());
       }
    }

    public function statistiques()
    {
        return view ('pages.graph');
    }
}
