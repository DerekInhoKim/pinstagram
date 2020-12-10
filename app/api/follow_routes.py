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


# This route will return all posts that a user is not following
@follow_routes.route('/<int:id>/unfollowed/posts', methods=['GET'])
def notFollowingPosts(id):
    users = User.query.get(id)
    # followingUsers is a list of users that user is following
    followingUsers = [following.id for following in users.following]
    # This query filters to find Posts where the userId is NOT in followingUsers, and is not the user themselves
    posts = Post.query.join(User).filter(~Post.userId.in_(followingUsers)).filter(Post.userId != id).all()
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


# follower is the user that is the follower
# following is the user that is being followed
# This route will add or remove a follower
@follow_routes.route('/<int:followerId>/follow/<int:followingId>', methods=['POST'])
def followRoute(followerId, followingId):
    # Following and follwerIds are switched. Fix this
    followings = User.query.get(followerId)
    follower = User.query.get(followingId)


    if follower in followings.following:
        followings.following.remove(follower)
        db.session.commit()
        return {'isFollowing': False}

    else:
        followings.following.append(follower)
        db.session.commit()
        return {'isFollowing': True}
    return {'errors': 'something went wrong'}



@follow_routes.route('/<int:userId>/following', methods=['GET'])
def getFollowing(userId):
    allFollowing = db.session.query(followers).filter(followers.c.followerId == userId).all()
    return {'follow': allFollowing}

@follow_routes.route('/<int:userId>/followers', methods=['GET'])
def getFollowers(userId):
    allFollowers = db.session.query(followers).filter(followers.c.followingId == userId).all()
    return {'follow': allFollowers}
