"""add new tables for game records

Revision ID: ace720620084
Revises: b8a7246ba407
Create Date: 2023-09-28 20:57:47.644151

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ace720620084'
down_revision: Union[str, None] = 'b8a7246ba407'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
