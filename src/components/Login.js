import { useMutation,gql } from '@apollo/client';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';
import './Login.css'


const SIGNUP_MUTATION = gql`
   mutation SignupMutation(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signup(
      email: $email
      password: $password
      name: $name
    ) {
      token
    }
  }

`;

const LOGIN_MUTATION=gql`
    mutation LoginMutation(
        $email:String! 
        $password:String!
    ){
        login(email:$email, password:$password){
        token
        }
    }



`



const Login = () => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        login: true,
        email: '',
        password: '',
        name: ''
    })



    const [login] = useMutation(LOGIN_MUTATION, {
        variables:{
            email:formState.email,
            password:formState.password
        },
        onCompleted:({login}) => {
            localStorage.setItem(AUTH_TOKEN, login.token);
            navigate('/');
        }
    });
    

    const [signup] = useMutation(SIGNUP_MUTATION, {
        variables:{
            name:formState.name,
            email:formState.email,
            password:formState.password
        },
        onCompleted:({signup}) => {
            localStorage.setItem(AUTH_TOKEN, signup.token);
            navigate('/')
        }
    })
    
    return(
        <div className='n'>
        
            <div className='signup-container'>
            <h1>{formState.login ? 'Login' : 'Sign Up'}</h1>
                {!formState.login && (
                    <input 
                    value={formState.name}
                    onChange={(e) => 
                        setFormState({
                            ...formState,
                            name:e.target.value
                        })


                    }
                    type='text'
                    placeholder='Your Name'
                    className='in'
                    />
                    
                )}
                <input 
                    value={formState.email}
                    onChange={(e) => 
                        setFormState({
                            ...formState,
                            email:e.target.value
                        })


                    }
                    type='text'
                    placeholder='Your Email address'
                    className='in'
                    />
                    <input 
                    value={formState.password}
                    onChange={(e) => 
                        setFormState({
                            ...formState,
                            password:e.target.value
                        })


                    }
                    type='password'
                    placeholder='Choose a safe password'
                    className='in'
                    />
            
            <div className='button-container'>
                <button className='button-one' onClick={formState.login ? login : signup }>{formState.login ? 'login' : 'create account'}</button><br/>
                <button className='button-one' onClick={()=> setFormState({
                    ...formState,
                    login:!formState.login
                })}>{formState.login ? 'need to create an account?' : ' already have an account?'}</button>
            </div>
            </div>
        </div>
        
    )
}
export default Login