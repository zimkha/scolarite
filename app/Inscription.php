<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    protected $fillable = [
        'somme_inscription',
        'eleve_id',
        'classe_id',
        'annee_scolaire_id',
        'image'
    ];

    public function eleve()
    {
        return $this->belongsTo(Eleve::class);
    }
    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }
    public function annee_scolaire()
    {
        return $this->belongsTo(AnneeScolaire::class);
    }

    public static function getSommeInscriptions()
    {
        $somme = 0;
        $isncriptions = Inscription::all();
        foreach($isncriptions as $item)
        {
            $somme = $somme + $item->somme_inscription;
        }
        return $somme;
    }
}
