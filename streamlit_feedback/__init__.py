import os

import streamlit.components.v1 as components

# Create a _RELEASE constant. We'll set this to False while we're developing
# the component, and True when we're ready to package and distribute it.
# (This is, of course, optional - there are innumerable ways to manage your
# release process.)
_RELEASE = False

if not _RELEASE:
    _component_func = components.declare_component(
        "streamlit_feedback", url="http://localhost:3001"
    )
else:
    # When we're distributing a production version of the component, we'll
    # replace the `url` param with `path`, and point it to to the component's
    # build directory:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("streamlit_feedback", path=build_dir)


def streamlit_feedback(
    feedback_type,
    optional_text_label=None,
    align="flex-end",
    disable_with_score=None,
    key=None,
):
    """Create a new instance of "streamlit_feedback".

    Parameters
    ----------
    feedback_type: str
        The type of feedback; "thumbs" or "faces".
    optional_text_label: str or None
        An optional label to add as a placeholder to the textbox.
        If None, the "thumbs" or "faces" will not be accompanied by textual feedback.
    align: str
        Where to align the feedback component; "flex-end", "center" or "flex-start".
    disable_with_score:
        Feed this variable in to disable the component with a given score (must be thumbs or faces emoji).
    key: str or None
        An optional key that uniquely identifies this component. If this is
        None, and the component's arguments are changed, the component will
        be re-mounted in the Streamlit frontend and lose its current state.

    Returns
    -------
    dict
        The user response, with the feedback_type, score and text fields.

    """

    if feedback_type == "thumbs":
        possible_thumbs = ["👍", "👎"]
        if disable_with_score not in [None] + possible_thumbs:
            raise ValueError(
                f"disable_with_score={disable_with_score} not recognised. Please only"
                f" feed {possible_thumbs}."
            )
    elif feedback_type == "faces":
        possible_faces = ["😞", "🙁", "😐", "🙂", "😀"]
        if disable_with_score not in [None] + possible_faces:
            raise ValueError(
                f"disable_with_score={disable_with_score} not recognised. Please only"
                f" feed {possible_faces}."
            )
    else:
        raise NotImplementedError(
            f"feedback_type='{feedback_type}' not implemented. Please select either"
            " 'thumbs' or 'faces'."
        )
    if align not in ["flex-end", "center", "flex-start"]:
        raise NotImplementedError(
            f"align='{align}' not implemented. Please select either 'flex-end',"
            " 'center' or 'flex-start'."
        )

    # "default" is a special argument that specifies the initial return
    # value of the component before the user has interacted with it.
    component_value = _component_func(
        feedback_type=feedback_type,
        optional_text_label=optional_text_label,
        align=align,
        key=key,
        disable_with_score=disable_with_score,
        default=None,
    )

    return component_value


# example chatbot app with user feedback
if not _RELEASE:
    from examples import basic_app, chatbot_thumbs_app, single_prediction_faces_app

    # chatbot_thumbs_app(streamlit_feedback=streamlit_feedback, debug=True)
    # single_prediction_faces_app(streamlit_feedback)
    basic_app(streamlit_feedback)
