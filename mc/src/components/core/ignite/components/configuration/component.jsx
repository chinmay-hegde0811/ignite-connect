import PropTypes from "prop-types"
import Core from '../../../../core';

const Component = (props) => {
    switch (props.componentType) {
		case "ConfigurationGroup":
			return <Core.ConfigurationGroup {...props} />
        case "CollapsibleGroup":
			return <Core.CollapsibleGroup {...props} />
        case "Account":
			return <Core.Account {...props} />
		case "Toggle":
			return <Core.Toggle {...props} />
        case "Text":
            return <Core.Text {...props} />
        case "Radio":
            return <Core.Radio {...props} />
        case "Select":
            return <Core.Select {...props} />
        case "MultiSelect":
            return <Core.MultiSelect {...props} />
        case "Textarea":
            return <Core.Textarea {...props} />
		default:
			return <></>
	}
}

export default Component

Component.propTypes = {
    componentType: PropTypes.string
};