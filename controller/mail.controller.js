var nodemailer = require('nodemailer');

module.exports = {
    sendmail: (req, res) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'worksoft.confirm@gmail.com',
                pass: 'hellowork1'
            }
        });

        var mailOptions = {
            from: 'worksoft.confirm@gmail.com',
            to: req.body.email,
            subject: 'Hello Work - Thông tin gia hạn',
            text: `Chào ${req.body.username} .\nChúc mừng bạn đã gia hạn thành công dịch vụ ${req.body.servicename}`
        };

        transporter.sendMail(mailOptions, (errors, info) => {
            if (errors) {
                res.json({
                    result: '0',
                    errors
                })
            } else {
                res.json({
                    result: '1',
                    data: info.response
                })
            }
        });
    }
}