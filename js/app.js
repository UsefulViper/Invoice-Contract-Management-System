// Invoice & Contract Management System

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize app state
    initializeAppState();
    
    // Set current date
    updateCurrentDate();
    
    // Set up all event listeners
    setupEventListeners();
});

// Global State with localStorage persistence
let appState = {
    user: {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        role: 'Administrator'
    },
    theme: 'light',
    sidebarCollapsed: false,
    invoices: [],
    contracts: [],
    clients: [],
    payments: [],
    nextIds: {
        invoice: 1,
        contract: 1,
        client: 1,
        payment: 1
    },
    notifications: []
};

// Initialize App State
function initializeAppState() {
    // Load data from localStorage
    loadFromLocalStorage();
    
    // If no data exists, initialize with mock data
    if (appState.invoices.length === 0) {
        initializeMockData();
        saveToLocalStorage();
    }
    
    // Apply theme
    document.body.classList.toggle('dark-theme', appState.theme === 'dark');
    
    // Set sidebar state
    document.querySelector('.sidebar').classList.toggle('collapsed', appState.sidebarCollapsed);
    
    // Update UI based on current page
    updatePageContent();
}

// Load data from localStorage
function loadFromLocalStorage() {
    const storedTheme = localStorage.getItem('invoiceSystemTheme');
    if (storedTheme) {
        appState.theme = storedTheme;
    }
    
    const storedSidebarState = localStorage.getItem('sidebarCollapsed');
    if (storedSidebarState) {
        appState.sidebarCollapsed = storedSidebarState === 'true';
    }
    
    const storedInvoices = localStorage.getItem('invoices');
    if (storedInvoices) {
        appState.invoices = JSON.parse(storedInvoices);
    }
    
    const storedContracts = localStorage.getItem('contracts');
    if (storedContracts) {
        appState.contracts = JSON.parse(storedContracts);
    }
    
    const storedClients = localStorage.getItem('clients');
    if (storedClients) {
        appState.clients = JSON.parse(storedClients);
    }
    
    const storedPayments = localStorage.getItem('payments');
    if (storedPayments) {
        appState.payments = JSON.parse(storedPayments);
    }
    
    const storedNextIds = localStorage.getItem('nextIds');
    if (storedNextIds) {
        appState.nextIds = JSON.parse(storedNextIds);
    }
    
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
        appState.notifications = JSON.parse(storedNotifications);
    }
}

// Save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('invoiceSystemTheme', appState.theme);
    localStorage.setItem('sidebarCollapsed', appState.sidebarCollapsed.toString());
    localStorage.setItem('invoices', JSON.stringify(appState.invoices));
    localStorage.setItem('contracts', JSON.stringify(appState.contracts));
    localStorage.setItem('clients', JSON.stringify(appState.clients));
    localStorage.setItem('payments', JSON.stringify(appState.payments));
    localStorage.setItem('nextIds', JSON.stringify(appState.nextIds));
    localStorage.setItem('notifications', JSON.stringify(appState.notifications));
}

