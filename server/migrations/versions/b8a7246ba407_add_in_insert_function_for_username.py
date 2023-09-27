"""add in insert function for username

Revision ID: b8a7246ba407
Revises: f89874d8a39f
Create Date: 2023-09-25 21:42:56.470383

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b8a7246ba407'
down_revision: Union[str, None] = 'f89874d8a39f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
