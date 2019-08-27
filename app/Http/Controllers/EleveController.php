<?php

namespace App\Http\Controllers;

use App\Eleve;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EleveController extends Controller
{
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

                }else
                {
                    $errors ="L'eleve avec cette id n'existe pas dans la base";
                }
            });
        }catch (\Exception $exception)
        {

        }
    }
}
