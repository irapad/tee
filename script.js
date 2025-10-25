// Badminton Court Booking System

class BookingSystem {
    constructor() {
        this.bookings = this.loadBookings();
        this.init();
    }

    init() {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('dateInput').setAttribute('min', today);
        document.getElementById('dateInput').value = today;

        // Event listeners
        document.getElementById('bookingForm').addEventListener('submit', (e) => this.handleBooking(e));
        document.getElementById('filterDate').addEventListener('change', (e) => this.filterBookings(e));
        document.getElementById('clearFilter').addEventListener('click', () => this.clearFilter());

        // Modal close
        document.querySelector('.close').addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (e) => {
            if (e.target === document.getElementById('modal')) {
                this.closeModal();
            }
        });

        // Display bookings
        this.displayBookings();
    }

    handleBooking(e) {
        e.preventDefault();

        const court = document.getElementById('courtSelect').value;
        const date = document.getElementById('dateInput').value;
        const time = document.getElementById('timeSelect').value;
        const name = document.getElementById('nameInput').value;
        const phone = document.getElementById('phoneInput').value;

        // Check if the court is already booked at this time
        if (this.isCourtBooked(court, date, time)) {
            this.showModal('ไม่สามารถจองได้', 'สนามนี้ถูกจองแล้วในวันและเวลาที่เลือก กรุณาเลือกเวลาอื่น');
            return;
        }

        // Create booking object
        const booking = {
            id: Date.now(),
            court: court,
            courtName: document.getElementById('courtSelect').options[document.getElementById('courtSelect').selectedIndex].text,
            date: date,
            time: time,
            name: name,
            phone: phone,
            createdAt: new Date().toISOString()
        };

        // Add booking
        this.bookings.push(booking);
        this.saveBookings();
        this.displayBookings();

        // Show success message
        this.showModal('จองสำเร็จ!', `จองสนาม ${booking.courtName} วันที่ ${this.formatDate(date)} เวลา ${time} น. เรียบร้อยแล้ว`);

        // Reset form
        e.target.reset();
        document.getElementById('dateInput').value = new Date().toISOString().split('T')[0];
    }

    isCourtBooked(court, date, time) {
        return this.bookings.some(booking =>
            booking.court === court &&
            booking.date === date &&
            booking.time === time
        );
    }

    deleteBooking(id) {
        if (confirm('คุณต้องการยกเลิกการจองนี้หรือไม่?')) {
            this.bookings = this.bookings.filter(booking => booking.id !== id);
            this.saveBookings();
            this.displayBookings();
            this.showModal('ยกเลิกสำเร็จ', 'ยกเลิกการจองเรียบร้อยแล้ว');
        }
    }

    filterBookings(e) {
        const filterDate = e.target.value;
        this.displayBookings(filterDate);
    }

    clearFilter() {
        document.getElementById('filterDate').value = '';
        this.displayBookings();
    }

    displayBookings(filterDate = null) {
        const bookingsList = document.getElementById('bookingsList');

        let filteredBookings = this.bookings;

        if (filterDate) {
            filteredBookings = this.bookings.filter(booking => booking.date === filterDate);
        }

        // Sort bookings by date and time
        filteredBookings.sort((a, b) => {
            const dateCompare = new Date(a.date) - new Date(b.date);
            if (dateCompare !== 0) return dateCompare;
            return a.time.localeCompare(b.time);
        });

        if (filteredBookings.length === 0) {
            bookingsList.innerHTML = '<p class="no-bookings">ไม่พบรายการจอง</p>';
            return;
        }

        bookingsList.innerHTML = filteredBookings.map(booking => `
            <div class="booking-card">
                <h3>${booking.courtName}</h3>
                <div class="booking-info">
                    <div class="booking-info-item">
                        <strong>📅 วันที่:</strong> ${this.formatDate(booking.date)}
                    </div>
                    <div class="booking-info-item">
                        <strong>🕐 เวลา:</strong> ${booking.time} น.
                    </div>
                    <div class="booking-info-item">
                        <strong>👤 ชื่อ:</strong> ${booking.name}
                    </div>
                    <div class="booking-info-item">
                        <strong>📞 โทร:</strong> ${booking.phone}
                    </div>
                </div>
                <div class="booking-actions">
                    <button class="btn-delete" onclick="bookingSystem.deleteBooking(${booking.id})">
                        ยกเลิกการจอง
                    </button>
                </div>
            </div>
        `).join('');
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const thaiMonths = [
            'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
            'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
        ];
        const day = date.getDate();
        const month = thaiMonths[date.getMonth()];
        const year = date.getFullYear() + 543; // Convert to Buddhist year
        return `${day} ${month} ${year}`;
    }

    showModal(title, message) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalMessage').textContent = message;
        document.getElementById('modal').style.display = 'block';
    }

    closeModal() {
        document.getElementById('modal').style.display = 'none';
    }

    saveBookings() {
        localStorage.setItem('badmintonBookings', JSON.stringify(this.bookings));
    }

    loadBookings() {
        const saved = localStorage.getItem('badmintonBookings');
        return saved ? JSON.parse(saved) : [];
    }
}

// Initialize the booking system when page loads
let bookingSystem;
document.addEventListener('DOMContentLoaded', () => {
    bookingSystem = new BookingSystem();
});
