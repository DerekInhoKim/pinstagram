from app.models import db, Post

# Adds a demo user, you can add other users here if you want


def seed_posts(users):
    posts = [
        Post(
            content="https://aa-reddit-clone-images.s3.amazonaws.com/pups.jpeg",
            caption="Two doggos",
            userId=users[0].id),
        Post(
            content="https://aa-reddit-clone-images.s3.amazonaws.com/pikachu_hat.jpg",
            caption="Pikachu w a hat",
            userId=users[1].id),
        Post(
            content="https://aa-reddit-clone-images.s3.amazonaws.com/pets.jpg",
            caption="Fwower Pupper",
            userId=users[2].id),
        Post(
            content="https://aa-reddit-clone-images.s3.amazonaws.com/wholesome.png",
            caption="hehehe c:",
            userId=users[3].id),
        Post(
            content="https://aa-reddit-clone-images.s3.amazonaws.com/salad.jpg",
            caption="salad",
            userId=users[4].id),
    ]

    db.session.add_all(posts)
    db.session.commit()
    return posts

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE')
    db.session.commit()
