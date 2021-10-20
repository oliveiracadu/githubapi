<?php

namespace App\Http\Controllers\Api;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController {
    
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function app() {
        return response()->json([
            'status'  => 'ok',
            'message' => 'Api de Conexão'
        ]);
    }

    public function responseError($message, $code = 422) {
        return response()->json([
            'success' => false,
            'message' => $message
        ], $code);
    }

    public function responseSuccess($data, $code = 200) {
        return response()->json([
            'success' => true,
            'data'    => $data
        ], $code);
    }
}
