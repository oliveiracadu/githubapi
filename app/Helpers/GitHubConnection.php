<?php

namespace App\Helpers;

use GuzzleHttp\Client as Client;

class GitHubConnection {

    public function __construct() {
        $this->client = new Client();
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
