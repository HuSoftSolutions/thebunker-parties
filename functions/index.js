const sgMail = require('@sendgrid/mail');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendEmail = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called ' + 'while authenticated.'
    );
  }
  sendEmailFlow(data);
});

/** This is a description of the foo function.
 * @param {string} payload - the email payload
 */
async function sendEmailFlow(payload) {
  const type = payload?.template || 'event_template';
  const API_KEY = functions.config().sendgrid.key;
  const TEMPLATE_ID = functions.config().sendgrid[type];
  sgMail.setApiKey(API_KEY);
  const emailTo = payload?.emailTo || ['cody.husek@husoftsolutions.com'];

  try {
    const msg = {
      to: emailTo,
      from: 'team@husoftsolutions.com',
      templateId: TEMPLATE_ID,
      dynamic_template_data: payload,
    };

    await sgMail.send(msg);

    console.log('Email Sent', JSON.stringify(msg));

    return { success: true };
  } catch (error) {
    console.log(JSON.stringify(error));
  }
}
