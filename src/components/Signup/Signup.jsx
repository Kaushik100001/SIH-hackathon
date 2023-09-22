import React, { useState } from 'react';
import Input from '../Input/Input';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { app, auth } from '../../firebase'; 

const Signup = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    pass: '',
  });
  const [errormsg, setErrormsg] = useState('');
  const [submitbtndisable, setSubmitbtndisable] = useState(false);

  const handlesubmiision = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrormsg('Fill all the fields');
    }
    setErrormsg('');
    setSubmitbtndisable(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then((res) => {
        setSubmitbtndisable(false);
        const user = res.user;
        updateProfile(user, {
          displayName: values.name,
        });
        navigate('/dashboard');
        console.log(res);
      })
      .catch((error) => {
        setSubmitbtndisable(false);
        setErrormsg(error.message);
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for an account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="rounded-md shadow-sm -space-y-px">
            <Input
              label="Name"
              placeholder="Enter Name"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, name: event.target.value }))
              }
            />
            <Input
              label="Email"
              placeholder="Enter email id"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, email: event.target.value }))
              }
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter password here"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, pass: event.target.value }))
              }
            />
          </div>
          <p className="text-red-500 text-center">{errormsg}</p>
          <div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              onClick={handlesubmiision}
              disabled={submitbtndisable}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {submitbtndisable ? (
                  <svg
                    className="h-5 w-5 text-rose-500 group-hover:text-rose-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 3.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V15a1 1 0 01-2 0V5.414L5.707 8.707a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : null}
              </span>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
