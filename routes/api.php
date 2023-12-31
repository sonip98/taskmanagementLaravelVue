<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(function(){
    Route::post('login', 'login');
    Route::post('register', 'register');
});

Route::group(['middleware' => ['auth:sanctum']], function(){

    Route::get('/items', [ItemController::class, 'index']);
    Route::get('/users', [ItemController::class, 'getUsers']);
    Route::prefix('/item')->group( function () {
            Route::post('/store', [ItemController::class, 'store']);
            Route::put('/{id}', [ItemController::class, 'update']);
            Route::delete('/{id}', [ItemController::class, 'destroy']);
        }
    );
});