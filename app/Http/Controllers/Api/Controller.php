<?php

namespace App\Http\Controllers\Api;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\JsonResponse as Response;

class Controller extends BaseController {

    public function __construct() {
        $this->per_page = 20;
    }

    public function app() : Response {
        return response()->json([
            'status'  => 'ok',
            'message' => 'Api de Conexão'
        ]);
    }

    public function responseError($message, $code = 422) : Response {
        return response()->json([
            'success' => false,
            'message' => $message
        ], $code);
    }

    public function responseSuccess($data, $code = 200) : Response {
        return response()->json([
            'success' => true,
            'data'    => $data
        ], $code);
    }
}
