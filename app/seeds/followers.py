from app.models import db
from app.models.user import followers

# Adds a demo user, you can add other users here if you want


def seed_followers(users):
    # Tables are not callable like Models are
    # To seed data we need to execute an insert into our table
    # execute method takes the table and insert method as it's first parameter,
    # Then we can give it an array of inserts to execute.
    db.session.execute(followers.insert(), [
        {"followerId": users[0].id, "followingId": users[1].id},
        {"followerId": users[1].id, "followingId": users[2].id},
        {"followerId": users[4].id, "followingId": users[2].id}
        ])
    db.session.commit()
    return followers

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_followers():
    db.session.execute('TRUNCATE followers CASCADE')
    db.session.commit()
