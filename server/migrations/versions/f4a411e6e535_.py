"""empty message

Revision ID: f4a411e6e535
Revises: 00cabdbd76df
Create Date: 2023-11-25 09:15:41.180490

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f4a411e6e535'
down_revision: Union[str, None] = '00cabdbd76df'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('win_count', sa.Integer(), nullable=True))
    op.create_index(op.f('ix_users_win_count'), 'users', ['win_count'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_users_win_count'), table_name='users')
    op.drop_column('users', 'win_count')
    # ### end Alembic commands ###
