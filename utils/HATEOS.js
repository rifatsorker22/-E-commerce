function hateosLinks(req){
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    return {
        self: `${baseUrl}`,
        update: `${baseUrl}/update`, // Assuming you have an update endpoint
        delete: `${baseUrl}/delete`, // Assuming you have a delete endpoint
        items: `${baseUrl}/items` // Assuming you have an endpoint to get items in the cart
    };
}

module.exports = hateosLinks