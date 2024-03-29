import { toast } from 'react-hot-toast'

export const validateSignIn = (values: { emailorusername: string; password: string }) => {
  const errs = {} as { emailorusername: string; password: string }

  // validation email
  if (!values.emailorusername) {
    errs.emailorusername = 'Email or Username is required'
  }
  // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailorusername)) {
  //   errs.emailorusername = 'Invalid email address'
  // }

  // validation password
  if (!values.password) {
    errs.password = 'Password is required'
  }
  else if (
    !/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g.test(values.password)
  ) {
    errs.password = 'Invalid password'
  }
  else if (values.password.includes(' ')) {
    errs.password = 'Invalid password'
  }

  return errs
}

export const registerValidate = ({
  username,
  email,
  password,
  cpassword,
}: {
  username: string
  email: string
  password: string
  cpassword: string
}) => {
  const errs = {} as {
    username: string
    email: string
    password: string
    cpassword: string
  }

  // validater username
  if (!username) {
    errs.username = 'Required username'
  } else if (username.includes(' ')) {
    errs.username = 'Your username must not contain blank spaces'
  }

  // validation email
  if (!email) {
    errs.email = 'Email required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errs.email = 'Invalid email address'
  }

  // validation password
  if (!password) {
    errs.password = 'Password is required'
  }
  // else if (
  //   !/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g.test(password)
  // ) {
  //   errs.password = 'Password requires a capital letter, a number and a symbol'
  // } 
  else if (password.includes(' ')) {
    errs.password = 'The password does not include blank spaces'
  }

  // validate confirm password
  if (!cpassword) {
    errs.cpassword = 'Required'
  } else if (cpassword !== password) {
    errs.cpassword = 'Password does not match.'
  } else if (cpassword.includes(' ')) {
    errs.cpassword = 'Password confirmation failed.'
  }

  return errs
}

export const handleBlurUsername = ({
  target: { value },
}: {
  target: { value: string }
}) => {
  if (!value) {
    toast.error('Username is required.', { duration: 1500 })
  } else if (value.includes(' ')) {
    toast.error('Your username must not contain blank spaces.', {
      duration: 1500,
    })
  }
}
export const handleBlurEmail = ({
  target: { value, name },
}: {
  target: { value: string; name: string }
}) => {
  // validation email
  if (name === 'emailorusername' && !value) {
    toast.error('Email or Username is required.', { duration: 1500 })
  }
  else if (!value) {
    toast.error('Email is required.', { duration: 1500 })
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) && name !== 'emailorusername') {
    toast.error('Invalid email address.', { duration: 1500 })
  }
}
export const handleBlurPassword = ({
  target: { value, name },
}: {
  target: { value: string; name: string }
}) => {
  // validation password
  if (name === 'password' && !value) {
    toast.error('Password is required.', { duration: 1500 })
  } else if (value.length < 8) {
    toast.error('Password must be longer than 8 characters', {
      duration: 1500,
    })
  } else if (
    name === 'password' &&
    !/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g.test(value)
  ) {
    toast.error(
      'Password requires at least one capital letter, one number and a symbol.',
      {
        duration: 1500,
      },
    )
  } else if (value.includes(' ')) {
    toast.error('The password must not include blank spaces.', {
      duration: 1500,
    })
  }
}