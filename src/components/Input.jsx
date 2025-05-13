const Input = ({ error, ref, label, placeholder, id, value, onChange, type = 'text' }) => {
    return (
        <div className={error ? 'input-block error' : 'input-block'}>
            {/*class error */}
            <label className={error ? 'label error' : 'label'} htmlFor={id}>{label}</label>
            <input maxLength={30} ref={ref} value={value} type={type} onChange={onChange} className={error ? 'input error' : 'input'} id={id} placeholder={placeholder} />
        </div>
    );
}

export default Input;