// import React from "react";
import { useState, useEffect } from "react";
function App() {
  let [formValues, setFormValues] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });
  const [formErrors, setformError] = useState({});

  const [isSubmit, setisSubmit] = useState(false);
  const onChange = (e) => {
    
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("yes");
    setformError(validate(formValues));
    // console.log(check)
    setisSubmit(true);
    //  alert("submitted");
  };
  
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.userName) {
      errors.userName = "Username is required!";
    }
    if (!values.userEmail) {
      errors.userEmail = "Email is required!";
    } else if (!regex.test(values.userEmail)) {
      errors.userEmail = "This is not a valid email format!";
    }
    if (!values.userPassword) {
      errors.userPassword = "Password is required";
    } else if (values.userPassword.length < 4) {
      errors.userPassword = "Password must be more than 4 characters";
    } else if (values.userPassword.length > 10) {
      errors.userPassword = "Password cannot exceed more than 10 characters";
    }
    // console.log(errors)
    return errors;
  };

  return (
    <>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div
          style={{
            textAlign: "center",
            color: "green",
            fontSize: "2rem",
            marginTop: "2rem",
          }}
        >
          Signed in Successfully
        </div>
      ) : (
        <pre style={{ fontSize: "1.3rem" ,margin:"3rem 5rem"}}>
          {JSON.stringify(formValues, undefined, 2)}
        </pre>
      )}
      <div className="shadow p-3 mb-5 bg-body rounded box  p-4  position-absolute top-50 start-50 translate-middle" style={{height:"30rem",width:"30rem"}}>
        <h1 className="container margin:auto">Login Form</h1>
        <form className="container " onSubmit={formSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Username
            </label>
            <input
              name="userName"
              type="text"
              placeholder="Enter your Name"
              className="form-control mb-4"
              id="exampleInput"
              aria-describedby="emailHelp"
              value={formValues.userName}
              onChange={onChange}
            />
            <p style={{ color: "red" }}>{formErrors.userName}</p>
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              name="userEmail"
              type="email"
              placeholder="Enter your email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={formValues.userEmail}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <p style={{ color: "red" }}>{formErrors.userEmail}</p>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              name="userPassword"
              value={formValues.userPassword}
              onChange={onChange}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <p style={{ color: "red" }}>{formErrors.userPassword}</p>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
