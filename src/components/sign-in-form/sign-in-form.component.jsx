import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { 
  signInWithGooglePopup, 
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import {SignInContainer, ButtonsContainer} from './sign-in-form.styles.jsx';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {user} = await signInAuthUserWithEmailAndPassword(email, password);

      resetFormFields();

    } catch(error) {
      if(error.code === "auth/invalid-credential") {
        alert("Invalid user credentials")
      }
      console.log('User signin encountered an error',error);
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value})
  }

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label="Email"
          type="email" 
          required 
          onChange={handleChange} 
          name="email" 
          value={email}
        />
        
        <FormInput
          label="Password"
          type="password" 
          required 
          onChange={handleChange} 
          name="password" 
          value={password}
        />

        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle} >Google Sign In</Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;