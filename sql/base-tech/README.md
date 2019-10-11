
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

windows 安装可能的问题

cdtMS7gurW+%


ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';


ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER; #修改加密规则 

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'; #更新一下用户的密码 

FLUSH PRIVILEGES; #刷新权限

重置密码：alter user 'root'@'localhost' identified by 'xzx123456';