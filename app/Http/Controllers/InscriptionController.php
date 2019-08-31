<?php

namespace App\Http\Controllers;

use App\AnneeScolaire;
use App\Classe;
use App\Inscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Eleve;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use \DateTime;
use Svg\Tag\Image;

class InscriptionController extends Controller
{

    public  function index()
    {
        $classes = Classe::all();
        $anneescolaire = AnneeScolaire::all();
        $date_now = date('Y-m-d');
        $anne = null;

        foreach ($anneescolaire as $item)
        {
          //  dd($date_now, $item->date_debut, $item->date_fin, strtotime($date_now), strtotime($item->date_debut));
            if ($date_now <= $item->date_fin && $date_now >= $item->date_debut)
            {
                $anne = $item;
            }
        }

        return view('pages/inscription', compact('classes', 'anne'));
    }

    public  function  save(Request $request)
    {
        try{
            return DB::transaction(function() use($request){
                $errors = null;
                $date = 0;
               
                $inscription = new Inscription();
                $eleve = new Eleve();
                if($request->eleve_id) $eleve = ELeve::find($request->eleve_id);
                if($request->id) $inscription = Inscription::find($request->id);

                if (empty($request->classe_id) || empty($request->annee_scolaire_id) || empty($request->nom_eleve) || empty($request->prenom_eleve))
                {
                    $errors = "Veuiller renseigner tout les champs";
                }
                $eleve->nom = $request->nom_eleve;

                $eleve->prenom = $request->prenom_eleve;



                if(isset($request->date_naissance))
                {
                    $eleve->naissance =  $request->date_naissance;
                }
                if(isset($request->nomcompet_tuteur))
                {
                    $eleve->nomcomplet_tuteur =  $request->nomcompet_tuteur;
                }
                if(isset($request->adresse_tuteur))
                {
                    $eleve->adresse_tuteur =  $request->adresse_tuteur;
                }
                if(isset($request->telephone))
                {
                    $eleve->telephone =  $request->telephone;
                }
                if(isset($request->cas_ssocial))
                {
                    $eleve->cas_ssocial = $request->cas_ssocial;
                }
                if (isset($request->genre))
                {
                    $eleve->genre = $request->genre;
                }

                dd($eleve);

                if ($request->hasFile('image'))
                {
                    $image = $request->file('image');
                    $extension = $image->getClientOriginalExtension();
                    $image_name = time().'.'.$extension;
                    $directory = '/public/uploads/imgs/';
                    $image->move(base_path().$directory , $image_name);
                    $inscription->image = $image_name;
                }
                else
                    return 'false';
                $matricule                  = strtoupper(substr($request->nom_eleve, 0,1).
                                                substr($request->prenom_eleve, 0,1))."-".rand(10000,99999);
                $eleve->matricule           = $matricule;
              //  dd($eleve);
                $inscription->classe_id     = $request->classe_id;
                $inscription->annee_scolaire_id = $request->annee_scolaire_id;
                $classe  = Classe::find($request->classe_id);
                $inscription->somme_inscription = $classe->somme_isncription;
                $inscription->etat_inscription = true;
                $inscription->user_id = 1;
                if ($errors == null)
                {
                    $eleve->save();
                    $inscription->eleve_id = $eleve->id;
                    $inscription->save();
                    Session::flash('message', "inscription bien enregistre");
                    return Redirect::back();
                    //return redirect()->back()->with('success', ['Inscription bien enregistre']);
                    //return  response()->json($inscription);
                }
                else
                {
                    Session::flash('error', $errors);
                    return Redirect::back();
                }

            });
        }catch(\Exception $exception)
        {
          return response()->json($exception->getMessage());
        }
    }

    /**
     * @param $id
     */
    public function  delete($id)
    {

    }

    /**
     *
     */
    public function getOnInscription()
    {

    }

    /**
     * @param Request $request
     */
    public function  reinscription(Request $request)
    {

    }

    /**
     * @param $id_anne
     */
    public  function getInscriptionsByAnnee($id_anne)
    {
      try{

      }catch (\Exception $e)
      {
          
      }
    }
}
