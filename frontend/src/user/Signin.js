import React ,{useState} from 'react';
import Base from '../core/Base'
import{Link ,Redirect} from 'react-router-dom'
import { signin, authenticate, isAuthenticated} from '../auth/helper/index'

const SignIn = () => {
  const [values ,setvalues] = useState({
       email:"",
       password:"",
       error:"",
       loading: false,
       didRedirect:false
  })

  const {email ,password ,error ,loading ,didRedirect }=values ;
  const {user }= isAuthenticated() ;
const handleChange =name=>event=>{
    setvalues({...values , error:false ,[name]:event.target.value});
}

const  performRedirect=()=>{
    if(didRedirect)
    { if(user && user.role==1)
        {
           return <Redirect to="/admin/dashboard"/> ;
        }
        else{
            return <Redirect to="/user/dashboard"/> ;
        }

    }
    if(isAuthenticated())
    {
        return <Redirect to="/"/>
    }
    
}
const onSubmit=(event)=>{
  event.preventDefault()
  setvalues({...values ,error:false,loading: true })
  
  signin({email ,password})
  .then( res=>{
      if(res.error)
      {
          setvalues({...values ,error: res.error,loading:false}) ;
      }
      else{
           authenticate(res ,()=>{
               setvalues({...values , didRedirect: true});
           })
      }
  })
  .catch(console.log("signin request failed")) ;

}
const loadingMessage =()=>{
    return(
        loading && (
             <div className="alert alert-info">
                 <h2>loading...</h2>
             </div>
        )
    )
}
const errorMessage =()=>{
  return(
      <div  className="alert alert-danger" style={{display: error ? "": "none"}}>
         {error} 
      </div>
  )
}

const signinForm = () => {
        return (
             <div className="row">
                   <div className="col-md-6 offset-sm-3 text-left">
                   {loadingMessage()}
                   {errorMessage()}  
                       <form >
                            
                           <div className="form-group">
                               <label  className="text-light">Email</label>
                               <input onChange={handleChange("email")} value={email} className="form-control" type="email"/>
                           </div>
                           <div className="form-group">
                               <label  className="text-light">password</label>
                               <input  onChange={handleChange("password")}value={password}className="form-control" type="password"/>
                           </div>
                           <button    onClick={onSubmit}className="btn btn-success btn-block">Submit</button>
                       </form>
                   </div>
             </div>
        );
    }
    return (
        <Base  title="signIn" description="sign in works">  
        {signinForm()}
        {performRedirect()} 
        <p>{JSON.stringify(values)}</p>
        </Base>
    );
}
 
export default SignIn;