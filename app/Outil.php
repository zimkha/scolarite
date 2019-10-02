<?php
/**
 * Created by PhpStorm.
 * User: khazimndiaye
 * Date: 8/24/19
 * Time: 5:12 PM
 */
use \Illuminate\Database\Eloquent\Model;

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
