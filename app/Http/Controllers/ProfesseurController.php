<?php

namespace App\Http\Controllers;

use App\Classe;
use App\Enseigne;
use App\EnseigneMatiere;
use App\Matiere;
use App\Professeur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Outil;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use function PHPSTORM_META\elementType;

class ProfesseurController extends Controller
{
    public function  index()
    {
        $professeurs = Professeur::all();
        return view('pages.liste-professeur', compact('professeurs'));
    }
    public  function  save(Request $request)
    {
        try{
            return DB::transaction(function () use($request){
                  $errors = array();
                  $prof = new Professeur();
                  if (isset($request->id))
                  {
                      $prof = Professeur::find($request->id);
                  }
                  if (empty($request->nom) || empty($request->prenom) || empty($request->telephone) || empty($request->adresse)
                      || empty($request->email))
                  {
                        array_push($errors, 'Ereur veuillez remplire touts le champs dun formulaire');
                  }

                  if ($errors == null)
                  {
                    //  $prof->create($request->all());
                      $prof->matricule = Outil::matricule($request->nom, $request->prenom);
                      $prof->nom  = $request->nom;
                      $prof->prenom = $request->prenom;
                      $prof->adresse = $request->adresse;
                      $prof->telephone = $request->telephone;
                      $prof->email = $request->email;
                      $prof->save();
                      Session::flash('message', "Professeur bien enregistre");
                      return Redirect::back();
                  }
                  else
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

    public  function show($id)
    {
        try{
        return DB::transaction(function () use($id)
        {
           $errors = null;
            $data = 0;
            if ($id)
            {
                 $prof = Professeur::findOrFail($id);
                 $classes = Classe::where('niveau_classe_id', 3)->get();
                 $matieres = Matiere::all();
                 $enseigne  = Enseigne::where('professeur_id', $id)->get();
                 $tab_matiere = $this->getMatiereEnseigne($id);

                 $pro_classe = $this->getMatiereEnseigneProfesseur($id);

                 $nb_matiere_enseigne = 0;
                 foreach ($tab_matiere as $item)
                 {
                    if ($item ->count() > 0)
                    {
                        $nb_matiere_enseigne ++;
                    }
                 }
                 if ($prof)
                 {
                     return view('pages.detail-prof', compact('prof','pro_classe', 'matieres', 'classes', 'enseigne', 'nb_matiere_enseigne'));
                 }
            }
            else
            {
                $errors = "Donnee manquant";
            }
        });
        }catch (\Exception $e)
        {

        }
    }
    public function  saveProfWithMatiere(Request $request)
    {
        try{
        return DB::transaction(function () use ($request)
        {
            $errors = null;
            if (empty($request->classe_id))
            {
                $errors = "Veuillez priciser la classe";
            }
            if (empty($request->matiere_id))
            {
                $errors = "Veuillez priciser la matière";
            }

            if ($errors == null)
            {
                $matiere_enseigne = new EnseigneMatiere();
                 $matiere_enseigne->enseigne_id  = $request->enseigne_id;
                 $matiere_enseigne->matiere_id = $request->matiere_id;
                if (isset($request->montant_heure))
                {
                    $matiere_enseigne->montant_heure = $request->montant_heure;
                }
                 $matiere_enseigne->save();
                Session::flash('message_flash', "Operation bien enregistre");
                return Redirect::back();
            }
            else
            {
                return response()->json($errors);
            }
        });
        }
        catch (\Exception $e)
        {
            return response()->json($e->getMessage());
        }
    }
    public function  saveProfWithClasse(Request $request)
    {
        try
        {
            return DB::transaction(function () use ($request){
                $errors = null;
               if (empty($request->classe_id))
               {
                   $errors = "Veuillez priciser la classe";
               }
               if ($errors == null)
               {
                   $enseigne = new Enseigne();
                   $enseigne->classe_id = $request->classe_id;
                   $enseigne->professeur_id = $request->professeur_id;
                   $enseigne->save();
                   Session::flash('message_flash', "Classe bien enregistre");
                   return Redirect::back();
               }
               else
               {
                   Session::flash('error_flash', $errors);
                   return Redirect::back();
               }

           });
        }
        catch (\Exception $e)
        {
              return response()->json($e->getMessage());
        }
    }
    public  function  getMatiereEnseigne($id)
    {
        $enseigne  = Enseigne::where('professeur_id', $id)->get();
        $tab_mat= array();
        foreach ($enseigne as $item)
        {
            $matiere_enseigne = EnseigneMatiere::where('enseigne_id', $item->id)->get();

            if ($matiere_enseigne!=null)
            {
                array_push($tab_mat, $matiere_enseigne);
            }
        }

        return $tab_mat;
    }
    public  function  getMatiereEnseigneProfesseur($id)
    {
        $enseigne  = Enseigne::where('professeur_id', $id)->get();
        return $enseigne;
    }
}

