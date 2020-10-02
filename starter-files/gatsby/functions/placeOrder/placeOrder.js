const nodemailer = require('nodemailer');

const generateOrderEmail = ({ order, total }) => `
    <div>
      <h2>Your recent order for ${total}</h2>
      <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
      <ul>
        ${order
          .map(
            (item) => `
              <li>
                <img height="60" width="60" src=${item.thumbnail} alt=${item.name}/>
                <div style="display: grid; margin-left: 10px;">
                  <span>Size: ${item.size}</span>
                  <span>Name: ${item.name}</span>
                  <span>Price: ${item.price}</span>
                </div>
              </li>
            `
          )
          .join('')}
      </ul>
      <p>Your total is <strong>${total}</strong> due at pickup</p>
      <style>
          ul {
            list-style: none;
            padding: 0;
          }
          li {
            display: flex;
            margin-bottom: 10px;
          }
          span + span {
            
          }
      </style>
    </div>
  `;

// create a ransport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  await wait(3000);
  const body = JSON.parse(event.body);
  // check if they have filled out the honeypot
  if (body.bakeBeans) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `Bibbidi-Bobbidi-Boo` }),
    };
  }
  console.log(body);
  // validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    console.log(`Checking that ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Whoops! You seem to be missing the ${field} field`,
        }),
      };
    }
  }

  // make sure they actually have items in that order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why would you order nothing?!`,
      }),
    };
  }

  // send the email
  // send the sucess or error message
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
