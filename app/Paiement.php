<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
  protected $fillable = [
      'inscription_id',
      'mois_id',
      'montant',
      'user_id'
  ];

  public function inscription()
  {
      return  $this->belongsTo(Inscription::class);
  }
  public function  mois()
  {
      return $this->belongsTo(Mensuel::class);
  }
  public function  user()
  {
      return $this->belongsTo(User::class);
  }
}
