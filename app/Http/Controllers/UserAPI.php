<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserAPI extends Controller
{

    private function userExists(string $email): bool{
        return (bool)User::where(['email' => $email])->first();
    }


    public function signUp(Request $request): Response{
        if(!$this->userExists($request->input('email'))) {
            $user = new User();
            $user = $user->create([
                'name'=>$request->input('name'),
                'email'=>$request->input('email'),
                'password'=>password_hash($request->input('password'), PASSWORD_DEFAULT)]
            );
            return response($user->only('name', 'email', 'id', 'profile_picture'));
        }
        else{
            return response(['message'=>'Пользователь с такой электронной почтой уже существует'], 403);
        }

    }

    public function signIn(Request $request): Response{
        if($this->userExists($request->input('email'))) {
            $user = User::where($request->only('email'))->first();
            if(password_verify($request->input('password'), $user->password)){
                return response($user->only('name','email', 'profile_picture', 'id'));
            }
            return response(['message'=>'Неверный пароль'], 403);
        }
        else{
            return response(['message'=>'Логин или пароль не совпадают'], 403);
        }
    }

    public function updateUserName(Request $request): Response{

    }

    public function updateProfilePicture(Request $request): Response{
        if($request->hasFile('image')){
            $image = $request->file('image');
            $input['imageName'] = time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('uploads'), $input['imageName']);
            $user = User::where($request->only('id'))->first();
            $user->profile_picture = '/uploads/' . $input['imageName'];
            $user->save();
            return response($user->only('name', 'profile_picture', 'id'));
        }
        else{
            return response(['message'=>'Какие-то обязательные параметры отсутствуют'], 403);
        }
    }

    public function recoverPassword(Request $request): Response{

    }
}
