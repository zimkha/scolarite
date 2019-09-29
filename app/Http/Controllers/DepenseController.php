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
}
