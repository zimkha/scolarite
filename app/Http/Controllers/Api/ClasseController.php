<?php
/**
 * Created by PhpStorm.
 * User: khazimndiaye
 * Date: 8/29/19
 * Time: 11:41 PM
 */

namespace App\Http\Controllers\Api;

use App\Classe;

class ClasseController extends Controller
{
    public  function index()
    {
     return Classe::all();
    }

    public  function store()
    {

    }
    public function update($id)
    {

    }

    public  function delete($id)
    {}
}
