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
            $user = $user->create([
                'name'=>$request->input('name'),
                'password'=>password_hash($request->input('password'), PASSWORD_DEFAULT)]
            );
            return response($user->only('name', 'id', 'profile_picture'));
        }
        else{
            return response(['message'=>'Пользователь с таким именем уже существует'], 403);
        }

    }

    public function signIn(Request $request){
        if($this->userExists($request->input('name'))) {
            $user = User::where($request->only('name'))->first();
            if(password_verify($request->input('password'), $user->password)){
                return response($user->only('name', 'profile_picture', 'id'));
            }
            return response(['message'=>'Неверный пароль'], 403);
        }
        else{
            return response(['message'=>'Логин или пароль не совпадают'], 403);
        }
    }

    public function updateProfilePicture(Request $request){
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
}
