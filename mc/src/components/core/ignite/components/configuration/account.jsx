import PropTypes from 'prop-types'
import Core from '../../../../core';

const Account = ({
    componentKey,
    dataFields,
    data,
    sendData
}) => {       
    const modifiedDataFields = {...dataFields}
    if ('environment' in data) {
        const selectedEnvironment = data['environment'];
        modifiedDataFields.children
            .filter((child) => child['key'] === 'live' || child['key'] === 'test')
            .map((child) => child.dataFields.show = child['key'] === selectedEnvironment)
    }
    return (
        <Core.ConfigurationGroup
            componentKey={componentKey}
            data={data}
            dataFields={modifiedDataFields}
            sendData={sendData}
        />
    )
}

Account.propTypes = {
    componentKey: PropTypes.string,
    dataFields: PropTypes.array,
    data: PropTypes.object,
    sendData: PropTypes.func
}

export default Account