import {
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React from "react"
import { Feedback } from "./feedback"


class MyComponent extends StreamlitComponentBase {

  render() {
    return (
      <div>
        <Feedback
          feedbackType={this.props.args["feedback_type"]}
          optionalTextLabel={this.props.args["optional_text_label"]}
          maxTextLength={this.props.args["max_text_length"]}
          disableWithScore={this.props.args["disable_with_score"]}
          align={this.props.args["align"]}
          default={this.props.args["default"]}
        />
      </div>
    )
  }
}

export default withStreamlitConnection(MyComponent)
