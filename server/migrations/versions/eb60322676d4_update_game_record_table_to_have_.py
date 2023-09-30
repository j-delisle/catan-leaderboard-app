"""update game_record table to have predefined options for expansion played

Revision ID: eb60322676d4
Revises: 73fd40bd3710
Create Date: 2023-09-29 21:02:50.706487

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'eb60322676d4'
down_revision: Union[str, None] = '73fd40bd3710'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
