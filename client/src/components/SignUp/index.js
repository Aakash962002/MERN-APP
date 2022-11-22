/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react"; 
import '../../sources/style.css';
import SignUpImage from '../../sources/images/signup-image.jpg';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/Lock'


const Signup = () => {
    const [data, setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""
    })
    const [errors, setErrors] = useState();
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({...data, [input.name]: input.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:5000/test/register'
            const { data: res } = await axios.post(url, data);
            navigate("/login")
        } catch (error) {
            console.log("🚀 ~ file: index.js ~ line 25 ~ handleSubmit ~ error", error)
            if (error.response.status >= 400 && error.response.status <= 500) {
                setErrors(error?.response?.data?.message)
            }
        }
    }
    return (
        <div className="main">
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form onSubmit={handleSubmit} className="register-form">
                                <div className="form-group">
                                    <label htmlFor="firstName"><PersonIcon/></label>
                                    <input type="text" id="firstName" placeholder="First Name" name="firstName" value={data.firstName} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName"><PersonIcon/></label>
                                    <input type="text" id="lastName" placeholder="Last Name" name="lastName" value={data.lastName} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email"><EmailIcon/></label>
                                    <input type="email" placeholder="Email" name="email" value={data.email} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                <label htmlFor="re-pass"><PasswordIcon /></label>
                                    <input type="password" placeholder="Password" name="password" value={data.password} onChange={handleChange} required />
                                </div>
                                <div className="form-error-messages">
                                    { errors && <div> {errors} </div>}
                                </div>
                                <div className="form-group form-button">
                                    <button type="submit" id="signup" className="form-submit">
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img src={SignUpImage} alt="sing up" /></figure>
                            <Link to="/" className="signup-image-link">I am already member</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signup;