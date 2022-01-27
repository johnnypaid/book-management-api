function errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        // Authentication error
        res.status(401).json({success: false, error: 'User is not authenticated.'});
    }

    // Generic error.
    return res.status(500).json({success: false, error: err});
}

module.exports = errorHandler;