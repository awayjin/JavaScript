
1. tar 压缩和解压文件

```
// 压缩
cd output
tar -zcvf ../output.tar.gz *;

// 解压
tar -zxvf ../output.tar.gz;
```

- -z: 支持 gzip 解压文件
- -c: 建立新的压缩文件
- -v: 显示操作过程
- -f: 指定压缩文件
- -x: 从压缩的文件中提取文件

参考: https://mp.weixin.qq.com/s/80UEbeEfPBV2LMmRqJFT7w


git拉取远程指定分支到本地
 git checkout -b feature-01 origin/feature-01