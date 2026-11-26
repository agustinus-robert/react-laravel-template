<?php

namespace Modules\Dummy\Controllers;

use Illuminate\Routing\Controller;
use Inertia\Inertia;

class DummyController extends Controller
{
    public function index(){

    }

    public function create(){
        return Inertia::render('dummy/example1/form');
    }
}