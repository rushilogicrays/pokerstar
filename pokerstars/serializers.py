from rest_framework import serializers
from .models import  TournamentImport, PlayDate, Tournament,Rank , Account, PaymentType, Transaction_Detail, BuyIn 


class TournamentImportSerializer(serializers.ModelSerializer):
  
  #chapter_name_original = serializers.CharField(max_length=255)
  class Meta:
      model = TournamentImport
      fields = '__all__'


class PlayDateSerializer(serializers.ModelSerializer):
  
  #chapter_name_original = serializers.CharField(max_length=255)
  class Meta:
      model = PlayDate
      fields = '__all__'


class TournamentSerializer(serializers.ModelSerializer):
  
  #chapter_name_original = serializers.CharField(max_length=255)
  class Meta:
      model = Tournament
      fields = '__all__'


class AccountSerializer(serializers.ModelSerializer):

  class Meta:
      model = Account
      fields = '__all__' 
           


class RankSerializer(serializers.ModelSerializer):
  accounts = AccountSerializer(many=True, read_only = True) 
  #chapter_name_original = serializers.CharField(max_length=255)
  class Meta:
      model = Rank
      fields = '__all__'
      depth = 1 


class PaymentTypeSerializer(serializers.ModelSerializer):
  
  #chapter_name_original = serializers.CharField(max_length=255)
  class Meta:
      model = PaymentType
      fields = '__all__'


class Transaction_DetailSerializer(serializers.ModelSerializer):
  # from_account = AccountSerializer(many=True, read_only = True, related_name = "from_account") 
  # to_account = AccountSerializer(many=True, read_only = True, related_name = "to_account") 
  #chapter_name_original = serializers.CharField(max_length=255)
  #chapter_name_original = serializers.CharField(max_length=255)
  class Meta:
      model = Transaction_Detail
      fields = '__all__'
      # depth = 0


class Create_TransactionSerializer(serializers.ModelSerializer):
  # from_account = AccountSerializer(many=True, read_only = True, related_name = "from_account") 
  # to_account = AccountSerializer(many=True, read_only = True, related_name = "to_account") 
  #chapter_name_original = serializers.CharField(max_length=255)
  #chapter_name_original = serializers.CharField(max_length=255)
  class Meta:
      model = Transaction_Detail
      fields = '__all__'
      depth = 1


class Transaction_DetailSerializer2(serializers.ModelSerializer):

  class Meta:
      model = Transaction_Detail
      fields = '__all__'
      depth = 1


class BuyInSerializer(serializers.ModelSerializer):
  
  #chapter_name_original = serializers.CharField(max_length=255)
  class Meta:
      model = BuyIn
      fields = '__all__'
