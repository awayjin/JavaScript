import { useCallback } from 'react';
import produce from 'immer';
import { IAvailableInvoiceList, IListResult } from '@/services/invoice/index';
import { useState } from '@/hooks/useState';
/**
 * 请求接口，更新列表数据
 */
type IData = IAvailableInvoiceList & {
  select: boolean;
  noAvailableAmt: number;
};

type IDataList = IData[];

const _processData = (data: IAvailableInvoiceList[]) => {
  const res: IDataList = data.map(item => {
    return {
      operate_type: item.operate_type,
      pay_num: item.pay_num,
      pay_type: item.pay_type,
      non_invoice_msg: item.non_invoice_msg,
      pay_time: item.pay_time,
      select: false,
      noAvailableAmt: (item.total_amt - item.available_amt) / 100,
      total_amt: item.total_amt / 100,
      available_amt: item.available_amt / 100,
    };
  });
  return res;
};

const useListDataModel = () => {
  const [data, setData] = useState<IDataList>([]);
  /**
   * 请求两个接口并且合并数据到list
   */
  const updateListData = (
    list1: IListResult['available_invoice_list'],
    list2: IListResult['available_invoice_list'],
  ) => {
    try {
      const d1 = _processData(list1);
      const d2 = _processData(list2);
      const all = [...d1, ...d2];
      setData(all);
    } catch (e) {
      console.log('updateListData error :', e);
      throw e;
    }
  };

  /**
   * 选中列表，切换选中状态
   * @param payNum
   */
  const checkItem = (payNum: string) => {
    setData(state => {
      const s = produce(state, (prev: typeof data) => {
        prev.forEach(v => {
          if (v.pay_num === payNum) {
            v.select = !v.select;
          }
        });
      });
      return s;
    });
  };

  return {
    listData: data,
    updateListData,
    setData,
    checkItem,
  };
};

/**
 * 计算其他总数
 */
const useCalculationModel = () => {
  const [state, setState] = useState({
    total: 0,
    totalAvailable: 0,
    totalUnavailable: 0,
  });

  const calc = useCallback((dataList: IDataList) => {
    if (Array.isArray(dataList)) {
      let total = 0;
      let totalAvailable = 0;

      // console.log('dataList', dataList);
      dataList.forEach(v => {
        if (v.select) {
          total += v.total_amt;
          totalAvailable += v.available_amt;
        }
      });

      const totalUnavailable = total - totalAvailable;
      setState({
        total,
        totalAvailable,
        totalUnavailable,
      });
    }
  }, []);

  return { state, calc };
};

export default {
  _processData,
  useCalculationModel,
  useListDataModel,
};
