import { useState, useEffect } from 'react';
import { FiSave, FiRefreshCw, FiMail, FiUser, FiSliders, FiFileText, FiClock, FiToggleRight, FiTrash2, FiAlertCircle } from 'react-icons/fi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [senderName, setSenderName] = useState('VBDA 2025 Team');
  const [senderEmail, setSenderEmail] = useState('info@vbda2025.com');
  const [replyToEmail, setReplyToEmail] = useState('support@vbda2025.com');
  const [emailSignature, setEmailSignature] = useState('<p>Best regards,<br>VBDA 2025 Team</p>');
  const [aiAssistEnabled, setAiAssistEnabled] = useState(true);
  const [autoFollowUpEnabled, setAutoFollowUpEnabled] = useState(true);
  const [followUpDelay, setFollowUpDelay] = useState(3);
  const [maxFollowUps, setMaxFollowUps] = useState(2);
  const [templateName, setTemplateName] = useState('');
  const [templateContent, setTemplateContent] = useState('');
  const [templates, setTemplates] = useState([
    { id: 1, name: 'Initial Invitation', content: '<p>Dear {Recipient Name},</p><p>We are pleased to invite you to VBDA 2025...</p>' },
    { id: 2, name: 'Follow-up Reminder', content: '<p>Dear {Recipient Name},</p><p>We noticed you haven\'t responded to our invitation...</p>' },
    { id: 3, name: 'Event Details', content: '<p>Dear {Recipient Name},</p><p>Here are the details for the upcoming VBDA 2025 event...</p>' },
    { id: 4, name: 'Thank You', content: '<p>Dear {Recipient Name},</p><p>Thank you for confirming your attendance to VBDA 2025...</p>' },
  ]);
  const [editingTemplateId, setEditingTemplateId] = useState(null);
  const [templateError, setTemplateError] = useState('');
  const [isTemplateLoading, setIsTemplateLoading] = useState(false);

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

  // Load templates and settings from localStorage on component mount
  useEffect(() => {
    try {
      // Load templates
      const savedTemplates = localStorage.getItem('emailTemplates');
      if (savedTemplates) {
        setTemplates(JSON.parse(savedTemplates));
      }
      
      // Load email settings
      const savedSettings = localStorage.getItem('emailSettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setSenderName(settings.senderName || 'VBDA 2025 Team');
        setSenderEmail(settings.senderEmail || 'info@vbda2025.com');
        setReplyToEmail(settings.replyToEmail || 'support@vbda2025.com');
        setEmailSignature(settings.emailSignature || '<p>Best regards,<br>VBDA 2025 Team</p>');
        setAiAssistEnabled(settings.aiAssistEnabled !== undefined ? settings.aiAssistEnabled : true);
        setAutoFollowUpEnabled(settings.autoFollowUpEnabled !== undefined ? settings.autoFollowUpEnabled : true);
        setFollowUpDelay(settings.followUpDelay || 3);
        setMaxFollowUps(settings.maxFollowUps || 2);
      }
    } catch (err) {
      console.error('Error loading data from localStorage:', err);
    }
  }, []);

  const handleSaveSettings = () => {
    // Save email settings to localStorage
    try {
      const emailSettings = {
        senderName,
        senderEmail,
        replyToEmail,
        emailSignature,
        aiAssistEnabled,
        autoFollowUpEnabled,
        followUpDelay,
        maxFollowUps
      };
      localStorage.setItem('emailSettings', JSON.stringify(emailSettings));
      alert('Settings saved successfully!');
    } catch (err) {
      console.error('Error saving settings:', err);
      alert('Failed to save settings. Please try again.');
    }
  };

  const handleEditTemplate = (template) => {
    setEditingTemplateId(template.id);
    setTemplateName(template.name);
    setTemplateContent(template.content);
  };

  const handleDeleteTemplate = (templateId) => {
    if (confirm('Are you sure you want to delete this template?')) {
      try {
        const updatedTemplates = templates.filter(template => template.id !== templateId);
        setTemplates(updatedTemplates);
        localStorage.setItem('emailTemplates', JSON.stringify(updatedTemplates));
        
        // If we're currently editing this template, reset the form
        if (editingTemplateId === templateId) {
          setEditingTemplateId(null);
          setTemplateName('');
          setTemplateContent('');
        }
      } catch (err) {
        console.error('Error deleting template:', err);
        setTemplateError('Failed to delete template. Please try again.');
        setTimeout(() => setTemplateError(''), 3000);
      }
    }
  };

  const handleSaveTemplate = () => {
    if (!templateName || !templateContent) {
      setTemplateError('Please provide both template name and content.');
      setTimeout(() => setTemplateError(''), 3000);
      return;
    }
    
    setIsTemplateLoading(true);
    
    try {
      let updatedTemplates;
      
      if (editingTemplateId) {
        // Update existing template
        updatedTemplates = templates.map(template => 
          template.id === editingTemplateId 
            ? { ...template, name: templateName, content: templateContent }
            : template
        );
      } else {
        // Create new template
        const newTemplate = {
          id: Date.now(),
          name: templateName,
          content: templateContent
        };
        updatedTemplates = [...templates, newTemplate];
      }
      
      setTemplates(updatedTemplates);
      localStorage.setItem('emailTemplates', JSON.stringify(updatedTemplates));
      
      // Reset form
      setEditingTemplateId(null);
      setTemplateName('');
      setTemplateContent('');
      
      alert(`Template "${templateName}" saved successfully!`);
    } catch (err) {
      console.error('Error saving template:', err);
      setTemplateError('Failed to save template. Please try again.');
      setTimeout(() => setTemplateError(''), 3000);
    } finally {
      setIsTemplateLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <button
          onClick={handleSaveSettings}
          className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 sm:mt-0"
        >
          <FiSave className="w-4 h-4 mr-2" />
          Save Settings
        </button>
      </div>

      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('general')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'general'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FiUser className="inline w-4 h-4 mr-2" />
              General
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'email'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FiMail className="inline w-4 h-4 mr-2" />
              Email Settings
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'templates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FiFileText className="inline w-4 h-4 mr-2" />
              Email Templates
            </button>
            <button
              onClick={() => setActiveTab('automation')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'automation'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FiRefreshCw className="inline w-4 h-4 mr-2" />
              Automation
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Account Information</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Update your account details and preferences.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="account-name" className="block text-sm font-medium text-gray-700">
                    Account Name
                  </label>
                  <input
                    type="text"
                    id="account-name"
                    value="VBDA 2025"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="account-email" className="block text-sm font-medium text-gray-700">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    id="account-email"
                    value="admin@vbda2025.com"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    disabled
                  />
                </div>
              </div>

              <div className="pt-5 mt-8 border-t border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Preferences</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="notifications"
                        type="checkbox"
                        checked={true}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="notifications" className="font-medium text-gray-700">
                        Email Notifications
                      </label>
                      <p className="text-gray-500">Receive notifications about email campaign performance.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="analytics"
                        type="checkbox"
                        checked={true}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="analytics" className="font-medium text-gray-700">
                        Analytics Reports
                      </label>
                      <p className="text-gray-500">Receive weekly analytics reports via email.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Email Settings */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Email Configuration</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Configure your email sender details and signature.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="sender-name" className="block text-sm font-medium text-gray-700">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    id="sender-name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="sender-email" className="block text-sm font-medium text-gray-700">
                    Sender Email
                  </label>
                  <input
                    type="email"
                    id="sender-email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="reply-to" className="block text-sm font-medium text-gray-700">
                    Reply-To Email
                  </label>
                  <input
                    type="email"
                    id="reply-to"
                    value={replyToEmail}
                    onChange={(e) => setReplyToEmail(e.target.value)}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="pt-5 mt-8 border-t border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Email Signature</h3>
                <div className="mt-4">
                  <ReactQuill
                    theme="snow"
                    value={emailSignature}
                    onChange={setEmailSignature}
                    modules={modules}
                    className="h-40 bg-white rounded-md"
                  />
                </div>
              </div>

              <div className="pt-5 mt-8 border-t border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Email Delivery</h3>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="daily-limit" className="block text-sm font-medium text-gray-700">
                      Daily Email Limit
                    </label>
                    <input
                      type="number"
                      id="daily-limit"
                      defaultValue={500}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="throttle-rate" className="block text-sm font-medium text-gray-700">
                      Throttle Rate (emails per hour)
                    </label>
                    <input
                      type="number"
                      id="throttle-rate"
                      defaultValue={100}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Email Templates */}
          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Email Templates</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your email templates for different purposes.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Available Templates</h3>
                    </div>
                    <div className="border-t border-gray-200">
                      <ul className="divide-y divide-gray-200">
                        {templates.map((template) => (
                          <li 
                            key={template.id} 
                            className="px-4 py-4 hover:bg-gray-50 sm:px-6"
                          >
                            <div className="flex items-center justify-between">
                              <p 
                                className="text-sm font-medium text-blue-600 truncate cursor-pointer"
                                onClick={() => handleEditTemplate(template)}
                              >
                                {template.name}
                              </p>
                              <div className="flex space-x-2">
                                <button 
                                  className="text-xs text-blue-600 hover:text-blue-800"
                                  onClick={() => handleEditTemplate(template)}
                                >
                                  Edit
                                </button>
                                <button 
                                  className="text-xs text-red-600 hover:text-red-800"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteTemplate(template.id);
                                  }}
                                >
                                  <FiTrash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="px-4 py-4 border-t border-gray-200 sm:px-6">
                      <button 
                        onClick={() => {
                          setTemplateName('');
                          setTemplateContent('');
                        }}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                      >
                        + Create New Template
                      </button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        {templateName ? `Edit Template: ${templateName}` : 'Create New Template'}
                      </h3>
                    </div>
                    <div className="px-4 py-5 border-t border-gray-200 sm:px-6">
                      <div className="mb-4">
                        <label htmlFor="template-name" className="block text-sm font-medium text-gray-700">
                          Template Name
                        </label>
                        <input
                          type="text"
                          id="template-name"
                          value={templateName}
                          onChange={(e) => setTemplateName(e.target.value)}
                          placeholder="Enter template name"
                          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Template Content
                        </label>
                        <div className="mt-1">
                          <ReactQuill
                            theme="snow"
                            value={templateContent}
                            onChange={setTemplateContent}
                            modules={modules}
                            className="h-64 bg-white rounded-md"
                            placeholder="Enter template content here..."
                          />
                        </div>
                      </div>
                      {templateError && (
                        <div className="mt-4 p-2 bg-red-50 text-red-700 rounded-md flex items-center">
                          <FiAlertCircle className="w-4 h-4 mr-2" />
                          {templateError}
                        </div>
                      )}
                      <div className="flex justify-between mt-6">
                        {editingTemplateId && (
                          <button
                            onClick={() => {
                              setEditingTemplateId(null);
                              setTemplateName('');
                              setTemplateContent('');
                            }}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          onClick={handleSaveTemplate}
                          disabled={isTemplateLoading}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                        >
                          <FiSave className="w-4 h-4 mr-2" />
                          {isTemplateLoading ? 'Saving...' : editingTemplateId ? 'Update Template' : 'Save Template'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Automation Settings */}
          {activeTab === 'automation' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Automation Settings</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Configure AI-powered automation features.
                </p>
              </div>

              <div className="pt-5 mt-8 border-t border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">AI Assistant</h3>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <FiSliders className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">AI Content Optimization</span>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="ai-assist"
                      checked={aiAssistEnabled}
                      onChange={() => setAiAssistEnabled(!aiAssistEnabled)}
                      className="absolute block w-6 h-6 bg-white border-2 rounded-full appearance-none cursor-pointer checked:right-0 checked:border-blue-600 focus:outline-none"
                    />
                    <label
                      htmlFor="ai-assist"
                      className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                        aiAssistEnabled ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    ></label>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Allow AI to optimize email content, subject lines, and suggest improvements.
                </p>
              </div>

              <div className="pt-5 mt-8 border-t border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Automated Follow-ups</h3>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <FiClock className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Auto Follow-up</span>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="auto-followup"
                      checked={autoFollowUpEnabled}
                      onChange={() => setAutoFollowUpEnabled(!autoFollowUpEnabled)}
                      className="absolute block w-6 h-6 bg-white border-2 rounded-full appearance-none cursor-pointer checked:right-0 checked:border-blue-600 focus:outline-none"
                    />
                    <label
                      htmlFor="auto-followup"
                      className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                        autoFollowUpEnabled ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    ></label>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Automatically send follow-up emails to recipients who haven't responded.
                </p>

                {autoFollowUpEnabled && (
                  <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="followup-delay" className="block text-sm font-medium text-gray-700">
                        Days Before First Follow-up
                      </label>
                      <input
                        type="number"
                        id="followup-delay"
                        value={followUpDelay}
                        onChange={(e) => setFollowUpDelay(parseInt(e.target.value))}
                        min="1"
                        max="14"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="max-followups" className="block text-sm font-medium text-gray-700">
                        Maximum Number of Follow-ups
                      </label>
                      <input
                        type="number"
                        id="max-followups"
                        value={maxFollowUps}
                        onChange={(e) => setMaxFollowUps(parseInt(e.target.value))}
                        min="1"
                        max="5"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-5 mt-8 border-t border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Smart Scheduling</h3>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <FiToggleRight className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Optimal Send Time</span>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="smart-scheduling"
                      checked={true}
                      className="absolute block w-6 h-6 bg-white border-2 rounded-full appearance-none cursor-pointer checked:right-0 checked:border-blue-600 focus:outline-none"
                    />
                    <label
                      htmlFor="smart-scheduling"
                      className="block h-6 overflow-hidden bg-blue-600 rounded-full cursor-pointer"
                    ></label>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  AI will analyze recipient behavior and suggest the best times to send emails for maximum engagement.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;