# streamlit-feedback

Streamlit component that allows you to collect user feedback in your apps

## Install

```sh
pip install streamlit-feedback
```

## Usage

For a full example integrated in a chatbot, scroll down to the bottom of [this script](streamlit_feedback/__init__.py).

Or here are some examples:

```python
from streamlit_feedback import streamlit_feedback
feedback = streamlit_feedback(feedback_type="thumbs")
feedback
```

<img src="./assets/thumbs.png"  width="600">

---

```python
from streamlit_feedback import streamlit_feedback
feedback = streamlit_feedback(
    feedback_type="thumbs",
    optional_text_label="[Optional] Please provide an explanation",
)
feedback
```

<img src="./assets/thumbsandtext.png"  width="600">

---

```python
from streamlit_feedback import streamlit_feedback
feedback = streamlit_feedback(feedback_type="faces")
feedback
```

<img src="./assets/faces.png"  width="600">

---

```python
from streamlit_feedback import streamlit_feedback
feedback = streamlit_feedback(
    feedback_type="faces",
    optional_text_label="[Optional] Please provide an explanation",
)
feedback
```

<img src="./assets/facesandtext.png"  width="600">

---

```python
from streamlit_feedback import streamlit_feedback
feedback = streamlit_feedback(feedback_type="thumbs", align="flex-start")
feedback
```

<img src="./assets/thumbsstart.png"  width="600">
