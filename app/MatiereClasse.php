<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MatiereClasse extends Model
{
    protected  $fillable = ['classe_id','matiere_id', 'coef'];

    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }
}
