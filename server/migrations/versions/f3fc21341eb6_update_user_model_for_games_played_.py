"""update User model for games played count and win percentage

Revision ID: f3fc21341eb6
Revises: 966168000886
Create Date: 2023-11-25 16:52:57.036369

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f3fc21341eb6'
down_revision: Union[str, None] = '966168000886'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('games_played', sa.Integer(), nullable=True))
    op.add_column('users', sa.Column('win_percent', sa.Float(), nullable=True))
    op.create_index(op.f('ix_users_games_played'), 'users', ['games_played'], unique=False)
    op.create_index(op.f('ix_users_win_percent'), 'users', ['win_percent'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_users_win_percent'), table_name='users')
    op.drop_index(op.f('ix_users_games_played'), table_name='users')
    op.drop_column('users', 'win_percent')
    op.drop_column('users', 'games_played')
    # ### end Alembic commands ###
