// Select all sidebar buttons
const buttons = document.querySelectorAll('.menu button');
const pages = document.querySelectorAll('.page');

// Function to show a page with slide-in animation
function showPage(pageId) {
    pages.forEach(page => {
        if (page.id === pageId) {
            page.classList.add('active');
            page.style.transform = 'translateX(100%)';
            page.style.opacity = '0';
            setTimeout(() => {
                page.style.transition = 'all 0.4s ease';
                page.style.transform = 'translateX(0)';
                page.style.opacity = '1';
            }, 50);
        } else {
            page.classList.remove('active');
            page.style.transition = '';
            page.style.transform = '';
            page.style.opacity = '';
        }
    });
}

// Add click event to all buttons
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        buttons.forEach(b => b.classList.remove('active'));
        // Add active to clicked button
        btn.classList.add('active');
        // Show the corresponding page
        const pageId = btn.getAttribute('data-page');
        showPage(pageId);
    });
});

const updateBtns = document.querySelectorAll('.update-btn');
const eventForm = document.getElementById('eventForm');
const submitEvent = document.getElementById('submitEvent');
let currentPage = '';

updateBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentPage = btn.parentElement.id; // Detect which page's UPDATE was clicked
    eventForm.style.display = 'block';
  });
});

submitEvent.addEventListener('click', () => {
  const name = document.getElementById('eventName').value;
  const about = document.getElementById('eventAbout').value;
  const date = document.getElementById('eventDate').value;
  const club = document.getElementById('eventClub').value;

  // Create event card
  const card = document.createElement('div');
  card.classList.add('event-card');
  card.innerHTML = `
    <button class="delete-btn">Delete</button>
    <h3>${name}</h3>
    <p><strong>Details:</strong> ${about}</p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Club:</strong> ${club}</p>
  `;

  // Append card only to the EVENTS feed
  if (currentPage === "events") {
    document.getElementById('eventFeed').appendChild(card);
  }

  // Delete functionality
  card.querySelector('.delete-btn').addEventListener('click', () => {
    card.remove();
  });

  // Hide form
  eventForm.style.display = 'none';

  // Clear fields
  document.getElementById('eventName').value = '';
  document.getElementById('eventAbout').value = '';
  document.getElementById('eventDate').value = '';
  document.getElementById('eventClub').value = '';

  alert(`Update added to EVENTS page!`);
});

const closeFormBtn = document.getElementById('closeFormBtn');

closeFormBtn.addEventListener('click', () => {
  eventForm.style.display = 'none';
});

const sortSelect = document.getElementById('sortEvents');
const eventFeed = document.getElementById('eventFeed');

sortSelect.addEventListener('change', () => {
  const cards = Array.from(eventFeed.children);

  if (sortSelect.value === "alpha") {
    cards.sort((a, b) => {
      const titleA = a.querySelector('h3').innerText.toLowerCase();
      const titleB = b.querySelector('h3').innerText.toLowerCase();
      return titleA.localeCompare(titleB);
    });
  }

  if (sortSelect.value === "date") {
    cards.sort((a, b) => {
      const dateA = new Date(a.querySelector('.event-date').innerText);
      const dateB = new Date(b.querySelector('.event-date').innerText);
      return dateA - dateB; // nearest first
    });
  }

  // Re-append sorted cards
  cards.forEach(card => eventFeed.appendChild(card));
});

const dashboardButtons = document.querySelectorAll('.sidebar button');
const searchInput = document.getElementById('dashboardSearch');

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') { // trigger on Enter key
    const query = searchInput.value.trim().toLowerCase();

    let found = false;
    dashboardButtons.forEach(btn => {
      const pageName = btn.dataset.page.toLowerCase();
      if (pageName.includes(query)) {
        btn.click(); // open that page
        found = true;
      }
    });

    if (!found) {
      alert("No matching page found!");
    }

    searchInput.value = ""; // clear search after navigation
  }
});



