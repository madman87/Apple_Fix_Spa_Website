from flask import Flask,jsonify,render_template
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import json
from sendgrid.helpers.mail import ReplyTo
from dotenv import load_dotenv

app = Flask(__name__, static_url_path='/static', static_folder='./static')
app.config.update(
    SECRET_KEY='192b9bdd22ab9ed4d12e236c78afcb9a393ec15f71bbf5dc987d54727823bcbf'
)
load_dotenv()

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/getForm/<data>',methods=['POST', "GET"])
def get_form(data):
    data=json.loads(data)
    sendEmail(data)
    return jsonify(data)

def sendEmail(data):
    subject=data['subject']
    email=data['email']
    message = Mail(
        from_email='appletsx@gmail.com',
        to_emails='appletsx@gmail.com',
        subject=data['firstname']+" "+data['lastname'],
        html_content=f'<h3>{email}<h3><br><strong>{subject}</strong>')

    message.reply_to = ReplyTo(email, email)

    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e.message)

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=3000, debug=True)