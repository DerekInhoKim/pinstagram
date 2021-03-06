"""Added createdAt for columns

Revision ID: c29ed6b7f212
Revises: 18d247a95c14
Create Date: 2020-12-10 10:37:57.724499

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c29ed6b7f212'
down_revision = '18d247a95c14'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('comments', sa.Column('createdAt', sa.DateTime(), server_default=sa.text('now()'), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('comments', 'createdAt')
    # ### end Alembic commands ###
