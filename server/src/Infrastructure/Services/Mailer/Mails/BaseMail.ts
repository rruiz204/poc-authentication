import type Mail from "nodemailer/lib/mailer";

interface MailProps {
  to: string;
};

export abstract class BaseMail {
  constructor(protected props: MailProps) {};

  abstract options: Mail.Options;
  abstract obtain(): Mail.Options;
};