from django.contrib import admin
from .models import  TournamentImport, PlayDate, Tournament,Rank , Account, PaymentType, Transaction_Detail, BuyIn 
# Register your models here.

# admin.site.register(StateType)
admin.site.register(TournamentImport)
admin.site.register(PlayDate)
admin.site.register(Tournament)
admin.site.register(Rank)
admin.site.register(Account)
admin.site.register(PaymentType)
# admin.site.register(TransactionType)
admin.site.register(Transaction_Detail)
admin.site.register(BuyIn)