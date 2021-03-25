# 使用方式
```
yarn create @sense/men-demo
```
初始化的时候请输入唯一的项目名称，cli会根据脚本配置好CICD，和docker配置。同时需要在k8s 网关添加新的前端路由

ci的具体[配置](https://git.vankeservice.com/CS/backend/platform/cs-k8s-config/gitlab-ci-templates/blob/master/README.md)
# fe-event
结合umi和我们的业务搭建的脚手架

<!-- 正式环境： https://enterprise.4009515151.com/men-demo/   -->
正式环境： https://uiis.4009515151.com/men-demo/  因为wxsdk只能用这个域名。  
测试环境： https://enterprise-test.4009515151.com/men-demo/  

测试demo： https://uiis.4009515151.com/men-demo/test
测试分支 test

## feature
- 更方便的mock，根据环境自动切换host
- 分享功能，分享到微信，以及微信sdk接入（完成）
- 补全jsbridge 
- 上传图片功能（完成）
- 接入sentry（完成）
- 错误边界组件（完成）
- sdk选择图片（完成）
- 上传图片（完成）
## mock
0. 后端定义好接口文档以及mock，例如[接口](https://yapi.bu6.io/project/338/interface/api/7553), 负责里面的[mock地址](https://yapi.bu6.io/mock/338/emerald/api/v1/web/surveys/:survey_id)
1. 在mock文件夹下面增加文件
  如 mock/testMock.ts
2. 导出你的接口，使用proxy转发上面的mock地址
``` typescript
import { proxy } from './utils/proxy';

export default {
  '/emerald/api/v1/web/surveys/:id': proxy(
    'https://yapi.bu6.io/mock/338/emerald/api/v1/web/surveys/:survey_id',
  ),
};
```
3. 这样你就可以请求/emerald/api/v1/web/surveys/:id获取mock的数据了
4. 在本地环境会自动走mock，其他环境会分别走测试和生产的接口，如果需要关闭本地的mock，请在 .umirc.ts 设置变量 USE_MOCK 为 false 

## 请求
1. 在src/services 下新建文件 如src/services/communityNameCard.ts
2. 导出请求函数 () => string
```typescript
export function fetchQuestionDetail(id: number) {
  return request(`/emerald/api/v1/web/surveys/${id}`);
}

```
3. 使用useRequest发送请求  具体文档看这个这里[useRequest](https://hooks.umijs.org/zh-CN/hooks/async)
```typescript
import { useRequest } from 'umi';

const { data, loading } = useRequest(
  fetchQuestionDetail, {
    defaultParams: [123], // fetchQuestionDetail需要用的的参数 id = 123
  }
);
```
4. 请求的统一处理，中间件都放在src/utils/request.ts

## 路由文件位置 routes/routes.ts

## global data
全局数据管理使用umi的[use-model](https://umijs.org/plugins/plugin-model)
1. 目前提供的jsBridge的数据，具体使用方法查看src/pages/testPage/bridge.tsx
```typescript
import { useModel } from 'umi';

export default () => {
  const { jsBridgeState, getProject, getUserBasic, getUserToken } = useModel('jsbridge');
  return <>hello</>
};
```

## 业务共用的hooks
共用的hooks将放在src/hooks下面
### useProject
```typescript
/**
 * 分别从url 和jsbridge获取project
 * 如果url有projectCode 优先返回url的 www.baidu.com?projectCode=123
 * 则会返回projectCode为123
 */
const [projectCode, projectName] = useProject()
```

## less
1. 全局变量放在src/styles/less-variable.ts，如果你需要需改antd的主题，直接在这个文件修改
```
/**
 * ant-mobile 的主题定义 https://github.com/ant-design/ant-design-mobile/blob/master/components/style/themes/default.less
 */
```

## 骨架屏 
建议使用react-loading-skeleton  
参考 src/pages/testPage/components/RenderCard.tsx
## utils
### history
> src/utils/history.ts

可以在url 参数中设置backUrl,指定返回页面如 baidu.com?backUrl=taobao.com
```
/**
 * 统一返回的方法
 * 如果是入口页面
 *  1. 没有backUrl 就关闭webview
 *  2. 有backUrl 就跳转到backUrl
 * 如果传入了onBack 执行onBack
 * 否则 history.goBack()
 * @param onBack
 */
```
### env 
> src/utils/env.ts

环境变量

### url
> src/utils/url.ts  

url相关的处理方法

### 上传图片
> src/utils/uplodaImage.ts  
> 图片最多上传10张，超过这个数量住这儿 APP 无法唤起
- 压缩
- 上传
> src/utils/pickImg.ts
- 住这儿选图
- 微信选图
> src/components/PickAndUploadImg/index.tsx


