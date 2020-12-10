from flask import Blueprint, request
from sqlalchemy.exc import IntegrityError
from app.models import db, Comment, User
from app.forms import CommentForm

comments_route = Blueprint('comments', __name__)


@comments_route.route('/create', methods=['POST'])
def createComment():
    form = CommentForm()

    # Form cannot validate without csrf_token
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            message=form.data['message'],
            postId=form.data['postId'],
            userId=form.data['userId']
        )
        db.session.add(comment)
        db.session.commit()
        return {'comment': comment.to_dict()}
    else:
        return {'error': 'Form not valid'}, 404


@comments_route.route('/post/<int:postId>', methods=['GET'])
def getComments(postId):
    comments = Comment.query.join(User).filter(Comment.postId == postId).order_by(Comment.createdAt.desc()).all()
    return {'comments': [comment.to_joined_dict() for comment in comments]}
