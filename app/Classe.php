<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    protected $fillable = [
        'nom_classe',
        'niveau_id',
        'somme_isncription',
        'mensualite'
    ];

    public function niveau()
    {
        return $this->belongsTo(Niveau::class);
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
