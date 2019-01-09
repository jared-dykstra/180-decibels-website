import nodemailer from 'nodemailer'
import aws from 'aws-sdk'

import config from 'config'

export const sendEmail = async ({
  from,
  to,
  subject,
  text,
  html,
  attachments
}) => {
  try {
    const awsConfig = config.get('aws')
    // See: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
    aws.config = new aws.Config(awsConfig)

    // create Nodemailer SES transporter
    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        sendingRate: 1 // <== Max 1 message per second
      })
    })

    // send some mail
    const retval = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
      attachments,
      ses: {
        // optional extra arguments for SendRawEmail
        // Tags: [
        //   {
        //     Name: 'tag name',
        //     Value: 'tag value'
        //   }
        // ]
      }
    })
    return retval
  } catch (err) {
    console.error(`sendEmail exception: ${err}`)
    throw err
  }
}
