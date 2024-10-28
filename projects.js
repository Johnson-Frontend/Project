// Search functionality
function searchProjects() {
    // Get the search input value
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    
    // Remove existing highlights
    const existingHighlights = document.querySelectorAll('.highlight');
    existingHighlights.forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
    });

    if (searchText.trim() === '') return;

    // Get all project links
    const projectLinks = document.querySelectorAll('.project-category a');
    let firstMatch = null;

    projectLinks.forEach(link => {
        const text = link.textContent.toLowerCase();
        if (text.includes(searchText)) {
            // Highlight matching text
            const regex = new RegExp(searchText, 'gi');
            const newText = link.textContent.replace(regex, match => 
                `<span class="highlight">${match}</span>`
            );
            link.innerHTML = newText;

            // Store first match for scrolling
            if (!firstMatch) {
                firstMatch = link;
            }
        }
    });

    // Scroll to first match if found
    if (firstMatch) {
        firstMatch.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

// Back to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Search input Enter key handler
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProjects();
            }
        });
    }

    // Ctrl+F / Cmd+F handler
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault(); // Prevent default browser search
            document.getElementById('searchInput').focus();
        }
    });

    // Back to top button visibility
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
    }

    // Chat Widget Functionality
    const chatWidget = document.getElementById('chatWidget');
    const chatButton = document.getElementById('chatButton');
    const chatContainer = document.getElementById('chatContainer');
    const closeChat = document.getElementById('closeChat');
    const chatMessages = document.getElementById('chatMessages');

    // Initialize chat
    if (chatButton && chatContainer && closeChat) {
        // Open chat
        chatButton.addEventListener('click', function() {
            chatContainer.style.display = 'flex';
            chatButton.style.display = 'none';
        });

        // Close chat
        closeChat.addEventListener('click', function() {
            chatContainer.style.display = 'none';
            chatButton.style.display = 'flex';
        });
    }
});

// Chat message handling
function sendMessage(text) {
    const chatMessages = document.getElementById('chatMessages');
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.textContent = text;
    chatMessages.appendChild(userMessage);

    // Simulate bot response
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot';
        botMessage.innerHTML = `Thank you for your message about "${text}". Our team will respond shortly.
            <div class="message-info">Automated • Just now</div>`;
        chatMessages.appendChild(botMessage);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
} 