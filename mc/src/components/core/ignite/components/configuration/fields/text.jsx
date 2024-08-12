import PropTypes from "prop-types"
import TextField from '@mui/material/TextField';

const Text = ({
    componentKey,
    dataFields,
    data,
    sendData
}) => {
    const saveData = (value) => {
        const updatedData = {[componentKey]: value}
        sendData(updatedData)
    }
    if (!dataFields.show) return <></>
    return (
        <div className="field-wrapper">
            <p className="sub-title">{dataFields.label}</p>
            <TextField
                name={dataFields.key}
                className="section-input"
                value={data}
                onChange={(e) => saveData(e.target.value)}
                required={!!dataFields.validation?.required}
                disabled={!!dataFields.disabled}
                sx={{ width: '100%' }} size="small"
            />
            {dataFields.helperText && (
                <p className="bold-text helper-text">{dataFields.helperText}</p>
            )}
        </div>
    )
}

export default Text

Text.propTypes = {
    componentKey: PropTypes.string,
    dataFields: PropTypes.object,
    data: PropTypes.object,
    sendData: PropTypes.func
};