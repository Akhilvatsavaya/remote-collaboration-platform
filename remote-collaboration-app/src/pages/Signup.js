import react, {useState} from 'react';
import {auth} from '../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async(e) => {
        e.preventDefault();
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            alert('User Registered Successfully');
        }
        catch(err) {
            setError(err.message);
        }
    };

    return(
        <div>
            <h2>Sign Up</h2>
            <form onSubmit = {handleSignup}>
                <input
                    type="email"
                    placeHolder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeHolder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button typ="submit">Sign Up</button>
                {error && <p style={{color:'red'}}>{error}</p>}
            </form>
        </div>
    );
};

export default Signup;