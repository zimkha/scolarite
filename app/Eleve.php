<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Eleve extends Model
{
    protected $fillable = [
        'matricule',
        'nom',
        'prenom',
        'adresse',
        'naissance',
        'nomcomplet_tuteur',
        'adresse_tuteur',
        'telephone',
        'genre',
        'lieu_naissance'
    ];

    public function inscriptions()
    {
        return $this->hasMany(Inscriptions::class);
    }
    public function paiments()
    {

    }
    public function notes()
    {
        
    }
}
