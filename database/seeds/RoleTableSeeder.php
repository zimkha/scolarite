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
        array_push($users,array("name" => "luqman" , "email" => "root@luqman.sn" , "password" => "root"));
        array_push($users,array("name" => "diagne" , "email" => "diagne@gmail.com" , "password" => "root"));

        foreach ($users as $user)
        {
            $newuser = User::where('email', $user['email'])->first();
            if (!$newuser)
            {
                $newuser = new User();
                $newuser->password = bcrypt($user['password']);
            }
            $newuser->name = $user['name'];
            $newuser->email = $user['email'];
            $newuser->save();
            $newuser->id = \Illuminate\Support\Facades\DB::select('SELECT id FROM users ORDER BY id DESC LIMIT 1')[0]->id;
            $newuser->syncRoles($role);
        }

    }
}
