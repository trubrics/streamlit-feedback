import React, { useState } from "react";
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Stack from '@mui/material/Stack';

const colors = {
    colorGrey: "#c7d1d3",
    colorUp: "#4caf50",
    colorDown: "#f44336"
}

export function ThumbsFeedback(props) {
    const thumbScore = props.disableWithScore;

    let thumbUpColor = colors["colorGrey"];
    let thumbHoverUpColor = colors["colorUp"];
    let thumbDownColor = colors["colorGrey"];
    let thumbHoverDownColor = colors["colorDown"];
    if (thumbScore) {
        thumbUpColor = thumbScore === "👍" ? colors["colorUp"] : "transparent"
        thumbHoverUpColor = thumbScore === "👍" ? colors["colorUp"] : "transparent"
        thumbDownColor = thumbScore === "👎" ? colors["colorDown"] : "transparent"
        thumbHoverDownColor = thumbScore === "👎" ? colors["colorDown"] : "transparent"
    }

    const handleThumbClick = (score) => {
        props.submitFeedback(score, null);
    };

    return (
        <Stack direction="row" spacing={1} justifyContent={props.align}>
            <ThumbUpOffAltIcon
            sx={{
                fontSize: 28,
                color: thumbUpColor,
                '&:hover': {
                    cursor: thumbScore !== null ? null : "pointer",
                    color: thumbHoverUpColor,
                }, }}
            onClick={() => thumbScore !== null ? {} : handleThumbClick("👍")}
            />
            <ThumbDownOffAltIcon
            sx={{
                fontSize: 28,
                color: thumbDownColor,
                '&:hover': {
                    cursor: thumbScore !== null ? null : "pointer",
                    color: thumbHoverDownColor,
            }, }}
            onClick={() => thumbScore !== null ? {} : handleThumbClick("👎")}
            />
        </Stack>
    )
}
