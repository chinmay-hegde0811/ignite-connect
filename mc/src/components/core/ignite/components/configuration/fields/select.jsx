import PropTypes from "prop-types"
import SelectInput from '@commercetools-uikit/select-input';

const Select = ({
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
            <SelectInput
                name={dataFields.key}
                value={data}
                onChange={(e) => saveData(e.target.value)}
                options={dataFields.options}
                isReadOnly={dataFields.isReadOnly}
                isOptionDisabled={(option) => option.disabled}
                isDisabled={dataFields.disabled}
            />
            {dataFields.helperText && (
                <p className="bold-text helper-text">{dataFields.helperText}</p>
            )}
        </div>
    )
}

export default Select

Select.propTypes = {
    componentKey: PropTypes.string,
    dataFields: PropTypes.object,
    data: PropTypes.object,
    sendData: PropTypes.func
};