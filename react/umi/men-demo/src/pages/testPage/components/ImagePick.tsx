import React, { useState, useEffect, FC } from 'react';
import { Button, List, Stepper } from 'antd-mobile';
import { pickImg } from '@/utils/pickImg';
import { uploadImg } from '@sense/utils';
import { useRequest } from 'umi';
import { fetchOss } from '@/services/uploadOss';

const { Item } = List;

const IMGPick: FC = () => {
  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const { data } = useRequest(fetchOss, { manual: true });

  const [files, setFiles] = useState<string[]>([]);

  const [count, setCount] = useState(1);

  console.log(data, '===data ');
  if (count > 6) {
    throw new Error('最多选择6张图');
  }
  return (
    <List renderHeader={() => '选择图片'}>
      <Item>
        {files.map(base => {
          return <img src={base} alt="" />;
        })}
      </Item>
      <Item
        extra={
          <Stepper
            style={{ width: '100%', minWidth: '100px' }}
            showNumber
            max={10}
            min={1}
            value={count}
            onChange={val => {
              setCount(val);
            }}
          />
        }
      >
        选择图片的数量
      </Item>
      <Item>
        <input
          type="file"
          onChange={async e => {
            const file = e.target.files[0];
            const base64 = (await toBase64(file)) as string;
            const oss = {
              access_key_secret: 'BDkvrGKuP2xBoXjL8LeM1nseXCQR8Bf4rxikAFypacwQ',
              bucket: 'vanke-app-test',
              expiration: '2020-04-23T07:33:33Z',
              security_token:
                'CAIS9QF1q6Ft5B2yfSjIr5fdDu7S2Od7g6uueGeJjXkwOtpg2vSSrDz2IHpNenBhCOgetPoxmGlU6/oflqVhS4JXRUHeWtZr444PD+0apHiH6aKP9rUhpMCPOwr6UmzWvqL7Z+H+U6muGJOEYEzFkSle2KbzcS7YMXWuLZyOj+wMDL1VJH7aCwBLH9BLPABvhdYHPH/KT5aXPwXtn3DbATgD2GM+qxsmsP3hmJfCskeB0QCklbVKnemrfMj4NfsLFYxkTtK40NZxcqf8yyNK43BIjvws1fIdqGaf5ovDXQUIv0jabvC2+8V3KxRieqUhB77bYQkZR3Pt0xqAATDLaVufBh6dRTwExcj27s/uKGGEeWl8tSKDjG2zN1O7yquuZ7s3SYjlSnn688DmAd6oJ0rqCaY30+C0iqbbRNkyRSsMQM7OWqbkAZ0m7X7FL6DpMja2Aq1gPqlIkr0Ve860iLvCXva+HG9TFzKawmdefZUhnQ3g3/SG68LFgjSu',
              access_key_id: 'STS.NThETf58Z4iEzA8iye6UL519N',
            };
            console.log(base64);
            const res = await uploadImg({
              base64,
              oss: {
                region: 'oss-cn-shenzhen',
                bucket: 'vanke-app-test',
                stsToken: oss.security_token,
                accessKeyId: oss.access_key_id,
                accessKeySecret: oss.access_key_secret,
              },
            });

            console.log(res, '==res');
          }}
          name=""
          id=""
        />
      </Item>
      <Item
        extra={
          <Button
            size="small"
            onClick={() => {
              pickImg(count).then(base => {
                // setFiles(base);
                const oss = {
                  access_key_secret:
                    '3w2oowvq2hPEju2daAveZugBrvZBTox9vkPKfSASVky2',
                  bucket: 'vanke-app-test',
                  expiration: '2020-04-20T10:13:58Z',
                  security_token:
                    'CAIS9QF1q6Ft5B2yfSjIr5bmAPGBoLB7gPWcQHXJk1UBXrcViKHThzz2IHpNenBhCOgetPoxmGlU6/oflqVhS4JXRUHeWtZr444PTv0bs3uH6aKP9rUhpMCPOwr6UmzWvqL7Z+H+U6muGJOEYEzFkSle2KbzcS7YMXWuLZyOj+wMDL1VJH7aCwBLH9BLPABvhdYHPH/KT5aXPwXtn3DbATgD2GM+qxsmsP3hmJfCskeB0QCklbVKnemrfMj4NfsLFYxkTtK40NZxcqf8yyNK43BIjvws1fIdqGaf5ovDXQUIv0jabvC2+8V3KxRieqUhB77bYQkZR3Pt0xqAAW243PeAR17sT7HukmPbq/iOGKGKeBpekA5+HUsQjDZqrkrf46vzywvWw4T+5zaDkeBGQ4x32b0NcrIekJNfMTHACCCfQ2AN/ve7l+Zp6aAGsEwki3+vn+frvGm63XaejN6i8o8Qo9kQAg1l8T38mprhF5hqBa/ZclSAYxzl5OtL',
                  access_key_id: 'STS.NUSKK5MoZ77wBSxwUTR89gdxe',
                };
                uploadImg({
                  base64: base[0],
                  oss: {
                    stsToken: oss.security_token,
                    accessKeyId: oss.access_key_id,
                    accessKeySecret: oss.access_key_secret,
                  },
                });
              });
              // .catch(e => {
              //   console.log(e);
              // });
            }}
          >
            选择图片
          </Button>
        }
      />
    </List>
  );
};

export default IMGPick;
