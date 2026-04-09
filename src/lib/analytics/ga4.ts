import { BetaAnalyticsDataClient } from '@google-analytics/data';
import type { AnalyticsData } from './types';

function getClient() {
  const keyBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64;
  if (!keyBase64) throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_KEY_BASE64');

  const credentials = JSON.parse(
    Buffer.from(keyBase64, 'base64').toString()
  );

  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key,
    },
    projectId: credentials.project_id,
  });
}

function getPropertyId() {
  const id = process.env.GA4_PROPERTY_ID;
  if (!id) throw new Error('Missing GA4_PROPERTY_ID');
  return id;
}

const cache = new Map<string, { data: AnalyticsData; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000;

export async function getAnalyticsData(
  range: '7d' | '30d' | '90d'
): Promise<AnalyticsData> {
  const cached = cache.get(range);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const client = getClient();
  const property = `properties/${getPropertyId()}`;
  const daysAgo = range === '7d' ? '7' : range === '30d' ? '30' : '90';
  const dateRange = { startDate: `${daysAgo}daysAgo`, endDate: 'today' };

  const [summaryRes, dailyRes, pagesRes, sourcesRes, devicesRes] =
    await Promise.all([
      client.runReport({
        property,
        dateRanges: [dateRange],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'sessions' },
          { name: 'totalUsers' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' },
        ],
      }),
      client.runReport({
        property,
        dateRanges: [dateRange],
        dimensions: [{ name: 'date' }],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'sessions' },
          { name: 'totalUsers' },
        ],
        orderBys: [{ dimension: { dimensionName: 'date' } }],
      }),
      client.runReport({
        property,
        dateRanges: [dateRange],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 10,
      }),
      client.runReport({
        property,
        dateRanges: [dateRange],
        dimensions: [{ name: 'sessionSource' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 10,
      }),
      client.runReport({
        property,
        dateRanges: [dateRange],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'sessions' }],
      }),
    ]);

  const summaryRow = summaryRes[0]?.rows?.[0]?.metricValues;
  const summary = {
    totalPageViews: Number(summaryRow?.[0]?.value ?? 0),
    totalSessions: Number(summaryRow?.[1]?.value ?? 0),
    totalUsers: Number(summaryRow?.[2]?.value ?? 0),
    avgSessionDuration: Number(summaryRow?.[3]?.value ?? 0),
    bounceRate: Number(summaryRow?.[4]?.value ?? 0),
  };

  const daily = (dailyRes[0]?.rows ?? []).map((row) => ({
    date: row.dimensionValues?.[0]?.value ?? '',
    pageViews: Number(row.metricValues?.[0]?.value ?? 0),
    sessions: Number(row.metricValues?.[1]?.value ?? 0),
    users: Number(row.metricValues?.[2]?.value ?? 0),
  }));

  const topPages = (pagesRes[0]?.rows ?? []).map((row) => ({
    pagePath: row.dimensionValues?.[0]?.value ?? '',
    pageViews: Number(row.metricValues?.[0]?.value ?? 0),
  }));

  const trafficSources = (sourcesRes[0]?.rows ?? []).map((row) => ({
    source: row.dimensionValues?.[0]?.value ?? '(direct)',
    sessions: Number(row.metricValues?.[0]?.value ?? 0),
  }));

  const devices = (devicesRes[0]?.rows ?? []).map((row) => ({
    deviceCategory: row.dimensionValues?.[0]?.value ?? 'unknown',
    sessions: Number(row.metricValues?.[0]?.value ?? 0),
  }));

  const data: AnalyticsData = { summary, daily, topPages, trafficSources, devices };
  cache.set(range, { data, timestamp: Date.now() });
  return data;
}
