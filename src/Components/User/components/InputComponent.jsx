/* eslint-disable react/prop-types */
function InputComponent({ name, type, placeHolder, disText, labelText, onChange}){
    return(
        <section className="flex flex-col space-y-2 mt-2">
            <label htmlFor={name} className="text-gray-500">Enter { labelText }</label>
            <input type={type} id={name} name={name} className="border-2 border-gray-100 px-3 py-2 rounded" placeholder={placeHolder} onChange={
                onChange
            }/>
            <p className="text-gray-400 text-sm">{ disText }</p>
        </section>  
    )
}

export default InputComponent;