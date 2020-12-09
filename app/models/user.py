from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# followerId is the id of the user that is the follower
# followeringId is the user that is being followed
followers = db.Table('followers',
    db.Model.metadata,
    db.Column('followerId', db.Integer,
              db.ForeignKey('users.id'), primary_key=True),
    db.Column('followingId', db.Integer,
              db.ForeignKey('users.id'), primary_key=True),
    db.UniqueConstraint('followerId', 'followingId', name='uniqueIdx')
    )

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    about = db.Column(db.String(255))
    profilePicture = db.Column(db.String(225))

    posts = db.relationship('Post', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')
    likes = db.relationship('Like', back_populates='user')
    following = db.relationship(
        'User', followers,
        # .c is a collection of the individual column with that name
        primaryjoin=followers.c.followerId == id,
        secondaryjoin=followers.c.followingId == id,
        # Followed by backref is how to access the following id
        backref='followed_by'
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "fullname": self.fullname,
            "username": self.username,
            "email": self.email,
            "about": self.about,
            "profilePicture": self.profilePicture
        }

    def to_follow_dict(self):
        return {
            "id": self.id,
            "fullname": self.fullname,
            "username": self.username,
            "email": self.email,
            "about": self.about,
            "profilePicture": self.profilePicture,
            "followers": [user.to_dict() for user in self.followed_by],
            "following": [user.to_dict() for user in self.following],
        }


    # to_joined_dict only keeps track of posts. Adjust accordingly
    def to_joined_dict(self):
        return {
            "id": self.id,
            "fullname": self.fullname,
            "username": self.username,
            "email": self.email,
            "about": self.about,
            "profilePicture": self.profilePicture,
            "posts": [post.to_dict() for post in self.posts]
        }
