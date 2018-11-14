/* @flow */

import * as React from "react";
import ProgressBarComponent from "./ProgressBarComponent";
import { withTheme } from "../../core/theming";
import { COMPONENT_TYPES, FORM_TYPES } from "../../core/component-types";
import type { Theme } from "../../types";

type Props = {|
  /**
   * Progress value (between 0 and 1).
   */
  progress: number,
  style?: any,
  /**
   * @optional
   */
  theme: Theme
|};

/**
 * Progress bar is an indicator used to present progress of some activity in the app.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { ProgressBar } from '@draftbit/ui';
 *
 * const MyComponent = () => (
 *   <ProgressBar progress={0.5} />
 * );
 *
 * export default MyComponent;
 * ```
 */
class ProgressBar extends React.Component<Props> {
  render() {
    const {
      progress,
      style,
      theme: { colors }
    } = this.props;

    return (
      <ProgressBarComponent
        progress={progress}
        progressTintColor={colors.primary}
        style={style}
        trackTintColor={colors.divider}
      />
    );
  }
}

export default withTheme(ProgressBar);

export const SEED_DATA = [
  {
    name: "Progress Bar",
    tag: "ProgressBar",
    description: "A horizontal bar used to show completed progress",
    category: COMPONENT_TYPES.primitive,
    preview_image_url:
      "https://res.cloudinary.com/altos/image/upload/v1541096686/draftbit/library/jigsaw-1.0/reps/Status_Progress.png",
    supports_list_render: false,
    props: {
      progress: {
        label: "Progress",
        description: "The amount of progress to display. A number 0-1.",
        type: FORM_TYPES.number,
        value: 0.5,
        min: 0,
        max: 1,
        step: 0.01,
        precision: 2,
        editable: true
      }
    },
    layout: {
      width: 343,
      height: 2
    }
  }
];