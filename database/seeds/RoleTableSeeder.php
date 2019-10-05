<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\User;
class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role = Role::where('name','super-admin')->first();
        if ($role==null)
        {
            $role = \Spatie\Permission\Models\Role::create(['name' => 'super-admin']);
            $role->givePermissionTo(Permission::all());
        }


        $users = array();
        array_push($users,array("name" => "pharmapro" , "email" => "root@pharmapro.sn" , "password" => "root"));
        array_push($users,array("name" => "GUINDY" , "email" => "guindytechnology@gmail.com" , "password" => "guindy"));

        foreach ($users as $user)
        {
            if (!User::all()->where('email', $user['email'])->first() && !User::onlyTrashed()->where('email', $user['email'])->get()->first())
            {
                $newuser = new \App\User();
                $newuser->name = $user['name'];
                $newuser->email = $user['email'];
                $newuser->password = bcrypt($user['password']);
                $newuser->active = 1;
                $newuser->save();
                $newuser->id = \Illuminate\Support\Facades\DB::select('SELECT id FROM users ORDER BY id DESC LIMIT 1')[0]->id;
                $newuser->syncRoles($role);
            }
        }

    }
}
