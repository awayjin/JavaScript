export default {
    getItem(key) {
        return sessionStorage.getItem(key);
    },

    setItem(key, value) {
        sessionStorage.setItem(key, value);
    },

    saveToken(token) {
        let cacheData = localStorage.getItem('accessToken');
        if (!cacheData || cacheData.accessToken != token) {
            cacheData = {
                expireTime: (new Date()).getTime() + 86400000, // 7days
                accessToken: token
            };
            localStorage.setItem('accessToken', JSON.stringify(cacheData));
        }
    },
    getToken() {
        let cacheData =localStorage.getItem('accessToken');
        let token = '';
        if (cacheData) {
            try {
                cacheData = JSON.parse(cacheData);
                let now = (new Date()).getTime();
                token = cacheData.accessToken && (cacheData.expireTime - now > 0) ? cacheData.accessToken : '';
            } catch(e){
                // do nothing
            }
        }
        return token;
    },
    clearToken() {
        localStorage.removeItem('accessToken');
    },
    
    saveRole(role) {
        sessionStorage.setItem('userRole', role);
    },

    getRole() {
        return sessionStorage.getItem('userRole');
    }
}