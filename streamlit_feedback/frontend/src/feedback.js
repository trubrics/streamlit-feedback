import React, { useState } from "react";
import { ThumbsFeedback } from "./ThumbsFeedback";
import { ThumbsWithQualiFeedback } from "./ThumbsWithQualiFeedback";
import { FacesFeedback } from "./FacesFeedback";
import { FacesWithQualiFeedback } from "./FacesWithQualiFeedback";
import { Streamlit } from "streamlit-component-lib"

export function Feedback(props) {
    const [submitValue, setSubmitValue] = useState(props.default["_submit_value"] + 1);
    const submitFeedback = (score, text) => {
        Streamlit.setComponentValue({type: props.feedbackType, score, text, _submit_value: submitValue});
        setSubmitValue(submitValue + 1)
    };

    if (props.feedbackType === "thumbs" && props.optionalTextLabel === null) {
        return (<ThumbsFeedback submitFeedback={submitFeedback} singleSubmit={props.singleSubmit} align={props.align}/>)
    } else if (props.feedbackType === "thumbs" && props.optionalTextLabel !== null) {
        return (<ThumbsWithQualiFeedback submitFeedback={submitFeedback} optionalTextLabel={props.optionalTextLabel} singleSubmit={props.singleSubmit} align={props.align}/>)
    } else if (props.feedbackType === "faces" && props.optionalTextLabel === null) {
        return (<FacesFeedback submitFeedback={submitFeedback} singleSubmit={props.singleSubmit} align={props.align}/>)
    } else if (props.feedbackType === "faces" && props.optionalTextLabel !== null) {
        return (<FacesWithQualiFeedback submitFeedback={submitFeedback} optionalTextLabel={props.optionalTextLabel} singleSubmit={props.singleSubmit} align={props.align}/>)
    } else if (props.feedbackType === "textbox") {
        return (<div />)
    }
}
