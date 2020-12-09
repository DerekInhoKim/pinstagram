# Establishes a connection with boto to the S3 service for image hosting
import boto3
import botocore
from .config import Config

s3 = boto3.client(
   "s3",
   aws_access_key_id=Config.S3_KEY,
   aws_secret_access_key=Config.S3_SECRET
)
