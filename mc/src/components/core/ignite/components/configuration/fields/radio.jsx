import PropTypes from "prop-types"
import RadioInput from '@commercetools-uikit/radio-input';
import RadioField from "@commercetools-uikit/radio-field";

const Radio = ({
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
            <RadioField
                name={dataFields.key}
                value={data}
                onChange={(e) => saveData(e.target.value)}
                isDisabled={dataFields.disabled}
            >
                {dataFields.options.map((option) => (
                    <RadioInput.Option value={option} key={option}>{option}</RadioInput.Option>
                ))}
            </RadioField>
            {dataFields.helperText && (
                <p className="bold-text helper-text">{dataFields.helperText}</p>
            )}
        </div>
    )
}

export default Radio

Radio.propTypes = {
    componentKey: PropTypes.string,
    dataFields: PropTypes.object,
    data: PropTypes.object,
    sendData: PropTypes.func
};