from flask import Blueprint, request
from app.forms import PostForm
from app.models import db, Post, User, Like
from sqlalchemy.exc import IntegrityError
from flask_login import login_required, current_user

post_routes = Blueprint('posts', __name__)

# Returns a single post
@post_routes.route('/<int:postId>', methods=['GET'])
def getPost(postId):
    post = Post.query.join(User).filter(Post.id == postId).one()
    return {'post': post.to_user_dict()}

# Returns all posts for a user
@post_routes.route('/user/<int:userId>', methods=['GET'])
def getPosts(userId):
    posts = Post.query.filter(Post.userId == userId).all()
    return {'posts': [post.to_dict() for post in posts]}

@post_routes.route('/user/<int:userId>/pinned', methods=['GET'])
def getPinnedPosts(userId):
    posts = Post.query.join(Like).filter(Like.userId == userId).all()
    return {'posts': [post.to_dict() for post in posts]}

# Creation of a post
@post_routes.route('/create', methods=['POST'])
@login_required
def createPost():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form:
        try:
            post = Post(
                userId=current_user.id,
                content=form.data['content'],
                caption=form.data['caption']
            )
            db.session.add(post)
            db.session.commit()
            return post.to_dict()
        except IntegrityError:
            return {"error": "new error"}
