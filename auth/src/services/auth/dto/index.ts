import { object, string, TypeOf } from 'zod';

export const signUpUserObject = object({
  body: object({
    first_name: string({ required_error: 'First Name is required' }),
    last_name: string({ required_error: 'Last Name is required' }),
    email: string({ required_error: 'Email is required' }).email(
      'Invalid email',
    ),
    password: string({ required_error: 'Password is required' })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string({ required_error: 'Please confirm your password' }),
  })
    .refine((data) => data.password === data.passwordConfirm, {
      path: ['passwordConfirm'],
      message: 'Passwords do not match',
    })
    .superRefine(({ password }, checkPasswordComplexity) => {
      const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
      const containsLowercase = (ch: string) => /[a-z]/.test(ch);
      // const containsSpecialChar = (ch: string) =>
      //   /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);

      let countOfUpperCase = 0,
        countOfLowerCase = 0,
        countOfNumbers = 0;
      //   countOfSpecialChar = 0;

      for (let i = 0; i < password.length; i++) {
        let ch = password.charAt(i);
        if (!isNaN(+ch)) countOfNumbers++;
        else if (containsUppercase(ch)) countOfUpperCase++;
        else if (containsLowercase(ch)) countOfLowerCase++;
        // else if (containsSpecialChar(ch)) countOfSpecialChar++;
      }
      if (countOfLowerCase < 1 || countOfUpperCase < 1 || countOfNumbers < 1) {
        checkPasswordComplexity.addIssue({
          code: 'custom',
          message: 'password does not match complexity requirements',
        });
      }
    }),
});

export const signInUserObject = object({
  body: object({
    email: string({ required_error: 'Email is required' }).email(
      'Invalid email',
    ),
    password: string({ required_error: 'Password is required' })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
  }).superRefine(({ password }, checkPasswordComplexity) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    // const containsSpecialChar = (ch: string) =>
    //   /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);

    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0;
    //   countOfSpecialChar = 0;

    for (let i = 0; i < password.length; i++) {
      let ch = password.charAt(i);
      if (!isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
      // else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }
    if (countOfLowerCase < 1 || countOfUpperCase < 1 || countOfNumbers < 1) {
      checkPasswordComplexity.addIssue({
        code: 'custom',
        message: 'password does not match complexity requirements',
      });
    }
  }),
});

export type SignUpUserDto = TypeOf<typeof signUpUserObject>['body'];
export type SignInUserDto = TypeOf<typeof signInUserObject>['body'];
