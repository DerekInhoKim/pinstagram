from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>', methods=['GET'])
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# Route will return all followers/following for a user
@user_routes.route('/follow/<int:id>', methods=['GET'])
@login_required
def follow(id):
    user = User.query.get(id)
    return user.to_follow_dict()


@user_routes.route('/profilePicture', methods=['PUT'])
def profilePicture():
    req_data = request.get_json()
    user = User.query.get(current_user.id)
    user.profilePicture = req_data['profilePicture']
    db.session.commit()
    return {'user': user.to_dict()}
