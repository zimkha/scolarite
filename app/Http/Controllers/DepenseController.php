<?php

namespace App\Http\Controllers;

use App\Depense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class DepenseController extends Controller
{
    public  function  index()
    {
        $depenses = Depense::all();
        return view('pages.depenses', compact('depenses'));
    }
    public  function save(Request $request)
    {
        try{
           return DB::transaction(function () use($request){
               $errors = null;
               $data = 0;

               if (empty($request->montant))
               {
                   $errors ="Veuillez pricise le montant de la depense";
               }
               if (empty($request->motif))
               {
                   $errors ="Veuillez pricise le motif de la depense";
               }
               $depense =  new Depense();
               if ($errors == null)
               {
                   $depense->montant = $request->montant;
                   $depense->motif   = $request->motif;
                   $depense->user_id = 1;
                   $depense->save();
                   Session::flash('message', "Depense bien enregistre");
                   return Redirect::back();
               }
               if ($errors)
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
    public  function  getDepensesTwoDate(Request $request)
    {
        try
        {
            return DB::transaction(function () use($request){
                $errors = null;
               // dd($request->all());
                $date_debut = new \DateTime($request->date_debut);
                $date_debut = ($date_debut->format('y-m-d 00:00:00'));
                $somme_depense = 0;
                $date_fin = new \DateTime($request->date_fin);
                $date_fin =$date_fin->format('y-m-d 23:59:59');
                if (empty($request->date_debut) || empty($request->date_fin))
                 {
                     $errors = "Veuillez priciser les dates de debut et de fin";
                 }
                if($errors == null)
                {


                    $depense = Depense::whereBetween('created_at', [$date_debut,$date_fin])->get();
                    foreach ($depense as $item)
                    {
                      $somme_depense = $somme_depense + $item->montant;
                    }
                       $date_dep = $request->date_debut;
                       $date_f = $request->date_fin;
                    return view('pages.stat-depense', compact('depense', 'date_dep', 'date_f', 'somme_depense'));
                }

                return response()->json($errors);

            });
        }
        catch(\Exception $e)
        {
            return response()->json($e->getMessage());
        }
    }
}
