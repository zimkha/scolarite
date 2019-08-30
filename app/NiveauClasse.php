<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NiveauClasse extends Model
{
    protected  $fillable = [
        'nom_niveau'
    ];

    public function classes()
    {
        return $this->hasMany(Classe::class);
    }
}
