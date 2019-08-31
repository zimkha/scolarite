<?php

namespace App\Http\Controllers;

use App\Classe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClasseController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|mixed
     */
    public  function save(Request $request)
    {
        try{
          return DB::transaction(function() use($request){
              $errors = null;
              $classe = new Classe();
              if($request->id)  $classe = Classe::find($request->id);
              if (empty($request->nom_classe) || empty($request->niveau_id) )
              {
                 $errors = "Veuillez remplir tout les champs du formulaire";
              }
              $this->validate($request, [
                 'nom_classe'    => 'required|min:5',
                 'niveau_id'     => 'required'
              ]);
              if($request->somme_isncription)
                    $classe->somme_isncription = $request->somme_isncription;
              if($request->mensualite)
                    $classe->mensualite  = $request->mensualite;
              $classe->niveau_id = $request->niveau_id;
              $classe->nom_classe = $request->nom_classe;
              if($errors == null)
              {
                  $classe->save();
                  return $classe;
              }
              else return response()->json($errors);
          }) ;
        }catch(\Exception $exception)
        {
          return response()->json($exception->getMessage())->header(['Content-Type' => 'application/jspn']);
        }
    }

    /**
     * @param $id
     */
    public function delete($id)
    {
        try{
            return DB::transaction(function () use($id)
            {
                $errors = null;
                $data = 0;
                if($id)
                {
                    $classe  = Classe::find($id);
                    if($classe)
                    {
                      $nb_ins = count($classe->inscriptiones);
                      if ($nb_ins > 0)
                      {
                          $errors ="cette classe ne peu pas etre supprmer dans la base car elle est relie a des donnes du systeme";
                      }
                      elseif ($nb_ins == 0)
                      {
                          $classe->delete();
                          $classe->forceDelete();
                          $data = 1;
                          return $data ;
                      }
                    }
                    else
                        $errors = "Cette classe est insdiponible dansa la base";
                }else
                    $errors ="Erreur donnees manquants";

                if ($errors !=null)
                     return response()->json($errors);
            });
        }catch(\Exception $exception)
        {
            return response()->json($exception->getMessage())->header('Content-Type', 'application/json');
        }
    }

    /**
     * @param $id
     */
    public  function  show($id)
    {
        try{
            if ($id)
            {
                $classe = Classe::find($id);

            }
        }catch (\Exception $exception)
        {
            return response()->json($exception->getMessage())->header('Content-Type', 'application/json');
        }
    }
}
