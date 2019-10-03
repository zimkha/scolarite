<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Enseigne extends Model
{
    protected  $fillable = [ 'classe_id', 'professeur_id'];

    public  function classe()
    {
        return  $this->belongsTo(Classe::class);
    }
    public  function  professeur()
    {
        return $this->belongsTo(Professeur::class);
    }

    public function enseigne_matiere()
    {
        return $this->hasMany(EnseigneMatiere::class);
    }
}
