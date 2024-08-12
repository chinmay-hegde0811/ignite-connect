import PropTypes from "prop-types"
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";

const MultiSelect = ({
    componentKey,
    dataFields,
    data,
    sendData
}) => {
    const [selectedOptions, setSelectedOptions] = useState(data);
    const saveData = (value) => { 
        setSelectedOptions(value);
        const updatedData = {[componentKey]: value}
        sendData(updatedData)
    }
    if (!dataFields.show) return <></>
    return (
        <div className="field-wrapper">
            <p className="sub-title">{dataFields.label}</p>
            <FormControl sx={{ width: '100%' }} size="small">
                <Select
                    multiple
                    value={selectedOptions}
                    onChange={(e) => saveData(e.target.value)}
                    required={!!dataFields.validation?.required}
                >
                {dataFields.options.map((option, i) => (
                    <MenuItem
                        key={i}
                        value={option.value}
                    >
                        {option.logo && (
                            <img src={option.logo} width={30} height={'auto'} alt={option.label} className="card-logo" />
                        )}
                        {option.label}
                    </MenuItem>
                ))}
                </Select>
                {dataFields.helperText && (
                    <p className="bold-text helper-text">{dataFields.helperText}</p>
                )}
            </FormControl>
        </div>
    )
}

export default MultiSelect

MultiSelect.propTypes = {
    componentKey: PropTypes.string,
    dataFields: PropTypes.object,
    data: PropTypes.object,
    sendData: PropTypes.func
};