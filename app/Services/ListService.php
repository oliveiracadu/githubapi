<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Helpers\GitHubConnection;

class ListService {

    private $github;

    public function __construct(GitHubConnection $github) {
        $this->github = $github;
    }
    
    public function listRepos($search) {
        $endpoint = 'search/repositories';
        $response = $this->github->request('GET', $endpoint, $search);

        $body = json_decode($response->getBody(), true);
        $status = $response->getStatusCode();

        return [
            'status' => $status,
            'data'   => $body['items']
        ];
    }

    public function listReposUser($ownerName) {
        $endpoint = 'users/' . $ownerName . '/repos';
        $response = $this->github->request('GET', $endpoint, NULL);

        $body = json_decode($response->getBody(), true);
        $status = $response->getStatusCode();

        return [
            'status' => $status,
            'data'   => $body
        ];
    }
}
