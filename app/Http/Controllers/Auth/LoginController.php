<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
    function authenticated(Request $request, $user)
    {
        if ($user->active == false)
        {
            Auth::logout();
            return Redirect::back()->withErrors(['msg'=>['Votre compte est désactivé, veuillez contacter l\'administration de la pharmacie pour plus d\'information']]);
        }
        else
        {
            $user->last_login = Carbon::now();
            $user->last_login_ip = $request->getClientIp();
            $user->save();

            redirect('/login');
        }
    }

}
