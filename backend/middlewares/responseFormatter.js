function responseFormatter(req, res, next) {
    const oldJson = res.json.bind(res);
    res.success = (message = 'Opération réussie', data = {}) => {
        oldJson({ status: true, message, error: [], data });
    };
    res.fail = (message = 'Erreur', error = [], statusCode = 400) => {
        res.status(statusCode);
        oldJson({ status: false, message, error, data: {} });
    };
    next();
}

module.exports = responseFormatter;
