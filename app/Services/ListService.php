<?php

namespace App\Services;

use App\Helpers\GitHubConnection as GitHubConnection;

class ListService {

    private $github;

    public function __construct(GitHubConnection $github) {
        $this->github = $github;
    }
    
    public function listRepos($search, $data) : Array {
        $endpoint = 'search/repositories';
        $response = $this->github->request('GET', $endpoint, $data, $search);

        $body = json_decode($response->getBody(), true);
        $status = $response->getStatusCode();

        return [
            'status' => $status,
            'data'   => $body
        ];
    }

    public function listReposUser($ownerName, $data) : Array {
        $endpoint = 'users/' . $ownerName . '/repos';
        $response = $this->github->request('GET', $endpoint, $data);

        $body = json_decode($response->getBody(), true);
        $status = $response->getStatusCode();

        return [
            'status' => $status,
            'data'   => $body
        ];
    }
}
