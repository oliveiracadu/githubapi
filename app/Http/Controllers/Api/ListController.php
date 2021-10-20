<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\ListService;

class ListController extends Controller {

    private $service;

    public function __construct(ListService $service) {
        $this->service = $service;
    }
    
    public function listRepos(Request $request) {
        $search = $request->only('search')['search'];
        $response = $this->service->listRepos($search);

        if ($response['status'] === 200)
            return $this->responseSuccess($response['data']);
        
        return $this->responseError($response['data'], $response['status']);
    }

    public function listReposUser(Request $request) {
        $ownerName = $request->only('ownerName')['ownerName'];
        $response = $this->service->listReposUser($ownerName);

        if ($response['status'] === 200)
            return $this->responseSuccess($response['data']);
        
        return $this->responseError($response['data'], $response['status']);
    }
}
