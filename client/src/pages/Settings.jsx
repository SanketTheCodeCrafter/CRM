import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';
import {
  Sun, Moon, Bell, Database, Palette,
  Save, Check,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { settings, updateSetting } = useSettings();
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    statusChanges: true,
    newLeads: false,
    weeklyReport: true,
  });
  const [saved, setSaved] = useState(false);

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setSaved(true);
    toast.success('Settings saved successfully!');
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Settings
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-500">
          Manage your application preferences, appearance, and notification settings.
        </p>
      </div>

      {/* Appearance */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/60">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-indigo-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Appearance</h3>
          </div>
        </div>
        <div className="p-6 space-y-5">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Theme</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Toggle between light and dark mode</span>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
                theme === 'dark' ? 'bg-indigo-600' : 'bg-slate-200'
              }`}
            >
              <span
                className={`inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                }`}
              >
                {theme === 'dark' ? (
                  <Moon className="h-3 w-3 text-indigo-600" />
                ) : (
                  <Sun className="h-3 w-3 text-amber-500" />
                )}
              </span>
            </button>
          </div>

          {/* Display Density */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Display Density</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Adjust the spacing of table rows</span>
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-slate-50 dark:bg-slate-950/40">
              {['compact', 'comfortable', 'spacious'].map((density) => (
                <button
                  key={density}
                  onClick={() => updateSetting('displayDensity', density)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition duration-150 ${
                    settings.displayDensity === density
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                >
                  {density}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Data & Display */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/60">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-indigo-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Data & Display</h3>
          </div>
        </div>
        <div className="p-6 space-y-5">
          {/* Leads Per Page */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Leads Per Page</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Number of leads displayed in the table view</span>
            </div>
            <select
              value={settings.leadsPerPage}
              onChange={(e) => updateSetting('leadsPerPage', Number(e.target.value))}
              className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 focus:border-indigo-500 focus:outline-none transition"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>

          {/* Default View */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Default View</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Choose the default pipeline view on the dashboard</span>
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-slate-50 dark:bg-slate-950/40">
              {['table', 'kanban'].map((viewOption) => (
                <button
                  key={viewOption}
                  onClick={() => updateSetting('defaultView', viewOption)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition duration-150 ${
                    settings.defaultView === viewOption
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                >
                  {viewOption === 'table' ? 'Table' : 'Kanban'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/60">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-indigo-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Notifications</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {[
            { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive email notifications for important events' },
            { key: 'statusChanges', label: 'Status Changes', desc: 'Notify when a lead changes pipeline status' },
            { key: 'newLeads', label: 'New Leads', desc: 'Alert when a new lead is added to the system' },
            { key: 'weeklyReport', label: 'Weekly Report', desc: 'Receive a weekly summary of lead activity' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-1">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.label}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</span>
              </div>
              <button
                onClick={() => handleNotificationToggle(item.key)}
                className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                  notifications[item.key] ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    notifications[item.key] ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pb-8">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-3 text-sm font-semibold shadow-md hover:shadow-indigo-500/25 transition duration-150"
        >
          {saved ? (
            <>
              <Check className="h-4 w-4" />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save Preferences</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