// Initialize Mock Data for demonstration
function initializeMockData() {
    // Sample Clients
    appState.clients = [
        { 
            id: 1, 
            name: 'ABC Corporation', 
            contactPerson: 'John Smith', 
            email: 'contact@abccorp.com', 
            phone: '(123) 456-7890', 
            address: '123 Business Ave, New York, NY 10001', 
            website: 'abccorp.com',
            industry: 'Technology',
            status: 'active' 
        },
        { 
            id: 2, 
            name: 'XYZ Enterprises', 
            contactPerson: 'Jane Doe', 
            email: 'info@xyzent.com', 
            phone: '(234) 567-8901', 
            address: '456 Corporate Blvd, Chicago, IL 60601', 
            website: 'xyzent.com',
            industry: 'Manufacturing',
            status: 'active' 
        },
        { 
            id: 3, 
            name: 'Acme Solutions', 
            contactPerson: 'Michael Johnson', 
            email: 'contact@acmesolutions.com', 
            phone: '(345) 678-9012', 
            address: '789 Innovation Way, San Francisco, CA 94103',
            website: 'acmesolutions.com',
            industry: 'Consulting',
            status: 'active' 
        }
    ];
    appState.nextIds.client = 4;

    // Sample Invoices
    appState.invoices = [
        { 
            id: 1, 
            number: 'INV-2023-001', 
            clientId: 1, 
            issueDate: '2023-05-15', 
            dueDate: '2023-06-15', 
            amount: 2500.00, 
            status: 'paid', 
            items: [
                { description: 'Web Development Services', quantity: 1, rate: 2000.00, amount: 2000.00 },
                { description: 'Domain Registration (1 year)', quantity: 1, rate: 20.00, amount: 20.00 },
                { description: 'Web Hosting (1 year)', quantity: 1, rate: 480.00, amount: 480.00 }
            ]
        },
        { 
            id: 2, 
            number: 'INV-2023-002', 
            clientId: 2, 
            issueDate: '2023-05-20', 
            dueDate: '2023-06-20', 
            amount: 1850.00, 
            status: 'paid', 
            items: [
                { description: 'UI/UX Design Services', quantity: 1, rate: 1850.00, amount: 1850.00 }
            ]
        },
        { 
            id: 3, 
            number: 'INV-2023-003', 
            clientId: 3, 
            issueDate: '2023-06-01', 
            dueDate: '2023-07-01', 
            amount: 3750.00, 
            status: 'sent', 
            items: [
                { description: 'E-commerce Development', quantity: 1, rate: 3500.00, amount: 3500.00 },
                { description: 'SSL Certificate (1 year)', quantity: 1, rate: 250.00, amount: 250.00 }
            ]
        },
        { 
            id: 4, 
            number: 'INV-2023-004', 
            clientId: 1, 
            issueDate: '2023-06-15', 
            dueDate: '2023-07-15', 
            amount: 1250.00, 
            status: 'paid', 
            items: [
                { description: 'Maintenance Services', quantity: 5, rate: 250.00, amount: 1250.00 }
            ]
        },
        { 
            id: 5, 
            number: 'INV-2023-005', 
            clientId: 2, 
            issueDate: '2023-07-01', 
            dueDate: '2023-08-01', 
            amount: 2750.00, 
            status: 'overdue', 
            items: [
                { description: 'Mobile App Development', quantity: 1, rate: 2750.00, amount: 2750.00 }
            ]
        }
    ];
    appState.nextIds.invoice = 6;

    // Sample Contracts
    appState.contracts = [
        { 
            id: 1, 
            number: 'CON-2023-001', 
            clientId: 1, 
            title: 'Website Maintenance Agreement', 
            startDate: '2023-01-01', 
            endDate: '2023-12-31', 
            value: 12000.00, 
            status: 'active',
            description: 'Monthly maintenance of corporate website including security updates, content management and technical support.'
        },
        { 
            id: 2, 
            number: 'CON-2023-002', 
            clientId: 2, 
            title: 'Mobile App Development Project', 
            startDate: '2023-05-01', 
            endDate: '2023-09-30', 
            value: 15000.00, 
            status: 'active',
            description: 'Design and development of iOS and Android applications with backend integration.'
        },
        { 
            id: 3, 
            number: 'CON-2023-003', 
            clientId: 3, 
            title: 'Digital Marketing Campaign', 
            startDate: '2023-04-01', 
            endDate: '2023-10-31', 
            value: 9000.00, 
            status: 'active',
            description: 'Comprehensive digital marketing strategy including SEO, social media management, and PPC advertising.'
        },
        { 
            id: 4, 
            number: 'CON-2023-004', 
            clientId: 1, 
            title: 'SEO Optimization Project', 
            startDate: '2023-03-15', 
            endDate: '2023-06-14', 
            value: 4500.00, 
            status: 'expired',
            description: 'One-time SEO audit and optimization project to improve search engine rankings and organic traffic.'
        }
    ];
    appState.nextIds.contract = 5;

    // Sample Payments
    appState.payments = [
        { id: 1, invoiceId: 1, clientId: 1, date: '2023-06-10', amount: 2500.00, method: 'credit_card', reference: 'PAY-20230610-001' },
        { id: 2, invoiceId: 2, clientId: 2, date: '2023-06-15', amount: 1850.00, method: 'bank_transfer', reference: 'PAY-20230615-001' },
        { id: 3, invoiceId: 4, clientId: 1, date: '2023-07-10', amount: 1250.00, method: 'credit_card', reference: 'PAY-20230710-001' }
    ];
    appState.nextIds.payment = 4;

    // Sample Notifications
    appState.notifications = [
        {
            id: 1,
            type: 'invoice',
            title: 'New Invoice Paid',
            message: 'ABC Corporation has paid invoice #INV-2023-004',
            time: '10 minutes ago',
            read: false
        },
        {
            id: 2,
            type: 'contract',
            title: 'Contract Expiring Soon',
            message: 'Contract #CON-2023-003 with Acme Solutions is expiring in 30 days',
            time: '1 hour ago',
            read: false
        },
        {
            id: 3,
            type: 'payment',
            title: 'Payment Received',
            message: 'Payment of $1,250.00 has been received from ABC Corporation',
            time: '3 hours ago',
            read: true
        }
    ];
}

