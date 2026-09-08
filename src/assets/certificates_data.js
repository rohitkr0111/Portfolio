/* =====================================================
   certificates_data.js
   ── Add your certificates here. Each entry = one card.
   ── Replace the placeholder values with your real ones.
   ===================================================== */

/*
  HOW TO ADD A CERTIFICATE:
  1. Import your certificate image at the top (optional)
     e.g.  import cert1 from './cert1.png';
  2. Duplicate one of the objects below
  3. Fill in title, issuer, date, link (verification URL), tags
  4. Set image: cert1  (or keep null for initials placeholder)
*/

const certificates_data = [
  {
    id: 1,
    title: 'Your Certificate Title Here',
    issuer: 'Issuing Organization',
    date: 'Month Year',
    image: null,            // ← Replace with imported image, e.g. cert1
    link: '#',              // ← Paste certificate verification URL here
    tags: ['Skill', 'Technology'],
    color: '#c9a96e',
  },
  {
    id: 2,
    title: 'Another Certificate',
    issuer: 'Another Organization',
    date: 'Month Year',
    image: null,
    link: '#',
    tags: ['Web Dev', 'Frontend'],
    color: '#e8d5b7',
  },
  {
    id: 3,
    title: 'Third Certificate',
    issuer: 'Platform Name',
    date: 'Month Year',
    image: null,
    link: '#',
    tags: ['DSA', 'Problem Solving'],
    color: '#b8935a',
  },
];

export default certificates_data;
