import React, { useState } from "react";
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Stack from '@mui/material/Stack';

const colors = {
    colorGrey: "#c7d1d3",
    colorUp: "green",
    colorDown: "red"
}

export function ThumbsFeedback(props) {
    const [thumbScore, setThumbScore] = useState(null);

    let thumbUpColor = colors["colorGrey"];
    let thumbHoverUpColor = colors["colorUp"];
    let thumbDownColor = colors["colorGrey"];
    let thumbHoverDownColor = colors["colorDown"];
    if (thumbScore) {
        thumbUpColor = thumbScore === "up" ? colors["colorUp"] : "transparent"
        thumbHoverUpColor = thumbScore === "up" ? colors["colorUp"] : "transparent"
        thumbDownColor = thumbScore === "down" ? colors["colorDown"] : "transparent"
        thumbHoverDownColor = thumbScore === "down" ? colors["colorDown"] : "transparent"
    }

    const handleThumbClick = (score) => {
        setThumbScore(score);
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
            onClick={() => thumbScore !== null ? {} : handleThumbClick("up")}
            />
            <ThumbDownOffAltIcon
            sx={{
                fontSize: 28,
                color: thumbDownColor,
                '&:hover': {
                    cursor: thumbScore !== null ? null : "pointer",
                    color: thumbHoverDownColor,
            }, }}
            onClick={() => thumbScore !== null ? {} : handleThumbClick("down")}
            />
        </Stack>
    )
}
