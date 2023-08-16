import React, { useState } from "react";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Box } from "@mui/material";

const colors = {
    grey: "#c7d1d3",
    "😀": "#4caf50",
    "🙂": "#6fbf73",
    "😐": "#ff9800",
    "🙁": "#f6685e",
    "😞": "#f44336"
}

const StyledCustomInput = styled(InputBase)(
({ color }) => `
    width: 60vw;
    font-family: sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    padding: 0px 12px;
    border-radius: 8px;
    color: ${color};
    border: 1px solid ${color};
    background: transparent;
    `
);

export function FacesWithQualiFeedback(props) {
    const [submitted, setSubmitted] = useState(false);
    const [inputText, setInputText] = useState(null);
    const [faceScore, setFaceScore] = useState(null);

    const handleFaceClick = (score) => {
        if (score === faceScore) {
            setFaceScore(null);
        } else {
            setFaceScore(score);
        }
    };

    const selectColor = (score) => {
        if (faceScore) {
            if (score === faceScore) {
                return colors[score]
            } else {
                if (score === props.disableWithScore) {
                    return "transparent"
                } else {
                    return colors["grey"]
                }
            }
        } else {
            return colors["grey"]
        }
    }
    
    const selectHoverColor = (score) => {
        if (faceScore) {
            if (score === faceScore) {
                return colors[score]
            } else {
                if (score === props.disableWithScore) {
                    return "transparent"
                } else {
                    return colors[score]
                }
            }
        } else {
            return colors[score]
        }
    }

    const handleTextInput = (text) => {
        setInputText(text.currentTarget.value);
    };

    const handleSubmission = () => {
        props.submitFeedback(faceScore, inputText);
    };

    return (
        <Box paddingY={0.5}>
            <Stack direction="row" spacing={1} justifyContent={props.align}>
                <SentimentVeryDissatisfiedIcon
                sx={{
                    fontSize: 28,
                    color: selectColor("😞"),
                    '&:hover': {
                        cursor: submitted ? null : "pointer",
                        color: selectHoverColor("😞"),
                    }, }}
                onClick={() => submitted ? {} : handleFaceClick("😞")}
                />
                <SentimentDissatisfiedIcon
                sx={{
                    fontSize: 28,
                    color: selectColor("🙁"),
                    '&:hover': {
                        cursor: submitted ? null : "pointer",
                        color: selectHoverColor("🙁"),
                    }, }}
                onClick={() => submitted ? {} : handleFaceClick("🙁")}
                />
                <SentimentNeutralIcon
                sx={{
                    fontSize: 28,
                    color: selectColor("😐"),
                    '&:hover': {
                        cursor: submitted ? null : "pointer",
                        color: selectHoverColor("😐"),
                    }, }}
                onClick={() => submitted ? {} : handleFaceClick("😐")}
                />
                <SentimentSatisfiedIcon
                sx={{
                    fontSize: 28,
                    color: selectColor("🙂"),
                    '&:hover': {
                        cursor: submitted ? null : "pointer",
                        color: selectHoverColor("🙂"),
                    }, }}
                onClick={() => submitted ? {} : handleFaceClick("🙂")}
                />
                <SentimentSatisfiedAltIcon
                sx={{
                    fontSize: 28,
                    color: selectColor("😀"),
                    '&:hover': {
                        cursor: submitted ? null : "pointer",
                        color: selectHoverColor("😀"),
                    }, }}
                onClick={() => submitted ? {} : handleFaceClick("😀")}
                />
                {submitted === false && faceScore !== null ? <StyledCustomInput onChange={handleTextInput} aria-label="Demo input" placeholder={props.optionalTextLabel} color={colors[faceScore]}/> : null}
                {submitted === false && faceScore !== null ? <Button sx={{color: colors[faceScore]}} variant="text" size="small" onClick={handleSubmission}>Submit</Button> : null}
            </Stack>
        </Box>
        )
    }