// Update the current date display
function updateCurrentDate() {
    const dateElements = document.querySelectorAll('.date, #current-date');
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    dateElements.forEach(element => {
        if (element) {
            element.textContent = formattedDate;
        }
    });
}

// Update page content based on current page
function updatePageContent() {
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'dashboard':
            updateDashboard();
            break;
        case 'invoices':
            updateInvoicesTable();
            break;
        case 'contracts':
            updateContractsTable();
            break;
        case 'clients':
            updateClientsGrid();
            break;
    }
    
    // Update notifications count
    updateNotificationCount();
}

// Get current page based on URL
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('invoices.html')) return 'invoices';
    if (path.includes('contracts.html')) return 'contracts';
    if (path.includes('clients.html')) return 'clients';
    return 'dashboard'; // Default to dashboard
}

// Set up all event listeners
function setupEventListeners() {
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebar-toggle') || document.getElementById('collapse-sidebar');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Notification toggle
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', toggleNotifications);
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Setup form event listeners
    setupFormListeners();
    
    // Setup filter buttons
    setupFilterButtons();
    
    // Setup dropdown menus
    setupDropdowns();
    
    // Setup page-specific event listeners
    const currentPage = getCurrentPage();
    setupPageSpecificListeners(currentPage);
}

// Setup page-specific event listeners
function setupPageSpecificListeners(page) {
    switch(page) {
        case 'dashboard':
            setupDashboardListeners();
            break;
        case 'invoices':
            setupInvoicesListeners();
            break;
        case 'contracts':
            setupContractsListeners();
            break;
        case 'clients':
            setupClientsListeners();
            break;
    }
}

// Toggle theme between light and dark
function toggleTheme() {
    appState.theme = appState.theme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark-theme', appState.theme === 'dark');
    
    // Update theme toggle button appearance
    const themeIcon = document.querySelector('.theme-toggle i');
    if (themeIcon) {
        themeIcon.className = appState.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    saveToLocalStorage();
}

// Toggle sidebar collapse state
function toggleSidebar() {
    appState.sidebarCollapsed = !appState.sidebarCollapsed;
    document.querySelector('.sidebar').classList.toggle('collapsed', appState.sidebarCollapsed);
    
    // Update toggle button icon
    const toggleIcon = document.querySelector('#sidebar-toggle i, #collapse-sidebar i');
    if (toggleIcon) {
        toggleIcon.className = appState.sidebarCollapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left';
    }
    
    saveToLocalStorage();
}

// Toggle notifications panel
function toggleNotifications() {
    const notificationPanel = document.querySelector('.notification-dropdown');
    if (notificationPanel) {
        notificationPanel.classList.toggle('show');
    }
}

// Update notification count badge
function updateNotificationCount() {
    const unreadCount = appState.notifications.filter(n => !n.read).length;
    const badge = document.querySelector('.notification-btn .badge');
    
    if (badge) {
        if (unreadCount > 0) {
            badge.textContent = unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('mobile-active');
    }
}

// Set up filter buttons
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons in the same filter group
            const filterGroup = this.closest('.filter-buttons');
            if (filterGroup) {
                filterGroup.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
            }
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Apply filter based on data-filter attribute
            const filter = this.getAttribute('data-filter');
            applyFilter(filter);
        });
    });
}

