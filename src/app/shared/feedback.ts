export class Feedback {
  firstname!: string;
  lastname!: string;
  telnum!: string;
  email!: string;
  agree!: string;
  contactType!: string;
  message!: string;
};

export const ContactType = ['None', 'Tel', 'Email'];