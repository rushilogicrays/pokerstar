from django.conf.urls import url 
from django.urls import path, include
from pokerstars.views import pending_tournaments, delete_tournament, build_tournaments , transaction , account_details ,tournament_overview , rank_update , get_account_details, create_transaction , get_transactions , cancel_transaction , get_paymenttype , import_tournaments, confirm_deposit
urlpatterns = [
	path('api/pending-tournaments', pending_tournaments),
	path('api/tournament/<slug:external_id>', build_tournaments),
	path('api/rank-update/<int:pk>', rank_update),
	path('api/tournament-overview', tournament_overview),
	path('api/get-transactions', get_transactions),
	path('api/get-paymenttype', get_paymenttype),
	path('api/delete-tournament/<slug:external_id>', delete_tournament),
	path('api/transaction/<int:pk>', transaction),
	path('api/create-transaction', create_transaction),
	path('api/cancel-transaction/<int:pk>', cancel_transaction),
	path('api/get-account-details/', get_account_details),
	path('api/account-details/<int:id>', account_details),
	path('api/import-tournaments',import_tournaments),
	path('api/confirm-deposit/<int:pk>', confirm_deposit),
]