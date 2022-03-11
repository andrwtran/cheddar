"""empty message

Revision ID: eaefefd80de5
Revises: f00f5e225cb9
Create Date: 2022-03-10 21:55:12.610376

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eaefefd80de5'
down_revision = 'f00f5e225cb9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_transactions_trans_payee', table_name='transactions')
    op.create_index('trans_index', 'transactions', ['trans_payee'], unique=False, postgresql_using='hash')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('trans_index', table_name='transactions', postgresql_using='hash')
    op.create_index('ix_transactions_trans_payee', 'transactions', ['trans_payee'], unique=False)
    # ### end Alembic commands ###
