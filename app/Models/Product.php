<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Collection;
use App\Models\Rate;

class Product extends Model
{
    public $table = 'products';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    public function rate(){
        return $this->hasMany(Rate::class);
    }
    public static function averageRate(Product $product): Product{
        $product->rating = $product->rate->average('rate') ?? 0;
        unset($product->rate);
        return $product;
    }



    public $timestamps = false;
    protected $fillable = [
        'name',
        'price',
        'image',
    ];
}
