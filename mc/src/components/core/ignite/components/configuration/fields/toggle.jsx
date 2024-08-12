import PropTypes from "prop-types"
import ToggleInput from '@commercetools-uikit/toggle-input';

const Toggle = ({
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
            <ToggleInput
                name={componentKey}
                isChecked={data}
                onChange={(e) => saveData(e.target.checked)}
                size="small"
                isDisabled={dataFields.disabled}
            />
            {dataFields.helperText && (
                <p className="bold-text helper-text">{dataFields.helperText}</p>
            )}
        </div>
    )
}

export default Toggle

Toggle.propTypes = {
    componentKey: PropTypes.string,
    dataFields: PropTypes.object,
    data: PropTypes.object,
    sendData: PropTypes.func
};