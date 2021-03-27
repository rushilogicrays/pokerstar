from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
import csv
from django.http import HttpResponse
from django.contrib import admin
from django.contrib import messages
from rest_framework import generics
from django.db.models import F
from datetime import date, timedelta
from django.db.models.functions import Lower
from json import loads, dumps
from collections import OrderedDict
from django.db.models import Q
from django.contrib.auth.decorators import login_required
import imaplib, email
from datetime import datetime, timedelta
from django.utils import timezone
import email
import regex as re
from imapclient import IMAPClient
import traceback




# @login_required
@api_view(['GET'])
def pending_tournaments(request):
	if request.method=='GET':
		queryset = Tournament.objects.order_by('end_tournament').filter(state="Imported").all()
		

		serializer = TournamentSerializer(queryset, context={"request":request}, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)


# @login_required
@api_view(['GET','PUT'])
def build_tournaments(request, external_id):
	queryset = Tournament.objects.filter(external_id = external_id)
	# queryset1 = Rank.objects.filter()

	if request.method == "GET":
		data = {}
		data["tournament"]={}
		data["rank"]={}
		tournament_serializer = TournamentSerializer(queryset, context={"request":request}, many=True)
		tournament = loads(dumps(tournament_serializer.data))
		queryset1 = Rank.objects.filter(tournament_id = tournament[0]['id']).order_by('position').select_related('account_id')
		# queryset1 = Rank.objects.all().order_by('position').select_related('account_id')
		rank_serializer = RankSerializer(queryset1, context={"request":request}, many=True)
		data["status"]=1
		# data["query"]=str(queryset1.query)
		# data["data_query"]=str(list(queryset1))
		data["tournament"]=tournament_serializer.data
		data["rank"]=rank_serializer.data
		for d in data["rank"]:
			del d["tournament_id"]

		# data["rank_acc"]=rank_serializer.data
		data["msg"]="Success"
		return JsonResponse(data, status=status.HTTP_200_OK)

	elif request.method == 'PUT':
		queryset1 = Tournament.objects.get(external_id = external_id) 
		tournament_data = JSONParser().parse(request)
		tournament_data = loads(dumps(tournament_data))
		tournament_data['tournament'][0]['state'] = "Done"
		# print(tournament_data['tournament'][0])
		# print(tournament_data['rank'])
		# return JsonResponse(tournament_data, status=status.HTTP_200_OK)

		tournament_data_serializer = TournamentSerializer(queryset1, data=tournament_data['tournament'][0], partial=True) 
		if tournament_data_serializer.is_valid(): 
			tournament_data_serializer.save()
		else:
			print(tournament_data_serializer.errors)

		master_account_id = 1
		# print(len(tournament_data['rank']))
		count = 1;
		countv = 1;
		for rank in tournament_data['rank']:
			# print("COUNT::" + str(count))
			count+=1
			queryset = Rank.objects.get(pk=rank['id'])
			if not rank['payout']:
				rank['payout'] = 0
			if not rank['tip']:
				rank['tip'] = 0

			rank_serializer = RankSerializer(queryset, data=rank, partial=True) 
			if rank_serializer.is_valid():
				rank_serializer.save()
				# print("COUNT V::" + str(countv))
				countv+=1
				# print("BUY IN::" + str(tournament_data['tournament'][0]["buy_in"]))
				#initialize buy-in transaction
				txn_obj = Transaction_Detail()
				txn_obj.transaction_type = "BuyIn"
				txn_obj.from_account_id = Account.objects.get(pk=rank['account_id']['id'])
				txn_obj.to_account_id = Account.objects.get(pk=master_account_id) #(name = "Master")
				txn_obj.transaction_amount = int(tournament_data['tournament'][0]["buy_in"])
				txn_obj.tournament_id = queryset1
				txn_obj.admin_id = request.user
				txn_obj.payment_type_id = PaymentType.objects.get(pk=2)
				txn_obj.confirm = 0
				txn_obj.save()

				from_account = Account.objects.get(pk=rank['account_id']['id'])
				to_account = Account.objects.get(pk=master_account_id) # 1 = master account
				# from_account_ser = AccountSerializer(from_account)
				# to_account_ser = AccountSerializer(to_account)

				from_account.balance = from_account.balance - int(tournament_data['tournament'][0]["buy_in"])
				to_account.balance = to_account.balance + int(tournament_data['tournament'][0]["buy_in"])

				from_account.save()
				to_account.save()

				if int(rank['payout']) > 0:
					# print('payout > 0')
					#initialize buy-in transaction
					txn_obj = Transaction_Detail()
					txn_obj.transaction_type = "Payout"
					txn_obj.from_account_id = Account.objects.get(pk=master_account_id) #(name = "Master")
					txn_obj.to_account_id = Account.objects.get(pk=rank['account_id']['id'])
					txn_obj.transaction_amount = int(rank['payout'])
					txn_obj.tournament_id = queryset1
					txn_obj.admin_id = request.user
					txn_obj.payment_type_id = PaymentType.objects.get(pk=2)
					txn_obj.confirm = 0
					txn_obj.save()

					from_account = Account.objects.get(pk=master_account_id) # 1 = master account
					to_account = Account.objects.get(pk=rank['account_id']['id'])
					# from_account_ser = AccountSerializer(from_account)
					# to_account_ser = AccountSerializer(to_account)

					from_account.balance = from_account.balance - int(rank['payout'])
					to_account.balance = to_account.balance + int(rank['payout'])

					from_account.save()
					to_account.save()

				if int(rank['tip']) > 0:
					# print('tip > 0')
					#initialize buy-in transaction
					txn_obj = Transaction_Detail()
					txn_obj.transaction_type = "Tip"
					txn_obj.from_account_id = Account.objects.get(pk=master_account_id) #(name = "Master")
					txn_obj.to_account_id = Account.objects.get(pk=rank['account_id']['id'])
					txn_obj.transaction_amount = int(rank['tip'])
					txn_obj.tournament_id = queryset1
					txn_obj.admin_id = request.user
					txn_obj.payment_type_id = PaymentType.objects.get(pk=2)
					txn_obj.confirm = 0
					txn_obj.save()

					from_account = Account.objects.get(pk=master_account_id) # 1 = master account
					to_account = Account.objects.get(pk=rank['account_id']['id'])
					# from_account_ser = AccountSerializer(from_account)
					# to_account_ser = AccountSerializer(to_account)

					from_account.balance = from_account.balance - int(rank['tip'])
					to_account.balance = to_account.balance + int(rank['tip'])

					from_account.save()
					to_account.save()

			# else:
			# 	return JsonResponse(rank_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 	



		return JsonResponse(tournament_data_serializer.data)
		return JsonResponse(tournament_data_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 	


@api_view(['PUT'])
def rank_update(request, pk):
	if request.method == 'PUT':
		queryset1 = Rank.objects.get(pk = pk) 
		rank_data = JSONParser().parse(request) 
		rank_data_serializer = RankSerializer(queryset1, data=rank_data, partial=True) 
		if rank_data_serializer.is_valid(): 
			rank_data_serializer.save() 
			return JsonResponse(rank_data_serializer.data) 
		return JsonResponse(rank_data_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# @login_required
@api_view(['GET'])
def tournament_overview(request):
	if request.method=='GET':
		filters = {}

		try:
			date = datetime.strptime(request.GET.get("date"), "%Y-%m-%d")
			current_tz = timezone.get_current_timezone()
			date = current_tz.localize(date)

		except Exception as e:
			date = None
			print(e)

		if date:
			start_date = date + timedelta(hours=6)
			end_date = start_date + timedelta(days=1)
			# print(start_date)
			# print(end_date)

			filters['start_tournament__range'] = (start_date,end_date)

		queryset = Tournament.objects.filter(**filters)
		
		serializer = TournamentSerializer(queryset, context={"request":request}, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['GET'])
def get_transactions(request):
	if request.method=='GET':
		filters = {}
		if request.GET.get("transaction_type"):
			filters['transaction_type'] = request.GET.get("transaction_type")

		if request.GET.get("confirm"):
			filters['confirm'] = request.GET.get("confirm")	

		try:
			date = datetime.strptime(request.GET.get("date"), "%Y-%m-%d")
			current_tz = timezone.get_current_timezone()
			date = current_tz.localize(date)

		except Exception as e:
			date = None
			print(e)

		if date:
			start_date = date + timedelta(hours=6)
			end_date = start_date + timedelta(days=1)
			# print(start_date)
			# print(end_date)

			filters['created_at__range'] = (start_date,end_date)

		queryset = Transaction_Detail.objects.filter(**filters)
		
		serializer = Transaction_DetailSerializer2(queryset, context={"request":request}, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)		



# @login_required
@api_view(['PUT'])
def transaction(request,pk):
	# if request.method=='GET':
	# 	queryset = Transaction_Detail.objects.all()
		
	# 	serializer = Transaction_DetailSerializer(queryset, context={"request":request}, many=True)
	# 	return Response(serializer.data, status=status.HTTP_200_OK)

	if request.method == 'PUT':
		queryset1 = Transaction_Detail.objects.get(pk=pk) 
		transaction_data = JSONParser().parse(request) 
		transaction_data_serializer = Transaction_DetailSerializer(queryset1, data=transaction_data, partial = True) 
		if transaction_data_serializer.is_valid(): 
			transaction_data_serializer.save() 
			return JsonResponse(transaction_data_serializer.data) 
		return JsonResponse(transaction_data_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


@api_view(['POST'])
def create_transaction(request):
	if request.method == 'POST':
		serializer = Transaction_DetailSerializer(data=request.data, partial=True)
		if serializer.is_valid():
			serializer.save()

			from_account = Account.objects.get(pk=request.data["from_account_id"])
			to_account = Account.objects.get(pk=request.data["to_account_id"]) 
			from_account_ser = AccountSerializer(from_account)
			to_account_ser = AccountSerializer(to_account)

			from_account.balance = from_account.balance - int(request.data["transaction_amount"])
			to_account.balance = to_account.balance + int(request.data["transaction_amount"])

			from_account.save()
			to_account.save()


			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def cancel_transaction(request,pk): 
	if request.method == 'POST':
		queryset1 = Transaction_Detail.objects.get(pk = pk) 
		serializer = Transaction_DetailSerializer( data=request.data, partial=True)
		if serializer.is_valid():
			serializer.save()

			from_account = Account.objects.get(pk=request.data["to_account_id"])
			to_account = Account.objects.get(pk=request.data["from_account_id"]) 
			from_account_ser = AccountSerializer(from_account)
			to_account_ser = AccountSerializer(to_account)

			from_account.balance = from_account.balance - int(request.data["transaction_amount"])
			to_account.balance = to_account.balance + int(request.data["transaction_amount"])

			from_account.save()
			to_account.save()


			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_account_details(request):
	if request.method=='GET':
		queryset = Account.objects.all().order_by('account_name')
		
		serializer = AccountSerializer(queryset, context={"request":request}, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_paymenttype(request):
	if request.method=='GET':
		queryset = PaymentType.objects.all()
		
		serializer = PaymentTypeSerializer(queryset, context={"request":request}, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)



# @login_required
@api_view(['GET'])
def account_details(request,id):
	queryset = Account.objects.filter(id = id)
	# queryset1 = Rank.objects.filter()

	if request.method == "GET":
		data = {}
		data["account"]={}
		data["transaction"]={}
		account_serializer = AccountSerializer(queryset, context={"request":request}, many=True)
		account = loads(dumps(account_serializer.data))
		queryset1 = Transaction_Detail.objects.filter(	Q(from_account_id = account[0]['id']) | Q(to_account_id = account[0]['id']))
		transaction_serializer = Create_TransactionSerializer(queryset1, context={"request":request}, many=True)
		data["status"]=1
		data["account"]=account_serializer.data
		data["transaction"]=transaction_serializer.data
		# data["rank"]=rank_serializer.data
		for d in data["transaction"]:
			del d["tournament_id"] 
			del d["admin_id"]
		data["msg"]="Success"
		return JsonResponse(data, status=status.HTTP_200_OK)



# @login_required
# @api_view(['DELETE'])
# def delete_tournaments(request,external_id):
# 	count = Tournament.objects.get(external_id= external_id).delete()

@api_view(['GET','PUT'])
def delete_tournament(request, external_id):
	queryset = Tournament.objects.filter(external_id = external_id)
	# queryset1 = Rank.objects.filter()

	if request.method == "GET":
		data = {}
		data["tournament"]={}
		data["rank"]={}
		tournament_serializer = TournamentSerializer(queryset, context={"request":request}, many=True)
		tournament = loads(dumps(tournament_serializer.data))
		queryset1 = Rank.objects.filter(tournament_id = tournament[0]['id']).order_by('position').select_related('account_id')
		# queryset1 = Rank.objects.all().order_by('position').select_related('account_id')
		rank_serializer = RankSerializer(queryset1, context={"request":request}, many=True)
		data["status"]=1
		# data["query"]=str(queryset1.query)
		# data["data_query"]=str(list(queryset1))
		data["tournament"]=tournament_serializer.data
		data["rank"]=rank_serializer.data
		for d in data["rank"]:
			del d["tournament_id"]

		# data["rank_acc"]=rank_serializer.data
		data["msg"]="Success"
		return JsonResponse(data, status=status.HTTP_200_OK)

	elif request.method == "PUT":
		queryset1 = Tournament.objects.get(external_id = external_id) 

		# if status is imported, delete it from database, else revert transactions and change it's status
		if(queryset1.state != "Done"):
			queryset1.delete()
			return JsonResponse({'message': 'Tournament was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT, safe=False)


		tournament_data = JSONParser().parse(request)
		tournament_data = loads(dumps(tournament_data))
		tournament_data['tournament'][0]['state'] = "Cancel"
		# print(tournament_data['tournament'][0])
		# print(tournament_data['rank'])
		# return JsonResponse(tournament_data, status=status.HTTP_200_OK)

		tournament_data_serializer = TournamentSerializer(queryset1, data=tournament_data['tournament'][0], partial=True) 
		if tournament_data_serializer.is_valid(): 
			tournament_data_serializer.save()
		else:
			print(tournament_data_serializer.errors)

		master_account_id = 1
		# print(len(tournament_data['rank']))
		count = 1;
		countv = 1;
		for rank in tournament_data['rank']:
			# print("COUNT::" + str(count))
			count+=1
			queryset = Rank.objects.get(pk=rank['id'])
			if not rank['payout']:
				rank['payout'] = 0
			if not rank['tip']:
				rank['tip'] = 0

			rank_serializer = RankSerializer(queryset, data=rank, partial=True) 
			if rank_serializer.is_valid():
				rank_serializer.save()
				# print("COUNT V::" + str(countv))
				countv+=1
				# print("BUY IN::" + str(tournament_data['tournament'][0]["buy_in"]))
				#initialize buy-in transaction
				txn_obj = Transaction_Detail()
				txn_obj.transaction_type = "BuyIn"
				txn_obj.to_account_id = Account.objects.get(pk=rank['account_id']['id'])
				txn_obj.from_account_id = Account.objects.get(pk=master_account_id) #(name = "Master")
				txn_obj.transaction_amount = int(tournament_data['tournament'][0]["buy_in"])
				txn_obj.description = "Tournament Deleted"
				txn_obj.tournament_id = queryset1
				txn_obj.admin_id = request.user
				txn_obj.payment_type_id = PaymentType.objects.get(pk=2)
				txn_obj.confirm = 0
				txn_obj.save()

				from_account = Account.objects.get(pk=master_account_id)
				to_account = Account.objects.get(pk=rank['account_id']['id']) # 1 = master account
				# from_account_ser = AccountSerializer(from_account)
				# to_account_ser = AccountSerializer(to_account)

				from_account.balance = from_account.balance - int(tournament_data['tournament'][0]["buy_in"])
				to_account.balance = to_account.balance + int(tournament_data['tournament'][0]["buy_in"])

				from_account.save()
				to_account.save()

				if int(rank['payout']) > 0:
					# print('payout > 0')
					#initialize buy-in transaction
					txn_obj = Transaction_Detail()
					txn_obj.transaction_type = "Payout"
					txn_obj.to_account_id = Account.objects.get(pk=master_account_id) #(name = "Master")
					txn_obj.from_account_id = Account.objects.get(pk=rank['account_id']['id'])
					txn_obj.transaction_amount = int(rank['payout'])
					txn_obj.description = "Tournament Deleted"
					txn_obj.tournament_id = queryset1
					txn_obj.admin_id = request.user
					txn_obj.payment_type_id = PaymentType.objects.get(pk=2)
					txn_obj.confirm = 0
					txn_obj.save()

					from_account = Account.objects.get(pk=rank['account_id']['id']) # 1 = master account
					to_account = Account.objects.get(pk=master_account_id)
					# from_account_ser = AccountSerializer(from_account)
					# to_account_ser = AccountSerializer(to_account)

					from_account.balance = from_account.balance - int(rank['payout'])
					to_account.balance = to_account.balance + int(rank['payout'])

					from_account.save()
					to_account.save()

				if int(rank['tip']) > 0:
					# print('tip > 0')
					#initialize buy-in transaction
					txn_obj = Transaction_Detail()
					txn_obj.transaction_type = "Tip"
					txn_obj.to_account_id = Account.objects.get(pk=master_account_id) #(name = "Master")
					txn_obj.from_account_id = Account.objects.get(pk=rank['account_id']['id'])
					txn_obj.transaction_amount = int(rank['tip'])
					txn_obj.description = "Tournament Deleted"
					txn_obj.tournament_id = queryset1
					txn_obj.admin_id = request.user
					txn_obj.payment_type_id = PaymentType.objects.get(pk=2)
					txn_obj.confirm = 0
					txn_obj.save()

					from_account = Account.objects.get(pk=rank['account_id']['id']) # 1 = master account
					to_account = Account.objects.get(pk=master_account_id)
					# from_account_ser = AccountSerializer(from_account)
					# to_account_ser = AccountSerializer(to_account)

					from_account.balance = from_account.balance - int(rank['tip'])
					to_account.balance = to_account.balance + int(rank['tip'])

					from_account.save()
					to_account.save()

			# else:
			# 	return JsonResponse(rank_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 	



		return JsonResponse(tournament_data_serializer.data)
		return JsonResponse({'message': 'Tournament was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)




# @login_required
def fetch():
	user = 'lr.testdemo@gmail.com'
	password = 'lrtestdemo'
	imap_url = 'imap.gmail.com'

	# Function to get email content part i.e its body part 
	def get_body(msg): 
		if msg.is_multipart(): 


			# rank_re = re.search('[0-9]+\:', string )
			msg1 = re.search('[0-9]+\:', msg )
			# user_re = re.search('\:(.*?)\(', string )
			msg2 = re.search('\:(.*?)\(', msg1 ) 

			# rank = rank_re.group(0).replace(":","")
			rank = msg2.group(0).replace(":","")
			# user = user_re.group(0).replace(":","").replace("(","").replace(" ","")
			msg = rank.group(0).replace(":","").replace("(","").replace(" ","")

			return get_body(msg.get_payload(0)) 
		else: 

			msg1 = re.search('[0-9]+\:', msg )
			msg2 = re.search('\:(.*?)\(', msg1 )
			rank = msg2.group(0).replace(":","")
			msg = rank.group(0).replace(":","").replace("(","").replace(" ","")

			return msg.get_payload(None, True) 

	# Function to search for a key value pair 
	def search(key, value, con): 
		result, data = con.search(None, key, '"{}"'.format(value)) 
		return data 

	# Function to get the list of emails under this label 
	def get_emails(result_bytes): 
		msgs = [] # all the email data are pushed inside an array 
		for num in result_bytes[0].split(): 
			typ, data = con.fetch(num, '(RFC822)') 
			msgs.append(data) 

		return msgs 

	# this is done to make SSL connnection with GMAIL 
	con = imaplib.IMAP4_SSL(imap_url) 

	# logging the user in 
	con.login(user, password) 

	# calling function to check for email under this label 
	con.select('Inbox') 

	# fetching emails from this user "tu**h*****1@gmail.com" 
	msgs = get_emails(search('FROM', 'pritesh.lr@gmail.com', con)) 

	# Uncomment this to see what actually comes as data 
	# print(msgs) 


	# Finding the required content from our msgs 
	# User can make custom changes in this part to 
	# fetch the required content he / she needs 

	# printing them by the order they are displayed in your gmail 
	for msg in msgs[::-1]: 
		for sent in msg: 
			if type(sent) is tuple: 

				# encoding set as utf-8 
				content = str(sent[1], 'utf-8') 
				data = str(content) 

				# Handling errors related to unicodenecode 
				try: 
					indexstart = data.find("ltr") 
					data2 = data[indexstart + 5: len(data)] 
					indexend = data2.find("</div>") 

					# printtng the required content which we need 
					# to extract from our email i.e our body 
					print(data2[0: indexend]) 

				except UnicodeEncodeError as e: 
					pass


# @login_required
@api_view(['GET'])
def import_tournaments(request):
	if request.method=='GET':
		
		HOST = "imap.gmail.com"
		USERNAME = "lr.testdemo@gmail.com"
		PASSWORD = "lrtestdemo"

		with IMAPClient(HOST) as server:
			print('init')
			server.login(USERNAME, PASSWORD)
			print('login')
			server.select_folder("INBOX", readonly=True)
			print('inbox')

			messages = server.search(["SUBJECT","PokerStars Tournament History Request"])
			for uid, message_data in server.fetch(messages, "RFC822").items():
				email_message = email.message_from_bytes(message_data[b"RFC822"])
				# print("UID: ",uid)
				# print("FROM: ",email_message.get("From"))
				# print("Subject: ",email_message.get("Subject"))
				# print("Body: ",email_message)
				for part in email_message.walk():
					if part.get_content_type() == "text/plain":
						# print(part)

						try:
							tournament_id = int(re.search('\PokerStars Tournament (.*?)\,', str(part)).group(1).replace('#','').strip())
							start_date = re.search('\Tournament started(.*?)\ C', str(part)).group(1).strip()
							end_date = re.search('\Tournament finished(.*?)\ C', str(part)).group(1).strip()
							total_players = re.search('([0-9]{0,2})(.*?)\ players', str(part)).group(1).strip()

							# print("tournament_id: ",tournament_id)
							# print("start_date: ",start_date)
							# print("end_date: ",end_date)
							# print("total_players: ",total_players)
							# print("\n\n\n")
							
							rank_re = re.findall('[0-9]+\: ', str(part))
							user_re = re.findall('\:(.*?)\(', str(part))


							ranks = [w.replace(":","").strip() for w in rank_re]
							users = [w.replace(":","").strip() for w in user_re]

							current_tz = timezone.get_current_timezone()

							start_date = datetime.strptime(start_date, "%Y/%m/%d %H:%M:%S")
							start_date = current_tz.localize(start_date)
							end_date = datetime.strptime(end_date, "%Y/%m/%d %H:%M:%S")
							end_date = current_tz.localize(end_date)

							# add new users in account
							for user in users:
								try:
									user = re.sub(r'\[(.*?)\]', '', user)
								except Exception as e:
									print(e)
									print(traceback.format_exc())

								Account.objects.update_or_create(account_name=user)

							try:
								tournament = Tournament.objects.get(external_id = tournament_id)
							except:
								tournament = None

							if not tournament:
								# only import if it is not imported earlier
								tournament = Tournament.objects.create(external_id=tournament_id,start_tournament=start_date,end_tournament=end_date,total_players=int(total_players),state="Imported")
							# external_id=tournament_id,start_tournament=start_date,end_tournament=end_date
								# add all player related details to rank
								# print("Tournament ID::",tournament.id)
								for index, item in enumerate(users):
									rank = Rank()
									rank.tournament_id = tournament
									rank.account_id = Account.objects.get(account_name = users[index])
									rank.position = ranks[index]
									rank.payout = 0
									rank.tip = 0
									rank.save()


							#tournament_id, start_date, end_date, total_players
							# print("total ranks: ",len(ranks))
							# print("ranks: ",ranks)
							# print("total users: ",len(users))
							# print("users: ",users)

							# print("tournament_id: ",tournament_id)
							# print("start_date: ",start_date)
							# print("end_date: ",end_date)
							# print("total_players: ",total_players)
							# print("\n\n\n")

						except Exception as e:
							print(e)
							print(traceback.format_exc())
							pass



		return JsonResponse({"message": "Tournaments Imported Successfully"}, status=status.HTTP_200_OK, safe=False)

@api_view(['POST'])
def confirm_deposit(request,pk): 
	if request.method == 'POST':
		queryset1 = Transaction_Detail.objects.get(pk = pk)
		queryset1.confirm = 1
		queryset1.save()
		return JsonResponse({"message": "Deposit Confirmed Successfully"}, status=status.HTTP_200_OK, safe=False)
