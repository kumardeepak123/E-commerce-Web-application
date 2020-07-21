
import React ,{useState} from 'react';
 import Base from '../core/Base'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { createACategory } from './helper/adminapicall';


const AddCategory = () => {
      const [name ,setName] =useState("")
      const [error ,setError] =useState(false)
      const [ success ,setSuccess] =useState(false) 
      const { user ,token}= isAuthenticated() ;
      const goBack=()=>(
           <div className="mt-5 ">
               <Link className="btn btn-sm btn-info mb-3"  to="/admin/dashboard">Admin Home</Link>
           </div>
          )

          const handleChange =(event)=>{
              setName(event.target.value) ;
              setError("");
          }
          const onSubmit =(event)=>{
             event.preventDefault();
             setSuccess(false);
             createACategory(user._id ,token , {name})
             .then( data=>{
                 if(data.error)
                 {
                     setError(true) ;
                     setName("") ;
                     
                 }else{
                     setSuccess(true);
                     setError("") ;
                     setName("");
                 }
             })
             .catch(err=>{
                 
                 console.log(err)})

        }
        const successMessage=()=>{
            if(success)
            {
                 return <h4 className="text-success">Category created Successfully !</h4>
            }
        }
        const errorMessage=()=>{
            if(error)
            {     
                 return <h4 className="text-danger">Failed to Create Category </h4>
            }
        }


      const myCategoryForm =()=>(
           <div>
              
           <form>
                <div className="form-group">
                    <p className="lead">Enter the Category</p>
                    <input type="text" onChange={handleChange} value={name}className="form-control my-3" autoFocus  required  placeholder="For Ex.Summer"/>
                    <button  onClick={onSubmit}className=" btn btn-outline-info">Create Category</button>
                </div>

           </form>
           </div>
      )

    return (
            <Base title ="Create a Category  here" 
             description="add new Categories for your tshirt"  
             className=" container bg-info  p-4">
           
             <div className="row bg-white rounded">
                 <div className="col-md-8 offset-md-2">
                     {successMessage()}
                     {errorMessage()}
                     {myCategoryForm()}
                     {goBack()}
                 </div>
             </div>
            </Base>
    );
}
 
export default AddCategory;