// Apply filter to current page content
function applyFilter(filter) {
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'invoices':
            filterInvoices(filter);
            break;
        case 'contracts':
            filterContracts(filter);
            break;
        case 'clients':
            filterClients(filter);
            break;
    }
}

// Set up dropdown menus
function setupDropdowns() {
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });
    
    // Toggle dropdown content when clicking on dropdown button
    const dropdownButtons = document.querySelectorAll('.dropdown .dropdown-btn');
    dropdownButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const content = this.nextElementSibling;
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                if (dropdown !== content) {
                    dropdown.classList.remove('show');
                }
            });
            
            // Toggle this dropdown
            content.classList.toggle('show');
        });
    });
}

// Set up form listeners
function setupFormListeners() {
    // Invoice form
    const invoiceForm = document.getElementById('invoice-form');
    if (invoiceForm) {
        invoiceForm.addEventListener('submit', handleInvoiceSubmit);
    }
    
    // Contract form
    const contractForm = document.getElementById('contract-form');
    if (contractForm) {
        contractForm.addEventListener('submit', handleContractSubmit);
    }
    
    // Client form
    const clientForm = document.getElementById('client-form');
    if (clientForm) {
        clientForm.addEventListener('submit', handleClientSubmit);
    }
    
    // Payment form
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePaymentSubmit);
    }
    
    // Modal open buttons
    const modalOpenButtons = document.querySelectorAll('[data-modal]');
    modalOpenButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                openModal(modal);
                
                // Additional setup for specific modals
                if (modalId === 'create-invoice-modal') {
                    setupInvoiceFormDefaults();
                }
            }
        });
    });
    
    // Modal close buttons
    const modalCloseButtons = document.querySelectorAll('.modal-close, .cancel-btn');
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
}

// Open a modal
function openModal(modal) {
    modal.classList.add('show');
}

// Close a modal
function closeModal(modal) {
    modal.classList.remove('show');
}

// Handle invoice form submission
function handleInvoiceSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const form = e.target;
    const clientId = parseInt(form.client.value);
    const issueDate = form.issueDate.value;
    const dueDate = form.dueDate.value;
    const status = form.status ? form.status.value : 'draft';
    
    // Get invoice items
    const items = [];
    const itemRows = form.querySelectorAll('.invoice-item');
    itemRows.forEach(row => {
        const description = row.querySelector('[name="itemDescription"]').value;
        const quantity = parseFloat(row.querySelector('[name="itemQuantity"]').value);
        const rate = parseFloat(row.querySelector('[name="itemRate"]').value);
        const amount = quantity * rate;
        
        if (description && !isNaN(quantity) && !isNaN(rate)) {
            items.push({
                description,
                quantity,
                rate,
                amount
            });
        }
    });
    
    // Create invoice object
    const invoiceData = {
        clientId,
        issueDate,
        dueDate,
        status,
        items
    };
    
    // Add invoice to state
    const newInvoice = addInvoice(invoiceData);
    
    // Close modal
    closeModal(form.closest('.modal'));
    
    // Update UI
    if (getCurrentPage() === 'invoices') {
        updateInvoicesTable();
    } else {
        // Show success message
        alert(`Invoice #${newInvoice.number} created successfully!`);
    }
}

// Handle contract form submission
function handleContractSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const form = e.target;
    const clientId = parseInt(form.client.value);
    const title = form.title.value;
    const startDate = form.startDate.value;
    const endDate = form.endDate.value;
    const value = parseFloat(form.value.value);
    const description = form.description.value;
    
    // Create contract object
    const contractData = {
        clientId,
        title,
        startDate,
        endDate,
        value,
        description
    };
    
    // Add contract to state
    const newContract = addContract(contractData);
    
    // Close modal
    closeModal(form.closest('.modal'));
    
    // Update UI
    if (getCurrentPage() === 'contracts') {
        updateContractsTable();
    } else {
        // Show success message
        alert(`Contract #${newContract.number} created successfully!`);
    }
}

