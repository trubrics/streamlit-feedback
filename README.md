# streamlit-feedback

Streamlit component that allows you to collect user feedback in your apps

## Installation instructions

```sh
pip install streamlit-feedback
```

## Usage instructions

```python
from streamlit_feedback import streamlit_feedback

value = streamlit_feedback(
    feedback_type="thumbs",
    optional_text_label="[Optional] Please provide an explanation",
)

value
```
