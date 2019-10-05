<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;
use Spatie\Permission\Models\Role;
class UserController extends Controller
{
    public function save(Request $request)
    {
        try
        {
            return DB::transaction(function () use ($request)
            {
                $errors=null;
                $user = new User();
                if (!empty($request->id))
                {
                    $user = User::find($request->id);
                }

                // Si au moins un champ est vide?
                if(empty($request->name) || empty($request->email))
                {
                    $errors = "Veuillez remplir tous les champs";
                }
                else if (empty($request->id))
                {
                    if (empty($request->password) || empty($request->confirmpassword))
                    {
                        $errors = "Veuillez remplir tous les mots de passe";
                    }
                }

                if(!empty($request->password) && $request->password!= $request->confirmpassword)
                {
                    $errors = "les deux mots de passe ne correspondent pas";
                }


                $user->name = $request->name;
                $user->email = $request->email;

                !empty($request->password) ? $user->password = bcrypt($request->password) : '' ;
                $role = Role::find($request->input('role'));
                if (!isset($errors) && $user->save())
                {
                    if (isset($user->id))
                    {
                        if ($role!=null)
                        {
                            $user->syncRoles($role);
                        }
                    }
                    else
                    {
                        $user->id = DB::select('SELECT id FROM users ORDER BY id DESC LIMIT 1')[0]->id;
                    }

                    // Dans le cas de la modification d'un profil
                    if ($role!=null)
                        $user->assignRole($role);
                    else $errors = "Assigner un role à ce utilisateur";

                    $user->save();
                    $id = $user->id;
                    return $user;

                }
                return response()->json(['errors' => $errors]);
            });
        }
        catch (\Exception $e)
        {
            return response()->json(['errors' => $e->getMessage()]);
        }
    }
}
