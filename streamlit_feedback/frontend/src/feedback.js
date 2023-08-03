import React from "react";
import { ThumbsFeedback } from "./ThumbsFeedback";
import { ThumbsWithQualiFeedback } from "./ThumbsWithQualiFeedback";
import { Streamlit } from "streamlit-component-lib"

export function Feedback(props) {
    const submitFeedback = (score, text) => {
        Streamlit.setComponentValue({type: props.feedbackType, score, text});
    };

    if (props.feedbackType === "thumbs" && props.optionalTextLabel === null) {
        return (<ThumbsFeedback submitFeedback={submitFeedback} align={props.align}/>)
    } else {
        return (<ThumbsWithQualiFeedback submitFeedback={submitFeedback} optionalTextLabel={props.optionalTextLabel} align={props.align}/>)
    }
}
