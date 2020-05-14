import sendGridMail from '@sendgrid/mail';
import httpStatusCode from 'http-status-codes';
import env from '../env';
import logger from '../utils';

// todo: needs to move to separate config file
sendGridMail.setApiKey(env.SEND_GRID_API_KEY);

const templates = {
  call_to_action: 'd-2bf18ceba1734ea3aa70d02143590878'
};

export const sendEmail = data => {
  logger.info('Email Service - Send email');

  let result = {};

  const msg = {
    to: data.receiver,
    from: data.sender,
    templateId: templates[data.templateName],
    dynamic_template_data: {
      name: data.name,
      confirm_account_url: data.verify_account_url,
      header: data.header,
      text: data.text,
      c2a_link: data.verify_account_url,
      c2a_button: data.buttonText
    }
  };

  sendGridMail.send(msg, (error, result) => {
    if (error) {
      logger.error('Email Service - send email', { meta: error });

      result = {
        data: null,
        message: 'Email sent failed',
        httpStatus: httpStatusCode.BAD_REQUEST
      };
    } else {
      result = {
        data: null,
        message: 'Email sent successfully',
        httpStatus: httpStatusCode.OK
      };
    }
  });

  return result;
};
