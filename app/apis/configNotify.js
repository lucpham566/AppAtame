import axiosService from '../commons/axiosService';
import { urlServer, urlServerNew, urlServerTiktok } from '../commons/server';

const urlNew = urlServerNew + '/api/';

export const getReportApi = (data, tiktok_account_id) => {
    console.log(data, tiktok_account_id, "getReportApi data, tiktok_account_id");
    return axiosService.get(urlServerTiktok + '/api/v1/report/get/' + tiktok_account_id, {
      params: {
        order_field: data.order_field,
        order_type: data.order_type,
        page_size: data.page_size,
        page: data.page,
        advertiser_id: data.advertiser_id,
        type: data.type,
        report_type: data.report_type,
        start_date: data.start_date,
        end_date: data.end_date,
        filtering: data.filtering,
        metrics: data.metrics,
      }
    });
  };
  