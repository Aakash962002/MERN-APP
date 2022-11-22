import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react"; 
import LoginImage from '../../sources/images/signin-image.jpg';
import PersonIcon from '@material-ui/icons/Person';
import PasswordIcon from '@material-ui/icons/Lock'
import { useDispatch } from "react-redux";
import actions from '../../Redux/reducers/auth/actions';
import * as _ from 'lodash';


const Login = () => {
    const [data, setData] = useState({
        email:"",
        password:""
    })
    const [errors, setErrors] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = ({ currentTarget: input }) => {
        setData({...data, [input.name]: input.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:5000/test/login'
            const { data: res } = await axios.post(url, data);
            if (!_.isEmpty(res.data)) {
                console.log("🚀 ~ file: index.js ~ line 31 ~ handleSubmit ~ res", res)
                dispatch(actions.loginUser(res.data))
            }
            
        } catch (error) {
            console.log("🚀 ~ file: index.js ~ line 25 ~ handleSubmit ~ error", error)
            if (error.response.status >= 400 && error.response.status <= 500) {
                setErrors(error?.response?.data?.message)
            }
        }
    }

    return (
        <div className="main">
            <div className="container">
                <div className="signin-content">
                    <div className="signin-image">
                        <figure><img src={LoginImage} alt="sing up" /></figure>
                        <Link to="/signup">Create an account</Link>
                    </div>
                    <div className="signin-form">
                        <h2 className="form-title">Sign In</h2>
                        <form onSubmit={handleSubmit} className="register-form">
                            <div className="form-group">
                                <label htmlFor="your_name"><PersonIcon/></label>
                                <input type="email" placeholder="Email" name="email" value={data.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="your_pass"><PasswordIcon /></label>
                                <input type="password" placeholder="Password" name="password" value={data.password} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                { errors && <div> {errors} </div>}
                            </div>
                            <div className="form-group form-button">
                                <button type="submit" className="form-submit">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;