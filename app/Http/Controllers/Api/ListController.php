<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request as Request;
use Illuminate\Http\JsonResponse as Response;
use App\Services\ListService as ListService;

class ListController extends Controller {

    private $service;

    public function __construct(ListService $service) {
        parent::__construct();
        $this->service = $service;
    }
    
    public function listRepos(Request $request) : Response  {
        $data = [
            'page'     => $request->only('page')['page'],
            'per_page' => $this->per_page
        ];

        $search = $request->only('search')['search'];

        $response = $this->service->listRepos($search, $data);

        if ($response['status'] === 200)
            return $this->responseSuccess($response['data']);
        
        return $this->responseError($response['data'], $response['status']);
    }

    public function listReposUser(Request $request) : Response {
        $ownerName = $request->only('ownerName')['ownerName'];

        $response = $this->service->listReposUser($ownerName, []);

        if ($response['status'] === 200)
            return $this->responseSuccess($response['data']);
        
        return $this->responseError($response['data'], $response['status']);
    }
}
