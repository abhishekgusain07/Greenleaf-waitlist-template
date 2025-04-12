import { Resend } from 'resend';

const resend = new Resend('re_Qnngwjcg_546y2JnJiEhVVwyN3GWtKJfV');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'valorantgusain@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});