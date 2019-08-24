<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AnneeScolaire extends Model
{
    protected $fillable = [
        'date_debut',
        'date_fin'
    ];

    public function inscriptions()
    {
        return $this->hasMany(Inscription::class);
    }
}
