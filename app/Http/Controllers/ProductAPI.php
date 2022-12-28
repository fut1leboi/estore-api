<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductAPI extends Controller
{
    private $params = [
        'length',
        'offset',
        'sort',
    ];

    private function checkRequiredParams(Request $request): Response | bool{
        foreach($request->only($this->params) as $param){
            if(!$param){
                return response('Required param: ' . $param . 'is null.', 418);
            }
        }
        return false;
    }

    public function getProductsList($offset,$length, $sort='DESC'): Response{
        $model = new Product();
        $result = $model->skip($offset)->take($length)->orderBy('id', $sort)->get()->load('rate')
        ->each(function($item){
            Product::averageRate($item);
        });
        return response($result);
    }
}
