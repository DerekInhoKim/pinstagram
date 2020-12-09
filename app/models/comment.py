from .db import db


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(255), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    post = db.relationship('Post', back_populates='comments')
    user = db.relationship('User', back_populates='comments')

    def to_dict(self):
        return {
            "id": self.id,
            "message": self.message,

        }

    def to_joined_dict(self):
        return {
            "id": self.id,
            "message": self.message,
            "user": self.user.to_dict()
        }
