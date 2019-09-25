<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Professeur extends Model
{
    protected $fillable = [
         'nom',
         'prenom',
        'adresse', 'email', 'telephone', 'matricule'
        ];

    public function enseignes()
    {
        return $this->hasMany(Enseigne::class);
    }
    public  function enseigne_matieres()
    {
        return $this->hasMany(EnseigneMatiere::class);
    }
}
