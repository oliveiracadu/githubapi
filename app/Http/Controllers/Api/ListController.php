<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Helpers\GitHubConnection;

class ListController extends Controller {

    private $github;

    public function __construct(GitHubConnection $github) {
        $this->github = $github;
    }
    
    public function listRepos(Request $request) {
        $search = $request->only('search')['search'];
        $endpoint = 'search/repositories';
        $response = $this->github->request('GET', $endpoint, $search);

        $body = json_decode($response->getBody(), true);
        $status = $response->getStatusCode();

        if ($status === 200)
            return $this->responseSuccess($body['items']);
        
        return $this->responseError($body, $status);
    }

    public function listReposUser(Request $request) {
        $ownerName = $request->only('ownerName')['ownerName'];
        $endpoint = 'users/' . $ownerName . '/repos';
        $response = $this->github->request('GET', $endpoint, NULL);

        $body = json_decode($response->getBody(), true);
        $status = $response->getStatusCode();

        if ($status === 200)
            return $this->responseSuccess($body);
        
        return $this->responseError($body, $status);
    }
}
