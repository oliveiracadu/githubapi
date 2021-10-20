<?php

namespace App\Helpers;

class GitHubConnection {

    public function __construct() {
        $this->client = new \GuzzleHttp\Client();
        $this->github = config('constants.GITHUB');
    }
    
    public function request($method, $endpoint, $data) {
        $url = $this->github['API_URL'] . '/' . $endpoint;

        if (!is_null($data))
            $url .= '?q=' . str_replace(' ', '', $data);

        switch ($method) {
            case 'GET':
            default:
                $response = $this->client->request('GET', $url);
        }

        return $response;
    }
}
