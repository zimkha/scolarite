<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    protected $fillable = [
        'nom_classe',
        'niveau_classe_id',
        'somme_inscription',
        'mensualite',
        'code_classe'
    ];

    public function niveau_classe()
    {
        return $this->belongsTo(NiveauClasse::class);
    }
    public function inscriptions()
    {
        return $this->hasMany(Inscription::class);
    }

    public function  evaluations()
    {
        return $this->belongsTo(Evaluation::class);
    }
}
