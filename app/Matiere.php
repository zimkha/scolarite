<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Matiere extends Model
{
    protected $fillable = ['slug', 'nom_matiere'];

    public function matiere_classes()
    {
        return $this->hasMany(MatiereClasse::class);
    }
    public function evaluations()
    {
        return $this->hasMany(Evaluation::class);
    }
}
