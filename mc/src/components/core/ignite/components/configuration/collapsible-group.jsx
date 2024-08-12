import PropTypes from 'prop-types'
import Accordion from '@mui/material/Accordion';
import { AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Core from '../../../../core';

const CollapsibleGroup = ({
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
            {dataFields.show && dataFields.children.map((field) => {
                return (
                    <Accordion key={field.index} className='accordion-wrapper'>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            >
                            {field['collapseTitle']}
                        </AccordionSummary>
                        <AccordionDetails>
                            <Core.Component 
                                componentType={field.component}
                                componentKey={field.key}
                                data={data?.[field.key]}
                                dataFields={field.dataFields}
                                sendData={saveData}
                            />
                        </AccordionDetails>
                    </Accordion>
                )
            } 
            )}
        </>
    )
}

CollapsibleGroup.propTypes = {
    componentKey: PropTypes.string,
    dataFields: PropTypes.array,
    data: PropTypes.object,
    sendData: PropTypes.func
}

export default CollapsibleGroup