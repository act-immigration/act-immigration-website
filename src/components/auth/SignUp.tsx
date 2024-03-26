import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { signupFields } from "./authFormFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";

const fields = signupFields;

interface SignupState {
  [key: string]: string;
  email: string;
  password: string;
}

const SignUp = () => {
  // auth hooks and states
  const location = useLocation();
   const navigate = useNavigate();
  const prefillEmail = location.state?.prefillEmail || "";
  console.log("Signup prefill Email  is " + prefillEmail);

  let fieldsState: SignupState = {
    email: prefillEmail,
    password: "",
  };
  fields.forEach((field) => (fieldsState[field.id] = ""));

  const [signupState, setSignupState] = useState<SignupState>({
    ...fieldsState,
    "email": prefillEmail,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignupState((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    signupUser();
  };
const signupUser = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:3000/registrations",
      {
        user: {
          email: signupState["email"],
          password: signupState.password,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      navigate("/dashboard");
    } else {
      // handle error
      console.error("Signup failed");
    }
  } catch (error) {
    // handle error
    console.error("Signup failed", error);
  }
};
  return (
    <form
      className="mt-8 space-y-6 max-w-md mx-auto w-1/2"
      onSubmit={handleSubmit}
    >
      <div className="-space-y-px">
        {fields.map((field) => {
          return (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
              customClass=""
            />
          );
        })}
      </div>

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="SignUp" />
    </form>
  );
};
export default SignUp;
