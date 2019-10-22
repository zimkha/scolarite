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
        $mois_ = date('F');
        $mois_depense = DB::select("SELECT SUM(montant) FROM paiements p, mensuels m where m.mois = '$mois_' and m.id = p.mois_id");


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

    public  function operations()
    {

        try{
            $somme_paiement = 0;
            $somme_incription = 0;
            $date                   =  date('Y-m-d 00:00:');
            $date_fin               =  date('y-m-d 23:59:59');
            $paiement               =  Paiement::where('user_id', 1)->whereBetween('created_at', [$date, $date_fin])->get();
            $inscriptions           =  Inscription::where('user_id',1)->whereBetween('created_at', [$date, $date_fin])->get();

            foreach ($paiement as $item)
            {
                $somme_paiement = $somme_paiement + $item->montant;
            }
            foreach ($inscriptions as $item)
            {
                $somme_incription = $somme_incription + $item->somme_inscription;
            }

            return view('pdfs.operation', compact('paiement', 'inscriptions', 'somme_incription', 'somme_paiement'));

        }catch(\Exception $ex)
        {
            return response()->json($ex->getMessage());
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
