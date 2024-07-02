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

    #call db client here

    output_pdf_path = f'{course}-{professor}-{topic}.pdf'

    return send_file(output_pdf_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
