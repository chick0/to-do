"""v1

Revision ID: a1c7f32c8813
Revises: 
Create Date: 2022-09-20 15:15:47.208924

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a1c7f32c8813'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('td_user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=128), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('lastlogin', sa.DateTime(), nullable=True),
    sa.Column('email_verified', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('id')
    )
    op.create_table('td_todo',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner', sa.Integer(), nullable=False),
    sa.Column('checked', sa.Boolean(), nullable=False),
    sa.Column('text', sa.Text(length=500), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['owner'], ['td_user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('td_todo')
    op.drop_table('td_user')
    # ### end Alembic commands ###