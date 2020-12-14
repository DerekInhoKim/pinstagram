from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want


def seed_users():
    users = [
        User(
            fullname='James Ballard',
            username='YaaaBoiJames',
            email='james@james.com',
            hashed_password="pbkdf2:sha256:150000$cayYFXNj$a4e7c14d1e10f2f90d07516423c20a789dbcb8e976a866e20728264b77b1f0b6",
            about="I am the scrum master 3000",
            profilePicture='https://www.pikpng.com/pngl/m/160-1602919_purple-junimo-stardew-valley-junimo-clipart.png'),
        User(
            fullname='Bart Dorsey',
            username='Bartholomew',
            email='bart@bart.com',
            hashed_password="pbkdf2:sha256:150000$cayYFXNj$a4e7c14d1e10f2f90d07516423c20a789dbcb8e976a866e20728264b77b1f0b6",
            about="I am the all knowing",
            profilePicture='https://i.redd.it/acwc2x1396j21.jpg'),
        User(
            fullname='Sergey',
            username='SergimusPrime',
            email='sergey@sergey.com',
            hashed_password="pbkdf2:sha256:150000$cayYFXNj$a4e7c14d1e10f2f90d07516423c20a789dbcb8e976a866e20728264b77b1f0b6",
            about="I wvant to create many wvebsites!",
            profilePicture='https://dlp2gfjvaz867.cloudfront.net/product_photos/63166479/file_1e85c81e61_original.png'),
        User(
            fullname='Alfredo',
            username='Alfredabest',
            email="alfredo@alfredo.com",
            hashed_password="pbkdf2:sha256:150000$cayYFXNj$a4e7c14d1e10f2f90d07516423c20a789dbcb8e976a866e20728264b77b1f0b6",
            about="Cool a cuucumber",
            profilePicture='https://i.etsystatic.com/9694683/r/il/1d3166/1494829332/il_570xN.1494829332_lak5.jpg'),
        User(
            fullname='Demo User',
            username='Demo',
            email="demo@pinstagram.com",
            hashed_password="pbkdf2:sha256:150000$7Tu6i8SA$7ebf0dfa99e00bf682ba21f83f0daf9811eaacd0c39eb103e143221727da6461",
            about="This is a user for demonstration purposes",
            profilePicture='https://i.redd.it/cosm6mk0jg941.jpg'),
    ]

    db.session.add_all(users)
    db.session.commit()
    return users

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE')
    db.session.commit()
