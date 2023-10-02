import streamlit as st
import openai
import requests
from streamlit_feedback import streamlit_feedback
import datetime

faces_dict = {"😀": 100,
    "🙂": 80,
    "😐": 60,
    "🙁": 40,
    "😞": 20
    }

thumbs_dict = {"👍": 100, "👎": 20}

# TODO
# get and set messages_feedback_dict to cache in each invocation

messages_feedback_dict = {}
feedback = {}

def _submit_feedback(user_response, emoji=None):
    st.toast(f"Feedback submitted", icon=emoji)
    return user_response.update({"datetime_added": datetime.datetime.now()})



def chatbot_thumbs_app(streamlit_feedback, debug=False):

    global feedback
    global messages_feedback_dicts


    st.title("💬 Chatbot")

    # with st.sidebar:
    #     with requests.get("http://chatcrm.org:8990/auth/get-token/") as token_response:
    #         if "access_token" in token_response.json():
    #             openai_api_key = token_response.json()["access_token"]
    #             openai.api_base = "http://chatcrm.org:8990/relay/v1"

    if "messages" not in st.session_state:
        st.session_state["messages"] = [
            {"role": "assistant", "content": "How can I help you?"}
        ]

    messages = st.session_state.messages
    feedback_kwargs = {
        "feedback_type": "thumbs",
        "optional_text_label": "Please provide extra information",
        "on_submit": _submit_feedback,
        "multiline_text": True,
        "max_text_length": 100
    }

    for n, msg in enumerate(messages):
        st.chat_message(msg["role"]).write(msg["content"])

        if msg["role"] == "assistant" and n > 1:
            feedback_key = f"feedback_{int(n/2)}"

            if feedback_key not in st.session_state:
                st.session_state[feedback_key] = None

            disable_with_score = (
                st.session_state[feedback_key].get("score")
                if st.session_state[feedback_key]
                else None
            )
            feedback = streamlit_feedback(
                **feedback_kwargs,
                key=feedback_key,
                disable_with_score=disable_with_score
            )
            print("-====> feedback", feedback)
            if n not in messages_feedback_dict.keys():
                messages_feedback_dict[n] = feedback

    if prompt := st.chat_input(key=1):
        messages.append({"role": "user", "content": prompt})
        st.chat_message("user").write(prompt)

        if debug:
            st.session_state["response"] = "dummy response"

        response = {
        "id": "chatcmpl-84oa1FIbAktayvs7uM1njsZKnznFk",
        "object": "chat.completion",
        "created": 1696158433,
        "model": "gpt-3.5-turbo-0613",
        "choices": [
        {
            "index": 0,
            "message": {
            "role": "assistant",
            "content": "Hello! How can I assist you today?"
            },
            "finish_reason": "stop"
        }
        ],
        "usage": {
        "prompt_tokens": 18,
        "completion_tokens": 9,
        "total_tokens": 27
        }
        }

        print(response["choices"][0]["message"]["content"])
        st.session_state["response"] = response["choices"][0]["message"]["content"]
        with st.chat_message("assistant"):
            messages.append(
                {"role": "assistant", "content": st.session_state["response"]}
            )
            st.write(st.session_state["response"])

        streamlit_feedback(**feedback_kwargs, key=f"feedback_{int(len(messages)/2)}")

    if feedback:
        print("==> received feedback", messages_feedback_dict)
        # messages_feedback_dict[len(messages) - 1] = feedback





chatbot_thumbs_app(streamlit_feedback=streamlit_feedback, debug=False)