// Handle client form submission
function handleClientSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const form = e.target;
    const name = form.name.value;
    const contactPerson = form.contactPerson.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const website = form.website.value;
    const industry = form.industry.value;
    
    // Create client object
    const clientData = {
        name,
        contactPerson,
        email,
        phone,
        address,
        website,
        industry
    };
    
    // Add client to state
    const newClient = addClient(clientData);
    
    // Close modal
    closeModal(form.closest('.modal'));
    
    // Update UI
    if (getCurrentPage() === 'clients') {
        updateClientsGrid();
    } else {
        // Show success message
        alert(`Client "${newClient.name}" added successfully!`);
    }
}

// Handle payment form submission
function handlePaymentSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const form = e.target;
    const invoiceId = parseInt(form.invoice.value);
    const invoice = getInvoiceById(invoiceId);
    if (!invoice) {
        alert('Invalid invoice selected');
        return;
    }
    
    const clientId = invoice.clientId;
    const date = form.date.value;
    const amount = parseFloat(form.amount.value);
    const method = form.method.value;
    
    // Create payment object
    const paymentData = {
        invoiceId,
        clientId,
        date,
        amount,
        method
    };
    
    // Add payment to state
    const newPayment = addPayment(paymentData);
    
    // Close modal
    closeModal(form.closest('.modal'));
    
    // Update UI
    if (getCurrentPage() === 'dashboard') {
        updateDashboard();
    } else {
        // Show success message
        alert(`Payment of ${formatCurrency(amount)} recorded successfully for Invoice #${invoice.number}!`);
    }
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Generate a unique ID with prefix
function generateId(prefix) {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${year}-${randomNum}`;
}

// ===== DATA MANAGEMENT FUNCTIONS =====

// Get client by ID
function getClientById(id) {
    return appState.clients.find(client => client.id === id);
}

// Get invoice by ID
function getInvoiceById(id) {
    return appState.invoices.find(invoice => invoice.id === id);
}

// Get contract by ID
function getContractById(id) {
    return appState.contracts.find(contract => contract.id === id);
}

// Add new invoice
function addInvoice(invoiceData) {
    // Calculate total amount from items
    const totalAmount = invoiceData.items.reduce((total, item) => total + item.amount, 0);
    
    const newInvoice = {
        id: appState.nextIds.invoice++,
        number: generateId('INV'),
        ...invoiceData,
        amount: totalAmount
    };
    
    appState.invoices.push(newInvoice);
    saveToLocalStorage();
    
    // Add notification
    addNotification('invoice', 'New Invoice Created', `Invoice #${newInvoice.number} has been created for ${getClientById(newInvoice.clientId).name}`);
    
    return newInvoice;
}

// Add new contract
function addContract(contractData) {
    const newContract = {
        id: appState.nextIds.contract++,
        number: generateId('CON'),
        ...contractData,
        status: 'active'
    };
    
    appState.contracts.push(newContract);
    saveToLocalStorage();
    
    // Add notification
    addNotification('contract', 'New Contract Created', `Contract #${newContract.number} has been created for ${getClientById(newContract.clientId).name}`);
    
    return newContract;
}

// Add new client
function addClient(clientData) {
    const newClient = {
        id: appState.nextIds.client++,
        ...clientData,
        status: 'active'
    };
    
    appState.clients.push(newClient);
    saveToLocalStorage();
    
    // Add notification
    addNotification('client', 'New Client Added', `${newClient.name} has been added to your clients`);
    
    return newClient;
}

// Add new payment
function addPayment(paymentData) {
    const newPayment = {
        id: appState.nextIds.payment++,
        ...paymentData,
        reference: generateId('PAY')
    };
    
    appState.payments.push(newPayment);
    
    // Update invoice status
    const invoice = getInvoiceById(paymentData.invoiceId);
    if (invoice) {
        if (paymentData.amount >= invoice.amount) {
            invoice.status = 'paid';
        } else {
            invoice.status = 'partial';
        }
    }
    
    saveToLocalStorage();
    
    // Add notification
    addNotification('payment', 'Payment Received', `Payment of ${formatCurrency(newPayment.amount)} has been received for Invoice #${invoice.number}`);
    
    return newPayment;
}

