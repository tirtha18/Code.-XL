import nltk
from flask import Flask, request, jsonify
import fitz
import cloudinary
import cloudinary.uploader
import os
import tempfile
from pyresparser import ResumeParser
from groq import Groq
cloudinary.config(
    cloud_name="dwros91m7",
    api_key="491849454768437",
    api_secret="4Tcpaxlq7Q-BOBVWn8fG5XOh_cg",
)
nltk.download('stopwords')
def get_ATS(img_link):
    client = Groq(
        api_key="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")
    completion = client.chat.completions.create(
        model="llama-3.2-11b-vision-preview",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Give an ATS score to this resume Give the score out of 100 and output only the score "
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"{img_link}"
                        }
                    }
                ]
            },
            {
                "role": "assistant",
                "content": ""
            }
        ],
        temperature=0.7,
        max_tokens=5000,
        top_p=1,
        stream=False,
        stop=None,
    )
    return completion.choices[0].message.content

def upload_pdf():
    pdf_file = request.files.get('pdf')
    if not pdf_file:
        return jsonify({"error": "No file provided"}), 400
    with tempfile.TemporaryDirectory() as temp_dir:
        pdf_path = os.path.join(temp_dir, pdf_file.filename)
        pdf_file.save(pdf_path)
        try:
            doc = fitz.open(pdf_path)
            page = doc.load_page(0)
            pix = page.get_pixmap()
            image_path = os.path.join(temp_dir, "converted_image.png")
            pix.save(image_path)
            doc.close()
            upload_result = cloudinary.uploader.upload(image_path, transformation={
                'width': 3000,
                'height': 3000,
                'crop': 'limit'
            })
            resume_desc = get_ATS(upload_result['secure_url'])
            return jsonify({'resume_desc': resume_desc}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
