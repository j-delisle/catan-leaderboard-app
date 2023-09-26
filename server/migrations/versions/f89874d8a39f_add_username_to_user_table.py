"""add username to user table

Revision ID: f89874d8a39f
Revises: 59853bc3da36
Create Date: 2023-09-25 19:58:12.248901

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f89874d8a39f'
down_revision: Union[str, None] = '59853bc3da36'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
