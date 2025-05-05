import { useState } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  ArcElement,
  BarElement,
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { FiDownload, FiCalendar, FiFilter } from 'react-icons/fi';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const [recipientFilter, setRecipientFilter] = useState('all');

  // Sample data for charts
  const dates = ['Apr 1', 'Apr 5', 'Apr 10', 'Apr 15', 'Apr 20', 'Apr 25', 'May 1', 'May 5'];
  
  // Line chart data - Email performance over time
  const lineChartData = {
    labels: dates,
    datasets: [
      {
        label: 'Sent',
        data: [150, 230, 180, 290, 320, 250, 400, 350],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Opened',
        data: [90, 160, 120, 200, 220, 170, 280, 240],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Clicked',
        data: [40, 80, 60, 100, 120, 90, 150, 130],
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Pie chart data - Email status distribution
  const pieChartData = {
    labels: ['Opened', 'Not Opened', 'Clicked', 'Bounced'],
    datasets: [
      {
        data: [65, 20, 10, 5],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(239, 68, 68)',
          'rgb(139, 92, 246)',
          'rgb(107, 114, 128)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Bar chart data - Recipient type engagement
  const barChartData = {
    labels: ['Speakers', 'Guests', 'Sponsors'],
    datasets: [
      {
        label: 'Open Rate',
        data: [75, 60, 82],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
      {
        label: 'Click Rate',
        data: [45, 30, 55],
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
      },
      {
        label: 'Response Rate',
        data: [35, 20, 40],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
      },
    ],
  };

  // Chart options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Email Performance Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Email Status Distribution',
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Engagement by Recipient Type (%)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  // Sample metrics data
  const metrics = [
    { name: 'Total Emails Sent', value: '1,248', change: '+12%', trend: 'up' },
    { name: 'Average Open Rate', value: '68%', change: '+5%', trend: 'up' },
    { name: 'Average Click Rate', value: '42%', change: '+3%', trend: 'up' },
    { name: 'Bounce Rate', value: '2.3%', change: '-0.5%', trend: 'down' },
    { name: 'Response Rate', value: '28%', change: '+8%', trend: 'up' },
    { name: 'Conversion Rate', value: '18%', change: '+4%', trend: 'up' },
  ];

  // Top performing emails
  const topEmails = [
    { id: 1, subject: 'VBDA 2025: Your Exclusive Invitation', openRate: '82%', clickRate: '58%', sentDate: 'Apr 15' },
    { id: 2, subject: 'Last Chance to Register for VBDA 2025', openRate: '78%', clickRate: '52%', sentDate: 'Apr 28' },
    { id: 3, subject: 'VBDA 2025: Speaker Confirmation', openRate: '75%', clickRate: '48%', sentDate: 'Apr 10' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Email Analytics</h2>
        <div className="flex mt-4 space-x-3 sm:mt-0">
          <div className="relative inline-block">
            <div className="flex items-center">
              <FiCalendar className="absolute left-3 text-gray-400" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="pl-9 pr-10 py-2 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="year">Last year</option>
              </select>
            </div>
          </div>
          <div className="relative inline-block">
            <div className="flex items-center">
              <FiFilter className="absolute left-3 text-gray-400" />
              <select
                value={recipientFilter}
                onChange={(e) => setRecipientFilter(e.target.value)}
                className="pl-9 pr-10 py-2 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Recipients</option>
                <option value="speakers">Speakers</option>
                <option value="guests">Guests</option>
                <option value="sponsors">Sponsors</option>
              </select>
            </div>
          </div>
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
            <FiDownload className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.name} className="overflow-hidden bg-white rounded-lg shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-1 w-0">
                  <p className="text-sm font-medium text-gray-500 truncate">{metric.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                </div>
                <div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    metric.trend === 'up' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <Bar data={barChartData} options={barChartOptions} />
      </div>

      {/* Top Performing Emails */}
      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Top Performing Emails</h3>
          <p className="max-w-2xl mt-1 text-sm text-gray-500">
            Emails with the highest engagement rates.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Subject
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Sent Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Open Rate
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Click Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {topEmails.map((email) => (
                      <tr key={email.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-blue-600">{email.subject}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{email.sentDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{email.openRate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{email.clickRate}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="p-6 bg-blue-50 rounded-lg shadow">
        <h3 className="text-lg font-medium text-blue-800">AI-Generated Insights</h3>
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-white rounded-lg">
            <h4 className="text-sm font-medium text-gray-900">Best Time to Send Emails</h4>
            <p className="mt-1 text-sm text-gray-600">
              Based on your audience's engagement patterns, the optimal time to send emails is <strong>Tuesday and Thursday between 10:00 AM and 12:00 PM</strong>. Emails sent during these times have shown a 23% higher open rate.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <h4 className="text-sm font-medium text-gray-900">Subject Line Analysis</h4>
            <p className="mt-1 text-sm text-gray-600">
              Subject lines containing personalization and the phrase "VBDA 2025" perform 18% better than generic subjects. Consider using personalized subject lines for your next campaign.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <h4 className="text-sm font-medium text-gray-900">Recommended Actions</h4>
            <ul className="mt-1 ml-5 text-sm text-gray-600 list-disc">
              <li>Send a follow-up to the 37 speakers who haven't responded yet</li>
              <li>Optimize your email templates for mobile devices (42% of opens are on mobile)</li>
              <li>Include more visual content in emails to sponsors to increase click rates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;