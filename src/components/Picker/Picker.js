import * as React from "react";
import { withTheme } from "../../core/theming";
import PickerComponent from "./PickerComponent";

import {
  GROUPS,
  COMPONENT_TYPES,
  FORM_TYPES,
  PROP_TYPES,
  FIELD_NAME,
} from "../../core/component-types";

class Picker extends React.Component {
  static defaultProps = {
    options: [],
    type: "underline",
    disabled: false,
    error: false,
  };

  state = {
    pickerVisible: false,
  };

  onValueChange = (itemValue, itemIndex) => {
    const { placeholder, onChange } = this.props;

    if (placeholder && itemIndex === 0) {
      return;
    }

    onChange && onChange(itemValue, itemIndex);
  };

  render() {
    const { placeholder, options, value, ...props } = this.props;

    const pickerOptions = placeholder
      ? [{ value: placeholder, label: placeholder }, ...options]
      : options;

    return (
      <PickerComponent
        {...props}
        selectedValue={value}
        placeholder={placeholder}
        options={pickerOptions}
        onValueChange={this.onValueChange}
      />
    );
  }
}

export default withTheme(Picker);

const SEED_DATA_PROPS = {
  label: {
    group: GROUPS.data,
    label: "Label",
    description: "The label to be displayed on the picker",
    formType: FORM_TYPES.string,
    propType: PROP_TYPES.STRING,
    defaultValue: null,
    editable: true,
    required: true,
  },
  placeholder: {
    group: GROUPS.basic,
    label: "Placeholder",
    description: "The placeholder text of the picker",
    formType: FORM_TYPES.string,
    propType: PROP_TYPES.STRING,
    defaultValue: "Select an option",
    editable: true,
    required: false,
  },
  assistiveText: {
    group: GROUPS.basic,
    label: "Assistive text",
    description: "Helper text to display below the picker",
    formType: FORM_TYPES.string,
    propType: PROP_TYPES.STRING,
    defaultValue: null,
    editable: true,
    required: false,
  },
  options: {
    group: GROUPS.data,
    label: "Options",
    description:
      "Array of picker options. An array of objects containing a label and value.",
    editable: true,
    required: false,
    formType: FORM_TYPES.array,
    propType: PROP_TYPES.OBJECT,
    options: [],
    defaultValue: null,
  },
  disabled: {
    group: GROUPS.basic,
    label: "Disabled",
    description:
      "Whether the picker should be disabled. Will prevent selection and show a greyed out state.",
    formType: FORM_TYPES.boolean,
    propType: PROP_TYPES.BOOLEAN,
    defaultValue: false,
    editable: true,
    required: false,
  },
  error: {
    group: GROUPS.data,
    label: "Error",
    description: "Whether the picker should display the error state",
    formType: FORM_TYPES.boolean,
    propType: PROP_TYPES.BOOLEAN,
    defaultValue: false,
    editable: true,
    required: false,
  },
  leftIconName: {
    group: GROUPS.basic,
    label: "Left icon name",
    description: "The icon to display on the left",
    formType: FORM_TYPES.icon,
    propType: PROP_TYPES.ASSET,
    defaultValue: null,
    editable: true,
    required: false,
  },
  leftIconMode: {
    group: GROUPS.basic,
    label: "Left icon mode",
    description:
      "The mode of the icon to display on the left. 'inset' or 'outset'.",
    formType: FORM_TYPES.flatArray,
    propType: PROP_TYPES.STRING,
    defaultValue: "inset",
    options: ["inset", "outset"],
    editable: true,
    required: true,
  },
  rightIconName: {
    group: GROUPS.basic,
    label: "Right icon name",
    description: "The icon to display on the right",
    formType: FORM_TYPES.icon,
    propType: PROP_TYPES.ASSET,
    defaultValue: null,
    editable: true,
    required: false,
  },
  fieldName: {
    ...FIELD_NAME,
    defaultValue: "pickerValue",
  },
};

export const SEED_DATA = [
  {
    name: "Picker - Solid",
    tag: "Picker",
    description: "A picker with a solid border",
    category: COMPONENT_TYPES.field,
    preview_image_url: "{CLOUDINARY_URL}/Picker.png",
    supports_list_render: false,
    props: {
      ...SEED_DATA_PROPS,
      type: {
        group: GROUPS.uncategorized,
        formType: FORM_TYPES.string,
        propType: PROP_TYPES.STRING,
        defaultValue: "solid",
        editable: false,
        required: false,
      },
    },
    layout: {},
  },
  {
    name: "Picker - Underline",
    tag: "Picker",
    description: "A picker with an underline",
    category: COMPONENT_TYPES.field,
    preview_image_url: "{CLOUDINARY_URL}/Picker.png",
    supports_list_render: false,
    props: {
      ...SEED_DATA_PROPS,
      type: {
        group: GROUPS.uncategorized,
        formType: FORM_TYPES.string,
        propType: PROP_TYPES.STRING,
        defaultValue: "underline",
        editable: false,
        required: false,
      },
    },
    layout: {},
  },
];