// Add notification
function addNotification(type, title, message) {
    const newNotification = {
        id: Date.now(),
        type,
        title,
        message,
        time: 'Just now',
        read: false
    };
    
    appState.notifications.unshift(newNotification);
    
    // Limit to 10 notifications
    if (appState.notifications.length > 10) {
        appState.notifications.pop();
    }
    
    saveToLocalStorage();
    updateNotificationCount();
    
    return newNotification;
}

// Mark notification as read
function markNotificationAsRead(id) {
    const notification = appState.notifications.find(n => n.id === id);
    if (notification) {
        notification.read = true;
        saveToLocalStorage();
        updateNotificationCount();
    }
}

// Mark all notifications as read
function markAllNotificationsAsRead() {
    appState.notifications.forEach(notification => {
        notification.read = true;
    });
    saveToLocalStorage();
    updateNotificationCount();
}

// ===== PAGE SPECIFIC FUNCTIONS =====

// Dashboard page specific event listeners
function setupDashboardListeners() {
    // Recent activity links
    const activityLinks = document.querySelectorAll('.activity-item a');
    activityLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const type = this.getAttribute('data-type');
            const id = parseInt(this.getAttribute('data-id'));
            
            // Navigate to appropriate page
            switch(type) {
                case 'invoice':
                    window.location.href = `invoices.html?id=${id}`;
                    break;
                case 'contract':
                    window.location.href = `contracts.html?id=${id}`;
                    break;
                case 'client':
                    window.location.href = `clients.html?id=${id}`;
                    break;
            }
        });
    });
}

// Update dashboard content
function updateDashboard() {
    // Update summary cards
    updateSummaryCards();
    
    // Update charts
    updateDashboardCharts();
    
    // Update recent activity
    updateRecentActivity();
    
    // Update invoices due soon
    updateInvoicesDueSoon();
}

// Update summary cards on dashboard
function updateSummaryCards() {
    // Total revenue (from paid invoices)
    const totalRevenue = appState.payments.reduce((sum, payment) => sum + payment.amount, 0);
    const revenueElement = document.querySelector('.card.revenue .amount');
    if (revenueElement) {
        revenueElement.textContent = formatCurrency(totalRevenue);
    }
    
    // Total invoices
    const totalInvoices = appState.invoices.length;
    const invoicesElement = document.querySelector('.card.invoices .amount');
    if (invoicesElement) {
        invoicesElement.textContent = totalInvoices.toString();
    }
    
    // Active contracts
    const activeContracts = appState.contracts.filter(contract => contract.status === 'active').length;
    const contractsElement = document.querySelector('.card.contracts .amount');
    if (contractsElement) {
        contractsElement.textContent = activeContracts.toString();
    }
    
    // Outstanding amount (unpaid invoices)
    const outstandingAmount = appState.invoices
        .filter(invoice => invoice.status !== 'paid')
        .reduce((sum, invoice) => sum + invoice.amount, 0);
    const outstandingElement = document.querySelector('.card.outstanding .amount');
    if (outstandingElement) {
        outstandingElement.textContent = formatCurrency(outstandingAmount);
    }
}

