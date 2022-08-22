const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
var options = {
    auth: {
        //take it from sendgrid (https://app.sendgrid.com) abhardwaj1@kloudrac.com
        api_key: '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'
    }
}

const mailer = nodemailer.createTransport(sgTransport(options));

exports.sendMailTo = async (emailsArr, link) => {
    var email = {
        to: emailsArr,
        from: 'yadavajay900500@gmail.com', //registered Email on sendgrid
        subject: 'Verify Account',
        text: 'Account Authantication',
        html: `<a href=${link} >
         <button style="color: green"> Verify Account </button>
          </a>`
    };

    const result = new Promise((resolve, reject) => {

        mailer.sendMail(email, function (err, res) {
            if (err) {
                reject(err)
            }
            resolve(res)
        });

    })

    return await result

}