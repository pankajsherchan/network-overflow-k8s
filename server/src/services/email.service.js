import sendGridMail from '@sendgrid/mail';
import httpStatusCode from 'http-status-codes';
import AppError from '../application/error/appError';
import env from '../env';
import logger from '../utils';

// todo: needs to move to separate config file
sendGridMail.setApiKey(env.SEND_GRID_API_KEY);

const templates = {
  call_to_action: 'd-2bf18ceba1734ea3aa70d02143590878'
};

export const sendEmail = data => {
  logger.info('Email Service - Send email');

  const {
    receiver,
    sender,
    templateName,
    name,
    verify_account_url,
    header,
    text,
    buttonText
  } = data;

  let result = {};

  const msg = {
    to: receiver,
    from: sender,
    templateId: templates[templateName],
    dynamic_template_data: {
      name: name,
      confirm_account_url: verify_account_url,
      header: header,
      text: text,
      c2a_link: verify_account_url,
      c2a_button: buttonText
    }
  };

  sendGridMail.send(msg, (error, result) => {
    if (error) {
      logger.error('Email Service - send email fail');

      throw new AppError('Email sent failed', httpStatusCode.BAD_REQUEST);
    }
  });

  return result;
};
