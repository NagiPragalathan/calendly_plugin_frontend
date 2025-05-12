// Store the current active tab
let currentTab = 'dashboard';

// Function to load content from HTML files
async function loadContent(pageName) {
    try {
        const response = await fetch(`../html/${pageName}.html`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();
        
        // Parse the content to get only the main content section
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const mainContent = doc.querySelector('main');
        
        if (mainContent) {
            document.querySelector('main').innerHTML = mainContent.innerHTML;
        } else {
            console.error('Main content section not found in the loaded HTML');
        }

        // Update active tab styling
        updateActiveTab(pageName);
        
        // Update the browser history
        window.history.pushState({page: pageName}, '', `#${pageName}`);
        
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// Function to update active tab styling
function updateActiveTab(pageName) {
    // Remove active class from all tabs
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('text-primary', 'bg-primary-light');
        link.classList.add('text-gray-600', 'hover:bg-gray-50');
    });
    
    // Add active class to current tab
    const activeTab = document.querySelector(`[data-page="${pageName}"]`);
    if (activeTab) {
        activeTab.classList.remove('text-gray-600', 'hover:bg-gray-50');
        activeTab.classList.add('text-primary', 'bg-primary-light');
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Add click event listeners to all navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = link.getAttribute('data-page');
            if (pageName && pageName !== currentTab) {
                currentTab = pageName;
                loadContent(pageName);
            }
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.page) {
            loadContent(event.state.page);
        }
    });

    // Load initial content based on hash or default to dashboard
    const initialPage = window.location.hash.slice(1) || 'dashboard';
    loadContent(initialPage);
});

// Export functions for potential use in other scripts
window.dashboardUtils = {
    loadContent,
    updateActiveTab
}; 