import React, {useState} from "react";
import axios from "axios";

const url = `${window.location.origin}/api`;
const header = {'Content-Type' : 'application/json'};

export const post = async(props) => {
    let response;
    await axios.post(`${url}/${props.path}`, props.body)
        .then(async function(success){
            response = await success;
        })
        .catch(async function (error) {
            response = await error.response;
        });

    return response.data;
}