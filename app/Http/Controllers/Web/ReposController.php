<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;

class ReposController {

    public function repos() {
        return view('repos');
    }

    public function owner(Request $request) {
        return view('owner', ['ownerName' => $request->ownerName]);
    }
    
}
