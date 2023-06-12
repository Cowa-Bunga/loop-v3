import { Injectable } from '@nestjs/common'
import { BigQuery } from '@google-cloud/bigquery'

/**
 * @desc: BigQuery Apis for data analysis
 * @see: https://cloud.google.com/nodejs/docs/reference/bigquery/latest/bigquery/bigquery
 * @see: https://console.cloud.google.com/bigquery?project=cb-dev-298308&ws=!1m5!1m4!4m3!1scb-dev-298308!2sdev_analytics
 * @see: https://github.com/googleapis/nodejs-bigquery/blob/main/samples/listModels.js
 */
@Injectable()
export class QueryService {
  driverLocation = async (client_id) =>
    await new BigQuery()
      .createQueryJob(
        `SELECT * FROM 'cb-dev-298308.dev_analytics.cb_driver_location' WHERE client_id=${client_id} ORDER_BY order_number DESC, LIMIT 1000`
      )
      .then((data) => data[0].getQueryResults())

  driversOnline = async (client_id: string) =>
    await new BigQuery()
      .createQueryJob(
        `SELECT * FROM 'cb-dev-298308.dev_analytics.drivers_online' WHERE client_id=${client_id} LIMIT 1000`
      )
      .then((data) => data[0].getQueryResults())

  // test: mYPoEBMCCuqJ0DIZ7yfM
  deliveredOrders = async (client_id: string) =>
    await new BigQuery()
      .createQueryJob(
        'SELECT * FROM `cb-dev-298308.dev_analytics.test-delivered_orders` WHERE client_id="' +
          client_id +
          '" LIMIT 10000'
      )
      .then((data) => data[0].getQueryResults())
      .catch((err) => console.warn(err))
}
