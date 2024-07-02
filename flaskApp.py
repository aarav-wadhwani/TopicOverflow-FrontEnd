from flask import Flask, request, send_file
import os

app = Flask(__name__)

@app.route('/generate-pdf', methods=['POST'])
def generate_pdf():
    data = request.form

    course = data.get('course')
    professor = data.get('professor')
    topic = data.getlist('topic')
    years = data.getlist('year')

    # @hemil can you do this, I'm a little unsure on how to use the new client you made.
    """ possible approach:
        - copy all classes that client uses, and the client, into this directory.
        - create a function in the client that takes in the user input as parameters,
          generates a pdf, and returns the path to the output pdf.
    """
    # @hemil once you've done this, let me know and I'll connect the client to this app 
    # and proceed with hosting it. If its more convenient for you, I can shift this to the main repo.


    output_pdf_path = f'{course}-{professor}-{topic}.pdf'

    return send_file(output_pdf_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
