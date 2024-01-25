import React, { useState } from "react";
import "./MultiStepForm.css";

const MultiStepForm = () => {
    //states to handle dynamically data inside form
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  //go to prev form
  const handlePrev = (e) => {
    e.preventDefault();
    setStep((prev) => prev - 1);
  };

   //go to prev next
  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };
  // submit data 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      alert("Form Submit Successfully!")
      console.log(formData);
    }
  };

  const validateStep = () => {
    // const currentStepFields = Object.keys(formData).slice(
    //     (step - 1) * (step === 2 ? 4 : 3),
    //     step * (step === 2 ? 4 : 3)
    //   );
    let currentStepFields;
      if(step==1){
        currentStepFields = Object.keys(formData).slice(0,3);
      }else if(step==2){
        currentStepFields=Object.keys(formData).slice(3,7);
      }else{
        currentStepFields=Object.keys(formData).slice(7,10);
      }

    const newErrors = {};

    //handle input feild errors
    currentStepFields.forEach((field) => {
      switch (field) {
        case 'fullName':
        case 'city':
        case 'userName':
          if (formData[field].trim().length < 3) {
            newErrors[field] = `Please enter a valid ${field}`;
          }
          break;
          case 'streetAddress':
            if(formData[field].trim().length <5){
                newErrors[field]='Address should be contain atleast 5 characters';
            }  
            break;
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(formData[field])) {
            newErrors[field] = 'Please enter a valid email address';
          }
          break;
        case 'dob':
          // Add date validation logic if needed
          if(formData[field]===''){
            newErrors[field]='Please Select DOB';
          }
          break;
        case 'state':
          if (formData[field] === '') {
            newErrors[field] = 'Please select a state';
          }
          break;
        case 'zipCode':
          const zipCodeRegex = /^\d+$/;
          if (!zipCodeRegex.test(formData[field])) {
            newErrors[field] = 'Please enter a valid zip code';
          }
          break;
        case 'password':
          if (formData[field].length < 6) {
            console.log(formData[field]);
            newErrors[field] = 'Password must be at least 6 characters';
          }
          break;
        case 'confirmPassword':
          if (formData[field] !== formData.password) {
            console.log(formData[field],formData.password);
            newErrors[field] = 'Passwords do not match';
          }
          break;
        default:
          break;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="multi-step-form">
      <h1>Multi Step Form</h1>
      <form action="">

        {/* progress bar */}
        <div className="step-row">
          <div style={{ width: `${(step) * 33.3}%` }} id="progress"></div>
          <div className="step-col">Step 1</div>
          <div className="step-col">Step 2</div>
          <div className="step-col">Step 3</div>
        </div>

        {step === 1 && (
            // form 1
          <div className="form-container">
            <h2>Personal Information</h2>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              required
              placeholder="Full Name"
            />
            {errors.fullName && <p className="err">{errors.fullName}</p>}
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
              placeholder="Email"
            />
            {errors.email && <p className="err">{errors.email}</p>}
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
              required
              placeholder="Date of Birth"
            />
             {errors.dob && <p className="err">{errors.dob}</p>}
          </div>
        )}

        {step === 2 && (
            // form 2
          <div className="form-container">
            <h2>Address Information</h2>
            <input
              type="text"
              value={formData.streetAddress}
              onChange={(e) => handleChange("streetAddress", e.target.value)}
              required
              placeholder="Street Address"
            />
            {errors.streetAddress && <p className="err">{errors.streetAddress}</p>}
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              required
              placeholder="City"
            />
            {errors.city && <p className="err">{errors.city}</p>}
            <select
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              required
            >
              <option value="">--Select State--</option>
              <option value="Delhi">Delhi</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Bihar">Bihar</option>
            </select>
            {errors.state && <p className="err">{errors.state}</p>}
            <input
              type="number"
              value={formData.zipCode}
              onChange={(e) => handleChange("zipCode", e.target.value)}
              required
              placeholder="Zip Code"
            />
            {errors.zipCode && <p className="err">{errors.zipCode}</p>}
          </div>
        )}

        {step === 3 && (
            // form 3
          <div className="form-container">
            <h2>Account Setup</h2>
            <input
              type="text"
              value={formData.userName}
              onChange={(e) => handleChange("userName", e.target.value)}
              required
              placeholder="Username"
            />
            {errors.userName && <p className="err">{errors.userName}</p>}
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              required
              placeholder="Password"
            />
            {errors.password && <p className="err">{errors.password}</p>}
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleChange("confirmPassword", e.target.value)
              }
              required
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="err">{errors.confirmPassword}</p>
            )}
          </div>
        )}

        <div className="prev-next">
          <button type="button" onClick={handlePrev} disabled={step === 1}>
            Prev
          </button>
          {
            step===3?<button type="button" onClick={handleSubmit}>Submit</button>
            : <button type="button" onClick={handleNext}>Next</button>
          }
          {/* <button type="button" onClick={handleNext} disabled={step === 3}>Next</button> */}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
