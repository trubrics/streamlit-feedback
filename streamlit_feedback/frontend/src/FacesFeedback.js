import React, { useState } from "react";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Stack from '@mui/material/Stack';

const colors = {
    grey: "#c7d1d3",
    "😀": "#4caf50",
    "🙂": "#6fbf73",
    "😐": "#ff9800",
    "🙁": "#f6685e",
    "😞": "#f44336"
}

export function FacesFeedback(props) {
    const [faceScore, setFaceScore] = useState(null);

    const handleFaceClick = (score) => {
        setFaceScore(score);
        props.submitFeedback(score, null);
    };

    const selectColor = (score) => {
        if (faceScore) {
            if (score === faceScore) {
                return colors[score]
            } else {
                return "transparent"
            }
        } else {
            return "grey"
        }
    }

    const selectHoverColor = (score) => {
        if (faceScore) {
            if (score === faceScore) {
                return colors[score]
            } else {
                return "transparent"
            }
        } else {
            return colors[score]
        }
    }

    return (
        <Stack direction="row" spacing={1} justifyContent={props.align}>
            <SentimentVeryDissatisfiedIcon
            sx={{
                fontSize: 28,
                color: selectColor("😞"),
                '&:hover': {
                    cursor: faceScore !== null ? null : "pointer",
                    color: selectHoverColor("😞"),
                }, }}
            onClick={() => faceScore !== null ? {} : handleFaceClick("😞")}
            />
            <SentimentDissatisfiedIcon
            sx={{
                fontSize: 28,
                color: selectColor("🙁"),
                '&:hover': {
                    cursor: faceScore !== null ? null : "pointer",
                    color: selectHoverColor("🙁"),
                }, }}
            onClick={() => faceScore !== null ? {} : handleFaceClick("🙁")}
            />
            <SentimentNeutralIcon
            sx={{
                fontSize: 28,
                color: selectColor("😐"),
                '&:hover': {
                    cursor: faceScore !== null ? null : "pointer",
                    color: selectHoverColor("😐"),
                }, }}
            onClick={() => faceScore !== null ? {} : handleFaceClick("😐")}
            />
            <SentimentSatisfiedIcon
            sx={{
                fontSize: 28,
                color: selectColor("🙂"),
                '&:hover': {
                    cursor: faceScore !== null ? null : "pointer",
                    color: selectHoverColor("🙂"),
                }, }}
            onClick={() => faceScore !== null ? {} : handleFaceClick("🙂")}
            />
            <SentimentSatisfiedAltIcon
            sx={{
                fontSize: 28,
                color: selectColor("😀"),
                '&:hover': {
                    cursor: faceScore !== null ? null : "pointer",
                    color: selectHoverColor("😀"),
                }, }}
            onClick={() => faceScore !== null ? {} : handleFaceClick("😀")}
            />
        </Stack>
    )
}
