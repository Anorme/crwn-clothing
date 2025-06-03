const FormInput = ({ label, ...otherProps }) => {
 <div>
    <label>{label}</label> 
    <input {...otherProps}/>
 </div>
}

export default FormInput;