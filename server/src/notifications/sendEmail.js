import nodemailer from 'nodemailer'
import aws from 'aws-sdk'

export const sendEmail = async ({ from, to, subject, text, html }) => {
  try {
    // See: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
    aws.config = new aws.Config({
      accessKeyId: 'AKIAIAF4STTYUYBWXCTA',
      secretAccessKey: '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',
      region: 'us-west-2'
    })

    // create Nodemailer SES transporter
    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01'
      })
    })

    console.log('Created Transporter')

    // send some mail
    const retval = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
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

    console.log(`Finished Test. retval=${JSON.stringify(retval)}`)
    return retval
  } catch (err) {
    console.error(`sendEmail exception: ${err}`)
    throw err
  }
}
