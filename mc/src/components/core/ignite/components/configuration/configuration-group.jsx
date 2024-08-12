import PropTypes from 'prop-types'
import Core from '../../..';

const ConfigurationGroup = ({
    componentKey,
    dataFields,
    data,
    sendData
}) => {
    const saveData = (updatedKeyValue) => {
        const updatedData = {
            [componentKey]: {
                ...data,
                ...updatedKeyValue
            }
        }
        sendData(updatedData)
    }
    return (
        <>
            {dataFields.show && dataFields.children.map((field) => (
                <Core.Component 
                    componentType={field.component}
                    componentKey={field.key}
                    data={data?.[field.key]}
                    dataFields={field.dataFields}
                    sendData={saveData}
                    key={field.key}
                />
            ))}
        </>
    )
}

ConfigurationGroup.propTypes = {
    componentKey: PropTypes.string,
    dataFields: PropTypes.array,
    data: PropTypes.object,
    sendData: PropTypes.func
}

export default ConfigurationGroup