<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EnseigneMatiere extends Model
{
    protected $fillable = [ 'matiere_id','enseigne_id', 'montant_heure'];

    public  function  enseigne()
    {
        return $this->belongsTo(Enseigne::class);
    }
    public  function matiere()
    {
        return $this->belongsTo(Matiere::class);
    }
}
