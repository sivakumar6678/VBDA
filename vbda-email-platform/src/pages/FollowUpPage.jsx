import { useState } from 'react';
import { FiMail, FiClock, FiCheck, FiX, FiFilter, FiRefreshCw } from 'react-icons/fi';

const FollowUpPage = () => {
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAIOptions, setShowAIOptions] = useState(false);
  const [selectedAITemplate, setSelectedAITemplate] = useState('reminder');

  // Sample data for invitees who haven't responded
  const invitees = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', type: 'Speaker', lastContact: '5 days ago', status: 'Not Opened' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@example.com', type: 'Sponsor', lastContact: '3 days ago', status: 'Opened' },
    { id: 3, name: 'Michael Brown', email: 'mbrown@example.com', type: 'Guest', lastContact: '7 days ago', status: 'Not Opened' },
    { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com', type: 'Speaker', lastContact: '4 days ago', status: 'Opened' },
    { id: 5, name: 'David Wilson', email: 'dwilson@example.com', type: 'Guest', lastContact: '6 days ago', status: 'Clicked' },
    { id: 6, name: 'Jennifer Lee', email: 'jlee@example.com', type: 'Sponsor', lastContact: '8 days ago', status: 'Not Opened' },
    { id: 7, name: 'Robert Taylor', email: 'rtaylor@example.com', type: 'Guest', lastContact: '5 days ago', status: 'Opened' },
    { id: 8, name: 'Lisa Anderson', email: 'lisa.a@example.com', type: 'Speaker', lastContact: '9 days ago', status: 'Not Opened' },
  ];

  // AI follow-up templates
  const aiTemplates = [
    { id: 'reminder', name: 'Gentle Reminder', description: 'A friendly reminder about the invitation' },
    { id: 'urgent', name: 'Urgent Response Needed', description: 'For recipients who need to respond soon' },
    { id: 'benefits', name: 'Highlight Benefits', description: 'Emphasizes the benefits of attending' },
    { id: 'personal', name: 'Personal Touch', description: 'More personalized follow-up based on recipient data' },
  ];

  const toggleRecipientSelection = (id) => {
    if (selectedRecipients.includes(id)) {
      setSelectedRecipients(selectedRecipients.filter(recipientId => recipientId !== id));
    } else {
      setSelectedRecipients([...selectedRecipients, id]);
    }
  };

  const selectAllRecipients = () => {
    if (selectedRecipients.length === filteredInvitees.length) {
      setSelectedRecipients([]);
    } else {
      setSelectedRecipients(filteredInvitees.map(invitee => invitee.id));
    }
  };

  const handleSendFollowUps = () => {
    alert(`Follow-up emails will be sent to ${selectedRecipients.length} recipients using the ${selectedAITemplate} template.`);
    setSelectedRecipients([]);
  };

  const handleScheduleFollowUps = () => {
    alert(`Follow-up emails have been scheduled for ${selectedRecipients.length} recipients.`);
    setSelectedRecipients([]);
  };

  // Filter invitees based on category and search query
  const filteredInvitees = invitees.filter(invitee => {
    const matchesCategory = filterCategory === 'all' || invitee.type.toLowerCase() === filterCategory.toLowerCase();
    const matchesSearch = invitee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          invitee.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Follow-Up Management</h2>
        <div className="flex mt-4 space-x-3 sm:mt-0">
          <button
            onClick={() => setShowAIOptions(!showAIOptions)}
            className={`px-4 py-2 text-sm font-medium border rounded-md shadow-sm ${
              showAIOptions 
                ? 'bg-blue-50 text-blue-700 border-blue-300' 
                : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
            }`}
          >
            <FiRefreshCw className="inline w-4 h-4 mr-2" />
            AI Follow-up Options
          </button>
          <button
            onClick={handleSendFollowUps}
            disabled={selectedRecipients.length === 0}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm ${
              selectedRecipients.length === 0 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <FiMail className="w-4 h-4 mr-2" />
            Send Follow-ups
          </button>
          <button
            onClick={handleScheduleFollowUps}
            disabled={selectedRecipients.length === 0}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm ${
              selectedRecipients.length === 0 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            <FiClock className="w-4 h-4 mr-2" />
            Schedule
          </button>
        </div>
      </div>

      {showAIOptions && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800">AI-Generated Follow-up Templates</h3>
          <p className="mt-1 text-sm text-blue-600">
            Select a template style for your follow-up emails. Our AI will personalize the content for each recipient.
          </p>
          <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-4">
            {aiTemplates.map((template) => (
              <div 
                key={template.id}
                onClick={() => setSelectedAITemplate(template.id)}
                className={`p-4 border rounded-lg cursor-pointer ${
                  selectedAITemplate === template.id 
                    ? 'border-blue-500 bg-blue-100' 
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <h4 className="text-sm font-medium text-gray-900">{template.name}</h4>
                <p className="mt-1 text-xs text-gray-500">{template.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-sm text-blue-700">
              <strong>Selected template:</strong> {aiTemplates.find(t => t.id === selectedAITemplate)?.name}
            </p>
          </div>
        </div>
      )}

      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="flex flex-col items-start justify-between px-4 py-5 border-b border-gray-200 sm:flex-row sm:items-center sm:px-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Pending Responses</h3>
            <p className="max-w-2xl mt-1 text-sm text-gray-500">
              These invitees haven't confirmed their attendance yet.
            </p>
          </div>
          <div className="flex flex-col mt-3 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 sm:mt-0">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiFilter className="w-4 h-4 text-gray-400" />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="block w-full py-2 pl-10 pr-10 text-base border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="all">All Categories</option>
                <option value="speaker">Speakers</option>
                <option value="guest">Guests</option>
                <option value="sponsor">Sponsors</option>
              </select>
            </div>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or email"
                className="block w-full py-2 pl-4 pr-10 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedRecipients.length === filteredInvitees.length && filteredInvitees.length > 0}
                            onChange={selectAllRecipients}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Last Contact
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredInvitees.map((invitee) => (
                      <tr key={invitee.id} className={selectedRecipients.includes(invitee.id) ? 'bg-blue-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedRecipients.includes(invitee.id)}
                              onChange={() => toggleRecipientSelection(invitee.id)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{invitee.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{invitee.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${
                            invitee.type === 'Speaker' 
                              ? 'bg-purple-100 text-purple-800' 
                              : invitee.type === 'Sponsor' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {invitee.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{invitee.lastContact}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${
                            invitee.status === 'Not Opened' 
                              ? 'bg-red-100 text-red-800' 
                              : invitee.status === 'Opened' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {invitee.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                          <button
                            onClick={() => toggleRecipientSelection(invitee.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            {selectedRecipients.includes(invitee.id) ? (
                              <span className="flex items-center">
                                <FiX className="w-4 h-4 mr-1" /> Deselect
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <FiCheck className="w-4 h-4 mr-1" /> Select
                              </span>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-4 bg-gray-50 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredInvitees.length}</span> of <span className="font-medium">{invitees.length}</span> invitees
            </div>
            <div className="text-sm text-gray-700">
              <span className="font-medium">{selectedRecipients.length}</span> selected for follow-up
            </div>
          </div>
        </div>
      </div>

      {/* Follow-up History */}
      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Follow-ups</h3>
          <p className="max-w-2xl mt-1 text-sm text-gray-500">
            History of follow-up emails sent in the last 30 days.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            <li className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-blue-600 truncate">Follow-up Batch #1</p>
                <div className="flex flex-shrink-0 ml-2">
                  <p className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                    3 days ago
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Sent to 12 recipients (Speakers and Sponsors)</p>
              </div>
            </li>
            <li className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-blue-600 truncate">Initial Reminder</p>
                <div className="flex flex-shrink-0 ml-2">
                  <p className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                    1 week ago
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Sent to 24 recipients (All Categories)</p>
              </div>
            </li>
            <li className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-blue-600 truncate">Urgent Response Needed</p>
                <div className="flex flex-shrink-0 ml-2">
                  <p className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                    2 weeks ago
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Sent to 8 recipients (Speakers only)</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FollowUpPage;