import React, { Component } from 'react'
import gql from 'graphql-tag'
import {Mutation} from 'react-apollo'
import './Login.css'
import imagen from './insta1.png';

const MUTATION_LOGIN = gql`
mutation login ($email:String! ,$password:String!){
    login(
      email:$email
      password:$password
      ){
      token
      user{
        name
      }
      }
    
  }`
    

class Login extends Component {

        constructor(props){
            super(props);
            this.state={
                email:"",
                password:""
            }
        }
    
        onInputChange= (event)=>{
            console.log("Me ejecute");
            let{id,value}=event.target
            this.setState({
                [id]:value
            });
        }

        onFormSubmit = (event,login) => {
            event.preventDefault();
            console.log("Submit")
            console.log(this.state)
            login({
                variables:{
                    email:this.state.email,
                    password:this.state.password
                }
            }).then(response =>{
                console.log(response.data.login.token)
                localStorage.setItem('token',response.data.login.token)
                this.props.history.push('/')
                //alert("Ya te logeaste")
            }).catch(err => {
                console.log(err)
                alert("te equivocaste")
            })
        }
     
    render() { 
        return (
            <Mutation mutation={MUTATION_LOGIN}>
            {
                (login,{data})=>(

           <div className="row main">
				<div className="main-login main-center">
				
                <img className="logologin" src={imagen}/>
               	<form onSubmit={(e) => this.onFormSubmit(e,Login)}>

                    <div className="form-group">
							<label form="email" className="cols-sm-2 control-label"> </label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
									<input type="email" className="form-control" name="email" id="email"  placeholder="Correo electrónico"
                                    onChange={this.onInputChange}
                                    value={this.state.email}
                                    />
								</div>
							</div>
						</div>			

						
						<div className="form-group">
							<label form="password" className="cols-sm-2 control-label"> </label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" className="form-control" name="password" id="password"  placeholder="Contraseña"
                                    onChange={this.onInputChange}
                                    value={this.state.password}
                                    />
								</div>
							</div>
						</div>

						<div className="form-group ">
							<button type="submit" id="button" className="btn btn-primary btn-lg btn-block login-button">Inicio</button>
						</div>
						
					</form>
				</div>
			
		</div>)}
            </Mutation> 
            
         )  
         
    }
}
 
export default Login;