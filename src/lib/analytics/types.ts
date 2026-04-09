export interface AnalyticsSummary {
  totalPageViews: number;
  totalSessions: number;
  totalUsers: number;
  avgSessionDuration: number;
  bounceRate: number;
}

export interface DailyMetric {
  date: string;
  pageViews: number;
  sessions: number;
  users: number;
}

export interface TopPage {
  pagePath: string;
  pageViews: number;
}

export interface TrafficSource {
  source: string;
  sessions: number;
}

export interface DeviceBreakdown {
  deviceCategory: string;
  sessions: number;
}

export interface AnalyticsData {
  summary: AnalyticsSummary;
  daily: DailyMetric[];
  topPages: TopPage[];
  trafficSources: TrafficSource[];
  devices: DeviceBreakdown[];
}
