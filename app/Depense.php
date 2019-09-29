<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Depense extends Model
{
    protected $fillable = ['montant','motif', 'user_id'];

    public  function  user()
    {
        return  $this->belongsTo(User::class);
    }

}
