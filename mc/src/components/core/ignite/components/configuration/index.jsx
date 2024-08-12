import { useContext, useEffect, useState } from "react";
import PrimaryButton from '@commercetools-uikit/primary-button';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {CONTAINER_NAME} from '../../config/configuration';
import Core from '../../..';
import ApiCore from '../../../../../ct-methods/core';
import { PaymentContext } from "../../../../../context/payment";
import { deepMerge } from '../../../../../helpers';

const PaymentConfiguration = () =>  {
    const configuration = Core.PaymentConfigurationJSON
    const defaultData = Core.DefaultJSON
    const [data, setData] = useState()
    const projectKey = useApplicationContext((context) => context.project.key)
    const {activeStore} = useContext(PaymentContext)
    const saveData = (updatedKeyValue) => {
        setData(updatedKeyValue.paymentConfiguration)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            container: CONTAINER_NAME,
            key: activeStore.key,
            value: {
                paymentConfiguration: data
            }
        }
        await ApiCore.createCustomObject(payload, projectKey)
    }
    useEffect(() => {
        if (!activeStore?.key) return
        const getCustomObject = async () => {
            const response = await ApiCore.getCustomObject(projectKey, activeStore?.key);
            if (response) {
                const {value: customObjectData} = response
                const mergedInitialData = deepMerge(defaultData, customObjectData)
                setData(mergedInitialData.paymentConfiguration)
            }            
        }
        getCustomObject()
    }, [activeStore?.key, projectKey])

    if (!data) return <></>
    return (
        <form onSubmit={handleSubmit} className="myaccount-form">
            <Core.Component
                componentType={configuration.component}
                componentKey={configuration.key}
                data={data}
                dataFields={configuration.dataFields}
                sendData={saveData}
            />
            <PrimaryButton
                label="Save Configuration"
                type="submit"
                isDisabled={false}
            />
        </form>
    )
}

export default PaymentConfiguration