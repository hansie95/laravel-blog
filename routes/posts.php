<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/create', [PostController::class, 'create'])->middleware('auth.custom');
Route::post('/posts', [PostController::class, 'store'])->middleware('auth.custom');
Route::get('/posts/{id}', [PostController::class, 'show']);
Route::get('/posts/{id}/edit', [PostController::class, 'edit'])->middleware('auth.custom');
Route::put('/posts/{id}', [PostController::class, 'update'])->middleware('auth.custom');
Route::delete('/posts/{id}', [PostController::class, 'destroy'])->middleware('auth.custom');