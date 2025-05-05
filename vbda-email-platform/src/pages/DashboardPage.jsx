import { FiMail, FiEye, FiMousePointer, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  // Sample data for the dashboard
  const stats = [
    { name: 'Total Invites Sent', value: '1,248', icon: <FiMail className="w-6 h-6" />, color: 'bg-blue-500' },
    { name: 'Open Rate', value: '68%', icon: <FiEye className="w-6 h-6" />, color: 'bg-green-500' },
    { name: 'Click Rate', value: '42%', icon: <FiMousePointer className="w-6 h-6" />, color: 'bg-purple-500' },
    { name: 'Follow-ups Pending', value: '37', icon: <FiClock className="w-6 h-6" />, color: 'bg-yellow-500' },
  ];

  // Sample recent activity data
  const recentActivity = [
    { id: 1, type: 'Email Sent', recipient: 'John Smith (Speaker)', time: '2 hours ago' },
    { id: 2, type: 'Email Opened', recipient: 'Sarah Johnson (Sponsor)', time: '3 hours ago' },
    { id: 3, type: 'Link Clicked', recipient: 'Michael Brown (Guest)', time: '5 hours ago' },
    { id: 4, type: 'Follow-up Sent', recipient: 'Emily Davis (Speaker)', time: '1 day ago' },
    { id: 5, type: 'Registration Complete', recipient: 'David Wilson (Guest)', time: '1 day ago' },
  ];

  // Sample upcoming emails
  const upcomingEmails = [
    { id: 1, type: 'Initial Invitation', recipients: 'All Speakers', scheduledFor: 'Today, 3:00 PM' },
    { id: 2, type: 'Follow-up', recipients: 'Non-responsive Sponsors', scheduledFor: 'Tomorrow, 10:00 AM' },
    { id: 3, type: 'Event Reminder', recipients: 'All Registered Guests', scheduledFor: 'May 15, 9:00 AM' },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="overflow-hidden bg-white rounded-lg shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 p-3 ${stat.color} rounded-md`}>
                  <div className="text-white">{stat.icon}</div>
                </div>
                <div className="flex-1 w-0 ml-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="px-5 py-3 bg-gray-50">
              <div className="text-sm">
                <Link to="/analytics" className="font-medium text-blue-600 hover:text-blue-500">
                  View details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 mt-8 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
            <p className="max-w-2xl mt-1 text-sm text-gray-500">Latest interactions with your emails.</p>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate">{activity.type}</p>
                    <div className="flex flex-shrink-0 ml-2">
                      <p className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{activity.recipient}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-4 py-4 text-sm border-t border-gray-200 sm:px-6">
            <Link to="/analytics" className="font-medium text-blue-600 hover:text-blue-500">
              View all activity
            </Link>
          </div>
        </div>

        {/* Upcoming Scheduled Emails */}
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Upcoming Scheduled Emails</h3>
            <p className="max-w-2xl mt-1 text-sm text-gray-500">Emails that will be sent automatically.</p>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {upcomingEmails.map((email) => (
                <li key={email.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate">{email.type}</p>
                    <div className="flex flex-shrink-0 ml-2">
                      <p className="inline-flex px-2 text-xs font-semibold leading-5 text-purple-800 bg-purple-100 rounded-full">
                        {email.scheduledFor}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">To: {email.recipients}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-4 py-4 text-sm border-t border-gray-200 sm:px-6">
            <Link to="/compose" className="font-medium text-blue-600 hover:text-blue-500">
              Schedule new email
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/compose"
            className="flex items-center p-4 transition duration-150 bg-white rounded-lg shadow hover:bg-blue-50"
          >
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-white bg-blue-600 rounded-md">
              <FiMail className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">Compose New Email</h4>
              <p className="mt-1 text-sm text-gray-500">Create and send a new email campaign</p>
            </div>
          </Link>
          <Link
            to="/follow-ups"
            className="flex items-center p-4 transition duration-150 bg-white rounded-lg shadow hover:bg-blue-50"
          >
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-white bg-yellow-500 rounded-md">
              <FiClock className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">Manage Follow-ups</h4>
              <p className="mt-1 text-sm text-gray-500">Review and send follow-up emails</p>
            </div>
          </Link>
          <Link
            to="/analytics"
            className="flex items-center p-4 transition duration-150 bg-white rounded-lg shadow hover:bg-blue-50"
          >
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-white bg-purple-600 rounded-md">
              <FiEye className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">View Analytics</h4>
              <p className="mt-1 text-sm text-gray-500">Check detailed performance metrics</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;