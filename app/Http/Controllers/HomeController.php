<?php

namespace App\Http\Controllers;

use App\Classe;
use App\Inscription;
use App\Niveau;
use App\NiveauClasse;
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
        $inscriptions = Inscription::all();
        $classe = Classe::all();
        $niveaus = NiveauClasse::all();
        $filles = 0;
        $garcon = 0;
        foreach ($inscriptions as $inscription)
        {
            if($inscription->eleve->genre == true) $garcon = $garcon + 1;
            if($inscription->eleve->genre == false) $filles = $filles + 1;
        }
        return view('pages/dashboard', compact('inscriptions', 'classe', 'garcon', 'filles', 'niveaus'));
    }
}
