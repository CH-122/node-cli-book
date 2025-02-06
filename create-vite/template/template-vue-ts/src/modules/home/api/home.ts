import { qstRequest, QstResult } from '@itshixun/qst-request-lib';

export interface SchoolModel {
  id: string;
  code: string;
  name: string;
  version: string;
  accessUrl: string;
}

export interface ConfigModel {
  collegeCode: string;
  collegeId: string;
  configKey: string;
  configValue: string;
  id: string;
  scope: string;
  scopeTitle: string;
}

/**
 * 取学校列表
 */
// export const getSchoolList = () => {
//   return qstRequest.get<QstResult<QstPagination<SchoolModel>>>('/base/schools?scope=app&organNature=Normal');
// };

/**
 * 取学院配置列表
 */
export const getConfigList = () => {
  return qstRequest.get<QstResult<ConfigModel[]>>('/api/base/config/system');
};
