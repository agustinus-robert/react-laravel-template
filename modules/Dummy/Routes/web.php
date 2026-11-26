<?php

use Illuminate\Support\Facades\Route;

Route::middleware('web')
    ->prefix('dummy')
    ->as('dummy.')
    ->group(function () {

        Route::get('/', function () {
            return 'Dummy Module';
        })->name('index');

    });