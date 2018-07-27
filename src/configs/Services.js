ServiceEndpointComponents = {
    https: "https://",
    http: "http://",
    base: "blockchain.info",
    retrieveAddress: "/rawaddr/"
}

ServerUrls = {
    main: ServiceEndpointComponents.https + ServiceEndpointComponents.base

}

ServiceEndpoints = {
    // user
    listBitcoinDetails: ServerUrls.main + ServiceEndpointComponents.retrieveAddress
}
