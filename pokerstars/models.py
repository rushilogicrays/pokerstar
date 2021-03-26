from django.contrib.auth.models import User
from django.db import models
from enum import Enum

# Create your models here.

class StateType(Enum):   # A subclass of Enum
    IMPORTED = "Imported"
    DONE = "Done"
    CANCEL = "Cancel"

STATETYPE= (   # A subclass of Enum
    ('Imported','Imported'),
    ('Done','Done'),
    ('Cancel','Cancel'),
)

class TournamentImport(models.Model):
    start_date = models.DateTimeField()
    external_id = models.BigIntegerField() 
    end_date = models.DateTimeField()
    total_players = models.IntegerField()
    state = models.CharField(max_length=255, choices=[(tag, tag.value) for tag in StateType])


class PlayDate(models.Model):
    date = models.DateTimeField()
    total_players = models.IntegerField()
    total_prizepool = models.IntegerField()
    total_tip = models.IntegerField()
    deduction = models.IntegerField()
    profit = models.IntegerField()


class Tournament(models.Model): 
    # playdate_id = models.ForeignKey(PlayDate,on_delete=models.CASCADE,max_length=100)
    external_id = models.BigIntegerField() 
    name = models.CharField(max_length=1000)
    start_tournament = models.DateTimeField()
    end_tournament = models.DateTimeField()
    buy_in = models.IntegerField(default=0)
    rake = models.FloatField(default=0)
    total_players = models.IntegerField(default=0)
    total_prizepool = models.IntegerField(default=0)
    total_rake = models.IntegerField(default=0)
    total_tip = models.IntegerField(default=0)
    state = models.CharField(max_length=255, null=True, blank=True, choices=STATETYPE)
    
    def __str__(self):
	    return self.name

class Account(models.Model):
    account_name = models.CharField(max_length=1000) 
    balance = models.FloatField(default=0, blank=True)

class Rank(models.Model):
    tournament_id = models.ForeignKey(Tournament,on_delete=models.CASCADE) 
    account_id = models.ForeignKey(Account,on_delete=models.CASCADE)  
    position = models.IntegerField(default=0)
    payout = models.FloatField(default=0)
    tip = models.FloatField(default=0)   


class PaymentType(models.Model):
    payment_name = models.CharField(max_length=1000) 


# class TransactionType(Enum):   # A subclass of Enum
#     DEPOSIT = "Deposit"
#     WITHDRAWAL = "Withdrawal"
#     BUYIN = "BuyIn"
#     PAYOUT = "Payout"
#     DEDUCTION = "Deduction"
#     MANUAL = "Manual"

TRANSACTIONTYPE = (
    ('Deposit','Deposit'),
    ('Withdrawal','Withdrawal'),
    ('BuyIn','BuyIn'),
    ('Payout','Payout'),
    ('Tip','Tip'),
    ('Deduction','Deduction'),
    ('Manual','Manual'),
    )

class Transaction_Detail(models.Model):
    transaction_type = models.CharField(max_length=255, choices=TRANSACTIONTYPE)
    from_account_id = models.ForeignKey(Account,on_delete=models.CASCADE,related_name='from_account_id')
    to_account_id = models.ForeignKey(Account,on_delete=models.CASCADE,related_name='to_account_id')
    transaction_amount = models.IntegerField()
    description = models.CharField(max_length=2000,null=True, blank=True)
    confirm = models.BooleanField()
    tournament_id = models.ForeignKey(Tournament,on_delete=models.CASCADE,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True,null=True, blank=True)
    admin_id = models.ForeignKey(User, on_delete=models.CASCADE)
    payment_type_id = models.ForeignKey(PaymentType,on_delete=models.CASCADE,max_length=100)

class BuyIn(models.Model):
    amount = models.IntegerField()
    rake = models.IntegerField()

