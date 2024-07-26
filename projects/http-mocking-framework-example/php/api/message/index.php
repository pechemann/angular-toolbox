<?php
/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Methods: POST, GET");

$method = $_SERVER['REQUEST_METHOD'];

if ($method  === 'POST') {
    
    $data = json_decode(file_get_contents('php://input'));

    if (!isset($data->msg)) {
        header("HTTP/1.1 400 Bad Request");
        exit;
    }

    header("HTTP/1.1 201 Created");
    exit;
}

if ($method === 'GET') {

    $data = new stdClass();

    if (!isset($_REQUEST['id'])) {
        header("HTTP/1.1 400 Bad Request");
        exit;
    }
    $id = $_REQUEST['id'];
    if ($id === "0") {
        $data->msg = "Angular Toolbox Rocks!";
        $result = json_encode($data);
        header("HTTP/1.1 200 OK");
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
        exit;
    }
    header("HTTP/1.1 404 Not Found");
    exit;
}

header("HTTP/1.1 400 Bad Request");
// --> quit the program
exit;
?>