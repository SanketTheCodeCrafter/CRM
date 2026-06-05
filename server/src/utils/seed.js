require('dotenv').config();
const mongoose = require('mongoose');
const Lead = require('../models/Lead');
const connectDB = require('../config/db');

const mockLeads = [
  {
    name: 'Alice Johnson',
    email: 'alice.j@innovate.co',
    phone: '+1 (555) 019-2834',
    company: 'Innovate Tech',
    status: 'New',
    notes: 'Interested in our enterprise plan. Needs a custom demo next week.',
  },
  {
    name: 'Robert Chen',
    email: 'robert@nexuscorp.com',
    phone: '+1 (555) 024-8172',
    company: 'Nexus Corp',
    status: 'Contacted',
    notes: 'Followed up via phone. Left a voicemail. Will call back tomorrow.',
  },
  {
    name: 'Sarah Miller',
    email: 'sarah.m@vertexlabs.io',
    phone: '+1 (555) 038-1928',
    company: 'Vertex Labs',
    status: 'Qualified',
    notes: 'Budget confirmed ($50k). Decision maker identified. Demo completed.',
  },
  {
    name: 'Michael Peterson',
    email: 'm.peterson@cloudscale.net',
    phone: '+1 (555) 042-9901',
    company: 'CloudScale Inc',
    status: 'Converted',
    notes: 'Contract signed! Moved to onboarding team. Handed off to Account Manager.',
  },
  {
    name: 'Emily Davis',
    email: 'emily.d@deadend.org',
    phone: '+1 (555) 051-7788',
    company: 'Legacy Retail',
    status: 'Lost',
    notes: 'Decided to stay with their current provider due to budget constraints.',
  },
  {
    name: 'David Wilson',
    email: 'david@quantumflow.com',
    phone: '+1 (555) 062-1144',
    company: 'QuantumFlow',
    status: 'New',
    notes: 'Inbound lead from website contact form. Looking for pricing details.',
  },
  {
    name: 'Jessica Taylor',
    email: 'jessica@pixelcraft.studio',
    phone: '+1 (555) 073-2255',
    company: 'PixelCraft Studio',
    status: 'Contacted',
    notes: 'Sent initial pricing proposal via email. Awaiting reply.',
  },
  {
    name: 'James Anderson',
    email: 'james.a@bluehorizon.com',
    phone: '+1 (555) 084-3366',
    company: 'Blue Horizon Group',
    status: 'Qualified',
    notes: 'Technical fit verified. Needs integration with their Salesforce CRM.',
  },
  {
    name: 'Sophia Martinez',
    email: 'sophia@stellarretail.com',
    phone: '+1 (555) 095-4477',
    company: 'Stellar Retail',
    status: 'Converted',
    notes: 'Annual billing setup. Very happy with the platform support.',
  },
  {
    name: 'Daniel Thomas',
    email: 'daniel@outdatedsystems.net',
    phone: '+1 (555) 106-5588',
    company: 'Outdated Systems',
    status: 'Lost',
    notes: 'Budget was cut. Postponed CRM migration projects for this fiscal year.',
  },
  {
    name: 'Oliver Garcia',
    email: 'oliver@garciatech.com',
    phone: '+1 (555) 117-6699',
    company: 'Garcia Tech',
    status: 'New',
    notes: 'Met at the regional software convention. Kept business card.',
  },
  {
    name: 'Isabella Robinson',
    email: 'isabella@apexmarketing.com',
    phone: '+1 (555) 128-7700',
    company: 'Apex Marketing',
    status: 'Contacted',
    notes: 'Spoke briefly. Requested a case study document on conversion optimization.',
  }
];

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('[Seed] Database connected for seeding.');

    // Clear existing leads
    await Lead.deleteMany();
    console.log('[Seed] Deleted all existing leads.');

    // Seed new leads
    const insertedLeads = await Lead.insertMany(mockLeads);
    console.log(`[Seed] Seeded ${insertedLeads.length} mock leads successfully!`);

    mongoose.connection.close();
    console.log('[Seed] Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error(`[Seed Error] Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
