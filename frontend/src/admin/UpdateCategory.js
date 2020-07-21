
import React ,{useState ,useEffect} from 'react';
import Base from '../core/Base'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { updateACategory ,getACategory } from './helper/adminapicall';


const UpdateCategory = ({match}) => {
     const [category ,setCategory] =useState("")
     const [error ,setError] =useState(false)
     const [ success ,setSuccess] =useState(false) 
     const { user ,token}= isAuthenticated() ;
     const goBack=()=>(
          <div className="mt-5 ">
              <Link className="btn btn-sm btn-info mb-3"  to="/admin/dashboard">Admin Home</Link>
          </div>
         )
     const preLoad=(categoryId)=>{
          getACategory(categoryId)
          .then( data=>{
               if(data.error)
               {   
                   console.log(data.error) ;
               }
               else{
                    setCategory(data.name);
               }
          })
          .catch(err=>console.log(err)) ;
     }
      useEffect(()=>{
           preLoad(match.params.categoryId) ;
      },[])


         const handleChange =(event)=>{
             setCategory(event.target.value) ;
             setError("");
         }
         const onSubmit =(event)=>{
            event.preventDefault();
            setSuccess(false);
            const name = category ;
            updateACategory(  match.params.categoryId ,user._id ,token  ,{name})
            .then( data=>{
                console.log(data) ;
                if(data.error)
                {
                    setError(true) ;
                    setCategory("") ;
                    
                }else{
                    setSuccess(true);
                    setError("") ;
                    setCategory("");
                }
            })
            .catch(err=>{
                
                console.log(err)})

       }
       const successMessage=()=>{
           if(success)
           {
                return <h4 className="text-success">Category updated  Successfully !</h4>
           }
       }
       const errorMessage=()=>{
           if(error)
           {     
                return <h4 className="text-danger">Failed to update  Category </h4>
           }
       }


     const myCategoryForm =()=>(
          <div>
             
          <form>
               <div className="form-group">
                   <p className="lead">Enter the Category</p>
                   <input type="text" onChange={handleChange} value={category}className="form-control my-3" autoFocus  required  placeholder="For Ex.Summer"/>
                   <button  onClick={onSubmit}className=" btn btn-outline-info">Update  Category</button>
               </div>

          </form>
          </div>
     )

   return (
           <Base title ="Update a Category  here" 
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

export default UpdateCategory;