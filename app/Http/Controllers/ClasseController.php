<?php

namespace App\Http\Controllers;

use App\Classe;
use App\Evaluation;
use App\Inscription;
use App\Mensuel;
use App\NiveauClasse;
use App\Paiement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClasseController extends Controller
{
    public function index()
    {
        $classes = Classe::all();
       
        $niveau = NiveauClasse::all();
        return view('pages.classe', compact('classes', 'niveau'));
    }
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
            $errors = null;
            $tab = array();
            $nb_garcon = 0;
            $nb_fille = 0;
            $pourcent = 0;
            if ($id)
            {
                $classe = Classe::find($id);
                if ($classe)
                {
                    $inscriptions = Inscription::where('classe_id', $classe->id)->where('annee_scolaire_id', 1)->get();
                    $evaluations = Evaluation::where('classe_id', $classe->id)->where('annee_scolaire_id', 1)->get();

                    foreach ($inscriptions as $inscription)
                    {
                        if ($inscription->eleve->genre == 1)
                        {
                            $nb_garcon = $nb_garcon +1;
                        }
                        elseif ($inscription->eleve->genre == 0) $nb_fille =  $nb_fille +1;
                    }

                    $pourcentage = $this->getPourcentageMensuel($id);

                    return view('pages.show-classe', compact('classe', 'pourcentage', 'inscriptions', 'evaluations', 'nb_fille', 'nb_garcon'));
                }

            }
        }catch (\Exception $exception)
        {
            return response()->json($exception->getMessage())->header('Content-Type', 'application/json');
        }
    }

    public function getPourcentageMensuel($id)
    {
        $classe = Classe::find($id);
        $pourcentage = 0;
        if ($classe)
        {
            $inscriptions = Inscription::where('classe_id', $id)->where('annee_scolaire_id', 1)->get();
            $nb_inscris = count($inscriptions);
            $montant_mois = $nb_inscris * $classe->mensualite;
            $mois = substr(date('F'), 0,3);
            $mois_encour = Mensuel::where('mois', 'like', '%' . $mois . '%')->first();
            $montant = 0;
            foreach ($inscriptions as $item)
            {

             $paiements = Paiement::where('inscription_id', $item->id)->where('mois_id', $mois_encour->id)->first();
             if ($paiements)
              $montant = $montant + $paiements->montant;
            }
            $pourcentage = ($montant * 100)/$montant_mois;
        }
        return  (int) $pourcentage;
    }

    public function getFactureByStuden($id)
    {
        $inscris = Inscription::find($id);
        $tab = array();
        $dette = 0;
        if ($inscris)
        {
            $precedent_mont = Paiement::where('inscription_id', '=', $id)->get()->last();

            if ($precedent_mont)
            {
                $classe = $inscris->classe;
                if ($precedent_mont->montant == $classe->mensualite)
                {
                    $dette = 0;
                }
                elseif($precedent_mont->montant  < $classe->mensualite)
                {
                    $dette = $classe->mensualite - $precedent_mont->montant;
                }
                //dd($dette, $inscris->eleve->prenom, $inscris->id);
                array_push($tab, [
                   'recouvrement'  => $dette,
                   'mois' => $classe->mensualite,
                   'total' =>  $dette + $classe->mensualite,
                    'inscription' => $inscris,
                ]);
            }
        }
        return $tab;
    }

    public function getAllFactureByClasse($id)
    {
        $classe = Classe::find($id);
       $tab_final = [];
        $tab = array();
        $inscris = Inscription::where('classe_id', $id)->where('annee_scolaire_id', 1)->get();

        if ($inscris)
        {
            foreach ($inscris as $item)
            {
               // dd($item->eleve->prenom);
               // dd($this->getFactureByStuden($item->id));
                array_push($tab, $this->getFactureByStuden($item->id));
            }
        }

        return view('pdfs.facture', compact('tab'));
    }
}
