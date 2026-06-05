const Lead = require('../models/Lead');
const apiResponse = require('../utils/apiResponse');

/**
 * @desc    Get all leads with search, filter, sorting, and pagination
 * @route   GET /api/leads
 * @access  Public
 */
const getLeads = async (req, res, next) => {
  try {
    const { search, status, sortBy, sortOrder, page, limit } = req.query;

    // 1. Build Query Filter
    const query = {};

    // Search by Name, Email, or Company (Case-insensitive)
    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { company: searchRegex },
      ];
    }

    // Filter by Status
    if (status) {
      query.status = status;
    }

    // 2. Pagination Settings
    const currentPage = Math.max(1, parseInt(page, 10) || 1);
    const limitPerPage = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (currentPage - 1) * limitPerPage;

    // 3. Sorting Settings
    const validSortFields = ['name', 'email', 'company', 'status', 'createdAt'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const direction = sortOrder === 'asc' ? 1 : -1;
    const sort = { [sortField]: direction };

    // 4. Execute Queries
    const totalLeads = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitPerPage);

    const totalPages = Math.ceil(totalLeads / limitPerPage);

    const paginationMetadata = {
      page: currentPage,
      limit: limitPerPage,
      total: totalLeads,
      totalPages: totalPages === 0 ? 1 : totalPages,
    };

    res.status(200).json(
      apiResponse(true, leads, 'Leads fetched successfully', paginationMetadata)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get counts of leads grouped by status
 * @route   GET /api/leads/stats
 * @access  Public
 */
const getLeadStats = async (req, res, next) => {
  try {
    const aggResult = await Lead.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Format results to always include all statuses with default 0
    const stats = {
      total: 0,
      new: 0,
      contacted: 0,
      qualified: 0,
      converted: 0,
      lost: 0,
    };

    let grandTotal = 0;
    aggResult.forEach((item) => {
      const statusKey = item._id.toLowerCase();
      if (statusKey in stats) {
        stats[statusKey] = item.count;
      }
      grandTotal += item.count;
    });
    stats.total = grandTotal;

    res.status(200).json(apiResponse(true, stats, 'Lead statistics fetched successfully'));
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new lead
 * @route   POST /api/leads
 * @access  Public
 */
const createLead = async (req, res, next) => {
  try {
    const { name, email, phone, company, status, notes } = req.body;

    const newLead = await Lead.create({
      name,
      email,
      phone,
      company,
      status: status || 'New',
      notes: notes || '',
    });

    res.status(201).json(apiResponse(true, newLead, 'Lead created successfully'));
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing lead
 * @route   PUT /api/leads/:id
 * @access  Public
 */
const updateLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, company, status, notes } = req.body;

    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json(apiResponse(false, null, 'Lead not found'));
    }

    // Update fields
    lead.name = name !== undefined ? name : lead.name;
    lead.email = email !== undefined ? email : lead.email;
    lead.phone = phone !== undefined ? phone : lead.phone;
    lead.company = company !== undefined ? company : lead.company;
    lead.status = status !== undefined ? status : lead.status;
    lead.notes = notes !== undefined ? notes : lead.notes;

    const updatedLead = await lead.save();

    res.status(200).json(apiResponse(true, updatedLead, 'Lead updated successfully'));
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a lead
 * @route   DELETE /api/leads/:id
 * @access  Public
 */
const deleteLead = async (req, res, next) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json(apiResponse(false, null, 'Lead not found'));
    }

    await lead.deleteOne();

    res.status(200).json(apiResponse(true, null, 'Lead deleted successfully'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLeads,
  getLeadStats,
  createLead,
  updateLead,
  deleteLead,
};
