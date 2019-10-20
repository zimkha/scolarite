<?php

namespace App\Http\Controllers;

use App\Facture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class FactureController extends Controller
{
    public function configuration()
    {
        return view('pages.configuration');
    }
    public function saveUpdate(Request $request)
    {
        try
        {
           return DB::transaction(function () use ($request)
           {
               $errors = null;
             if (isset($request->id))
             {
                 $fac =Facture::find($request->id);
                 if (isset($fac))
                 {
                   $fac->date_fixe = $request->date_fixe;
                 }
                 else
                 {
                     $errors = "Erreur sur la recuperation de données Veuillez contacter le serv ice technique";
                 }
             }
             else
             {
                $errors  = "Veuillez contacter le service technique si le probleme persiste";
             }
             if ($errors == null)
             {
                 $fac->save();
                 Session::flash('message', "Date limite bien modifier");
                 return Redirect::back();
             }
               Session::flash('error', $errors);
               return Redirect::back();
           });
        }
        catch (\Exception $e)
        {
            return response()->json($e->getMessage());

        }
    }
}
