import React,{useState} from "react";
import signupSideImg from "../../../images/SignupsideImg2.png";
import { TiWarningOutline } from "react-icons/ti";
import { IoIosClose } from "react-icons/io";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.css";
import { Axios } from "../../../axiosInstance/AxiosInstance";

const Signup = () => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [passwordConf,setPasswordConf] = useState('')
    const [error,setError] = useState('')

    const navigate = useNavigate()

    // console.log(name,email,password,passwordConf)

    // Below function check whether password strong or not
    const is_password_strong = (password)=>{
        var pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (pattern.test(password)){
          return true;
        }
        return false;
    }

    //SIGNUP
    const handleSignup = async (evt)=>{
        evt.preventDefault()
        if (name === ''||email === ''||password === ''||passwordConf === ''){
          setError('Please fill in all fields.')
        }else if(password !== passwordConf){
          setError('Passwords do not match.Please try again.')
        }else if(!(is_password_strong(password))){
          setError('Password is too weak.Password must be at least 8 characters long with at least one capital letter and symbol')
        }else{
          try{
            setError('')
            const response = await Axios.post('signup',{
              name:name,
              email:email,
              password:password
            })
            console.log(response.data.message)
            navigate('/login')
          }catch(error){
            setError(error.response.data.error)
          }
        }
      
      }

  return (
    <div className="container" id="signupContainer">
      <div className="row">
        <div className="col-1"></div>
        {/*=================================== Main column =============================== */}

        <div className="col-10 py-5" id="signupMainCol">
          <div className="row">
        {/*=================================== Left Img column =============================== */}

            <div className="col-12 col-md-6">
              <img
                src={signupSideImg}
                className="rounded img-fluid"
                alt="sideImg"
                id="signupSideImg"
              />
            </div>
        {/*=================================== Right form column =============================== */}

            <div className="col-12 col-md-6 mt-3 mt-md-0">
              <form
                className="d-flex flex-column justify-content-center h-100 w-75 mx-auto"
                id="signupForm"
              >
                <h4 className="fs-1">Signup</h4>

        {/*=================================== signup form alert start =============================== */}
                {
                  error && (
                    <div
                  className="alert alert-danger d-flex justify-content-between align-items-center mt-3 fade show"
                  role="alert"
                >
                  <div>
                    <TiWarningOutline className="fs-3 pe-1" />
                    <span className="ps-1">{error}</span>
                  </div>
                  {/* <span
                    type="button"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  >
                    <IoIosClose className="fs-3" />
                  </span> */}
                </div>
                  )
                }
        {/*=================================== signup form alert end =============================== */}
                <div className="mb-3 mt-2">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your Name"
                    value={name}
                    onChange = {(evt)=>setName(evt.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange = {(evt)=>setEmail(evt.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your Passoword"
                    value={password}
                    onChange = {(evt)=>setPassword(evt.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="passwordconf" className="form-label">
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="passwordConf"
                    placeholder="Confirm your Password"
                    value={passwordConf}
                    onChange = {(evt)=>setPasswordConf(evt.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSignup}>
                  Signup
                </button>
              </form>
              <div className="d-flex justify-content-center mt-1">
                <p className="h6" style={{fontSize:'14px'}}>Already have an account? <Link to='/login' className="card-link fw-bold text-decoration-none">Login</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
