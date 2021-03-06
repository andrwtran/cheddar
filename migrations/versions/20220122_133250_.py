"""empty message

Revision ID: b991d046d30f
Revises: ffdc0a98111c
Create Date: 2022-01-22 13:32:50.550596

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b991d046d30f'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('category_name', sa.String(length=40), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('category_name')
    )
    op.create_table('accounts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('account_name', sa.String(length=40), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('account_name')
    )
    op.create_table('budgets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('budget_name', sa.String(length=40), nullable=False),
    sa.Column('budget_amount', sa.Float(), nullable=False),
    sa.Column('categoryId', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['categoryId'], ['categories.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('budget_name')
    )
    op.create_table('transactions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('trans_date', sa.Date(), nullable=False),
    sa.Column('trans_payee', sa.String(length=40), nullable=False),
    sa.Column('trans_amount', sa.Float(), nullable=False),
    sa.Column('categoryId', sa.Integer(), nullable=False),
    sa.Column('accountId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['accountId'], ['accounts.id'], ),
    sa.ForeignKeyConstraint(['categoryId'], ['categories.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('transactions')
    op.drop_table('budgets')
    op.drop_table('accounts')
    op.drop_table('categories')
    # ### end Alembic commands ###
