import React, { useState } from 'react';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Dynamic gallery photos array (loaded from structured JSON/data)
  const photos = [
    { src: "/autonomous/library/library_at_a-glace.png", category: "library", caption: "Central Library Reading Section" },
    { src: "/autonomous/library/library%20profile.png", category: "library", caption: "Library Book Circulation Counter" },
    { src: "/autonomous/internal_examination_flow.jpg", category: "labs", caption: "Computer Science Software Computing Laboratory" },
    { src: "/documents/2025-26/gallery/Day%20Celebration/Republic%20Day%202026%20(2).jpeg", category: "events", caption: "Republic Day Ceremony Flag Parade" },
    { src: "/documents/2025-26/gallery/Miscellanosus%20Program/Women%20self%20defence%20program.jpeg", category: "events", caption: "NSS Women Self Defence Incubation Seminar" },
    { src: "/documents/2025-26/gallery/National%20SeminarConference/National%20Seminar%20-%20Biotech.jpeg", category: "convocation", caption: "National Biotechnology Seminar Conveners Panel" },
    { src: "/images/Dr%20MR%20Patil%20Sir%20Event/Dr%20MR%20Patil%20Event%20News%202.jpeg", category: "events", caption: "President Dr. M. R. Patil Event Celebrations" },
    { src: "/autonomous/NSS/Photo/Swami%20Vivekanand%20and%20Jijau.jpeg", category: "cultural", caption: "Youth Cultural Day NSS Group Portraits" },
    { src: "/autonomous/NSS/Photo/15%20Aug%2025%201.jpeg", category: "sports", caption: "Independence Day Flag Ceremony" },
    { src: "/autonomous/NSS/Photo/Mahatma%20Gandhi%20Jayanti.jpeg", category: "sports", caption: "Gandhi Jayanti Campus Cleanliness Drive" },
    { src: "/autonomous/NSS/Photo/26%20Jan%2026.jpeg", category: "sports", caption: "NSS Republic Day Drill March" }
  ];

  const categories = [
    { key: "all", label: "Show All" },
    { key: "labs", label: "Laboratories" },
    { key: "library", label: "Library" },
    { key: "events", label: "Events" },
    { key: "sports", label: "Sports & NSS" },
    { key: "cultural", label: "Cultural" },
    { key: "convocation", label: "Convocation & Seminars" }
  ];

  const filteredPhotos = photos.filter(p => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <div className="fade-in-section">
      <div style={{ padding: '60px 0', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', marginBottom: '50px', textAlign: 'center', borderRadius: '16px' }}>
        <div className="container">
          <span className="section-tag">Media Gallery</span>
          <h2>Campus Life & Infrastructure in Frames</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Explore photos of our laboratories, libraries, cultural fests, and sports achievements.</p>
        </div>
      </div>

      <div className="container" style={{ marginBottom: '60px' }}>
        {/* Navigation Categories Filters */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '35px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat.key} className={`btn ${activeCategory === cat.key ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setActiveCategory(cat.key)}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Reusable data-driven Gallery Grid */}
        <div className="grid-3">
          {filteredPhotos.map((photo, idx) => (
            <div key={idx} className="card" onClick={() => setSelectedPhoto(photo)} style={{ cursor: 'pointer', padding: '15px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', height: '220px', background: 'rgba(0,0,0,0.02)', border: '1px solid var(--border-color)' }}>
                <img src={photo.src} alt={photo.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '12px', fontWeight: '600', textAlign: 'center' }}>{photo.caption}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="modal-overlay" onClick={() => setSelectedPhoto(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px', padding: '20px' }}>
            <div style={{ background: '#ffffff', borderRadius: '12px', overflow: 'hidden', height: '480px' }}>
              <img src={selectedPhoto.src} alt={selectedPhoto.caption} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <h4 style={{ color: 'var(--text-primary)', marginTop: '15px', textAlign: 'center' }}>{selectedPhoto.caption}</h4>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedPhoto(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
