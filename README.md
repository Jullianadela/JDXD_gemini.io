# JDXD_gemini
PalmettoHackathon project #1

## Digital Safety Helper

The command-line chatbot offers multilingual, step-by-step cybersecurity
education. It is not a substitute for professional, emergency, or legal advice
and does not guarantee that a message or account is safe.

Install the dependencies and run the chatbot with Python:

```powershell
pip install google-genai python-dotenv
python TestFile
```

To open the small desktop chat window instead, run:

```powershell
python TestFile --gui
```

The desktop window uses Python's built-in Tkinter and the same Gemini safety
instructions as the terminal chatbot.

To run the website with the live Gemini chat, start its local backend:

```powershell
python TestFile --web
```

Then open <http://127.0.0.1:8000>. Keep the backend running while using the
website; the Gemini API key stays on the backend and is never sent to the
browser.

Set `AKEY` in the ignored `.env` file. You can also add any real business
resource URLs there; the chatbot only shares links that are configured:

```dotenv
AKEY=your_gemini_api_key
DISCORD_WEBHOOK_URL=your_private_support_channel_webhook
ENGLISH_GUIDE_URL=
SPANISH_GUIDE_URL=
WORKSHOPS_URL=
ONE_ON_ONE_SUPPORT_URL=
```

Enter `contact` in the chatbot to send a support request to the configured
Discord channel. The user is told what will be sent and must confirm first.
Staff follow up manually using the optional reply email; Discord incoming
webhooks cannot receive messages or deliver replies back into this chat.

Keep both API keys and the webhook URL private. For a website or mobile app,
send requests through a backend so these secrets are not exposed to users.
