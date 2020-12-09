from flask import Blueprint, request, Flask
from werkzeug.utils import secure_filename
from app.helpers import *
from app.config import Config

s3_routes = Blueprint('s3', __name__)


@s3_routes.route('/upload', methods=['POST'])
def upload_file():
    # file is being properly set.
    # Unable to locate credentials error, unsure why credentials would be set up poorly
    # Generate new keys and secret to use and try again.
    print("request,", request.files['file'])
    # if "user_file" not in request.files:
    #     return print("No user_file key in request.files"), 400

    file = request.files['file']
    print('fileHere', file)
    """
        These attributes are also available

        file.filename               # The actual name of the file
        file.content_type
        file.content_length
        file.mimetype

    """
    if file.filename == "":
        return print("please select a file"), 400

    if file:
        file.filename = secure_filename(file.filename)
        # When passing in the string of the name of the bucket the upload file runs into the credentials error
        # However when passing in Config.S3_BUCKET we get an error that says it expects a string
        output = upload_file_to_s3(file, 'aa-pinstagram')
        print(output)
        return {"output": str(output)}

    else:
        return print("something wrong"), 400


def upload_file_to_s3(file, bucket_name, acl="public-read"):

    """
    Docs: http://boto3.readthedocs.io/en/latest/guide/s3.html
    """

    try:

        s3.upload_fileobj(
            file,
            bucket_name,
            # For testing purposes because the passed in file does not have a key filename
            file.filename,
            ExtraArgs={
                "ACL": acl,
                # For testing purposes because passed in file does not have a kay content_type
                "ContentType": file.content_type
                # "ContentType": 'image/jpeg'
            }
        )

    except Exception as e:
        # Error recieved Fileobj must implement read
        print("Something Happened: ", e)
        return e, 400

    return "{}{}".format(Config.S3_LOCATION, file.filename)


@s3_routes.route('/uploadz', methods=['POST'])
def test():
    return {'working': 'hehe'}
