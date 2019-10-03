<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class  Outil extends Model  {
    public  static  function matricule($nom, $prenom)
    {
        $mat = substr($nom, 0,1);
        $mat = strtoupper($mat);
        $mat = $mat . strtoupper(substr($prenom, 0,1));
        $mat = $mat . "00".rand(1,100);
        return $mat;
    }
}
