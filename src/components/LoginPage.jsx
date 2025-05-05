import { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../supabase/supabase-client";
import './css/login.css';
import {
  FormSchemaLogin,
  ConfirmSchemaLogin,
  getErrors,
  getFieldError,
} from "../lib/validationForm";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const { error, data } = ConfirmSchemaLogin.safeParse(formState);
    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
      console.log(errors);
    } else {
      console.log(data);
      let { error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (authError) {
        alert("Signing in error 👎🏻!");
      } else {
        alert("Signed In 👍🏻!");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/");
      }
    }
  };

  const onBlur = (property) => () => {
    const message = getFieldError(FormSchemaLogin, property, formState[property]);
    setFormErrors((prev) => ({ ...prev, [property]: message }));
    setTouchedFields((prev) => ({ ...prev, [property]: true }));
  };

  const isInvalid = (property) => {
    if (formSubmitted || touchedFields[property]) {
      return !!formErrors[property];
    }
    return undefined;
  };

  const setField = (property, valueSelector) => (e) => {
    setFormState((prev) => ({
      ...prev,
      [property]: valueSelector ? valueSelector(e) : e.target.value,
    }));
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center">
      <div className="card login-card shadow-sm">
        <div className="card-body p-4">
          <h3 className="text-center mb-4">Sign In</h3>
          <form onSubmit={onSubmit} noValidate>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${isInvalid("email") ? "is-invalid" : ""}`}
                value={formState.email}
                onChange={setField("email")}
                onBlur={onBlur("email")}
                required
              />
              {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${isInvalid("password") ? "is-invalid" : ""}`}
                value={formState.password}
                onChange={setField("password")}
                onBlur={onBlur("password")}
                required
              />
              {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100">Sign In</button>
          </form>
        </div>
        <div className="card-footer text-center bg-transparent">
          <small>Not registered yet? <a href="/register">Create an account</a></small>
        </div>
      </div>
    </div>
  );
}