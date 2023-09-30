"""remove intermediate table and use one game record table connected to User table

Revision ID: 73fd40bd3710
Revises: ace720620084
Create Date: 2023-09-29 20:25:13.470141

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '73fd40bd3710'
down_revision: Union[str, None] = 'ace720620084'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
