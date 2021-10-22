<?php

namespace App\Helpers;

use GuzzleHttp\Client as Client;
use GuzzleHttp\Psr7\Response as Response;

class GitHubConnection {

    public function __construct() {
        $this->client = new Client();
        $this->github = config('constants.GITHUB');
    }
    
    public function request($method, $endpoint, $data, $search = NULL) : Response {
        $url = $this->github['API_URL'] . '/' . $endpoint;

        if (!empty($data))
            $url .= '?' . http_build_query($data);

        if (!is_null($search))
            $url .= '&q=' . str_replace(' ', '', $search);

        switch ($method) {
            case 'GET':
            default:
                $response = $this->client->request('GET', $url);
        }

        return $response;
    }
}