// Update recent activity on dashboard
function updateRecentActivity() {
    const activityContainer = document.querySelector('.activity-list');
    if (!activityContainer) return;
    
    // Clear current items
    activityContainer.innerHTML = '';
    
    // Create combined list of recent activities
    const activities = [
        ...appState.invoices.map(invoice => ({
            type: 'invoice',
            id: invoice.id,
            date: new Date(invoice.issueDate),
            title: `Invoice #${invoice.number} created`,
            subtitle: `${getClientById(invoice.clientId).name} - ${formatCurrency(invoice.amount)}`,
            icon: 'fa-file-invoice',
            color: 'blue'
        })),
        ...appState.payments.map(payment => ({
            type: 'payment',
            id: payment.id,
            date: new Date(payment.date),
            title: `Payment received for Invoice #${getInvoiceById(payment.invoiceId).number}`,
            subtitle: `${getClientById(payment.clientId).name} - ${formatCurrency(payment.amount)}`,
            icon: 'fa-money-bill-wave',
            color: 'green'
        })),
        ...appState.contracts.map(contract => ({
            type: 'contract',
            id: contract.id,
            date: new Date(contract.startDate),
            title: `Contract #${contract.number} created`,
            subtitle: `${getClientById(contract.clientId).name} - ${formatCurrency(contract.value)}`,
            icon: 'fa-file-contract',
            color: 'purple'
        }))
    ];
    
    // Sort by date (newest first)
    activities.sort((a, b) => b.date - a.date);
    
    // Take the 5 most recent activities
    const recentActivities = activities.slice(0, 5);
    
    // Add to activity list
    recentActivities.forEach(activity => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-icon ${activity.color}">
                <i class="fas ${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p>${activity.subtitle}</p>
                <span class="time">${formatDate(activity.date)}</span>
            </div>
            <a href="#" data-type="${activity.type}" data-id="${activity.id}" class="activity-link">
                <i class="fas fa-arrow-right"></i>
            </a>
        `;
        activityContainer.appendChild(item);
    });
    
    // If no activities, show message
    if (recentActivities.length === 0) {
        activityContainer.innerHTML = '<div class="no-data">No recent activity</div>';
    }
}

// Update invoices due soon on dashboard
function updateInvoicesDueSoon() {
    const dueSoonContainer = document.querySelector('.due-soon-list');
    if (!dueSoonContainer) return;
    
    // Clear current items
    dueSoonContainer.innerHTML = '';
    
    // Get unpaid invoices
    const unpaidInvoices = appState.invoices.filter(invoice => 
        invoice.status !== 'paid' && invoice.status !== 'cancelled'
    );
    
    // Sort by due date (soonest first)
    unpaidInvoices.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    
    // Take the 5 most urgent invoices
    const dueSoonInvoices = unpaidInvoices.slice(0, 5);
    
    // Add to due soon list
    dueSoonInvoices.forEach(invoice => {
        const dueDate = new Date(invoice.dueDate);
        const today = new Date();
        const daysDiff = Math.round((dueDate - today) / (1000 * 60 * 60 * 24));
        
        let statusClass = 'normal';
        if (daysDiff < 0) {
            statusClass = 'overdue';
        } else if (daysDiff < 3) {
            statusClass = 'warning';
        }
        
        const client = getClientById(invoice.clientId);
        
        const item = document.createElement('div');
        item.className = 'due-soon-item';
        item.innerHTML = `
            <div class="due-soon-header">
                <h4>Invoice #${invoice.number}</h4>
                <span class="due-date ${statusClass}">${daysDiff < 0 ? 'Overdue' : daysDiff + ' days left'}</span>
            </div>
            <div class="due-soon-content">
                <p>${client ? client.name : 'Unknown Client'}</p>
                <p>${formatCurrency(invoice.amount)}</p>
                <p>Due: ${formatDate(invoice.dueDate)}</p>
            </div>
            <div class="due-soon-actions">
                <button class="btn sm primary" data-action="mark-paid" data-id="${invoice.id}">Mark Paid</button>
                <button class="btn sm" data-action="view-invoice" data-id="${invoice.id}">View</button>
            </div>
        `;
        dueSoonContainer.appendChild(item);
    });
    
    // If no invoices due soon, show message
    if (dueSoonInvoices.length === 0) {
        dueSoonContainer.innerHTML = '<div class="no-data">No invoices due soon</div>';
    }
    
    // Add event listeners for invoice actions
    dueSoonContainer.querySelectorAll('[data-action="mark-paid"]').forEach(button => {
        button.addEventListener('click', function() {
            const invoiceId = parseInt(this.getAttribute('data-id'));
            markInvoiceAsPaid(invoiceId);
        });
    });
    
    dueSoonContainer.querySelectorAll('[data-action="view-invoice"]').forEach(button => {
        button.addEventListener('click', function() {
            const invoiceId = parseInt(this.getAttribute('data-id'));
            window.location.href = `invoices.html?id=${invoiceId}`;
        });
    });
}

// Mark invoice as paid
function markInvoiceAsPaid(id) {
    const invoice = getInvoiceById(id);
    if (!invoice) return;
    
    // Check if invoice is already paid
    if (invoice.status === 'paid') {
        alert('This invoice is already paid.');
        return;
    }
    
    // Create payment
    const paymentData = {
        invoiceId: id,
        clientId: invoice.clientId,
        date: new Date().toISOString().split('T')[0],
        amount: invoice.amount,
        method: 'manual'
    };
    
    // Add payment
    addPayment(paymentData);
    
    // Update UI
    updateDashboard();
    
    // Show success message
    alert(`Invoice #${invoice.number} marked as paid.`);
}

// Update dashboard charts
function updateDashboardCharts() {
    createRevenueChart();
    createInvoicesChart();
    createClientsChart();
}

// Create revenue chart
function createRevenueChart() {
    const ctx = document.getElementById('revenue-chart');
    if (!ctx) return;
    
    // Get monthly revenue data for the past 6 months
    const today = new Date();
    const months = [];
    const revenueData = [];
    const expenseData = []; // Mock expense data (could be replaced with real data)
    
    for (let i = 5; i >= 0; i--) {
        const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const monthName = month.toLocaleDateString('en-US', { month: 'short' });
        months.push(monthName);
        
        // Calculate revenue for this month
        const monthRevenue = appState.payments
            .filter(payment => {
                const paymentDate = new Date(payment.date);
                return paymentDate.getMonth() === month.getMonth() && 
                       paymentDate.getFullYear() === month.getFullYear();
            })
            .reduce((sum, payment) => sum + payment.amount, 0);
        
        revenueData.push(monthRevenue);
        
        // Mock expense data (around 60-80% of revenue)
        const randomFactor = 0.6 + Math.random() * 0.2;
        expenseData.push(monthRevenue * randomFactor);
    }
    
    // Create chart
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Revenue',
                    data: revenueData,
                    borderColor: '#4a6cf7',
                    backgroundColor: 'rgba(74, 108, 247, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Expenses',
                    data: expenseData,
                    borderColor: '#f87171',
                    backgroundColor: 'rgba(248, 113, 113, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Create invoices chart
function createInvoicesChart() {
    const ctx = document.getElementById('invoices-chart');
    if (!ctx) return;
    
    // Count invoices by status
    const paidCount = appState.invoices.filter(invoice => invoice.status === 'paid').length;
    const overdueCount = appState.invoices.filter(invoice => invoice.status === 'overdue').length;
    const pendingCount = appState.invoices.filter(invoice => invoice.status === 'sent' || invoice.status === 'draft').length;
    
    // Create chart
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Paid', 'Overdue', 'Pending'],
            datasets: [{
                data: [paidCount, overdueCount, pendingCount],
                backgroundColor: [
                    '#10b981', // green
                    '#ef4444', // red
                    '#f59e0b'  // yellow
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            },
            cutout: '70%'
        }
    });
}

// Create clients chart
function createClientsChart() {
    const ctx = document.getElementById('clients-chart');
    if (!ctx) return;
    
    // Group invoices by client and calculate total amount
    const clientTotals = {};
    appState.clients.forEach(client => {
        clientTotals[client.id] = 0;
    });
    
    appState.invoices.forEach(invoice => {
        if (clientTotals[invoice.clientId] !== undefined) {
            clientTotals[invoice.clientId] += invoice.amount;
        }
    });
    
    // Convert to arrays for chart
    const clientLabels = [];
    const clientData = [];
    
    for (const clientId in clientTotals) {
        const client = getClientById(parseInt(clientId));
        if (client && clientTotals[clientId] > 0) {
            clientLabels.push(client.name);
            clientData.push(clientTotals[clientId]);
        }
    }
    
    // Sort by amount (descending)
    const combinedData = clientLabels.map((label, i) => ({ label, value: clientData[i] }));
    combinedData.sort((a, b) => b.value - a.value);
    
    // Take top 5 clients
    const topClientLabels = combinedData.slice(0, 5).map(item => item.label);
    const topClientData = combinedData.slice(0, 5).map(item => item.value);
    
    // Generate colors
    const backgroundColors = [
        '#4a6cf7', // blue
        '#f97316', // orange
        '#8b5cf6', // purple
        '#10b981', // green
        '#f43f5e'  // pink
    ];
    
    // Create chart
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topClientLabels,
            datasets: [{
                label: 'Total Billed',
                data: topClientData,
                backgroundColor: backgroundColors,
                borderWidth: 0,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}
