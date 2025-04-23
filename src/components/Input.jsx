const Input = ({ ref, label, placeholder, id, value, onChange }) => {
    return (
        <div className="input-block">
            {/*class error */}
            <label className="label" htmlFor={id}>{label}</label>
            <input ref={ref} value={value} onChange={onChange} className="input" type="text" id={id} placeholder={placeholder} />
        </div>
    );
}

export default Input;