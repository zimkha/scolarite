<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Matiere;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
class MatiereController extends Controller
{
   public function index()
   {
       $matieres = Matiere::all();
       return view ('pages.list-matiere', compact('matieres'));
   }

   public function save(Request $request)
   {
       try{
          return DB::transaction(function() use($request){
             
                $errors = null;
                $matiere = new Matiere();
                if($request->id)
                {
                    $matiere = Matiere::find($request->id);
                }
                if(empty($request->matiere))
                {
                    $errors = "Veillez saisir le champs matiere";
                }
                if($errors == null)
                {
                    $str = rand(100,999);
                    $string = substr($request->matiere, 0,2);
                    $string = strtoupper($string);
                    $string = $string.'-'.$str;
                    $matiere->nom_matiere = $request->matiere;
                    $matiere->slug        = $string;
                    $matiere->save();
                    Session::flash('message', "Matiere bien enregistre");
                    return Redirect::back();
                }
                else
                {
                    Session::flash('error', $errors);
                    return Redirect::back();
                }
              

          });
       }catch(\Exception $ex)
       {
           return  response()->json()->header('Content-Type', 'applcation/json');
       }
   }
}
