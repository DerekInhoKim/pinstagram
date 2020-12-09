from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired


class PostForm(FlaskForm):
    caption = StringField("caption", [DataRequired()])
    content = TextAreaField("content", [DataRequired()])
