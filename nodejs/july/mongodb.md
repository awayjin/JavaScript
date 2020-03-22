which pm2

which mongod;

## Mac 下安装 mongoDB

安装步骤：
https://www.runoob.com/mongodb/mongodb-osx-install.html

下载安装包：
sudo curl -O https://fastdl.mongodb.org/osx/mongodb-macos-x86_64-4.2.3.tgz

mkdir -p xx/yy的好处就是一次可以创建多级文件夹，若xx文件夹不存在

# 解压
sudo tar -zxvf mongodb-macos-x86_64-4.2.3.tgz

# 重命名为 mongodb 目录
sudo mv mongodb-macos-x86_64-4.2.3/ mongodb


# 添加全局变量
https://blog.csdn.net/qq_31754523/article/details/97624726

https://www.jianshu.com/p/c0063e36890b


## df -lh
df: Disk free  空余硬盘
df -lh是显示以方便阅读的大小单位显示本地文件系统信息

linux中df命令的功能是用来检查linux服务器的文件系统的磁盘空间占用情况。

## zip unzip
zip -r mysql.zip mysql 该句命令的含义是：将mysql文件夹压缩成mysql.zip

将压缩文件text.zip在当前目录下解压缩。
unzip test.zip

将压缩文件text.zip在指定目录/tmp下解压缩，如果已有相同的文件存在，要求unzip命令不覆盖原先的文件。
unzip -n test.zip -d /tmp

查看压缩文件目录，但不解压。
unzip -v test.zip

## 指定目录
sudo mongod --dbpath=/data/db --port=27017

系统日志：
sudo mongod --dbpath=/data/db --port=27017 --fork --syslog

监控系统日志:
