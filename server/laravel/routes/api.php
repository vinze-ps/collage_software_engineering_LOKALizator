<?php

use App\Http\Controllers\AdvertisementController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CheckAdmin;
use App\Http\Middleware\CheckAdminOrModerator;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['Wprowadzone dane logowania są nieprawidłowe.'],
        ]);
    }

    return $user->createToken('device')->plainTextToken;
});


// ------- Category -------

Route::apiResource('categories', CategoryController::class)
    ->only(['index','show']);

Route::apiResource('categories', CategoryController::class)
    ->only(['store','update','destroy'])
    ->middleware(['auth:sanctum', CheckAdminOrModerator::class]);

// ------- Advertisements -------

Route::apiResource('advertisements', AdvertisementController::class)
    ->only(['index', 'show', 'store']);

Route::apiResource('advertisements', AdvertisementController::class)
    ->only(['update', 'destroy'])
    ->middleware('auth:sanctum');

// ------- Messages -------

Route::apiResource('messages', MessageController::class)
    ->middleware('auth:sanctum');

