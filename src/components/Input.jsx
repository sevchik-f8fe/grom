const Input = ({ label, placeholder, id }) => {
    return (
        <div className="input-block">
            {/*class error */}
            <label className="label" htmlFor={id}>{label}</label>
            <input className="input" type="text" id={id} placeholder={placeholder} />
        </div>
    );
}

export default Input;