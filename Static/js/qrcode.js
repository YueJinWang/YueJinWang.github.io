$(document).ready(function () {
    function isMobileDevice() {
        const mobileDevice = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone']
        let isMobileDevice = mobileDevice.some(e => navigator.userAgent.match(e))
        alert(isMobileDevice)
        return isMobileDevice
    }

    // This method will trigger user permissions
    Html5Qrcode.getCameras().then(devices => {

        if (devices && devices.length) {
            var cameraId = devices[0].id;
            // .. use this to start scanning.
            const html5QrCode = new Html5Qrcode( /* element id */ "reader");

            if(isMobileDevice()){
                html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);
            }
            
            html5QrCode.start(
                    cameraId, {
                        fps: 25, // frame per seconds for qr code scanning
                        qrbox: {
                            width: 206,
                            height: 206
                        }
                    },
                    (decodedText, decodedResult) => {
                        // do something when code is read

                        // success
                        app.ScanSuccess = true;
                        app.ScanError = false;
                        app.ScanExist = false;
                        app.order_id = '0000003093-00001';
                        app.farmer = '松下農園松下農園';
                        app.order_box = 22;
                        app.buyer = '東海青果';
                        app.pickup = '松下農園';
                        app.count_box = 1;
                        app.total_box = 40;

                        // error
                        // app.ScanError = true;
                        // app.ScanSuccess = false;
                        // app.ScanExist = false;

                        // exist
                        // app.ScanExist = true;
                        // app.ScanSuccess = false;
                        // app.ScanError = false;

                    },
                    (errorMessage) => {
                        // parse error, ignore it.
                    })
                .catch((err) => {
                    // Start failed, handle it.
                });

        }
    }).catch(err => {
        // handle err
    });

})