import { useState } from "react";
import  supabase  from "../supabase/supabase-client";
import './css/register.css';
import { useNavigate } from "react-router";
import {
  ConfirmSchema,
  getErrors,
  getFieldError,
} from "../lib/validationForm";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
      email: "",
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    });
  
    const onSubmit = async (event) => {
      event.preventDefault();
      setFormSubmitted(true);
  
      const { error, data } = ConfirmSchema.safeParse(formState);
      if (error) {
        setFormErrors(getErrors(error));
        return;
      }
  
      const { error: signError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            username: data.username,
          },
        },
      });
  
      if (signError) {
        alert("Signing up error 👎🏻!");
      } else {
        alert("Signed up 👍🏻!");
        navigate("/");
      }
    };

  const onBlur = (property) => () => {
    const message = getFieldError(property, formState[property]);
    setFormErrors((prev) => ({
      ...prev,
      [property]: message,
    }));
    setTouchedFields((prev) => ({
      ...prev,
      [property]: true,
    }));
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
    <div className="registration-wrapper d-flex align-items-center justify-content-center">
      <div className="card registration-card shadow-sm">
        <div className="card-body p-4">
          <h3 className="text-center mb-4">Sign Up</h3>
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

            {/* First Name */}
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={`form-control ${isInvalid("firstName") ? "is-invalid" : ""}`}
                value={formState.firstName}
                onChange={setField("firstName")}
                onBlur={onBlur("firstName")}
                required
              />
              {formErrors.firstName && <div className="invalid-feedback">{formErrors.firstName}</div>}
            </div>

            {/* Last Name */}
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={`form-control ${isInvalid("lastName") ? "is-invalid" : ""}`}
                value={formState.lastName}
                onChange={setField("lastName")}
                onBlur={onBlur("lastName")}
                required
              />
              {formErrors.lastName && <div className="invalid-feedback">{formErrors.lastName}</div>}
            </div>

            {/* Username */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className={`form-control ${isInvalid("username") ? "is-invalid" : ""}`}
                value={formState.username}
                onChange={setField("username")}
                onBlur={onBlur("username")}
                required
              />
              {formErrors.username && <div className="invalid-feedback">{formErrors.username}</div>}
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

            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          </form>
        </div>
        <div className="card-footer text-center bg-transparent">
          <small>Already have an account? <a href="/login">Log in</a></small>
        </div>
      </div>
    </div>
  );
}