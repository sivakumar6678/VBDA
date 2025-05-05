import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FiSend, FiClock, FiSave } from 'react-icons/fi';

const ComposePage = () => {
  const [emailContent, setEmailContent] = useState('');
  const [subject, setSubject] = useState('');
  const [recipientType, setRecipientType] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [useAI, setUseAI] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  // Sample templates
  const templates = [
    { id: 1, name: 'Initial Invitation', description: 'First invitation to the event' },
    { id: 2, name: 'Follow-up Reminder', description: 'Reminder for those who haven\'t responded' },
    { id: 3, name: 'Event Details', description: 'Information about the event schedule' },
    { id: 4, name: 'Thank You', description: 'Thank you message for participants' },
  ];

  // Sample recipient types
  const recipientTypes = [
    { value: 'speaker', label: 'Speakers' },
    { value: 'guest', label: 'Guests' },
    { value: 'sponsor', label: 'Sponsors' },
    { value: 'all', label: 'All Attendees' },
  ];

  // Rich text editor modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const handleTemplateSelect = (templateId) => {
    // In a real app, this would load the template content
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSubject(`VBDA 2025: ${template.name}`);
      setEmailContent(`<h2>Dear {Recipient Name},</h2><p>We're excited to invite you to VBDA 2025!</p><p>This is a template for ${template.description.toLowerCase()}.</p><p>Looking forward to your participation.</p><p>Best regards,<br>VBDA 2025 Team</p>`);
    }
  };

  const handleSendEmail = (schedule = false) => {
    // In a real app, this would send the email or schedule it
    const action = schedule ? 'scheduled' : 'sent';
    alert(`Email ${action} successfully!`);
    
    // Reset form after sending
    if (!schedule) {
      setSubject('');
      setEmailContent('');
      setRecipientType('');
      setScheduledDate('');
      setScheduledTime('');
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Compose Email</h2>
        <div className="flex mt-4 space-x-3 sm:mt-0">
          <button
            onClick={togglePreview}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            {showPreview ? 'Edit Email' : 'Preview Email'}
          </button>
          <button
            onClick={() => handleSendEmail(false)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
          >
            <FiSend className="w-4 h-4 mr-2" />
            Send Now
          </button>
          <button
            onClick={() => handleSendEmail(true)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700"
          >
            <FiClock className="w-4 h-4 mr-2" />
            Schedule
          </button>
        </div>
      </div>

      {!showPreview ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Email Composition Form */}
            <div className="overflow-hidden bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter email subject"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="recipient-type" className="block text-sm font-medium text-gray-700">
                    Recipient Type
                  </label>
                  <select
                    id="recipient-type"
                    value={recipientType}
                    onChange={(e) => setRecipientType(e.target.value)}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select recipient type</option>
                    {recipientTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email Content</label>
                  <div className="mt-1">
                    <ReactQuill
                      theme="snow"
                      value={emailContent}
                      onChange={setEmailContent}
                      modules={modules}
                      className="h-64 bg-white rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="scheduled-date" className="block text-sm font-medium text-gray-700">
                      Scheduled Date
                    </label>
                    <input
                      type="date"
                      id="scheduled-date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="scheduled-time" className="block text-sm font-medium text-gray-700">
                      Scheduled Time
                    </label>
                    <input
                      type="time"
                      id="scheduled-time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center mt-4">
                  <input
                    id="use-ai"
                    type="checkbox"
                    checked={useAI}
                    onChange={(e) => setUseAI(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="use-ai" className="block ml-2 text-sm text-gray-700">
                    Use AI to optimize email content and subject line
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* Templates and AI Suggestions */}
            <div className="overflow-hidden bg-white rounded-lg shadow">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Email Templates</h3>
                <p className="max-w-2xl mt-1 text-sm text-gray-500">
                  Select a template to get started quickly.
                </p>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {templates.map((template) => (
                    <li key={template.id} className="px-4 py-4 cursor-pointer hover:bg-gray-50 sm:px-6" onClick={() => handleTemplateSelect(template.id)}>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-blue-600 truncate">{template.name}</p>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{template.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="mt-6 overflow-hidden bg-white rounded-lg shadow">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">AI Suggestions</h3>
                <p className="max-w-2xl mt-1 text-sm text-gray-500">
                  Personalized recommendations for your email.
                </p>
              </div>
              <div className="border-t border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <div className="p-4 mb-4 bg-blue-50 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Subject Line Suggestion</h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>
                            "Don't Miss VBDA 2025: Your Exclusive Invitation"
                          </p>
                        </div>
                        <button className="inline-flex items-center mt-2 text-xs font-medium text-blue-600">
                          Apply suggestion
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Best Send Time</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>
                            Tuesday, 10:00 AM (Highest open rate)
                          </p>
                        </div>
                        <button className="inline-flex items-center mt-2 text-xs font-medium text-green-600">
                          Schedule for this time
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Email Preview
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Email Preview</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="mb-4 border-b border-gray-200 pb-2">
                <p className="text-sm text-gray-500">From: VBDA 2025 &lt;info@vbda2025.com&gt;</p>
                <p className="text-sm text-gray-500">To: {recipientType ? recipientTypes.find(t => t.value === recipientType)?.label : 'All Recipients'}</p>
                <p className="text-sm text-gray-500">Subject: {subject || 'No Subject'}</p>
                {(scheduledDate && scheduledTime) && (
                  <p className="text-sm text-gray-500">Scheduled for: {scheduledDate} at {scheduledTime}</p>
                )}
              </div>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: emailContent || '<p>No content</p>' }} />
            </div>
          </div>
        </div>
      )}

      {/* Save Draft Button */}
      <div className="flex justify-end">
        <button
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          <FiSave className="w-4 h-4 mr-2" />
          Save as Draft
        </button>
      </div>
    </div>
  );
};

export default ComposePage;