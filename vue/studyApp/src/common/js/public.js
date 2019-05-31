class toolset {
    //获取url后面参数
    getQuery(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&#]*)(&|$|#)', 'i');
        var qPos = location.href.indexOf('?');
        if (qPos >= 0) {
            var r = location.href.substring(qPos+1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
        }
        
        return null;
    }
    
    timestampToTime (timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        return Y+M+D+' '+h+":"+m;
    }

    getDate (timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '年';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
        var D = (date.getDate() < 10 ?  '0'+date.getDate() : date.getDate() )+ '日';
        return Y+M+D;
    }

}

const methodSet = new toolset();
export default methodSet;