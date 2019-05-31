import { Toast } from 'mint-ui';

function _toastOnce() {
    let closed = true; // 控制提示消息不同时弹出
    return function(message, duration = 1500) {
        if (closed) {
            closed = false;
            let instance = Toast({
                message: message,
                duration: -1
            });
            setTimeout(function(){
                instance && instance.close();
                closed = true;
            }, duration);
        }
    }
}

export default {
    toastOnce: _toastOnce()
}
