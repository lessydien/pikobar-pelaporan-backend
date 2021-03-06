const replyHelper = require('../helpers');

module.exports = (server) => {
    const caseRelatedResponse = (caseRelated) => {
        let result = {
            status: 200,
            message: "Success",
            data: caseRelated,
        }
        return result;
    };

    return {
        /**
         * GET /api/case-related
         * @param {*} request
         * @param {*} reply
         */
        async caseRelatedList(request, reply) {
            server.methods.services.case_related.list(
                request.query,
                request.auth.credentials.user,
                (err, result) => {
                    if (err) return reply(replyHelper.constructErrorResponse(err)).code(422);
                    return reply(caseRelatedResponse(result)).code(200);
                }
            )
        },
    } //end
}