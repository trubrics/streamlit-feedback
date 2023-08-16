def chatbot_thumbs_app(streamlit_feedback, debug=False):
    import openai
    import streamlit as st

    with st.sidebar:
        openai_api_key = st.text_input(
            "OpenAI API Key",
            key="chatbot_api_key",
            type="password",
            value=st.secrets.get("OPENAI_API_KEY"),
        )

    st.title("💬 Chatbot")
    if "messages" not in st.session_state:
        st.session_state["messages"] = [
            {"role": "assistant", "content": "How can I help you?"}
        ]

    messages = st.session_state.messages

    for n, msg in enumerate(messages):
        st.chat_message(msg["role"]).write(msg["content"])

        if msg["role"] == "assistant" and n > 1:
            feedback_key = f"feedback_{n+1}"

            feedback = streamlit_feedback(
                feedback_type="thumbs",
                key=feedback_key,
                disable_with_score=st.session_state[feedback_key].get("score")
                if st.session_state[feedback_key]
                else None,
            )

            if feedback:
                st.write(feedback)

    if prompt := st.chat_input():
        messages.append({"role": "user", "content": prompt})
        st.chat_message("user").write(prompt)

        if not openai_api_key:
            st.info("Please add your OpenAI API key to continue.")
            st.stop()
        else:
            openai.api_key = openai_api_key
        if debug:
            st.session_state["response"] = "dummy response"
        else:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo", messages=messages
            )
            st.session_state["response"] = response.choices[0].message.content
        with st.chat_message("assistant"):
            messages.append(
                {"role": "assistant", "content": st.session_state["response"]}
            )
            st.write(st.session_state["response"])

            streamlit_feedback(feedback_type="thumbs", key=f"feedback_{len(messages)}")


def single_prediction_faces_app(streamlit_feedback):
    import openai
    import streamlit as st

    st.title("LLM User Feedback with Trubrics")

    if "response" not in st.session_state:
        st.session_state["response"] = ""

    with st.sidebar:
        openai_api_key = st.text_input(
            "OpenAI API Key",
            key="chatbot_api_key",
            type="password",
            value=st.secrets.get("OPENAI_API_KEY"),
        )

    if not openai_api_key:
        st.info("Please add your OpenAI API key to continue.")
        st.stop()
    else:
        openai.api_key = openai_api_key

    prompt = st.text_area(
        label="Prompt",
        label_visibility="collapsed",
        placeholder="What would you like to know?",
    )
    button = st.button(f"Ask text-davinci-002")

    feedback_key = "feedback"
    if feedback_key not in st.session_state:
        st.session_state[feedback_key] = None

    if button:
        st.session_state["response"] = openai.Completion.create(
            model="text-davinci-002", prompt=prompt, temperature=0.5, max_tokens=200
        )
        st.session_state[feedback_key] = None  # reset feedback

    if st.session_state["response"]:
        response_text = st.session_state["response"].choices[0].text.replace("\n", "")
        st.markdown(f"#### :violet[{response_text}]")

        feedback = streamlit_feedback(
            feedback_type="thumbs",
            key=feedback_key,
            disable_with_score=st.session_state[feedback_key].get("score")
            if st.session_state[feedback_key]
            else None,
            align="flex-start",
        )
        if feedback:
            st.write(feedback)


def basic_app(streamlit_feedback):
    import streamlit as st

    if "feedback_score" not in st.session_state:
        st.session_state["feedback_score"] = None

    feedback = streamlit_feedback(
        feedback_type="faces",
        optional_text_label="hello",
        disable_with_score=st.session_state["feedback_score"]["score"]
        if st.session_state["feedback_score"]
        else None,
    )
    if feedback:
        st.session_state["feedback_score"] = feedback
        st.experimental_rerun()

    if st.session_state["feedback_score"]:
        st.write(st.session_state["feedback_score"])

    if st.button("reset feedback"):
        st.session_state["feedback_score"] = None
        st.experimental_rerun()
