<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

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

    public  function  getOperationsByDAY()
    {

    }

    public function paimentsByUser($id)
    {
        try
        {
           return DB::transaction(function () use($id){
               $user = User::find($id);
               if ($user->name="super admin")
               {

               }
               $date_now = date('Y-m-d 00:00:00');
               $datesuivant = date('Y-m-d 23:59:59');
               if ($user)
               {
                   $paiements = Paiement::where('user_id', $id)->whereBetween('created_at',[$date_now, $datesuivant]);

               }
           }) ;
        }
        catch (\Exception $e)
        {

        }
    }
    public  function  makePDF($id)
    {

    }
}
