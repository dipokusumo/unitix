const ResponseAPI = require('../utils/response');

const authorizedRole = (allowedRoles = []) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return ResponseAPI.forbidden(res, 'Access denied');
        }
        next();
    };
};

module.exports = authorizedRole;