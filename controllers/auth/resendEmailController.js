const { resendEmail } = require("../../services/authServices");


const resendEmailController = async (req, res) => {
    const {email} = req.body;

    const result = await resendEmail(email);

    res.status(200).json(result);
};

module.exports = resendEmailController;