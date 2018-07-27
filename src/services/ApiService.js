import React from 'react';
import {GlobalStore} from "../../App";

export class ApiService {

    constructor() {

    }

    get = (url, params, callback) => {
        url = url + params;
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': GlobalStore.token
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                callback(responseJson)
            })
            .catch((error) => {
                var response = {
                    error: error
                }
                callback(response)
            });
    }
}

export default ApiService
