from flask import Blueprint
from app.models import Post, User, db
from app.models.user import followers

follow_routes = Blueprint('follow', __name__)


# This route will return all posts for users that a user is following
@follow_routes.route('/<int:id>/posts', methods=['GET'])
def followingPosts(id):
    posts = Post.query.join(User).join(followers,
                                       (followers.c.followingId == Post.userId)).filter(
                                    followers.c.followerId == id).order_by(
                                    Post.createdAt.desc()).all()
    return {'posts': [post.to_user_dict() for post in posts]}


# This route will determine if a user is following another user
@follow_routes.route('/<int:followerId>/following/<int:followingId>',
                     methods=['GET'])
def followingUser(followerId, followingId):
    following = db.session.query(followers).filter(followers.c.followerId == followerId).filter(followers.c.followingId == followingId).all()
    if len(following) != 0:
        return {'following': True}
    else:
        return {'following': False}

@follow_routes.route('/<int:userId>/following', methods=['GET'])
def getFollowing(userId):
    allFollowing = db.session.query(followers).filter(followers.c.followerId == userId).all()
    return {'follow': allFollowing}

@follow_routes.route('/<int:userId>/followers', methods=['GET'])
def getFollowers(userId):
    allFollowers = db.session.query(followers).filter(followers.c.followingId == userId).all()
    return {'follow': allFollowers}
