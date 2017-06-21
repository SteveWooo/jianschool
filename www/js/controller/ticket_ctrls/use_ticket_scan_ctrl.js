starter_controllers
.controller('use_ticket_scan_ctrl', function ($scope, $state, ls, $ionicPopup) {
	$scope.detail = {
		getQRCode:function(){
			var img = new Image();
			img.src = ls.get('base_url') + '/Api/UserBus/getTicketQrCode?id='+$state.params.ticketId;
			$('#qr').append(img);
		}
	}
	$scope.detail.getQRCode();
})