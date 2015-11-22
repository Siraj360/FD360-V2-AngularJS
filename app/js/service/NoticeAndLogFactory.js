(function () {
    //debugger;
    angular.module('FD360').factory('NoticeAndLogFactory', ['$log',  NoticeAndLogFactory]);

    function NoticeAndLogFactory($log) {
        //debugger;
        var Factory = {
            isShowTosats: true,
            error: error,
            info: info,
            success: success,
            warning: warning,
            log: $log.log
        };

        return Factory;

        //////////////////////////

       function error(message, title, data) {
            toastr.error(message, title);
            $log.error('Error:' + message, data)
        }

       function info(message, title, data) {
            toastr.info(message, title);
            $log.info('Info:' + message, data)
        }

       function success(message, title, data) {
            toastr.success(message, title);
            $log.debug('success:' + message, data)
        }

       function warning(message, title, data) {
            toastr.warning(message, title);
            $log.warn('warning:' + message, data)
        }

        //////////////////////////

    }


})();