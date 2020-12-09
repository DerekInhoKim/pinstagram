from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


class CommentForm(FlaskForm):
    message = TextAreaField('message', validators=[DataRequired()])
    postId = IntegerField('userId', validators=[DataRequired()])
    userId = IntegerField('userId', validators=[DataRequired()])
