
import React ,{useState} from 'react';
import Base from '../core/Base'
import {signup } from '../auth/helper'


const Signup = () => {
     const [values ,setValues] =useState({
         name:"",
         email:"",
         password:"",
         error:"",
         success:false
     })
     const {name ,email,password ,error ,success} = values ;
    
      const handleChange =name=>event=>{
          setValues({...values , error:false ,[name]:event.target.value});
      }

      const onSubmit=event=>{
          event.preventDefault() 
          setValues({...values ,error:false})
          signup({name , email ,password})
          .then(data=>{
              if(data.errors)
              {   console.log(data.error);
                  setValues({...values , error: data.errors , success:false}) ;
              }
              else{
                  setValues({...values,
                    email:"",
                    password:"",
                    error:"",
                    name:"",
                    success:true

                 }) ;
              }
          })
          .catch(console.log("error in signup"))

          
      }
      const successMessage =()=>{
          return(
              <div  className="alert alert-success" style={{display: success? "": "none"}}>
                 Account created successfully.
              </div>
          )
      }
      const errorMessage =()=>{
        return(
            <div  className="alert alert-danger" style={{display: error ? "": "none"}}>
               {error} 
            </div>
        )
    }

      const signupForm = () => {
          return (
               <div className="row">
                     <div className="col-md-6 offset-sm-3 text-left">
                         {successMessage()}
                         {errorMessage()}
                         <form >
                             <div className="form-group">
                                 <label  className="text-light">Name</label>
                                 <input value={name} onChange={handleChange("name")} className="form-control" type="text"/>
                             </div>
                             <div className="form-group">
                                 <label  className="text-light">Email</label>
                                 <input  value={email}onChange={handleChange("email")} className="form-control" type="email"/>
                             </div>
                             <div className="form-group">
                                 <label  className="text-light">password</label>
                                 <input  value={password} onChange={handleChange("password")}className="form-control" type="password"/>
                             </div>
                             <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                         </form>
                     </div>
               </div>
          );
      }
         
    return (
          
        <Base  title="signp" description="signup works">
         {signupForm()}
         <p>{JSON.stringify(values)}</p>
        </Base>
    );
}
 
export default Signup;