import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_SES_KEY,
  secretAccessKey: process.env.AWS_SES_SECRET,
  region: process.env.AWS_SES_REGION,
});

export default (req, res) => {
  if (req.method === "POST") {
    const emailHTML = `
      <h1>Solicitud de contacto</h1>
      <h2>Enviado por: ${req.body.name}</h2>
      <h2>Correo: ${req.body.email}</h2>
      <h3>Pregunta:</h3>
      <p>${req.body.question}</p>
    `;
    const emailParams = {
      Destination: {
        ToAddresses: ["banuelosmd@gmail.com"],
      },
      Message: {
        Subject: {
          Charset: "UTF-8",
          Data: "Pregunta en el sitio web drjesusbanuelos.com",
        },
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: emailHTML,
          },
        },
      },
      Source: "noreply@drjesusbanuelos.com",
    };

    const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
      .sendEmail(emailParams)
      .promise();

    return sendPromise
      .then((data) => res.status(200).json({ msg: "email sent", data }))
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "something went wrong", err });
      });
  } else {
    res.json({ msg: "holi" });
  }
};
