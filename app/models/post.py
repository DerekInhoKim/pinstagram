from .db import db


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.String(255))
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    createdAt = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="post")
    likes = db.relationship("Like", back_populates="post")

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "caption": self.caption,
            "createdAt": self.createdAt
        }

    # to_joined_dict method returns an dictionary with the joined tables information appended.
    def to_user_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "caption": self.caption,
            "createdAt": self.createdAt,
            "user": self.user.to_dict()
        }

    def to_joined_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "caption": self.caption,
            "createdAt": self.createdAt,
            "user": self.user.to_dict(),
            "comments": [comment.to_dict() for comment in self.comments],
            # Based on the design of our likes table
            # likes will currently only return the postId and userId for a
            "likes": [like.to_dict() for like in likes]
        }
