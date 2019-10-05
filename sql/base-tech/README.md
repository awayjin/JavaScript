
Mac 把 brew 切换成阿里云镜像
```
cd "$(brew --repo)"
 
git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git
 
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
 
git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git
 
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.bash_profile
source ~/.bash_profile
```

OSX MySQL安装:
https://www.jianshu.com/p/e5c9e8ef8ccb
```
登陆mysql：mysql -u root -p
启动mysql：brew services start mysql@5.7
停止mysql：brew services stop mysql@5.7
```

遇到 Can't connect to local MySQL server through socket '/tmp/mysql.sock'
试下mysql.server start

Mac navicat破解：
https://www.52pojie.cn/thread-957406-1-1.html