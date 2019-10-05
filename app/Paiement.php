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

  public static function getSommeTotalMois($id, $anne)
    {
        $annee = AnneeScolaire::find($anne);
        $somme = 0;
        if ($anne)
        {
            $inscription = Inscription::where('annee_scolaire_id', $anne)->get();
            foreach ($inscription as $item)
            {
                $paiments = Paiement::where('inscription_id', $item->id)->where('mois_id', $id)->get();
                foreach ($paiments as $val)
                {
                    $somme = $somme + $val->montant;
                }
            }
        }


        return $somme;
    }
}
