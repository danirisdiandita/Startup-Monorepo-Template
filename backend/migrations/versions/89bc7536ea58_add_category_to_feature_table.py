"""add category to feature table

Revision ID: 89bc7536ea58
Revises: 46e431f7e866
Create Date: 2024-09-10 05:01:40.098610

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = '89bc7536ea58'
down_revision: Union[str, None] = '46e431f7e866'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('features', sa.Column('category', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('features', 'category')
    # ### end Alembic commands ###
