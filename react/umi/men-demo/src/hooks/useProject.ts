import { useState, useEffect } from 'react';
// import useJsBridge from '@/models/jsBridge';
import { queryOfURL } from '@/utils/url';
import { useModel } from 'umi';

/**
 * 分别从url 和jsbridge获取project
 * 如果url有projectCode 优先返回url的
 */
export default function useProject() {
  const [urlProjectCode, urlProjectName] = useProjectByUrl();

  const [jsBridgeProjectCode, jsBridgeProjectName] = useProjectByJsBridge();

  if (urlProjectCode) {
    return [urlProjectCode, urlProjectName];
  }
  return [jsBridgeProjectCode, jsBridgeProjectName];
}

/**
 * 从url获取project信息
 */
export function useProjectByUrl() {
  const [state, setState] = useState({
    projectName: '', // 项目名称
    projectCode: '', // 主项目code
  });

  useEffect(() => {
    const { projectCode = '', projectName = '' } = queryOfURL(location.search);
    setState({
      projectCode,
      projectName,
    });
  }, []);

  const { projectCode, projectName } = state;
  return [projectCode, projectName];
}

/**
 * 从jsBridge获取project信息
 */
export function useProjectByJsBridge() {
  const { jsBridgeState, getProject } = useModel('jsBridge');

  useEffect(() => {
    getProject();
  }, [getProject]);

  const { projectCode, projectName } = jsBridgeState;
  return [projectCode, projectName];
}
