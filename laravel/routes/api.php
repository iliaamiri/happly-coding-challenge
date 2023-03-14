<?php

use App\Http\Controllers\CustomAuthController;
use App\Http\Controllers\QuoteController;
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

Route::post('/login', [CustomAuthController::class, 'loginUser']);
Route::post('/register', [CustomAuthController::class, 'createUser']);
Route::post('/logout', [CustomAuthController::class, 'logoutUser']);

Route::middleware('auth:sanctum')->get('/newQuote', [QuoteController::class, 'index']);
