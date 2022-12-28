<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserAPI;
use App\Http\Controllers\ProductAPI;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group([],function(){
    Route::controller(UserAPI::class)->prefix('user')->group(function (){
        Route::post('/sign_up', 'signUp');
        Route::post('/sign_in', 'signIn');
        Route::post('/profile_picture', 'updateProfilePicture');
    });
    Route::controller(ProductAPI::class)->prefix('product')->group(function (){
        Route::get('/get_list/{offset}/{length}/{sort}', 'getProductsList');

    });

    Route::fallback(function(){
        return response('Api route not found', 404);
    });
});
