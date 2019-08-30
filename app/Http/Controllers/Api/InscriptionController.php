<?php
/**
 * Created by PhpStorm.
 * User: khazimndiaye
 * Date: 8/29/19
 * Time: 11:41 PM
 */

namespace App\Http\Controllers\Api;

use App\Inscription;

class InscriptionController extends Controller
{
    public  function index()
    {
        return Inscription::all();
    }

    public  function store()
    {

    }
    public function update($id)
    {

    }

    public  function destroy($id)
    {}
}
