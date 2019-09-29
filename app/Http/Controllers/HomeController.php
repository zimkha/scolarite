<?php

namespace App\Http\Controllers;

use App\Classe;
use App\Depense;
use App\Inscription;
use App\Niveau;
use App\Paiement;
use App\NiveauClasse;
use App\AnneeScolaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */


    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $ans = AnneeScolaire::all()->last();
        
        $inscriptions = Inscription::all();
        $classe = Classe::all();
        $somme = Inscription::getSommeInscriptions();
        $somme_mensualite = 0;
        $somme_depense = 0;
        $niveaus = NiveauClasse::all();
        $mois_encour = date('m');
        $nom_mois = date('F');

        $anne_encour = date('Y');
        $date_ = date("Y-m-d", mktime(0, 0, 0, $mois_encour, 1 ,$anne_encour));
        $date_suivant = date("Y-m-d", mktime(0, 0, 0, $mois_encour + 1, 0 ,$anne_encour));
        $all_paiements = Paiement::whereBetween('created_at', [$date_, $date_suivant])->get();
        $depense = Depense::whereBetween('created_at', [$date_, $date_suivant])->get();
        foreach ($depense as $item)
        {
            $somme_depense = $somme_depense + $item->montant;
        }
        foreach($all_paiements as $item)
        {
         $somme_mensualite = $somme_mensualite + $item->montant;
        }
        $filles = 0;
        $garcon = 0;
        foreach ($inscriptions as $inscription)
        {
            if($inscription->eleve->genre == true) $garcon = $garcon + 1;
            if($inscription->eleve->genre == false) $filles = $filles + 1;
        }
        return view('pages/dashboard', compact('inscriptions',
            'somme_depense',
            'classe',
            'garcon',
            'filles',
            'niveaus',
            'somme',
            'somme_mensualite',
            'nom_mois'));
    }

    public  function getAllPaiementEnCour()
    {
        try{
           
        }catch(\Exception $ex)
        {
        }
    }

    public  function loginCtrl(Request $request)
    {
        try{

        }catch (\Exception $ex)
        {

        }
    }
}
