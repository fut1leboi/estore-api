<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class UserAPI extends Controller
{

    private function userExists(string $name): bool{
        return (bool)User::where(['name' => $name])->first();
    }

    public function signUp(Request $request){
        if(!$this->userExists($request->input('name'))) {
            $user = new User();
//            $user->name = $request->input('name');
//            $user->password = bcrypt($request->input('password'));
//            $user->save();
            $user->create($request->only('name', 'password'));
            return response('');
        }
        else{
            return response(['message'=>'Пользователь с таким именем уже существует'], 403);
        }

    }

    public function signIn(Request $request){
        if($this->userExists($request->input('name'))) {
            $user = User::where($request->only('name', 'password'))->first(['name', 'profile_picture']);

            return $user ? response($user->toArray()) : response('Неверный пароль', 403);
        }
        else{
            return response(['message'=>'Логин или пароль не совпадают'], 403);
        }
    }

    public function updateProfilePicture(Request $request): void{

    }
}
