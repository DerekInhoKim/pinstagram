from .db import db


class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    postId = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    __table_args__ = (db.UniqueConstraint('postId', 'userId', name='unique'), )

    post = db.relationship("Post", back_populates="likes")
    user = db.relationship("User", back_populates="likes")

    def to_dict(self):
        return {
            "id": self.id
        }

    def to_joined_dict(self):
        return {
            "id": self.id,
            "post": self.post.to_dict(),
            "user": self.user.to_dict()
        }
