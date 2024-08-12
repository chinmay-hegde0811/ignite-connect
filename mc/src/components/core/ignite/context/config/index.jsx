import PropTypes from "prop-types";
import { createContext, useState } from "react";
import CustomObject from '../../config/CustomObjectMock.json';

export const ConfigContext = createContext();

const ConfigProvider = ({children}) => {
  const [configData, setConfigData] = useState(CustomObject['PaymentConfiguration'])

  const getValueFromCustomObject = (keyHierarchy) => {
    let currentObj = configData;
    for (const key of keyHierarchy) {
        if (currentObj.hasOwnProperty(key)) {
            currentObj = currentObj[key];
        }
    }
    return currentObj
  }

  const updateCustomObject = (keyHierarchy, updatedKey, updatedValue) => {
    let currentCustomObject = {...configData};
    let targetObject = currentCustomObject;
    keyHierarchy.forEach(key => {
        targetObject = targetObject[key];
    });
    targetObject[updatedKey] = updatedValue
    setConfigData(currentCustomObject)
  }

  return (
    <ConfigContext.Provider
      value={{
        configData,
        getValueFromCustomObject,
        updateCustomObject
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}

export default ConfigProvider

ConfigProvider.propTypes = {
  children: PropTypes.node
};