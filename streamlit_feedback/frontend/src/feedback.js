import React from "react";
import { ThumbsFeedback } from "./ThumbsFeedback";
import { ThumbsWithQualiFeedback } from "./ThumbsWithQualiFeedback";
import { ThumbsWithQualiFeedbackMultiline } from "./ThumbsWithQualiFeedbackMultiline";
import { FacesFeedback } from "./FacesFeedback";
import { FacesWithQualiFeedback } from "./FacesWithQualiFeedback";
import { FacesWithQualiFeedbackMultiline } from "./FacesWithQualiFeedbackMultiline";
import { Streamlit } from "streamlit-component-lib"

export function Feedback(props) {
    const submitFeedback = (score, text) => {
        Streamlit.setComponentValue({type: props.feedbackType, score, text});
    };

    if (props.feedbackType === "thumbs" && props.optionalTextLabel === null) {
        return (<ThumbsFeedback submitFeedback={submitFeedback} disableWithScore={props.disableWithScore} align={props.align}/>)
    } else if (props.feedbackType === "thumbs" && props.optionalTextLabel !== null && props.maxTextLength === null) {
        return (<ThumbsWithQualiFeedback submitFeedback={submitFeedback} optionalTextLabel={props.optionalTextLabel} disableWithScore={props.disableWithScore} align={props.align}/>)
    } else if (props.feedbackType === "thumbs" && props.optionalTextLabel !== null && props.maxTextLength) {
        return (<ThumbsWithQualiFeedback submitFeedback={submitFeedback} optionalTextLabel={props.optionalTextLabel} maxTextLength={props.maxTextLength}  disableWithScore={props.disableWithScore} align={props.align}/>)
    } else if (props.feedbackType === "faces" && props.optionalTextLabel === null && props.maxTextLength === null) {
        return (<FacesFeedback submitFeedback={submitFeedback} disableWithScore={props.disableWithScore} align={props.align}/>)
    } else if (props.feedbackType === "faces" && props.optionalTextLabel !== null && props.maxTextLength === null) {
        return (<FacesWithQualiFeedback submitFeedback={submitFeedback} optionalTextLabel={props.optionalTextLabel} disableWithScore={props.disableWithScore} align={props.align}/>)
    } else if (props.feedbackType === "faces" && props.optionalTextLabel !== null && props.maxTextLength) {
        return (<FacesWithQualiFeedback submitFeedback={submitFeedback} optionalTextLabel={props.optionalTextLabel} maxTextLength={props.maxTextLength}  disableWithScore={props.disableWithScore} align={props.align}/>)
    } else if (props.feedbackType === "textbox") {
        return (<div />)
    }
}
