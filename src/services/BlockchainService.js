import React from 'react';
import "../configs/Services"
import ApiService from "./ApiService";

export class BlockchainService{
  constructor() {
        this.apiService = new ApiService()
    }

    listBitcoinDetails = (address, callback) => {
        this.apiService.get(ServiceEndpoints.listBitcoinDetails, address, callback)
    }
}
export default BlockchainService
