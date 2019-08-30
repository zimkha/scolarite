<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
  protected $fillable = [
      'inscription_id',
      'mois_id',
      'montant'
  ];

  public function inscription()
  {
      return  $this->belongsTo(Inscription::class);
  }
  public function  mois()
  {
      return $this->belongsTo(Mensuel::class);
  }
}
