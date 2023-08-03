import os
import streamlit.components.v1 as components

# Create a _RELEASE constant. We'll set this to False while we're developing
# the component, and True when we're ready to package and distribute it.
# (This is, of course, optional - there are innumerable ways to manage your
# release process.)
_RELEASE = False

if not _RELEASE:
    _component_func = components.declare_component("streamlit_feedback", url="http://localhost:3001")
else:
    # When we're distributing a production version of the component, we'll
    # replace the `url` param with `path`, and point it to to the component's
    # build directory:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("streamlit_feedback", path=build_dir)


def streamlit_feedback(feedback_type, optional_text_label=None, align="flex-end", key=None):
    """Create a new instance of "streamlit_feedback".

    Parameters
    ----------
    feedback_type: str
        The type of feedback ["thumbs", "faces"]
    optional_text_label: str or None
        An optional label to add as a placeholder to the textbox.
        If None, the "thumbs" or "faces" will not be accompanied by textual feedback.
    align: str
        Where to align the feedback component ["flex-end", "center", "flex-start"]
    key: str or None
        An optional key that uniquely identifies this component. If this is
        None, and the component's arguments are changed, the component will
        be re-mounted in the Streamlit frontend and lose its current state.

    Returns
    -------
    dict
        The user response, with the feedback_type, score and text fields.

    """

    if feedback_type not in ["thumbs", "faces"]:
        raise NotImplementedError(f"feedback_type='{feedback_type}' not implemented. Please select either 'thumbs' or 'faces'.")
    if align not in ["flex-end", "center", "flex-start"]:
        raise NotImplementedError(f"align='{align}' not implemented. Please select either 'flex-end', 'center' or 'flex-start'.")

    # "default" is a special argument that specifies the initial return
    # value of the component before the user has interacted with it.
    component_value = _component_func(feedback_type=feedback_type, optional_text_label=optional_text_label, align=align, key=key, default=None)

    return component_value

if not _RELEASE:
    import openai
    import streamlit as st

    with st.sidebar:
        openai_api_key = st.text_input("OpenAI API Key", key="chatbot_api_key", type="password", value=st.secrets.get("OPENAI_API_KEY"))

    st.title("💬 Chatbot")
    if "messages" not in st.session_state:
        st.session_state["messages"] = [
            {"role": "assistant", "content": "How can I help you?"},
            {"role": "user", "content": "Tell me a joke"},
            {"role": "assistant", "content": "Why did the chicken cross the road? To get to the other side!"},
        ]

    if prompt := st.chat_input():
        if not openai_api_key:
            st.info("Please add your OpenAI API key to continue.")
            st.stop()

        openai.api_key = openai_api_key
        st.session_state.messages.append({"role": "user", "content": prompt})
        st.chat_message("user").write(prompt)
        response = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=st.session_state.messages)
        msg = response.choices[0].message
        st.session_state.messages.append(msg)

    for n, msg in enumerate(st.session_state.messages):
        st.chat_message(msg["role"]).write(msg["content"])

        if msg["role"] == "assistant" and msg["content"] != "How can I help you?":
            feedback = streamlit_feedback(
                feedback_type="faces", optional_text_label='None', align="flex-end", key=n
            )
            if feedback:
                st.write(feedback)
